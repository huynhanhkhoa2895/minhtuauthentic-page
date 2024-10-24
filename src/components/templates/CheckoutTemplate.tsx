import { twMerge } from 'tailwind-merge';
import FormCheckout from '@/components/organisms/checkout/formCheckout';
import ListCart from '@/components/organisms/checkout/listCart';
import useUser from '@/hooks/useUser';
import { PaymentsDto } from '@/dtos/Payments.dto';
import Logo from '@/static/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ORDER_STATUS, PAYMENT } from '@/config/enum';
import * as yup from 'yup';
import CartDto from '@/dtos/Cart.dto';
import { toast } from 'react-toastify';
import { createVNPayUrl } from '@/utils/vnpay';
import SendTransactionBaoKimDto from '@/dtos/BaoKim/sendTransaction.dto';
import ResponseSendTransactionDto from '@/dtos/BaoKim/responseSendTransaction.dto';
import { useContext, useEffect, useState } from 'react';
import OrderContext from '@/contexts/orderContext';
import { useRouter } from 'next/router';
import SendTransactionExtensionItemDto from '@/dtos/sendTransactionExtensionItem.dto';
const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên').test({
      message: () => 'Tên phải ít nhất 2 chữ',
      test: async (values: string) => {
        const arr = values.split(' ');
        return arr.length >= 2;
      }
    } as any),
    shipping_city: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
    shipping_district: yup.string().required('Vui lòng chọn quận/huyện'),
    shipping_ward: yup.string().required('Vui lòng chọn phường/xã'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
    note: yup.string(),
    payment_id: yup.number().required('Vui lòng chọn phương thức thanh toán'),
    email: yup
      .string()
      .email('Vui lòng nhập đúng dạng email')
      .required('Vui lòng nhập email'),
    phone: yup.string().required('Vui lòng nhập số điện thoại'),
  })
  .required();
export type FormData = {
  name: string;
  email: string;
  phone: string;
  shipping_city: string;
  shipping_district: string;
  shipping_ward: string;
  address: string;
  payment_id: number;
  note?: string;
  status?: string;
  payment_type_id?: string;
  order_external_id?: string;
};
export default function CheckoutTemplate({
  payments,
  ip,
}: {
  payments: PaymentsDto[];
  ip: string;
}) {
  const { user } = useUser();
  const orderCtx = useContext(OrderContext);
  const router = useRouter();
  const [fullAddress, setFullAddress] = useState<string>('');
  const paymentMap = new Map(
    payments.map((item) => [item.id, item.name?.toLowerCase()]),
  );
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      shipping_district: '',
      shipping_city: '',
      shipping_ward: '',
      address: '',
      payment_id: payments[0]?.id || 0,
      note: '',
      phone: user?.phone || '',
      status: ORDER_STATUS.NEW as string,
      order_external_id: '',
    },
  });

  const paymentType = (payment_id?: number) => {
    const payment = paymentMap.get(Number(payment_id));
    return (payment || '')?.toLowerCase();
  };
  const onSubmit = (data: FormData) => {
    if (!data?.payment_id) {
      setError('payment_id', {
        message: 'Vui lòng chọn phương thức thanh toán',
      });
      return;
    }
    if (!orderCtx?.cart) {
      return;
    }

    const paymentTypeId = data?.payment_type_id;

    const order: FormData & {
      user_id: number;
      cart: CartDto | undefined;
    } = {
      ...data,
      user_id: user?.id || 0,
      cart: orderCtx?.cart,
    };
    fetch('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify(order),
    })
      .then((rs) => rs.json())
      .then((res) => {
        if (res?.data?.id) {
          if (paymentType(res?.data?.payment_id) === PAYMENT.VN_PAY) {
            const urlVnPay = createVNPayUrl({
              order: res?.data,
              ip,
            });
            orderCtx?.clearCart && orderCtx?.clearCart();
            if (window) {
              window.location.href = urlVnPay || '';
            }
          } else if (paymentType(res?.data?.payment_id) === PAYMENT.BAO_KIM) {
            const orderExtensionItem = orderCtx?.cart?.items?.map((item) => {
              const qty = item?.qty || 1;
              return new SendTransactionExtensionItemDto({
                item_id: item?.variant_id?.toString(),
                item_name: item?.variant_name,
                item_code: item?.variant_id?.toString(),
                price_amount: item?.price || 0,
                quantity: 1,
                url: process.env.APP_URL + '/' + (item?.slug || '')
              });
            });
            fetch('/api/baokim/send', {
              method: 'POST',
              body: JSON.stringify(
                new SendTransactionBaoKimDto({
                  merchant_id: Number(
                    process.env.NEXT_PUBLIC_BAO_KIM_MERCHANT_ID || 0,
                  ),
                  mrc_order_id: res?.data?.id,
                  total_amount: res?.data?.total_price,
                  description:
                    'Thanh toan don hang cua user Bao Kim ' +
                    res?.data?.user_id +
                    ' voi gia tri ' +
                    res?.data?.total_price,
                  url_success: process.env.NEXT_PUBLIC_APP_URL + '/baokim/',
                  webhooks:
                    process.env.NEXT_PUBLIC_BE_URL + '/api/webhook/baokim',
                  bpm_id: Number(paymentTypeId) || undefined,
                  customer_email: data?.email,
                  customer_name: data?.name,
                  customer_phone: data?.phone,
                  customer_address: data?.address + fullAddress,
                  extension: {
                    items: orderExtensionItem || [],
                  },
                }),
              ),
            })
              .then((rs) => rs.json())
              .then(async (item: ResponseSendTransactionDto) => {
                if (item?.data?.order_id) {
                  await fetch('/api/orders/update', {
                    method: 'PUT',
                    body: JSON.stringify({
                      id: res?.data?.id,
                      order_external_id: item?.data?.order_id,
                    }),
                  });
                }
                if (item?.data?.payment_url) {
                  window.location.href = item.data.payment_url;
                } else if (item?.message?.[0]) {
                  toast.error('Lỗi bảo kim: '+item?.message?.[0]);
                } else {
                  toast.error('Đã có lỗi xảy ra');
                }
              });
          } else {
            toast.success('Đặt hàng thành công');
            orderCtx?.clearCart && orderCtx?.clearCart();
            router.push('/gio-hang/thanh-cong?orderId=' + res?.data?.id);
          }
        } else {
          toast.error('Đã có lỗi xảy ra');
        }
      })
      .catch((e) => {
        console.log('e', e);
        toast.error('Đã có lỗi xảy ra');
      });
  };

  return (
    <>
      <BreadcrumbComponent label={'Giỏ hàng'} link={'/gio-hang/tom-tat'} />
      <form
        className={twMerge(
          'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3 ',
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={'py-6 border-b border-gray-200 mb-6'}>
          <Link href={'/'}>
            <Image
              src={Logo}
              className={'w-[200px]'}
              alt={'minhtuauthentic'}
              width={253}
              height={60}
            />
          </Link>
        </div>
        <div className={'flex flex-col-reverse lg:flex-row gap-3'}>
          {user && (
            <FormCheckout
              watch={watch}
              control={control}
              payments={payments}
              user={user}
              setValue={setValue}
              ip={ip}
              setError={setError}
              errors={errors}
              setFullAddress={setFullAddress}
            />
          )}

          <ListCart
            setValue={setValue}
            paymentType={paymentType(watch('payment_id' as any) as number)}
          />
        </div>
      </form>
    </>
  );
}

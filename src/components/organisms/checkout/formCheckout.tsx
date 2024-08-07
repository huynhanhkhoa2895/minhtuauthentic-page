import useSWR from 'swr';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@/components/molecules/form/FormControl';
import { ProvinceDto } from '@/dtos/Province.dto';
import { PROVINCE } from '@/config/enum';
import { Button, Radio } from 'antd';
import { UserDto } from '@/dtos/User.dto';
import { PaymentsDto } from '@/dtos/Payments.dto';
import OrderContext from '@/contexts/orderContext';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { handleDataFetch } from '@/utils/api';
import CartDto from '@/dtos/Cart.dto';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons';
const fetcher = () =>
  fetch(`/api/orders/province`, {
    method: 'GET',
  }).then((res) => res.json());
const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên'),
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
type FormData = {
  name: string;
  email: string;
  phone: string;
  shipping_city: string;
  shipping_district: string;
  shipping_ward: string;
  address: string;
  payment_id: number;
  note?: string;
};
export default function FormCheckout({
  user,
  payments,
}: {
  user?: UserDto;
  payments: PaymentsDto[];
}) {
  const router = useRouter();
  const { data, error } = useSWR('/api/orders/province', fetcher);
  const orderCtx = useContext(OrderContext);
  const [districts, setDistricts] = useState<ProvinceDto[]>([]);
  const [wards, setWards] = useState<ProvinceDto[]>([]);
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
    },
  });
  useEffect(() => {
    if (watch('shipping_city')) {
      fetchDataProvince(PROVINCE.DISTRICT, watch('shipping_city')).then(
        (rs) => {
          setDistricts(rs?.data || []);
          setWards([]);
          setValue('shipping_ward', '');
          setValue('shipping_district', '');
        },
      );
    }
  }, [watch('shipping_city')]);
  useEffect(() => {
    if (watch('shipping_district')) {
      fetchDataProvince(PROVINCE.WARD, watch('shipping_district')).then(
        (rs) => {
          setWards(rs?.data || []);
          setValue('shipping_ward', '');
        },
      );
    }
  }, [watch('shipping_district')]);
  const fetchDataProvince = async (parent_key: string, parent_id: string) => {
    const query = new URLSearchParams();
    query.append('parent_key', parent_key);
    query.append('parent_id', parent_id);
    const rs = await fetch('/api/orders/province?' + query.toString(), {
      method: 'GET',
    }).then((rs) => rs.json());
    return rs;
  };

  const onSubmit = (data: FormData) => {
    if (!data?.payment_id) {
      setError('payment_id', {
        message: 'Vui lòng chọn phương thức thanh toán',
      });
    }
    if (!orderCtx?.cart) {
      return;
    }
    const order: FormData & {
      user_id: number;
      cart: CartDto;
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
      .then((data) => {
        if (data?.data) {
          toast.success('Đặt hàng thành công');
          orderCtx?.clearCart && orderCtx?.clearCart();
          router.push('/gio-hang/thanh-cong?orderId=' + data?.data?.id);
        } else {
          toast.error(data?.message || 'Đã có lỗi xảy ra');
        }
      })
      .catch(() => {
        toast.error('Đã có lỗi xảy ra');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={'text-3xl font-bold mb-6'}>Thông tin vận chuyển</h3>
      <div className={'grid grid-cols-2 gap-3'}>
        <FormControl
          control={control}
          errors={errors}
          name={'name'}
          type={'text'}
          placeholder={'Ho và tên'}
          className={'col-span-2'}
        />
        <FormControl
          control={control}
          errors={errors}
          name={'email'}
          type={'text'}
          placeholder={'Email'}
        />
        <FormControl
          control={control}
          errors={errors}
          name={'phone'}
          type={'text'}
          placeholder={'Số điện thoại'}
        />
        <FormControl
          control={control}
          errors={errors}
          className={'col-span-2'}
          selectOptions={(data?.data || []).map((item: ProvinceDto) => {
            return {
              label: item?.full_name,
              value: item?.code,
              code_name: item?.code_name,
            };
          })}
          name={'shipping_city'}
          type={'select'}
          placeholder={'Tỉnh/ Thành phố'}
        />
        <FormControl
          control={control}
          errors={errors}
          selectOptions={(districts || []).map((item: any) => {
            return {
              label: item?.full_name,
              value: item?.code,
            };
          })}
          name={'shipping_district'}
          type={'select'}
          placeholder={'Quận/ Huyện'}
        />
        <FormControl
          control={control}
          errors={errors}
          selectOptions={(wards || []).map((item: any) => {
            return {
              label: item?.full_name,
              value: item?.code,
            };
          })}
          name={'shipping_ward'}
          type={'select'}
          placeholder={'Phường/ Xã'}
        />
        <FormControl
          control={control}
          errors={errors}
          name={'address'}
          type={'text'}
          placeholder={'Địa chỉ'}
          className={'col-span-2'}
        />
      </div>
      <h3 className={'text-3xl font-bold my-6'}>Phương thức vận chuyển</h3>
      <div className={'flex flex-col'}>
        <Radio checked>Miễn phí vận chuyển</Radio>
      </div>
      <h3 className={'text-3xl font-bold my-6'}>Phương thức thanh toán</h3>
      <div className={'flex flex-col'}>
        <FormControl
          control={control}
          errors={errors}
          radioOptions={payments.map((item) => ({
            label: item?.label || item?.name || '',
            value: item?.id ? item?.id.toString() : '',
          }))}
          name={'payment_id'}
          type={'radio'}
          placeholder={'Chọn phương thức thanh toán'}
          className={'col-span-2'}
        />
      </div>
      <h3 className={'text-3xl font-bold my-6'}>Ghi chú</h3>
      <div className={'flex flex-col'}>
        <FormControl
          control={control}
          errors={errors}
          name={'note'}
          type={'textarea'}
          placeholder={'Ghi chú'}
          className={'col-span-2'}
        />
      </div>
      <div className={'flex justify-between items-center mt-6'}>
        <div className={'flex text-primary gap-1'}>
          <ArrowLeftOutlined />
          <Link className={'font-semibold'} href={'/gio-hang/tom-tat'}>Quay lại giỏ hàng</Link>
        </div>
        <Button htmlType={'submit'} type={'primary'}>
          Thanh toán
        </Button>
      </div>

    </form>
  );
}

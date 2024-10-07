import useSWR from 'swr';
import { useContext, useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import FormControl from '@/components/molecules/form/FormControl';
import { ProvinceDto } from '@/dtos/Province.dto';
import { PROVINCE } from '@/config/enum';
import { Radio } from 'antd';
import { UserDto } from '@/dtos/User.dto';
import { PaymentsDto } from '@/dtos/Payments.dto';
import OrderContext from '@/contexts/orderContext';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons';

import ImageWithFallback from '@/components/atoms/ImageWithFallback';

const fetcher = () =>
  fetch(`/api/orders/province`, {
    method: 'GET',
  }).then((res) => res.json());

export default function FormCheckout({
  user,
  payments,
  ip,
  watch,
  setValue,
  setError,
  control,
  errors,
  handleSubmit,
}: {
  user?: UserDto;
  payments: PaymentsDto[];
  ip: string;
  control: Control<any>;
  watch: any;
  setValue: any;
  setError: any;
  errors: any;
  handleSubmit: any;
}) {
  const { data: provinceData, error } = useSWR('/api/orders/province', fetcher);
  const orderCtx = useContext(OrderContext);
  const [districts, setDistricts] = useState<ProvinceDto[]>([]);
  const [wards, setWards] = useState<ProvinceDto[]>([]);

  useEffect(() => {
    if (!orderCtx?.cart) {
      toast('Giỏ hàng trống', { type: 'error' });
      window.location.href = '/';
    }
  }, []);

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

  return (
    <div className={'flex-1'}>
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
          selectOptions={((provinceData as any)?.data || []).map(
            (item: ProvinceDto) => {
              return {
                label: item?.full_name,
                value: item?.code,
                code_name: item?.code_name,
              };
            },
          )}
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
        <Radio className={'border border-gray-200 p-3'} checked>
          Miễn phí vận chuyển
        </Radio>
      </div>
      <h3 className={'text-3xl font-bold my-6'}>Phương thức thanh toán</h3>
      <div className={'flex flex-col'}>
        <FormControl
          control={control}
          errors={errors}
          radioOptions={payments.map((item) => {
            return {
              label: (
                <div className={'flex gap-2 justify-between w-full'}>
                  <div className={'flex flex-col gap-1'}>
                    <span className={'text-xl font-semibold'}>
                      {item.label || item.name}
                    </span>
                    {item.description && (
                      <div
                        className={'text-sm text-gray-500 container-html'}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}
                  </div>
                  <ImageWithFallback
                    image={item?.images?.[0]?.image}
                    alt={item?.name}
                    className={'w-[60px] h-[60px] shrink-0'}
                  />
                </div>
              ),
              value: item?.id ? (item?.id || '').toString() : '',
            };
          })}
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
          <Link className={'font-semibold'} href={'/gio-hang/tom-tat'}>
            Quay lại giỏ hàng
          </Link>
        </div>
      </div>
    </div>
  );
}

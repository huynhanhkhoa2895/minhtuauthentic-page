import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWR from 'swr';
import { useCallback, useEffect, useState } from 'react';
import { PROVINCE } from '@/config/enum';
import { ProvinceDto } from '@/dtos/Province.dto';
import useUser from '@/hooks/useUser';
import FormControl from '@/components/molecules/form/FormControl';
import Button from 'antd/es/button/button';
import { toast } from 'react-toastify';
import { AddressesDto } from '@/dtos/Addresses.dto';

const fetcher = () =>
  fetch(`/api/orders/province`, {
    method: 'GET',
  }).then((res) => res.json());
export type FormData = {
  title: string;
  email: string;
  phone: string;
  shipping_city: string;
  shipping_district: string;
  shipping_ward: string;
  shipping_address: string;
  user_id?: number;
};
const schema = yup
  .object({
    title: yup.string().required('Vui lòng nhập tiêu đề'),
    phone: yup.string().required('Vui lòng nhập số điện thoại'),
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
    user_id: yup.number(),
    shipping_city: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
    shipping_district: yup.string().required('Vui lòng chọn quận/huyện'),
    shipping_ward: yup.string().required('Vui lòng chọn phường/xã'),
    shipping_address: yup.string().required('Vui lòng nhập địa chỉ'),
  })
  .required();
type Props = {
  onDone: () => void;
};
export default function FormAddress({ onDone }: Props) {
  const { data: provinceData, error } = useSWR('/api/orders/province', fetcher);
  const { user } = useUser();
  const [districts, setDistricts] = useState<ProvinceDto[]>([]);
  const [wards, setWards] = useState<ProvinceDto[]>([]);
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      email: '',
      phone: '',
      shipping_city: '',
      shipping_district: '',
      shipping_ward: '',
      shipping_address: '',
      user_id: user?.id,
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

  const fetchDataProvince = useCallback(
    async (parent_key: string, parent_id: string) => {
      const query = new URLSearchParams();
      query.append('parent_key', parent_key);
      query.append('parent_id', parent_id);
      return await fetch('/api/orders/province?' + query.toString(), {
        method: 'GET',
      }).then((rs) => rs.json());
    },
    [],
  );
  const onSubmit = async (data: FormData) => {
    console.log('data onSubmit', data);
    fetch('/api/orders/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((rs: any) => {
        if (rs?.data) {
          toast.success('Đã thêm địa chỉ');
        }
      })
      .finally(() => {
        reset();
        onDone();
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'grid grid-col-1 lg:grid-col-2 gap-1 lg:gap-3'}
    >
      <FormControl
        control={control}
        errors={errors}
        name={'title'}
        type={'text'}
        placeholder={'Tiêu đề'}
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
        name={'shipping_address'}
        type={'text'}
        placeholder={'Tên đường, số nhà'}
        className={'col-span-2'}
      />
      <Button type={'primary'} htmlType={'submit'}>
        Thêm địa chỉ
      </Button>
    </form>
  );
}

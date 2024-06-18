import useSWR from 'swr';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useUser from '@/hooks/useUser';
import FormControl from '@/components/molecules/form/FormControl';
import { UserOutlined } from '@ant-design/icons';
import { ProvinceDto } from '@/dtos/Province.dto';
import { PROVINCE } from '@/config/enum';
const fetcher = () => fetch(`/api/orders/province`, {
  method: 'GET',
}).then(res => res.json());
const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên'),
    shipping_city: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
    shipping_district: yup.string().required('Vui lòng chọn quận/huyện'),
    shipping_ward: yup.string().required('Vui lòng chọn phường/xã'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
    email: yup.string().email('Vui lòng nhập đúng dạng email').required('Vui lòng nhập email'),
  })
  .required();
export default function FormCheckout() {
  const { data, error } = useSWR('/api/orders/province', fetcher);
  const { user } = useUser();
  const [districts, setDistricts] = useState<ProvinceDto[]>([]);
  const [wards, setWards] = useState<ProvinceDto[]>([]);
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      shipping_district: '',
      shipping_city: '',
      shipping_ward: '',
      address: '',
    },
  });
  useEffect(() => {
    if(watch('shipping_city')){
      fetchDataProvince(PROVINCE.DISTRICT, watch('shipping_city')).then((rs) => {
        setDistricts(rs?.data || []);
        setWards([])
        setValue('shipping_ward', '');
        setValue('shipping_district', '');
      })
    }
  },[watch('shipping_city')]);
  useEffect(() => {
    if(watch('shipping_district')){
      fetchDataProvince(PROVINCE.WARD, watch('shipping_district')).then((rs) => {
        setWards(rs?.data || []);
        setValue('shipping_ward', '');
      })
    }
  },[watch('shipping_district')]);
  const fetchDataProvince = async (parent_key: string, parent_id: string) => {
    const query = new URLSearchParams();
    query.append('parent_key', parent_key);
    query.append('parent_id', parent_id);
    const rs = await fetch('/api/orders/province?'+query.toString(), {
      method: 'GET',
    }).then((rs) => rs.json());
    return rs;
  }
  return(
    <form>
      <h2 className={'text-3xl font-bold'}>Thông tin vận chuyển</h2>
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
          name={'email'}
          type={'text'}
          placeholder={'Số điện thoại'}
        />
        <FormControl
          control={control}
          errors={errors}
          className={'col-span-2'}
          selectOptions={(data?.data || []).map((item: ProvinceDto)=>{
            return {
              label: <span>{item?.full_name}</span>,
              value: item?.code
            }
          })}
          name={'shipping_city'}
          type={'select'}
          placeholder={'Tỉnh/ Thành phố'}
        />
        <FormControl
          control={control}
          errors={errors}
          selectOptions={(districts || []).map((item: any)=>{
            return {
              label: <span>{item?.full_name}</span>,
              value: item?.code
            }
          })}
          name={'shipping_district'}
          type={'select'}
          placeholder={'Quận/ Huyện'}
        />
        <FormControl
          control={control}
          errors={errors}
          selectOptions={(wards || []).map((item: any)=>{
            return {
              label: <span>{item?.full_name}</span>,
              value: item?.code
            }
          })}
          name={'shipping_ward'}
          type={'select'}
          placeholder={'Phường/ Xã'}
        />
      </div>
    </form>
  )
}
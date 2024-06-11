import { Form, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import GmailIcon from '@/components/icons/gmail';
import FormControl from '@/components/molecules/form/FormControl';
import { UserDto } from '@/dtos/User.dto';
import useUser from '@/hooks/useUser';
import { useState } from 'react';
import { handleDataFetch } from '@/utils/api';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
const schema = yup
  .object({
    username: yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  })
  .required();
export default function FormLogin() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { setCookieUser } = useUser();
  const [api, contextHolder] = notification.useNotification();

  const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const rs: { data: UserDto } | null = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(data),
        })
          .then((rs) => rs.json())
          .then((data) => handleDataFetch(data))
          .catch((error) => {
            setErrorSubmit('Tên đăng nhập hoặc mật khẩu không đúng');
            toast.error('Đăng nhập thất bại');
            return null;
          });
        if (rs?.data?.token) {
          toast.success('Đăng nhập thành công');
          setCookieUser(rs.data);
          const redirect = router.query.redirectUrl;
          if (redirect) {
            router.push(redirect as string);
          } else {
            router.push('/');
          }
        }
      })}
      onError={(errors) => {
        console.log(errors);
      }}
      className={'p-4'}
    >
      <h3 className={'text-primary font-semibold text-[24px] mb-6'}>
        Đăng Nhập
      </h3>
      {errorSubmit && (
        <div className={'text-red-500 font-semibold mb-3'}>{errorSubmit}</div>
      )}
      <div className={'flex flex-col gap-3'}>
        <FormControl
          control={control}
          errors={errors}
          name={'username'}
          type={'text'}
          placeholder={'Email / Số Điện thoại'}
          prefix={<UserOutlined />}
        />
        <FormControl
          control={control}
          errors={errors}
          name={'password'}
          type={'password'}
          placeholder={'Mật khẩu'}
          prefix={<LockOutlined />}
        />
        <div className={'flex justify-between'}>
          <Button type="primary" htmlType={'submit'}>
            Đăng nhập
          </Button>
          <Button type={'link'} className={'text-primary hover:!text-primary'}>
            <Link href={'/tai-khoan/dang-ky'}>Đăng ký</Link>
          </Button>
        </div>
      </div>
      <div className={'login-options'}>
        <div className={'login-options-title'}>
          <span className={'relative bg-white px-4'}>
            Đăng nhập bằng mạng xã hội
          </span>
        </div>
        <div className={'w-full flex items-center justify-center'}>
          <div
            className={
              'rounded-[100%] cursor-pointer p-2 border border-gray-200'
            }
          >
            <GmailIcon className={'w-[20px] h-[20px] '} />
          </div>
        </div>
      </div>
    </form>
  );
}

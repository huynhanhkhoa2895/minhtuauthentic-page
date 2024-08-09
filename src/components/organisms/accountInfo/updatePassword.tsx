import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormControl from '@/components/molecules/form/FormControl';
import { LockOutlined } from '@ant-design/icons';

type DefaultFormProps = {
  password: string;
  newPassword: string;
  rePassword: string;
}

const schema = yup
  .object({
    password: yup.string().required('Vui lòng nhập mật khẩu cũ'),
    newPassword: yup.string()
      .min(6, 'Ít nhất 6 ký tự')
      .max(20, 'Nhiều nhất 20 ký tự')
      .required('Vui lòng nhập mật khẩu mới'),
    rePassword: yup.string().oneOf([yup.ref('newPassword'), undefined], 'Mật khẩu không khớp').required('Vui lòng nhập lại mật khẩu cũ'),
  })

export default function AccountUpdatePassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DefaultFormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      newPassword: '',
      rePassword: '',
    },
  });

  const onSubmit = (data: DefaultFormProps) => {

  }

  return (
    <div className={'p-4'}>
      <h1 className={'text-2xl font-bold mb-3 text-primary'}>Thay đổi maật khẩu</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}

        >
        <FormControl
          control={control}
          errors={errors}
          name={'password'}
          type={'password'}
          placeholder={'Mật khẩu cũ *'}
          prefix={<LockOutlined />}
        />
        <FormControl
          control={control}
          errors={errors}
          name={'newPassword'}
          type={'password'}
          placeholder={'Mật khẩu mới *'}
          prefix={<LockOutlined />}
        />
        <FormControl
          control={control}
          errors={errors}
          name={'repassword'}
          type={'password'}
          placeholder={'Nhập lại mật khẩu *'}
          prefix={<LockOutlined />}
        />
      </form>
    </div>
  )
}
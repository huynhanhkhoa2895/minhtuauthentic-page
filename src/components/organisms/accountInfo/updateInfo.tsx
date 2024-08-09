import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@/components/molecules/form/FormControl';
import { LockOutlined, MailOutlined, PhoneOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type DefaultFormProps = {
  email: string;
  name?: string;
  phone: string;
}

let timeoutEmail: any = null;
let timeoutPhone: any = null;
const schema = yup
  .object({
    name: yup.string(),
    email: yup
      .string()
      .email('Định dạng mail ko chính xác')
      .max(30)
      .required('Vui lòng nhập email')
      .test({
        message: () => 'Email này đã tồn tại',
        test: async (values: string) => {
          if (timeoutEmail) clearTimeout(timeoutEmail);
          const rsPromise = await new Promise((resolve) => {
            timeoutEmail = setTimeout(async () => {
              const result = await fetch(
                `/api/userCheck/?type=email&value=${values}`,
              )
                .then((res) => res.json())
                .catch((e) => null);
              resolve(!result?.data?.id);
            }, 300);
          });
          return rsPromise;
        },
      } as any),
    phone: yup
      .string()
      .required('Số điện thoại không được để trống')
      .test({
        message: () => 'Phone này đã tồn tại',
        test: async (values: string) => {
          if (!values) return true;
          if (timeoutPhone) clearTimeout(timeoutPhone);
          const rsPromise = await new Promise((resolve) => {
            timeoutPhone = setTimeout(async () => {
              const result = await fetch(
                `/api/userCheck/?type=phone&value=${values}`,
              )
                .then((res) => res.json())
                .catch((e) => {
                  console.log(e);
                  return null;
                });
              resolve(!result?.data?.id);
            });
          });
          return rsPromise;
        },
      } as any),
  })
  .required();
export default function AccountInfoUpdate() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DefaultFormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (data: DefaultFormProps) => {

  }

  return (
    <>
      <h1 className={'text-2xl font-bold mb-3 text-primary'}>Thông tin tài khoản</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onError={(errors) => {
          console.log(errors);
        }}
        className={'p-4'}
      >
        <div className={'flex flex-col gap-3'}>
          <FormControl
            control={control}
            errors={errors}
            name={'email'}
            type={'text'}
            placeholder={'Email *'}
            prefix={<MailOutlined />}
          />
          <FormControl
            control={control}
            errors={errors}
            name={'phone'}
            type={'text'}
            placeholder={'Số điện thoại'}
            prefix={<PhoneOutlined />}
          />
          <FormControl
            control={control}
            errors={errors}
            name={'name'}
            type={'text'}
            placeholder={'Tên'}
            prefix={<UsergroupAddOutlined />}
          />
          <div className={'flex justify-between'}>
            <Button
              type="primary"
              htmlType={'submit'}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </form>
    </>
)
}
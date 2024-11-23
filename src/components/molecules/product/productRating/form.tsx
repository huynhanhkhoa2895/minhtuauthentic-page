import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from 'antd/es';
import StartRatingInput from '@/components/atoms/product/startRatingInput';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCallback, useEffect, useState } from 'react';

const schema = yup.object({
  name: yup.string().required('Trường này là bắt buộc'),
  phone: yup.string().required('Trường này là bắt buộc'),
  point: yup.number().required('Trường này là bắt buộc'),
  content: yup.string().required('Trường này là bắt buộc'),
  product_id: yup.number().required('Trường này là bắt buộc'),
});

type Props = {
  product_id: number;
  refreshData: () => void;
};

export default function FormProductRating({ product_id, refreshData }: Props) {
  const [_token, setToken] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      point: 5,
      content: '',
      product_id: product_id,
    },
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('minhturating');
    setToken(token);
    // Do whatever you want with the token
  }, [executeRecaptcha]);
  useEffect(() => {
    handleReCaptchaVerify().catch();
  }, [handleReCaptchaVerify]);

  // Create an event handler so you can call the verification on button click event or form submit

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        data.is_active = false;
        const rs = await fetch('/api/product/rate/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, token: _token }),
        }).then((res) => res.json());
        reset();
        refreshData();
      })}
    >
      <h3 className={'text-primary font-semibold text-xl mb-6'}>
        Thêm đánh giá của bạn
      </h3>
      <div className={'flex gap-3 flex-col'}>
        <div className={'flex gap-3'}>
          <p>
            Xếp hạng của bạn <span className={'text-red-600'}>*</span>
          </p>
          <Controller
            name={'point'}
            control={control}
            render={({ field }) => <StartRatingInput {...field} />}
          />
        </div>
        <div className={'flex flex-col gap-2'}>
          <p>
            Tên của bạn <span className={'text-red-600'}>*</span>
          </p>
          <Controller
            name={'name'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={'border border-gray-200 p-2 rounded-[10px]'}
              />
            )}
          />
          {errors && errors.name && errors?.name?.message && (
            <p className={'text-sm text-red-600'}>{errors?.name?.message}</p>
          )}
        </div>
        <div className={'flex flex-col gap-2'}>
          <p>
            Số điện thoại <span className={'text-red-600'}>*</span>
          </p>
          <Controller
            name={'phone'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={'border border-gray-200 p-2 rounded-[10px]'}
              />
            )}
          />
          {errors && errors.phone && errors?.phone?.message && (
            <p className={'text-red-600 text-sm'}>{errors?.phone?.message}</p>
          )}
        </div>
        <div className={'flex flex-col gap-2'}>
          <p>
            Đánh giá <span className={'text-red-600'}>*</span>
          </p>
          <Controller
            name={'content'}
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                className={'border border-gray-200 p-2 rounded-[10px]'}
                rows={4}
              />
            )}
          />
          {errors && errors.content && errors?.content?.message && (
            <p className={'text-red-600 text-sm'}>{errors?.content?.message}</p>
          )}
        </div>
      </div>
      <div className={'mt-6 ml-auto text-right'}>
        <Button type="primary" htmlType="submit" className={'bg-primary'}>
          Gửi nhận xét
        </Button>
      </div>
    </form>
  );
}

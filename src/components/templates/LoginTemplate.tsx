import { twMerge } from 'tailwind-merge';
import FormLogin from '@/components/organisms/account/formLogin';

export default function LoginTemplate() {
  return (
    <div
      className={twMerge(
        'w-full max-w-[550px] rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto',
      )}
    >
      <FormLogin />
    </div>
  );
}

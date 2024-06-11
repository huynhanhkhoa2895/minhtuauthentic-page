import { twMerge } from 'tailwind-merge';
import FormRegister from '@/components/organisms/account/formRegister';

export default function RegisterTemplate() {
  return (
    <div
      className={twMerge(
        'w-full max-w-[550px] rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto',
      )}
    >
      <FormRegister />
    </div>
  );
}

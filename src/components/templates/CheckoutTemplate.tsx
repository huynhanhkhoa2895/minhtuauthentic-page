import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import FormCheckout from '@/components/organisms/checkout/formCheckout';

export default function CheckoutTemplate() {

  return (
    <div
      className={twMerge(
        'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3 grid grid-cols-1 lg:grid-cols-2',
      )}
    >
      <FormCheckout />
      <div></div>
    </div>
  );
}

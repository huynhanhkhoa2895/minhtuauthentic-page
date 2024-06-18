import { twMerge } from 'tailwind-merge';
import FormCheckout from '@/components/organisms/checkout/formCheckout';
import ListCart from '@/components/organisms/checkout/listCart';
import useUser from '@/hooks/useUser';
import { PaymentsDto } from '@/dtos/Payments.dto';

export default function CheckoutTemplate({
  payments,
}: {
  payments: PaymentsDto[];
}) {
  const { user } = useUser();
  return (
    <div
      className={twMerge(
        'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3 grid grid-cols-1 lg:grid-cols-2 gap-3',
      )}
    >
      {user && <FormCheckout payments={payments} user={user} />}

      <ListCart />
    </div>
  );
}

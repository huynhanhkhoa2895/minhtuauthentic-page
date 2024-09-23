import { twMerge } from 'tailwind-merge';
import FormCheckout from '@/components/organisms/checkout/formCheckout';
import ListCart from '@/components/organisms/checkout/listCart';
import useUser from '@/hooks/useUser';
import { PaymentsDto } from '@/dtos/Payments.dto';
import Logo from '@/static/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
export default function CheckoutTemplate({
  payments,
  ip,
}: {
  payments: PaymentsDto[];
  ip: string;
}) {
  const { user } = useUser();
  return (
    <>
      <BreadcrumbComponent label={'Giỏ hàng'} link={'/thanh-toan'} />
      <div
        className={twMerge(
          'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3 ',
        )}
      >
        <div className={'py-6 border-b border-gray-200 mb-6'}>
          <Link href={'/'}>
            <Image src={Logo} alt={'minhtuauthentic'} width={253} height={60} />
          </Link>
        </div>
        <div className={'flex flex-col-reverse lg:flex-row gap-3'}>
          {user && <FormCheckout payments={payments} user={user} ip={ip} />}

          <ListCart />
        </div>
      </div>
    </>
  );
}

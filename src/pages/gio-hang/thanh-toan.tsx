import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CheckoutTemplate from '@/components/templates/CheckoutTemplate';
import { PaymentsDto } from '@/dtos/Payments.dto';

export const getServerSideProps = (async () => {
  const payments: { data: { list: PaymentsDto[] } } = await fetch(
    `${process.env.BE_URL}/api/payments/getAll`,
  ).then((res) => res.json());
  return {
    props: {
      payments: payments?.data?.list || [],
    },
  };
}) satisfies GetServerSideProps<{
  payments: PaymentsDto[];
}>;

export default function Checkout({
  payments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className={'container mx-auto p-3'}>
        <CheckoutTemplate payments={payments} />
      </div>
    </>
  );
}

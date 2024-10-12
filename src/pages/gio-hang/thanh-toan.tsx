import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CheckoutTemplate from '@/components/templates/CheckoutTemplate';
import { PaymentsDto } from '@/dtos/Payments.dto';

export const getServerSideProps = async (context: any) => {
  const headers = context.req?.headers;
  const payments: { data: { list: PaymentsDto[] } } = await fetch(
    `${process.env.BE_URL}/api/payments/getAll`,
  ).then((res) => res.json());
  return {
    props: {
      payments: payments?.data?.list || [],
      ip: (headers?.['x-forwarded-for'] as string) || '',
    },
  };
};

export default function Checkout({
  payments,
  ip,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={'container  mx-auto p-3'}>
      <CheckoutTemplate payments={payments} ip={ip} />
    </div>
  );
}

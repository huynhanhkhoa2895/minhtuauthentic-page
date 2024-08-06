import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CheckoutTemplate from '@/components/templates/CheckoutTemplate';
import { PaymentsDto } from '@/dtos/Payments.dto';
import Layout from '@/components/templates/Layout';

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
    <Layout menu={menu}>
        <CheckoutTemplate payments={payments} />
    </Layout>
  );
}

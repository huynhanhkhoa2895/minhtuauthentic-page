import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CheckoutTemplate from '@/components/templates/CheckoutTemplate';
import { PaymentsDto } from '@/dtos/Payments.dto';
import Layout from '@/components/templates/Layout';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = (async () => {
  const resDefault = await getDefaultSeverSide();
  const payments: { data: { list: PaymentsDto[] } } = await fetch(
    `${process.env.BE_URL}/api/payments/getAll`,
  ).then((res) => res.json());
  return {
    props: {
      payments: payments?.data?.list || [],
      ...resDefault,
    },
  };
}) satisfies GetServerSideProps<
  {
    payments: PaymentsDto[];
  } & ServerSideProps
>;

export default function Checkout({
  payments,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout settings={settings}>
      <CheckoutTemplate payments={payments} />
    </Layout>
  );
}

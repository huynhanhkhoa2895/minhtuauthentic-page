import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CheckoutTemplate from '@/components/templates/CheckoutTemplate';
import { PaymentsDto } from '@/dtos/Payments.dto';
import Layout from '@/components/templates/Layout';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = (async (context) => {
  const resDefault = await getDefaultSeverSide();
  const headers = context.req?.headers;
  const payments: { data: { list: PaymentsDto[] } } = await fetch(
    `${process.env.BE_URL}/api/payments/getAll`,
  ).then((res) => res.json());
  return {
    props: {
      payments: payments?.data?.list || [],
      ip: headers?.['x-forwarded-for'] || '',
      ...resDefault,
    },
  };
}) satisfies GetServerSideProps<
  {
    payments: PaymentsDto[];
    ip?: string;
  } & ServerSideProps
>;

export default function Checkout({
  payments,
  settings,
  ip,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout settings={settings}>
      <CheckoutTemplate payments={payments} ip={ip} />
    </Layout>
  );
}

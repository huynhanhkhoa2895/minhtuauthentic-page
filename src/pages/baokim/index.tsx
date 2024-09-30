import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import Layout from '@/components/templates/Layout';
import { hashVNPAY } from '@/utils/vnpay';
import { ORDER_STATUS } from '@/config/enum';

export const getServerSideProps = async ({ query }: any) => {
  const params = query as Record<string, string>;
  return {
    redirect: {
      destination: '/gio-hang/thanh-cong?orderId=' + params.mrc_order_id,
      permanent: false,
    },
  };
};

export default function BaokimSuccess() {
  return <></>;
}

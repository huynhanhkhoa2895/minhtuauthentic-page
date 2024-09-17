import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import Layout from '@/components/templates/Layout';
import { hashVNPAY } from '@/utils/vnpay';
import { ORDER_STATUS } from '@/config/enum';

export const getServerSideProps = async ({ query }: any) => {
  const resDefault = await getDefaultSeverSide();
  let is_success = false;
  const vnp_Params = query as Record<string, string>;
  const secureHash = vnp_Params['vnp_SecureHash'];
  if (vnp_Params?.vnp_SecureHashType) {
    delete vnp_Params['vnp_SecureHashType'];
  }
  if (vnp_Params?.vnp_SecureHash) {
    delete vnp_Params['vnp_SecureHash'];
  }
  const signed = hashVNPAY(vnp_Params);
  if (secureHash === signed && vnp_Params['vnp_TransactionStatus'] === '00') {
    is_success = true;
    const order_id = vnp_Params['vnp_TxnRef'];
    await fetch(`${process.env.BE_URL}/api/orders/${order_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: order_id,
        status: ORDER_STATUS.DONE,
        note: 'VNPAY đã thanh toán thành công',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        return {
          redirect: {
            destination: '/gio-hang/thanh-cong',
            permanent: true,
          },
        };
      })
      .catch((err) => {});
  }

  return {
    props: {
      ...resDefault,
      is_success,
    },
  };
};

export default function VnPaySuccess({
  menu,
  footerContent,
  settings,
  is_success,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        {is_success ? <h1>VNPAY SUCCESS</h1> : <h1>Thanh toán thất bại</h1>}
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import OrderSuccessTemplate from '@/components/templates/OrderSuccessTemplate';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import Layout from '@/components/templates/Layout';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = async () => {
  const resDefault = await getDefaultSeverSide();
  return {
    props: resDefault,
  };
};

export default function OderSuccess({
  menu,
  footerContent,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <OrderSuccessTemplate />
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import Layout from '@/components/templates/Layout';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = (async () => {
  const resDefault = await getDefaultSeverSide();
  return {
    props: resDefault,
  };
}) satisfies GetServerSideProps<ServerSideProps>;

export default function VnPaySuccess({
  menu,
  footerContent,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <h1>VNPAY SUCCESS</h1>
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

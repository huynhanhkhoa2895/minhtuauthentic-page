import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ServerSideProps } from '@/config/type';
import Layout from '@/components/templates/Layout';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import CheckOrderTemplate from '@/components/templates/CheckOrderTemplate';

export const getServerSideProps = (async () => {
  const resDefault = await getDefaultSeverSide();
  return {
    props: resDefault,
  };
}) satisfies GetServerSideProps<ServerSideProps>;
export default function CheckOrderPage({
  menu,
  footerContent,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <CheckOrderTemplate />
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

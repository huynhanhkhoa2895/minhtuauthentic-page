import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import LoginTemplate from '@/components/templates/LoginTemplate';
import Layout from '@/components/templates/Layout';
import { ServerSideProps } from '@/config/type';
import { SettingsDto } from '@/dtos/Settings.dto';

export const getServerSideProps = (async () => {
  const resDefault = await getDefaultSeverSide();
  return {
    props: resDefault,
  };
}) satisfies GetServerSideProps<ServerSideProps>;

export default function LoginPage({
  menu,
  footerContent,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('LoginPage settings', settings);
  return (
    <>
      <Header menu={menu} />
      <Layout settings={settings} menu={menu}>
        <LoginTemplate />
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

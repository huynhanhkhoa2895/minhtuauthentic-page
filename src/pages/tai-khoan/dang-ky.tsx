import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import RegisterTemplate from '@/components/templates/RegisterTemplate';
import Layout from '@/components/templates/Layout';
import { PageSetting, ServerSideProps } from '@/config/type';

export default function Register({
  menu,
  footerContent,
  settings,
}: PageSetting) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <RegisterTemplate />
      </Layout>
      <Footer settings={settings} footerContent={footerContent} />
    </>
  );
}

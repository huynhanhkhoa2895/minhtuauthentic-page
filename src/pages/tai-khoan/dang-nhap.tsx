import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import LoginTemplate from '@/components/templates/LoginTemplate';
import Layout from '@/components/templates/Layout';
import { PageSetting } from '@/config/type';

export default function LoginPage({
  menu,
  footerContent,
  settings,
}: PageSetting) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <LoginTemplate />
      </Layout>
      <Footer settings={settings} footerContent={footerContent} />
    </>
  );
}

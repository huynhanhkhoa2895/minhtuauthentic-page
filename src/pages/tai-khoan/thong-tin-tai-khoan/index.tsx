import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AccountTemplate from '@/components/templates/AccountTemplate';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import Layout from '@/components/templates/Layout';
import AccountInfo from '@/components/organisms/accountInfo';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
export const getServerSideProps = (async (context) => {
  const { resMenu, resFooter } = await getDefaultSeverSide();

  const dataMenu: { data: ResponseMenuDto } = resMenu
    ? await resMenu.json()
    : null;
  const dataFooter: { data: ResponseFooterDto } = resFooter
    ? await resFooter.json()
    : null;
  return {
    props: {
      menu: dataMenu?.data,
      footerContent: dataFooter?.data,
    },
  };
}) satisfies GetServerSideProps<{
  menu: ResponseMenuDto;
  footerContent: ResponseFooterDto;
}>;
export default function AccountInfoPage({
  menu,
  footerContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header menu={menu} />
      <Layout menu={menu}>
        <BreadcrumbComponent
          label={'Thông tin tài khoản'}
          link={'/tai-khoan/thong-tin-tai-khoan'}
        />
        <AccountTemplate>
          <AccountInfo />
        </AccountTemplate>
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

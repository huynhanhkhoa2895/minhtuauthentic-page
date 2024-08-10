import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AccountTemplate from '@/components/templates/AccountTemplate';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import Layout from '@/components/templates/Layout';
import AccountInfo from '@/components/organisms/accountInfo';
import getDefaultSeverSide, { getProfile } from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { UserDto } from '@/dtos/User.dto';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = (async (context) => {
  const resDefault = await getDefaultSeverSide();
  const profile = await getProfile(context.req.cookies);
  return {
    props: {
      profile,
      ...resDefault,
    },
  };
}) satisfies GetServerSideProps<
  {
    footerContent: ResponseFooterDto;
  } & ServerSideProps
>;
export default function AccountInfoPage({
  menu,
  footerContent,
  profile,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header menu={menu} />
      <Layout settings={settings} menu={menu}>
        <BreadcrumbComponent
          label={'Thông tin tài khoản'}
          link={'/tai-khoan/thong-tin-tai-khoan'}
        />
        <AccountTemplate>
          <AccountInfo profile={profile} />
        </AccountTemplate>
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

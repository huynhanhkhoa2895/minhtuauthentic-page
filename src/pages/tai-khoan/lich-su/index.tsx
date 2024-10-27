import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AccountTemplate from '@/components/templates/AccountTemplate';
import HistoryList from '@/components/organisms/history/list';
import { getCookie } from '@/utils';
import { OrdersDto } from '@/dtos/Orders.dto';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import Layout from '@/components/templates/Layout';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = (async (context: any) => {
  const resDefault = await getDefaultSeverSide();
  const cookie = getCookie('user', context.req.headers.cookie || '', true)

  if (!cookie) {
    return {
      redirect: {
        destination: '/tai-khoan/dang-nhap',
        permanent: false,
      },
    };
  }

  const user = JSON.parse(
    cookie,
  );
  const rsHistory = await fetch(
    process.env.BE_URL + '/api/pages/orders/' + user?.id,
    {
      headers: {
        Authorization: 'Bearer ' + user?.token,
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => null);

  const dataHistory: { data: { orders: OrdersDto[] } } = rsHistory
    ? rsHistory
    : null;
  return {
    props: {
      data: dataHistory?.data?.orders || [],
      ...resDefault,
    },
  };
}) satisfies GetServerSideProps<
  {
    data: OrdersDto[];
  } & ServerSideProps
>;

export default function UserHistory({
  menu,
  footerContent,
  data,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <BreadcrumbComponent label={'Lich sử'} link={'/tai-khoan/lich-su'} />
        <AccountTemplate>
          <HistoryList orders={data} />
        </AccountTemplate>
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

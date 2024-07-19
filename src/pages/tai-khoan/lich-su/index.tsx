import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AccountTemplate from '@/components/templates/AccountTemplate';
import HistoryList from '@/components/organisms/history/list';
import { getCookie } from '@/utils';
import { OrdersDto } from '@/dtos/Orders.dto';

export const getServerSideProps = (async (context) => {
  const { resMenu, resFooter } = await getDefaultSeverSide();
  const user = JSON.parse(getCookie('user', context.req.headers.cookie || '',true));
  const rsHistory = await fetch(process.env.BE_URL + '/api/pages/orders/'+user?.id, {
    headers: {
      Authorization: 'Bearer ' + user?.token,
    }
  }).then(res => res.json()).catch(err => null);

  const dataHistory: { data: {orders: OrdersDto[]} } = rsHistory ? rsHistory : null;
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
      data: dataHistory?.data?.orders || []
    },
  };
}) satisfies GetServerSideProps<{
  menu: ResponseMenuDto;
  footerContent: ResponseFooterDto;
  data: OrdersDto[];
}>;

export default function UserHistory({
    menu,
    footerContent,
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header homeMenuCategory={menu.homeMenuCategory} />
      <div className={'container mx-auto p-3'}>
        <AccountTemplate>
          <HistoryList orders={data} />
        </AccountTemplate>
      </div>
      <Footer footerContent={footerContent} />
    </>
  );
}

import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCookie } from '@/utils';
import { OrdersDto } from '@/dtos/Orders.dto';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import OrderDetailTemplate from '@/components/templates/OrderDetailTemplate';
import AccountTemplate from '@/components/templates/AccountTemplate';

export const getServerSideProps = (async (context) => {
  const { resMenu, resFooter } = await getDefaultSeverSide();
  const order = context.query.id;
  const user = JSON.parse(
    getCookie('user', context.req.headers.cookie || '', true),
  );
  const rsOrderItems = await fetch(
    process.env.BE_URL + '/api/pages/orders/items/' + order,
    {
      headers: {
        Authorization: 'Bearer ' + user?.token,
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => null);
  const dataOrderItems: {
    data: {
      order: OrdersDto;
      order_items: OrderItemsDto[];
    };
  } = rsOrderItems ? rsOrderItems : null;
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
      data: dataOrderItems?.data,
    },
  };
}) satisfies GetServerSideProps<{
  menu: ResponseMenuDto;
  footerContent: ResponseFooterDto;
  data: {
    order: OrdersDto;
    order_items: OrderItemsDto[];
  };
}>;

export default function UserHistoryDetail({
  menu,
  footerContent,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header menu={menu} />
      <div className={'container mx-auto p-3'}>
        <AccountTemplate>
          <OrderDetailTemplate
            order={data?.order}
            order_items={data?.order_items}
          />
        </AccountTemplate>
      </div>
      <Footer footerContent={footerContent} />
    </>
  );
}

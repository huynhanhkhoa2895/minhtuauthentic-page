import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CheckoutTemplate from '@/components/templates/CheckoutTemplate';
import { PaymentsDto } from '@/dtos/Payments.dto';
import OrderSuccessTemplate from '@/components/templates/OrderSuccessTemplate';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import Header from '@/components/organisms/header';
import CartSummaryTemplate from '@/components/templates/CartSummaryTemplate';
import Footer from '@/components/organisms/footer';

export const getServerSideProps = (async () => {
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

export default function OderSuccess({
                                   menu,
                                   footerContent,
                                 }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header homeMenuCategory={menu.homeMenuCategory} />
      <div className={'container mx-auto p-3'}>
        <OrderSuccessTemplate />
      </div>
      <Footer footerContent={footerContent} />
    </>
  );
}

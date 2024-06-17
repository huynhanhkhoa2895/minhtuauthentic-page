import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CheckoutTemplate from '@/components/templates/CheckoutTemplate';
import { useEffect } from 'react';

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

export default function Checkout({
  menu,
  footerContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    getProvince().catch();
  }, []);
  const getProvince = async () => {
    const res = await fetch(`/api/orders/province`, {
      method: 'GET',
    });
    return res.json();
  };
  return (
    <>
      <div className={'container mx-auto p-3'}>
        <CheckoutTemplate />
      </div>
    </>
  );
}

import { useRouter } from 'next/router';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { SettingOptionDto } from '@/dtos/settingOption.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ProductTemplate from '@/components/templates/ProductTemplate';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import { Entity } from '@/config/enum';
import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
export const getServerSideProps = (async (context) => {
  const { slug } = context.query;
  const res = await fetch(
    process.env.BE_URL + '/api/pages/slug/' + (slug as string[]).join('/'),
  ).catch((error) => {
    return null;
  });
  const resMenu = await fetch(process.env.BE_URL + '/api/pages/menu').catch(
    (error) => {
      return null;
    },
  );
  const resFooter = await fetch(process.env.BE_URL + '/api/pages/footer').catch(
    (error) => {
      return null;
    },
  );
  const data: { data: ResponseSlugPageDto } = res ? await res.json() : null;
  const dataMenu: { data: ResponseMenuDto } = resMenu
    ? await resMenu.json()
    : null;
  const dataFooter: { data: ResponseFooterDto } = resFooter
    ? await resFooter.json()
    : null;
  return {
    props: {
      slug: data?.data,
      menu: dataMenu?.data,
      footerContent: dataFooter?.data,
    },
  };
}) satisfies GetServerSideProps<{
  slug: ResponseSlugPageDto;
  menu: ResponseMenuDto;
  footerContent: ResponseFooterDto;
}>;
export default function Page({
  slug,
  footerContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const renderTemplate = () => {
    switch (slug?.model) {
      case Entity.PRODUCTS:
        return (
          <ProductTemplate data={slug?.data as ResponseProductDetailPageDto} />
        );
      default:
        return <div>Not Found</div>;
    }
  };
  return (
    <>
      <Header />
      <div className={'container mx-auto'}>{renderTemplate()}</div>
      <Footer footerContent={footerContent} />
    </>
  );
}

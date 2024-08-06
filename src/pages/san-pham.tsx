import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import CategoryTemplate from '@/components/templates/CategoryTemplate';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import { ResponseCategoryFilterPageDto } from '@/dtos/responseCategoryFilterPage.dto';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import Layout from '@/components/templates/Layout';
export const getServerSideProps = (async (context) => {
  const { resMenu, resFooter } = await getDefaultSeverSide();
  const dataMenu: { data: ResponseMenuDto } = resMenu
    ? await resMenu.json()
    : null;
  const dataFooter: { data: ResponseFooterDto } = resFooter
    ? await resFooter.json()
    : null;
  const res = await fetch(
    process.env.BE_URL +
      '/api/pages/products/' +
      '?' +
      new URLSearchParams(context.query as any).toString(),
  ).catch((error) => {
    return null;
  });
  const data: { data: ResponseSlugPageDto<unknown> } = res
    ? await res.json()
    : null;
  return {
    props: {
      menu: dataMenu?.data,
      footerContent: dataFooter?.data,
      slug: data,
    },
  };
}) satisfies GetServerSideProps<{
  slug: ResponseSlugPageDto<unknown>;
  menu: ResponseMenuDto;
  footerContent: ResponseFooterDto;
}>;
export default function ProductPage({
  menu,
  footerContent,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header menu={menu} />
      <Layout menu={menu}>
        <BreadcrumbComponent
          label={'Sản phẩm'}
          link={'/san-pham'}
        />
        <CategoryTemplate
          slug={slug as ResponseSlugPageDto<ResponseCategoryFilterPageDto>}
        />
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

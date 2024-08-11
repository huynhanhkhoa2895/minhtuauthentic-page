import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ProductTemplate from '@/components/templates/ProductTemplate';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import { Entity } from '@/config/enum';
import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import CategoryTemplate from '@/components/templates/CategoryTemplate';
import { ResponseCategoryFilterPageDto } from '@/dtos/responseCategoryFilterPage.dto';
import NewsDetailTemplate from '@/components/templates/NewsDetailTemplate';
import { ResponseNewsDetailPageDto } from '@/dtos/ResponseNewsDetailPage.dto';
import Layout from '@/components/templates/Layout';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = (async (context) => {
  const { slug } = context.query;
  let title = undefined;
  let description = undefined;
  const resDefault = await getDefaultSeverSide();
  const res = await fetch(
    process.env.BE_URL +
      '/api/pages/slug/' +
      (slug as string[]).join('/') +
      '?' +
      new URLSearchParams(context.query as any).toString(),
  ).catch((error) => {
    return null;
  });
  const data: { data: ResponseSlugPageDto<unknown> } = res
    ? await res.json()
    : null;
  if (
    data?.data?.model === Entity.PRODUCTS ||
    data?.data?.model === Entity.NEWS
  ) {
    switch (data?.data?.model) {
      case Entity.PRODUCTS:
        title = (
          data?.data as ResponseSlugPageDto<ResponseProductDetailPageDto>
        )?.data?.product?.name;
        break;
      case Entity.NEWS:
        title = (data?.data as ResponseSlugPageDto<ResponseNewsDetailPageDto>)
          ?.data?.news?.name;
        description = (
          data?.data as ResponseSlugPageDto<ResponseNewsDetailPageDto>
        )?.data?.news?.description;
        break;
    }
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59',
    );
  }
  return {
    props: {
      slug: data?.data,
      title,
      description,
      ...resDefault,
    },
  };
}) satisfies GetServerSideProps<
  ServerSideProps & {
    slug: ResponseSlugPageDto<unknown>;
    title?: string;
    description?: string;
  }
>;
export default function Page({
  slug,
  footerContent,
  menu,
  settings,
  title,
  description,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const renderTemplate = () => {
    switch (slug?.model) {
      case Entity.PRODUCTS:
        return (
          <ProductTemplate
            key={(slug?.data as ResponseProductDetailPageDto)?.product?.id}
            data={slug?.data as ResponseProductDetailPageDto}
          />
        );
      case Entity.CATEGORIES:
      case Entity.BRANDS:
      case Entity.KEYWORDS:
        return (
          <CategoryTemplate
            slug={slug as ResponseSlugPageDto<ResponseCategoryFilterPageDto>}
          />
        );
      case Entity.NEWS:
        return (
          <NewsDetailTemplate
            slug={slug as ResponseSlugPageDto<ResponseNewsDetailPageDto>}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  };
  return (
    <>
      <Header menu={menu} />
      <Layout
        settings={settings}
        menu={menu}
        seo={{
          title,
          description,
        }}
      >
        {renderTemplate()}
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

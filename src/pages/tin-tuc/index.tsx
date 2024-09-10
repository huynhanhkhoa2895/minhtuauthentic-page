import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NewsTemplate from '@/components/templates/NewsTemplate';
import { ResponseNewsPageDto } from '@/dtos/ResponseNewsPage.dto';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import Layout from '@/components/templates/Layout';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = (async (context) => {
  const page = context.query.page;
  const resDefault = await getDefaultSeverSide();
  const rsNews: { data: ResponseNewsPageDto } = await fetch(
    process.env.BE_URL + `/api/pages/news?page=${page || 1}`,
    {},
  )
    .then((res) => res.json())
    .catch((err) => null);
  return {
    props: {
      news: rsNews?.data,
      ...resDefault,
    },
  };
}) satisfies GetServerSideProps<
  {
    news: ResponseNewsPageDto;
  } & ServerSideProps
>;

export default function News({
  menu,
  footerContent,
  news,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <BreadcrumbComponent label={'Tin tức'} link={'/tin-tuc'} />
        {news && (
          <NewsTemplate
            news={news?.news || []}
            categoryNews={news.categoryNews || []}
            newest={news.newest || []}
          />
        )}
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

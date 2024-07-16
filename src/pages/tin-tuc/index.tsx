import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import RegisterTemplate from '@/components/templates/RegisterTemplate';
import NewsTemplate from '@/components/templates/NewsTemplate';
import { ResponseNewsPageDto } from '@/dtos/ResponseNewsPage.dto';

export const getServerSideProps = (async (context) => {
  const page = context.query.page;
  const { resMenu, resFooter } = await getDefaultSeverSide();
  const dataMenu: { data: ResponseMenuDto } = resMenu
    ? await resMenu.json()
    : null;
  const dataFooter: { data: ResponseFooterDto } = resFooter
    ? await resFooter.json()
    : null;
  const rsNews: {data: ResponseNewsPageDto} = await fetch(process.env.BE_URL + `/api/page/news?page=${page || 1}`, {
  }).then(res => res.json()).catch(err => null);
  return {
    props: {
      menu: dataMenu?.data,
      footerContent: dataFooter?.data,
      news: rsNews?.data,
    },
  };
}) satisfies GetServerSideProps<{
  menu: ResponseMenuDto;
  footerContent: ResponseFooterDto;
  news: ResponseNewsPageDto;
}>;

export default function News({
     menu,
     footerContent,
    news,
   }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header homeMenuCategory={menu.homeMenuCategory} />
      <div className={'container mx-auto p-3'}>
        <NewsTemplate news={news.news || []} categoryNews={news.categoryNews || []} />
      </div>
      <Footer footerContent={footerContent} />
    </>
  );
}

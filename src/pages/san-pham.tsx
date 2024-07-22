import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import CategoryTemplate from '@/components/templates/CategoryTemplate';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { InferGetServerSidePropsType } from 'next';
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
});
export default function ProductPage({
                                      menu,
                                      footerContent,
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>){
  return (
    <>
    <Header homeMenuCategory={menu.homeMenuCategory} />
      <div className={'container mx-auto p-3'}>
        <CategoryTemplate
        />
      </div>
    <Footer footerContent={footerContent} />
  </>
  );
}
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import Header from '@/components/organisms/header';
import CategoryTemplate from '@/components/templates/CategoryTemplate';
import Footer from '@/components/organisms/footer';
import { InferGetServerSidePropsType } from 'next';
import BrandsTemplate from '@/components/templates/BrandsTemplate';

export const getServerSideProps = async () => {
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
};
export default function BrandsPage({
  menu,
  footerContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header menu={menu} />
      <div className={'container mx-auto p-3'}>
        <BrandsTemplate brands={menu.brands || []} />
      </div>
      <Footer footerContent={footerContent} />
    </>
  );
}

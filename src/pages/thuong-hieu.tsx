import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import Header from '@/components/organisms/header';
import CategoryTemplate from '@/components/templates/CategoryTemplate';
import Footer from '@/components/organisms/footer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import BrandsTemplate from '@/components/templates/BrandsTemplate';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import Layout from '@/components/templates/Layout';
import { ServerSideProps } from '@/config/type';
import useSettings from '@/hooks/useSettings';

export default function BrandsPage() {
  const { settings, menu, footerContent } = useSettings();
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <BreadcrumbComponent label={'Thương hiệu'} link={'/thuong-hieu'} />
        <BrandsTemplate brands={menu?.brands || []} />
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

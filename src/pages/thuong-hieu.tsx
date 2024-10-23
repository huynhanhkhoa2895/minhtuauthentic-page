import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import BrandsTemplate from '@/components/templates/BrandsTemplate';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import Layout from '@/components/templates/Layout';
import useSettings from '@/hooks/useSettings';
import { BrandDto } from '@/dtos/Brand.dto';
export const getServerSideProps = async (context: any) => {
  const res = await fetch(process.env.BE_URL + '/api/pages/brands').catch(
    (error) => {
      return null;
    },
  );
  const data: { data: BrandDto[] } = res ? await res.json() : null;
  return {
    props: {
      brands: data?.data || [],
    },
  };
};
export default function BrandsPage({ brands }: { brands: BrandDto[] }) {
  const { settings, menu, footerContent } = useSettings();
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <BreadcrumbComponent label={'Thương hiệu'} link={'/thuong-hieu'} />
        <BrandsTemplate brands={brands || []} />
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

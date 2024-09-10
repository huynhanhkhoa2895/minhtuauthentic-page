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
import { STATIC_CONTENT_TYPE } from '@/config/enum';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import StaticContentTemplate from '@/components/templates/StaticContentTemplate';
import { ServerSideProps } from '@/config/type';

export const getServerSideProps = (async () => {
  const res = await fetch(
    process.env.BE_URL +
      '/api/pages/static-contents/' +
      STATIC_CONTENT_TYPE.FOOTER_PRIVACY_POLICY,
  ).catch((error) => {
    return null;
  });
  const resDefault = await getDefaultSeverSide();
  const data: { data: StaticContentsDto[] } = res ? await res.json() : null;
  return {
    props: {
      ...resDefault,
      data: data?.data?.[0] || null,
    },
  };
}) satisfies GetServerSideProps<
  ServerSideProps & {
    data: StaticContentsDto;
  }
>;
export default function PrivacyPolicy({
  menu,
  footerContent,
  data,
  settings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout settings={settings} menu={menu}>
        <BreadcrumbComponent
          label={'Chinh sách bảo mật'}
          link={'/chinh-sach-bao-mat'}
        />
        <StaticContentTemplate staticContent={data} />
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

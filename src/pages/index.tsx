import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ResponseHomePageDto } from '@/dtos/responseHomePage.dto';
import MenuWrapper from '@/components/molecules/header/menu/menuWrapper';
import Banners from '@/components/molecules/header/banners';
import BlockUnderSlide from '@/components/organisms/home/blockUnderSlide';
import HomeFeatureCategory from '@/components/organisms/home/homeFeatureCategory';
import HomeCategory from '@/components/organisms/home/homeCategory';
import HomeNews from '@/components/organisms/home/homeNews';
import HomeBrand from '@/components/organisms/home/homeBrand';
import HomeSupport from '@/components/organisms/home/homeSupport';
import { SETTING_KEY } from '@/config/enum';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import { SettingOptionDto } from '@/dtos/SettingOption.dto';
import getDefaultSeverSide from '@/utils/getDefaultServerSide';
import HomeFlashSale from '@/components/organisms/home/homeFlashSale';
import { ServerSideProps } from '@/config/type';
import Layout from '@/components/templates/Layout';
import useSettings from '@/hooks/useSettings';
export const getServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(process.env.BE_URL + '/api/pages/home').catch(
    (error) => {
      return null;
    },
  );

  const data: { data: ResponseHomePageDto } = res ? await res.json() : null;
  const settingsHome: Record<string, SettingOptionDto | undefined> = {};
  data?.data?.settings?.map((item) => {
    settingsHome[item?.key || ''] = item?.value;
  });
  return {
    props: {
      homePage: data?.data,
      settingsHome,
    },
  };
};
export default function Home({
  homePage,
  settingsHome,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { settings, menu, footerContent } = useSettings();
  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout seo={homePage.seo} settings={settings} menu={menu}>
        <div
          id={'main-home-page'}
          className={'lg:mt-[10px] flex w-full gap-2 relative'}
        >
          <h1 className={'hidden'}>{homePage?.seo?.title}</h1>
          {menu && <MenuWrapper menu={menu} />}
          <Banners
            className={'flex-1 rounded-3xl lg:h-[380px]'}
            banners={homePage?.banners || []}
            classNameImage={'object-contain lg:object-cover w-full  '}
          />
        </div>
        <BlockUnderSlide contents={homePage?.homeBlockUnderSlide || []} />

        {homePage?.homeFlashSale && (
          <HomeFlashSale
            promotion={homePage?.homeFlashSale}
            setting={settingsHome[SETTING_KEY.FLASH_SALE_SECTION.KEY]}
          />
        )}

        <HomeCategory
          homeBlockFeaturedCategory={homePage?.homeBlockFeaturedCategory || []}
          homeCategory={homePage?.homeCategory || []}
          bannerUnderCategory={homePage?.bannerUnderCategory}
          settingsHome={settingsHome}
        />

        {homePage?.homeNews && (
          <HomeNews
            content={homePage?.homeNews}
            setting={settingsHome[SETTING_KEY.NEWS_SECTION.KEY]}
          />
        )}
        {homePage?.homeBrand && (
          <HomeBrand
            contents={homePage?.homeBrand}
            setting={settingsHome[SETTING_KEY.BRAND_SECTION.KEY]}
          />
        )}
        <HomeSupport />
      </Layout>
      <Footer footerContent={footerContent} />
    </>
  );
}

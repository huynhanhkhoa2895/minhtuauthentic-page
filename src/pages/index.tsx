import { ResponseHomePageDto } from '@/dtos/responseHomePage.dto';
import MenuWrapper from '@/components/molecules/header/menu/menuWrapper';
import BlockUnderSlide from '@/components/organisms/home/blockUnderSlide';
import HomeCategory from '@/components/organisms/home/homeCategory';
import HomeNews from '@/components/organisms/home/homeNews';
import HomeBrand from '@/components/organisms/home/homeBrand';
import { SETTING_KEY } from '@/config/enum';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import { SettingOptionDto } from '@/dtos/SettingOption.dto';
import HomeFlashSale from '@/components/organisms/home/homeFlashSale';
import Layout from '@/components/templates/Layout';
import useSettings from '@/hooks/useSettings';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const HomeBanner = dynamic(
  () => import('@/components/organisms/home/homeBanner'),
  {
    ssr: false,
  },
);

export async function getStaticProps() {
  const res = await fetch(process.env.BE_URL + '/api/pages/home').catch(
    (error) => {
      return null;
    },
  );

  const data: { data: ResponseHomePageDto } = res ? await res.json() : null;
  const settingsHome: Record<string, SettingOptionDto | undefined> = {};
  (data?.data?.settings || [])?.map((item) => {
    settingsHome[item?.key || ''] = item?.value;
  });
  return {
    props: {
      homePage: data?.data,
      settingsHome,
    },
    revalidate: 300,
  };
}

export default function Home({
  homePage,
  settingsHome,
}: {
  homePage: ResponseHomePageDto;
  settingsHome: Record<string, SettingOptionDto | undefined>;
}) {
  const { settings, menu, footerContent } = useSettings();

  return (
    <>
      <Header settings={settings} menu={menu} />
      <Layout
        seo={homePage?.seo}
        settings={settings}
        menu={menu}
        className={'overflow-hidden'}
      >
        <h1 className={'hidden'}>{homePage?.seo?.title}</h1>
        <div
          id={'main-home-page'}
          className={'lg:mt-[10px] lg:flex w-full gap-2 relative'}
        >
          {menu && (
            <MenuWrapper menu={menu} className={'w-[220px] h-[380px]'} />
          )}
          <div
            className={
              'min-h-[140px] lg:h-[380px] w-full basis-[calc(100%-230px)] lg:w-[calc(100%-230px)] max-w-full'
            }
          >
            <HomeBanner banners={homePage?.banners || []} />
          </div>
        </div>
        <BlockUnderSlide contents={homePage?.homeBlockUnderSlide || []} />

        {homePage?.homeFlashSale &&
          ((
            <HomeFlashSale
              promotion={homePage?.homeFlashSale}
              setting={settingsHome[SETTING_KEY.FLASH_SALE_SECTION.KEY]}
            />
          ) as ReactNode)}

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
        {/*<HomeSupport />*/}
      </Layout>
      <Footer settings={settings} footerContent={footerContent} />
    </>
  );
}

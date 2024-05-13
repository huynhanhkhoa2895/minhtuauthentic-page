import Image from 'next/image';
import { useState } from 'react';
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
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { SettingOptionDto } from '@/dtos/settingOption.dto';
import { SETTING_KEY } from '@/config/enum';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch(process.env.BE_URL + '/api/pages/home').catch(
    (error) => {
      return null;
    },
  );
  const resMenu = await fetch(process.env.BE_URL + '/api/pages/menu').catch(
    (error) => {
      return null;
    },
  );
  const resFooter = await fetch(process.env.BE_URL + '/api/pages/footer').catch(
    (error) => {
      return null;
    },
  );

  const data: { data: ResponseHomePageDto } = res ? await res.json() : null;
  const dataMenu: { data: ResponseMenuDto } = resMenu
    ? await resMenu.json()
    : null;
  const dataFooter: { data: ResponseFooterDto } = resFooter
    ? await resFooter.json()
    : null;
  const settings: Record<string, SettingOptionDto | undefined> = {};
  data?.data?.settings?.map((item) => {
    settings[item?.key || ''] = item?.value;
  });
  return {
    props: {
      homePage: data?.data,
      menu: dataMenu?.data,
      settings,
      footerContent: dataFooter?.data,
    },
  };
}) satisfies GetServerSideProps<{
  homePage: ResponseHomePageDto;
  menu: ResponseMenuDto;
  settings: Record<string, SettingOptionDto | undefined>;
  footerContent: ResponseFooterDto;
}>;
export default function Home({
  homePage,
  menu,
  settings,
  footerContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header />
      <div className={'container mx-auto'}>
        <div
          id={'main-home-page'}
          className={'mt-[10px] flex w-full gap-2 relative'}
        >
          <MenuWrapper homeMenuCategory={menu.homeMenuCategory} />
          <Banners className={'flex-1'} banners={homePage?.banners || []} />
          <div className={'w-[200px] flex flex-col gap-2'}>
            <Banners
              className={'w-full h-full'}
              classNameImage={'object-cover w-full h-full'}
              banners={homePage?.banners || []}
            />
            <Banners
              className={'w-full h-full'}
              classNameImage={'object-cover w-full h-full'}
              banners={homePage?.banners || []}
            />
          </div>
        </div>
        <BlockUnderSlide contents={homePage?.homeBlockUnderSlide || []} />
        <HomeFeatureCategory
          contents={homePage?.homeBlockFeaturedCategory || []}
          setting={settings[SETTING_KEY.FEATURE_CATEGORY.KEY]}
        />
        <HomeCategory
          homeCategory={homePage?.homeCategory || []}
          bannerUnderCategory={homePage?.bannerUnderCategory}
        />
        {homePage?.homeNews && (
          <HomeNews
            content={homePage?.homeNews}
            setting={settings[SETTING_KEY.NEWS_SECTION.KEY]}
          />
        )}
        {homePage?.homeBrand && (
          <HomeBrand
            contents={homePage?.homeBrand}
            setting={settings[SETTING_KEY.BRAND_SECTION.KEY]}
          />
        )}
        <HomeSupport />
      </div>
      <Footer footerContent={footerContent} />
    </>
  );
}

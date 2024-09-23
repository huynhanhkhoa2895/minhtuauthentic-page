import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import Menu from '@/components/molecules/header/menu';
import appContext from '@/contexts/appContext';
import { SettingsDto } from '@/dtos/Settings.dto';
import DefaultSeo from '@/components/molecules/seo';
import { SEOProps } from '@/config/type';
import dynamic from 'next/dynamic';
type Props = {
  className?: string;
  children: ReactNode;
  menu?: ResponseMenuDto;
  settings: SettingsDto[];
  seo?: SEOProps;
};

const MenuFooter = dynamic(() => import('@/components/organisms/MobileMenu/menuFooter'), {
  ssr:false
})

const NavMenu = dynamic(
  () => import('@/components/organisms/MobileMenu/navMenu'),
  {
    ssr: false,
  },
);

const Socials = dynamic(() => import('@/components/organisms/Socials'), {
  ssr: false,
});

const LayoutMenu = dynamic(() => import('@/components/organisms/layout/LayoutMenu'), {
  ssr: false,
});

export default function Layout({
  children,
  className,
  menu,
  settings,
  seo,
}: Props) {

  return (
    <>
      <DefaultSeo settings={settings} seo={seo} />
      <div className={twMerge('relative ', className)}>
        <div id={'main-body'} className={'container mx-auto p-3'}>
          {children}
        </div>
        {
          menu && <LayoutMenu menu={menu} />
        }
      </div>
      {menu && <NavMenu menu={menu} />}
      <Socials />
      <MenuFooter />
    </>
  );
}

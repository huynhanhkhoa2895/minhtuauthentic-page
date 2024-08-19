import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import Menu from '@/components/molecules/header/menu';
import appContext from '@/contexts/appContext';
import { SettingsDto } from '@/dtos/Settings.dto';
import DefaultSeo from '@/components/molecules/seo';
import { SEOProps } from '@/config/type';
import { createPortal } from 'react-dom';
import MenuFooter from '@/components/organisms/MobileMenu/menuFooter';
import NavMenu from '@/components/organisms/MobileMenu/navMenu';

type Props = {
  className?: string;
  children: ReactNode;
  menu?: ResponseMenuDto;
  settings: SettingsDto[];
  seo?: SEOProps;
};
export default function Layout({
  children,
  className,
  menu,
  settings,
  seo,
}: Props) {
  const appCtx = useContext(appContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const refMenuContain = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (ref.current) {
      const { top, left } = ref.current.getBoundingClientRect();
      setPosition({ top, left });
    }

    const handleScroll = () => {
      if (refMenuContain.current && refMenuContain.current?.style) {
        if (window.scrollY > 25) {
          refMenuContain.current.style.position = 'fixed';
          refMenuContain.current.style.top = 108 + 'px';
        } else {
          refMenuContain.current.style.position = '';
          refMenuContain.current.style.top = 12 + 'px';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <>
      <DefaultSeo settings={settings} seo={seo} />
      <div className={twMerge('relative ', className)}>
        <div ref={ref} id={'main-body'} className={'container mx-auto p-3'}>
          {children}
        </div>
        {menu && (
          <div
            className={twMerge(
              'absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.53)] transition-all duration-500',
              appCtx?.isOpenMenu
                ? 'opacity-100 visible z-50'
                : 'opacity-0 invisible z-0',
            )}
          >
            <div className={'relative'}>
              <div
                ref={refMenuContain}
                className={'absolute'}
                style={{
                  top: 12,
                  left: position?.left || 0,
                  zIndex: 1,
                }}
              >
                <Menu
                  menu={menu}
                  className={twMerge(
                    'transition-all duration-500',
                    appCtx?.isOpenMenu
                      ? 'opacity-100 visible z-50'
                      : 'opacity-0 invisible z-0',
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {
        menu && <NavMenu menu={menu} />
      }
    </>
  );
}

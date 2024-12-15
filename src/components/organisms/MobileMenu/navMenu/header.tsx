import Image from 'next/image';
const InputSearch = dynamic(
  () => import('@/components/molecules/header/inputSearch'),
  {
    ssr: false,
  },
);
import HeaderCart from '@/components/icons/header-cart';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useRef } from 'react';
import IconBars from '@/components/icons/bars';
import { BarsOutlined } from '@ant-design/icons';
import AppContext from '@/contexts/appContext';
import { SettingsDto } from '@/dtos/Settings.dto';
import { SETTING_KEY } from '@/config/enum';
import LogoComponent from '@/components/atoms/logo';
import { LogoProps } from '@/config/type';
type Props = {
  className?: string;
  isMobile?: boolean;
  settings?: SettingsDto[];
};
export default function NavMenuHeader({
  className,
  isMobile,
  settings,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const refTimeOut = useRef<NodeJS.Timeout | null>(null);
  const appCtx = useContext(AppContext);
  useEffect(() => {
    let lastScrollY = 0;
    let isScrollDown = false;
    function onScroll() {
      if (
        typeof window !== 'undefined' &&
        ref.current &&
        ref?.current?.classList
      ) {
        const currentScrollY = window.scrollY;
        if (refTimeOut.current) {
          clearTimeout(refTimeOut.current as NodeJS.Timeout);
        }

        if (currentScrollY > lastScrollY) {
          isScrollDown = true;
        } else if (currentScrollY < lastScrollY) {
          isScrollDown = false;
        }

        if (!isScrollDown || currentScrollY < 100) {
          ref.current.classList.remove('invisible');
          ref.current.classList.remove('opacity-0');
          ref.current.classList.add('visible');
          ref.current.classList.add('opacity-100');
          // ref.current.style.transform = 'translateY(0)';
        } else {
          ref.current.classList.add('invisible');
          ref.current.classList.add('opacity-0');
          ref.current.classList.remove('visible');
          ref.current.classList.remove('opacity-100');
          // ref.current.style.height = 'translateY(-100%)';
        }

        lastScrollY = currentScrollY;
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      refTimeOut.current && clearTimeout(refTimeOut.current as NodeJS.Timeout);
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);
  const renderItem = () => {
    return (
      <>
        <button
          type={'button'}
          className={'w-[40px] lg:hidden'}
          onClick={() => {
            appCtx?.setIsOpenNavMenu &&
              appCtx.setIsOpenNavMenu(!appCtx?.isOpenNavMenu);
          }}
        >
          <IconBars className={'w-[40px] h-[40px] text-white'} />
        </button>
        <Link className={'grow lg:shrink-0'} href={'/'}>
          {settings && (
            <LogoComponent
              position={LogoProps.HEADER}
              settings={settings}
              className={'object-contain h-[45px] w-auto m-auto'}
            />
          )}
        </Link>
        {/*<InputSearch isMobile={true} />*/}

        <HeaderCart
          className={'w-[40px] h-[40px] shrink-0'}
          classNumber={'text-white'}
        />
      </>
    );
  };
  return (
    <div className={'relative'}>
      <div className={twMerge('flex p-3 gap-2 items-center', className)}>
        {renderItem()}
      </div>
      {isMobile && (
        <div
          className={
            'lg:hidden p-3 absolute top-[65px] bg-primary left-0 w-screen transition-all duration-300'
          }
          ref={ref}
        >
          <InputSearch classNameInput={'top-[120px]'} isMobile={true} />
        </div>
      )}
    </div>
  );
}

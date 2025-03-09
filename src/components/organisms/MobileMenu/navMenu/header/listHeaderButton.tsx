import IconBars from '@/components/icons/bars';
import Link from 'next/link';
import LogoComponent from '@/components/atoms/logo';
import { LogoProps } from '@/config/type';
import HeaderCart from '@/components/icons/header-cart';
import { useContext } from 'react';
import appContext from '@/contexts/appContext';
import { SettingsDto } from '@/dtos/Settings.dto';
import { twMerge } from 'tailwind-merge';

type Props = {
  settings?: SettingsDto[];
  className?: string;
};

export default function NavbarMenuListButton({ settings, className }: Props) {
  const appCtx = useContext(appContext);
  return (
    <div className={twMerge('flex p-3 gap-2 items-center', className)}>
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
      <HeaderCart
        className={'w-[40px] h-[40px] shrink-0'}
        classNumber={'text-white'}
      />
    </div>
  );
}

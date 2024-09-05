import React, {
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import appContext from '@/contexts/appContext';
import { twMerge } from 'tailwind-merge';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import useMenu from '@/hooks/useMenu';
import { MenuDisplay, POPUP_TYPE } from '@/config/type';
import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import Image from 'next/image';
import NavMenuHeader from '@/components/organisms/MobileMenu/navMenu/header';
import NavMenuContent from '@/components/organisms/MobileMenu/navMenu/content';
import Loading from '@/components/atoms/loading';
type Props = {
  menu: ResponseMenuDto;
  className?: string;
};
export default function NavMenu({ menu, className }: Props) {
  const appCtx = useContext(appContext);
  const { menuDisplay } = useMenu(menu);
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemDebounceMenu, setItemDebounceMenu] = useState<MenuDisplay | null>(
    null,
  );
  const [itemMenu, setItemMenu] = useState<MenuDisplay | null>(null);
  useEffect(() => {
    if (menuDisplay.length > 0 && !itemMenu) {
      const _item = menuDisplay.filter(
        (item) => item.type === POPUP_TYPE.CATEGORY,
      )[0];
      setItemDebounceMenu(_item);
    }
  }, [menuDisplay, itemMenu]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setItemMenu(itemDebounceMenu);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [itemDebounceMenu]);

  return (
    <div
      ref={ref}
      className={twMerge(
        'fixed inset-0 z-[1000] w-screen bg-primary text-white h-screen transition-all duration-300',
        appCtx?.isOpenNavMenu
          ? 'opacity-100 visible translate-x-0'
          : 'opacity-0 invisible -translate-x-full',
        className,
      )}
    >
      <NavMenuHeader />
      <div className={'grid grid-cols-3 w-full h-full'}>
        <div className={'h-[calc(100%-63px-61px)] overflow-auto'}>
          {menuDisplay.map((item, index) => {
            const _item = item.data as StaticComponentDto;
            const image = _item?.category?.images?.[0]?.image;
            if (!_item?.category?.name) return null;
            return (
              <div
                key={index}
                className={
                  'flex flex-col gap-1 p-2 border-b border-b-white items-center text-center'
                }
                onClick={() => {
                  setLoading(true);
                  setItemDebounceMenu(item);
                }}
              >
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.alt || ''}
                    width={35}
                    height={35}
                  />
                )}
                <span>{_item?.category?.name || ''}</span>
              </div>
            );
          })}
        </div>
        <div
          className={
            'pb-[calc(100%-63px-61px)] overflow-auto bg-white text-black w-full col-span-2'
          }
        >
          {loading ? (
            <div className={'flex items-center justify-center w-full h-full'}>
              <Loading />
            </div>
          ) : (
            <>
              {itemMenu && menu?.filterSetting && (
                <NavMenuContent
                  menu={itemMenu}
                  brands={menu?.brands || []}
                  setting={menu?.filterSetting}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

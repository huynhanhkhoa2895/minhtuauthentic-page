import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import Link from 'next/link';
import IconCheveronRight from '@/components/icons/cheveron-right';
import Image from 'next/image';
import MenuPopup from '@/components/molecules/header/menu/menuPopup';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { generateSlugToHref } from '@/utils';
import { MenuDisplay,  POPUP_TYPE, PopupDisplay } from '@/config/type';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import useMenu from '@/hooks/useMenu';

const Menu = ({
  menu,
  className,
}: {
  menu: ResponseMenuDto;
  className?: string;
}) => {
  const [dataDisplayPopup, setDataDisplayPopup] = useState<PopupDisplay>({
    display: false,
    data: [],
  });
  const [menuCategoryChildrenPosition, setMenuCategoryChildrenPosition] =
    useState<{ top: number; left: number; height: number }>({
      top: 0,
      left: 0,
      height: 0,
    });
  const { menuDisplay } = useMenu(menu);
  const refTimeout = useRef<any>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    setMenuCategoryChildrenPosition({
      top: 0,
      left: 20,
      height: ref.current?.clientHeight || 0,
    });
  }, [isReady]);

  const renderMenuItem = (item: MenuDisplay) => {
    const obj: Record<string, () => ReactNode> = {
      [POPUP_TYPE.CATEGORY]: () => {
        const _item = item.data as StaticComponentDto;
        const image = _item?.category?.images?.[0]?.image;
        return (
          <Link key={_item?.category?.id} href={generateSlugToHref(_item?.category?.slugs?.slug)}>
            <div className={'flex items-center justify-between w-full'}>
              <div className={'flex gap-2 items-center'}>
                {image && (
                  <Image
                    src={image.url || ''}
                    alt={_item?.category?.name || image.alt || ''}
                    className={'w-[20px] h-[20px]'}
                    width={image.width || 25}
                    height={image.height || 25}
                  />
                )}
                <span className={'capitalize font-bold'}>
                  {_item?.category?.name}
                </span>
              </div>
              <div>
                <IconCheveronRight className={'w-[20px] h-[20px]'} />
              </div>
            </div>
          </Link>
        );
      },
      [POPUP_TYPE.PRODUCT]: () => {
        return (
          <Link className={'capitalize font-bold'} href={'/san-pham'}>
            Sản phẩm
          </Link>
        );
      },
      [POPUP_TYPE.NEWS]: () => {
        return (
          <Link className={'capitalize font-bold'} href={'/tin-tuc'}>
            Tin tức
          </Link>
        );
      },
      [POPUP_TYPE.BRAND]: () => {
        return (
          <div className={'flex justify-between'}>
            <Link className={'capitalize font-bold'} href={'/thuong-hieu'}>
              Thương hiệu
            </Link>
            <IconCheveronRight className={'w-[20px] h-[20px]'} />
          </div>
        );
      },
    };
    return obj[item.type || '']();
  };

  const handleMouseEnter = (item: MenuDisplay) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    switch (item.type) {
      case POPUP_TYPE.CATEGORY:
        const _item = item?.data as StaticComponentDto;
        setDataDisplayPopup({
          type: item.type,
          display: true,
          data: _item?.category?.children || [],
          title: _item?.category?.name,
        });
        break;
      case POPUP_TYPE.BRAND:
        setDataDisplayPopup({
          type: item.type,
          display: true,
          data: item.data,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={twMerge(
          'hidden lg:block w-[220px] rounded-[10px] shadow-custom py-1 shrink-1 z-[1] bg-white overflow-auto relative',
          className,
          isReady ? 'h-[380px]' : 'h-auto',
        )}
      >
        <div className={'container mx-auto '}>
          <ul className={'flex flex-col '}>
            {menuDisplay?.map((item, index) => {
              return (
                <li
                  key={index}
                  className={'flex-1 py-1 hover:bg-[#f3f4f6] px-[10px]'}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={() => {
                    refTimeout.current = setTimeout(() => {
                      setDataDisplayPopup({
                        type: '',
                        display: false,
                        data: [],
                      });
                    }, 50);
                  }}
                >
                  {renderMenuItem(item)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {dataDisplayPopup.display && (
        <div
          className={'absolute'}
          style={{
            top: `${menuCategoryChildrenPosition.top}px`,
            left: `${menuCategoryChildrenPosition.left}px`,
            height: `${menuCategoryChildrenPosition.height}px`,
          }}
        >
          {isReady && (
            <>
              <MenuPopup
                menu={menu}
                data={dataDisplayPopup}
                onMouseEnter={() => {
                  if (refTimeout.current) {
                    clearTimeout(refTimeout.current);
                  }
                }}
                onMouseLeave={() => {
                  refTimeout.current = setTimeout(() => {
                    setDataDisplayPopup({
                      type: '',
                      display: false,
                      data: [],
                    });
                  }, 50);
                }}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
export default Menu;

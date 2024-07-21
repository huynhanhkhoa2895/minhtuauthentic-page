import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import Link from 'next/link';
import IconCheveronRight from '@/components/icons/cheveron-right';
import Image from 'next/image';
import MenuPopup from '@/components/molecules/header/menu/menuPopup';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { generateSlugToHref } from '@/utils';
import { MenuDisplay, POPUP_TYPE, PopupDisplay } from '@/config/type';

const Menu = ({
  homeMenu,
  className,
  isPopup,
}: {
  homeMenu?: StaticComponentDto[];
  className?: string;
  isPopup?: boolean;
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
  const [_data, setData] = useState<MenuDisplay[]>([]);
  const refTimeout = useRef<any>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    setData([
      ...[
        {
          type: POPUP_TYPE.PRODUCT,
          data: [],
        },
      ],
      ...(homeMenu || []).map((item) => ({
        type: POPUP_TYPE.CATEGORY,
        data: item,
        isHaveChildren:
          item?.category?.children?.length &&
          item?.category?.children?.length > 0
            ? true
            : false,
      })),
    ]);
  }, []);

  useEffect(() => {
    if (!isPopup) {
      setMenuCategoryChildrenPosition({
        top: 0,
        left: 0,
        height: ref.current?.clientHeight || 0,
      });
      localStorage.setItem(
        'menuPosition',
        JSON.stringify({
          height: ref.current?.clientHeight,
          top: 0,
          left: ref.current?.getBoundingClientRect().left,
        }),
      );
    } else {
      const menuPosition = JSON.parse(
        localStorage.getItem('menuPosition') || '{}',
      );
      setMenuCategoryChildrenPosition({
        top: 0,
        left: menuPosition.left,
        height: menuPosition.height,
      });
      if (ref.current) {
        if (menuPosition.height) {
          ref.current.style.height = `${menuPosition.height}px`;
          ref.current.style.top = `0px`;
          ref.current.style.left = `${menuPosition.left}px`;
        }
      }
    }
  }, [_data]);

  const renderMenuItem = (item: MenuDisplay) => {
    const obj: Record<string, () => ReactNode> = {
      [POPUP_TYPE.CATEGORY]: () => {
        const _item = item.data as StaticComponentDto;
        const image = _item?.category?.images?.[0]?.image;
        return (
          <Link href={generateSlugToHref(_item?.category?.slugs?.slug)}>
            <div className={'flex items-center justify-between w-full'}>
              <div className={'flex gap-2 items-center'}>
                {image && (
                  <Image
                    src={image.url || ''}
                    alt={_item?.category?.name || image.alt || ''}
                    className={'w-[25px] h-[25px]'}
                    width={image.width || 25}
                    height={image.height || 25}
                  />
                )}
                <span className={'capitalize font-bold'}>
                  {_item?.category?.name}
                </span>
              </div>
              <div>
                {_item?.category?.children?.length ? (
                  <IconCheveronRight className={'w-[20px] h-[20px]'} />
                ) : (
                  ''
                )}
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
          display: _item?.category?.children?.length ? true : false,
          data: _item?.category?.children || [],
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={'relative'}>
      <div
        ref={ref}
        className={twMerge(
          'w-[180px] rounded-[10px] shadow-custom py-1 shrink-1 z-[1] bg-white overflow-hidden relative',
          className,
        )}
      >
        <div className={'container mx-auto '}>
          <ul className={'flex flex-col '}>
            {_data?.map((item, index) => {
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
                    }, 500);
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
                  }, 500);
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Menu;

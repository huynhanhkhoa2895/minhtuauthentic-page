import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import Link from 'next/link';
import IconCheveronRight from '@/components/icons/cheveron-right';
import Image from 'next/image';
import MenuChildren from '@/components/molecules/header/menu/menuChildren';
import { useEffect, useRef, useState } from 'react';
import { CategoryDto } from '@/dtos/Category.dto';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const Menu = ({
  data,
  className,
  isPopup,
}: {
  data?: StaticComponentDto[];
  className?: string;
  isPopup?: boolean;
}) => {
  const [menuCategoryChildrens, setMenuCategoryChildrens] = useState<
    CategoryDto[]
  >([]);
  const [menuCategoryChildrenPosition, setMenuCategoryChildrenPosition] =
    useState<{ top: number; left: number; height: number }>({
      top: 0,
      left: 0,
      height: 0,
    });
  const [_data, setData] = useState<StaticComponentDto[]>(data || []);
  const refTimeout = useRef<any>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    if (data) {
      localStorage.setItem('menu', JSON.stringify(data));
    }
    if (!data && _data.length === 0) {
      const menu = localStorage.getItem('menu');
      if (menu) {
        setData(JSON.parse(menu));
      }
    }
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

  return (
    <div className={'relative'}>
      <div
        ref={ref}
        className={twMerge(
          'w-[220px] rounded-[10px] shadow-custom py-1 shrink-1 z-[1] bg-white overflow-hidden relative',
          className,
        )}
      >
        <div className={'container mx-auto '}>
          <ul className={'flex flex-col '}>
            {_data?.map((item, index) => {
              const image = item?.category?.images?.[0]?.image;
              return (
                <li
                  key={index}
                  className={'flex-1 py-1 hover:bg-[#f3f4f6] px-[10px]'}
                  onMouseEnter={() => {
                    if (refTimeout.current) {
                      clearTimeout(refTimeout.current);
                    }
                    item?.category?.children &&
                      setMenuCategoryChildrens(item?.category?.children || []);
                  }}
                  onMouseLeave={() => {
                    refTimeout.current = setTimeout(() => {
                      setMenuCategoryChildrens([]);
                    }, 500);
                  }}
                >
                  <Link href={item?.category?.slugs?.slug || ''}>
                    <div className={'flex items-center justify-between w-full'}>
                      <div className={'flex gap-2 items-center'}>
                        {image && (
                          <Image
                            src={image.url || ''}
                            alt={item?.category?.name || image.alt || ''}
                            className={'w-[25px] h-[25px]'}
                            width={image.width || 25}
                            height={image.height || 25}
                          />
                        )}
                        <span className={'capitalize font-bold'}>
                          {item?.category?.name}
                        </span>
                      </div>
                      <div>
                        {item?.category?.children?.length ? (
                          <IconCheveronRight className={'w-[20px] h-[20px]'} />
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

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
            <MenuChildren
              categories={menuCategoryChildrens}
              onMouseEnter={() => {
                if (refTimeout.current) {
                  clearTimeout(refTimeout.current);
                }
              }}
              onMouseLeave={() => {
                refTimeout.current = setTimeout(() => {
                  setMenuCategoryChildrens([]);
                }, 500);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Menu;

import Link from 'next/link';
import { POPUP_TYPE, PopupDisplay } from '@/config/type';
import { CategoryDto } from '@/dtos/Category.dto';
import { Fragment, ReactNode } from 'react';
import { chunk } from 'lodash';
import { BrandDto } from '@/dtos/Brand.dto';
import MenuBrand from '@/components/molecules/header/menu/menuBrand';

const MenuPopup = ({
  data,
  onMouseEnter,
  onMouseLeave,
}: {
  data: PopupDisplay;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const renderItem = () => {
    const obj: Record<string, () => ReactNode> = {
      [POPUP_TYPE.CATEGORY]: () => {
        return (
          <ul>
            {Array.isArray(data?.data) &&
              (data?.data || []).map((item: unknown, index: number) => {
                const _item = item as CategoryDto;
                return (
                  <li key={'MenuPopup-' + index}>
                    <Link href={_item?.slugs?.slug || ''}>{_item.name}</Link>
                  </li>
                );
              })}
          </ul>
        );
      },
      [POPUP_TYPE.PRODUCT]: () => {
        return <div className={'flex'}></div>;
      },
      [POPUP_TYPE.BRAND]: () => {
        return <MenuBrand brands={(data?.data as BrandDto[]) || []} />;
      },
    };
    return obj[data.type || '']();
  };
  return (
    <>
      {data?.display && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={
            'absolute max-lg:hidden h-full lg:w-[53vw] bg-white z-[20] top-0 left-[200px] ml-2 p-2 overflow-auto'
          }
        >
          {renderItem()}
        </div>
      )}
    </>
  );
};
export default MenuPopup;

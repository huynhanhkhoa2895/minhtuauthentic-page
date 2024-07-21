import Link from 'next/link';
import { POPUP_TYPE, PopupDisplay } from '@/config/type';
import { CategoryDto } from '@/dtos/Category.dto';
import { Fragment, ReactNode } from 'react';

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
        return <div className={'flex'}></div>;
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
            'absolute h-full w-[500px] bg-white z-[20] top-0 left-[200px] ml-2 p-2'
          }
        >
          {renderItem()}
        </div>
      )}
    </>
  );
};
export default MenuPopup;

import React, { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CategoryFilterContext from '@/contexts/categoryFilterContext';
import { twMerge } from 'tailwind-merge';
import SettingFilter from '@/components/organisms/categoryFilter/settingFilter';
import { ProductFilterOptionDto } from '@/dtos/ProductFilterSettingOption/ProductFilterOption.dto';

type Props = {
  settings?: ProductFilterOptionDto;
};
export default function NavFilterMobile({ settings }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const ctx = useContext(CategoryFilterContext);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        ctx?.setIsOpenFilter && ctx.setIsOpenFilter(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return (
    <>
      {createPortal(
        <div
          ref={ref}
          className={twMerge(
            'fixed right-0 top-0 w-[80vw] h-screen bg-white pt-[67px] pb-[63px] overflow-auto z-[50] shadow-custom transition-all duration-300',
            ctx?.isOpenFilter
              ? 'translate-x-0 opacity-100 visible'
              : 'opacity-0 invisible translate-x-full',
          )}
        >
          {settings && (
            <div className={'h-full overflow-auto'}>
              <SettingFilter settings={settings} isNav={true} />
            </div>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}

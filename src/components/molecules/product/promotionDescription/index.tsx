import { twMerge } from 'tailwind-merge';
import { useContext, useState } from 'react';
import AppContext from '@/contexts/appContext';
import { SETTING_KEY } from '@/config/enum';
import PromotionDescriptionCoupons from '@/components/molecules/product/promotionDescription/coupons';
import { SettingsDto } from '@/dtos/Settings.dto';

type Props = {
  className?: string;
  variant_id?: number;
  settings?: SettingsDto[];
};
export default function PromotionDescription({
  className,
  variant_id,
  settings,
}: Props) {
  const contents = ['Ưu đãi thêm', 'Mã giảm giá'];
  const [indexDisplay, setIndexDisplay] = useState(0);

  const onChange = (index: number) => {
    setIndexDisplay(index);
  };

  const renderButtonHeader = (index: number, text: string) => {
    const active = indexDisplay === index;
    let classBorderLeftRight = '';
    if (active) {
      if (index === 0) {
        classBorderLeftRight = 'border-r border-r-primary';
      } else {
        classBorderLeftRight = 'border-l border-l-primary';
      }
    }
    return (
      <button
        key={index}
        className={twMerge(
          'flex-1 bg-gray-100 p-3 border-b border-b-primary',
          classBorderLeftRight,
          active && 'border-t-[6px] border-t-primary bg-white border-b-white',
        )}
        onClick={() => onChange(index)}
      >
        <span className={'font-[700] lg:font-bold'}>{text}</span>
      </button>
    );
  };

  function renderContent(index: number) {
    const setting = (settings || [])?.find(
      (item) =>
        item.key === SETTING_KEY.PRODUCT_DETAIL_OFFER_SPECIAL_CONTENT.KEY,
    );
    switch (index) {
      case 0:
        return (
          <div
            className={'container-html html-description'}
            dangerouslySetInnerHTML={{
              __html: setting?.value?.content || '',
            }}
          />
        );
      case 1:
        return (
          variant_id && <PromotionDescriptionCoupons variant_id={variant_id} />
        );
      default:
        return '';
    }
  }

  return (
    <div
      className={twMerge(
        'rounded-[10px] border border-primary overflow-hidden',
        className,
      )}
    >
      <div className={'flex'}>
        {contents.map((item, index) => {
          return renderButtonHeader(index, item);
        })}
      </div>
      <div className={'relative w-full h-[500px] overflow-auto'}>
        {contents.map((item, index) => {
          const active = index === indexDisplay;
          return (
            <div
              key={index}
              className={twMerge(
                'p-3 opacity-0 invisible transition-opacity duration-500 absolute top-0 left-0 w-full h-full',
                active && 'opacity-100 visible',
              )}
            >
              {renderContent(index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { twMerge } from 'tailwind-merge';
import { useContext, useState } from 'react';
import AppContext from '@/contexts/appContext';
import { SETTING_KEY } from '@/config/enum';

type Props = {
  className?: string;
};
export default function PromotionDescription({ className }: Props) {
  const contents = ['Ưu đãi thêm', 'Mã giảm giá'];
  const [indexDisplay, setIndexDisplay] = useState(0);
  const ctx = useContext(AppContext);
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
        <span className={'font-bold'}>{text}</span>
      </button>
    );
  };

  function renderContent(index: number) {
    switch (index) {
      case 0:
        return (
          <div
            dangerouslySetInnerHTML={{
              __html:
                ctx?.settings?.[
                  SETTING_KEY.PRODUCT_DETAIL_OFFER_SPECIAL_CONTENT.KEY
                ] || '',
            }}
          />
        );
      case 1:
        return '';
      case 2:
        return '';
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
      {contents.map((item, index) => {
        const active = index === indexDisplay;
        return (
          <div
            key={index}
            className={twMerge(
              'p-3 opacity-0 invisible transition-opacity duration-500',
              active && 'opacity-100 visible',
            )}
          >
            {renderContent(index)}
          </div>
        );
      })}
    </div>
  );
}

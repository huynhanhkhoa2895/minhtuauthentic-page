import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

type Props = {
  className?: string;
};
export default function PromotionDescription({ className }: Props) {
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

  return (
    <div
      className={twMerge(
        'rounded-[10px] border border-primary overflow-hidden',
        className,
      )}
    >
      <div className={'flex'}>
        {['Ưu đãi thêm', 'Mã giảm giá'].map((item, index) => {
          return renderButtonHeader(index, item);
        })}
      </div>
      <div className={'p-3'}>Content</div>
    </div>
  );
}

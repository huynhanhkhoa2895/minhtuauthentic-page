import { ProductDto } from '@/dtos/Product.dto';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  product: ProductDto;
};
export default function ProductDescription({ product }: Props) {
  const [indexActive, setIndexActive] = useState<number>(0);
  const [content, setContent] = useState<string[]>([
    'Mô tả sản phẩm',
    'Hướng dẫn mua hàng & thanh toán',
    'Chính sách đổi trả & bảo hành',
  ]);
  function renderButton(item: string, index: number) {
    const active = index === indexActive;
    return (
      <button
        className={twMerge(
          'bg-primaryGrey rounded-[10px] px-3 py-2 text-sm font-semibold',
          active ? 'bg-primary text-white' : 'bg-white text-black',
        )}
        type={'button'}
        onClick={() => setIndexActive(index)}
      >
        {item}
      </button>
    );
  }
  function renderContent(index: number) {
    switch (index) {
      case 0:
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: product?.product_property?.content || '',
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
    <div className={'rounded-[10px] shadow-custom bg-white'}>
      <div
        className={
          'flex items-center gap-3 pb-3 border-b-gray-300 border-b p-3'
        }
      >
        {content.map((item: string, index: number) => {
          return renderButton(item, index);
        })}
      </div>
      {content.map((item: string, index: number) => {
        const active = index === indexActive;
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

import { ProductDto } from '@/dtos/Product.dto';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  product: ProductDto;
};
export default function ProductDescription({ product }: Props) {
  const [indexActive, setIndexActive] = useState<number>(0);
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

  function renderContent() {
    switch (indexActive) {
      case 0:
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: product?.product_property?.description || '',
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
    <>
      <div
        className={'flex items-center gap-3 pb-3 border-b-gray-300 border-b'}
      >
        {[
          'Mô tả sản phẩm',
          'Hướng dẫn mua hàng & thanh toán',
          'Chính sách đổi trả & bảo hành',
        ].map((item: string, index: number) => {
          return renderButton(item, index);
        })}
      </div>
      <div className={'p-3'}>{renderContent()}</div>
    </>
  );
}

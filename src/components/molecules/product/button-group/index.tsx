import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons/lib/icons';
import { twMerge } from 'tailwind-merge';
import { VariantDto } from '@/dtos/Variant.dto';
import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import { ProductDto } from '@/dtos/Product.dto';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';

const ProductCardButtonGroup = ({
  product,
  variant,
  className,
  addText,
}: {
  product: ProductDto;
  variant: VariantDto;
  className: string;
  addText?: string;
}) => {
  const order = useContext(OrderContext);
  return (
    <div className={twMerge('flex gap-2', className)}>
      <Link
        href={generateSlugToHref(product?.slugs?.slug)}
        className={
          'block bg-primary rounded-[8px] text-white p-[6px_5px] lg:p-[8px_10px] flex items-center justify-center'
        }
      >
        <EyeOutlined />
      </Link>
      <button
        type={'button'}
        className={
          'block grow bg-primary text-white rounded-[8px] p-[6px_5px] lg:p-[8px_10px] max-lg:text-sm'
        }
        onClick={() => {
          order?.addCart && order.addCart(variant);
        }}
      >
        <ShoppingCartOutlined />
        <span className={'ml-2'}>{addText || 'Thêm giỏ hàng'}</span>
      </button>
    </div>
  );
};
export default ProductCardButtonGroup;

import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons/lib/icons';
import { twMerge } from 'tailwind-merge';
import { VariantDto } from '@/dtos/Variant.dto';
import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import { ProductDto } from '@/dtos/Product.dto';

const ProductCardButtonGroup = ({
  product,
  variant,
  className,
}: {
  product: ProductDto;
  variant: VariantDto;
  className: string;
}) => {
  const order = useContext(OrderContext);
  return (
    <div className={twMerge('flex gap-2', className)}>
      <button
        className={
          'block bg-primary rounded-[8px] text-white p-[8px_10px] flex items-center justify-center'
        }
      >
        <EyeOutlined />
      </button>
      <button
        type={'button'}
        className={
          'block grow bg-primary text-white rounded-[8px] p-[8px_10px]'
        }
        onClick={() => {
          order?.addCart && order.addCart(product.name || '', variant);
        }}
      >
        <ShoppingCartOutlined />
        <span
          className={'ml-2'}
        >
          Thêm vào giỏ hàng
        </span>
      </button>
    </div>
  );
};
export default ProductCardButtonGroup;

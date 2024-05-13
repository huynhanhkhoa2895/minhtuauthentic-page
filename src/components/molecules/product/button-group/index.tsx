import { ProductDto } from '@/dtos/Product.dto';
import { Button } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons/lib/icons';
import { twMerge } from 'tailwind-merge';

const ProductCardButtonGroup = ({
  product,
  className,
}: {
  product: ProductDto;
  className: string;
}) => {
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
        className={
          'block grow bg-primary text-white rounded-[8px] p-[8px_10px]'
        }
      >
        <ShoppingCartOutlined />
        <span className={'ml-2'}>Thêm vào giỏ hang</span>
      </button>
    </div>
  );
};
export default ProductCardButtonGroup;

import { ProductDto } from '@/dtos/Product.dto';
import ProductPrice from '@/components/molecules/product/price';
import ProductCardImage from '@/components/molecules/product/image/productCardImage';
import Link from 'next/link';
import ProductCardButtonGroup from '@/components/molecules/product/button-group';
import Badge from '@/components/atoms/badge';
import { twMerge } from 'tailwind-merge';
import { VariantDto } from '@/dtos/Variant.dto';
import { calculatePricePercent, truncateString } from '@/utils';

const ProductCard = ({ product }: { product: ProductDto }) => {
  const variant: VariantDto | undefined = product?.variants?.[0];
  return (
    <div
      className={twMerge(
        'bg-white rounded-[10px] border-[2px] border-[#e4e4e4] py-2 transition-colors duration-300 hover:border-primary hover:shadow-md flex flex-col justify-between',
      )}
    >
      <div>
        <div className={'flex items-center justify-end gap-2 px-2'}>
          <Badge className={'bg-green'}>
            Giảm {calculatePricePercent(variant)}%
          </Badge>
          <Badge className={'bg-price'}>Trả góp 0%</Badge>
        </div>
        <ProductCardImage product={product} />
        <h5 className={'font-bold px-2 h-[70px]'}>
          <Link className={'block'} href={`/${product?.slugs?.slug}`}>
            {product.name}
          </Link>
        </h5>
        {product?.variants && (
          <ProductPrice
            className={'px-2'}
            variant={
              product?.variants?.find((item) => item.is_default) ||
              product?.variants[0]
            }
          />
        )}
      </div>
      <ProductCardButtonGroup className={'mt-[60px] px-2'} product={product} />
    </div>
  );
};
export default ProductCard;

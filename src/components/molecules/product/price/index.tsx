import { ProductDto } from '@/dtos/Product.dto';
import { twMerge } from 'tailwind-merge';
import { formatMoney } from '@/utils';
import { VariantDto } from '@/dtos/Variant.dto';

const ProductPrice = ({
  product,
  className,
}: {
  product?: ProductDto;
  className?: string;
}) => {
  const variant: VariantDto | undefined = product?.variants?.find(
    (item: VariantDto) => item.is_default,
  ) || product?.variants?.[0];
  return (
    <>
      {variant && (
        <p className={twMerge('flex items-center gap-2', className)}>
          <span className={'text-[16px] font-semibold text-price'}>
            {variant.regular_price &&
              formatMoney(variant.regular_price, 0, '.', ',')}
          </span>
          <span className={'text-[12px] text-textSecondary line-through'}>
            {variant.price && formatMoney(variant.price, 0, '.', ',')}
          </span>
        </p>
      )}
    </>
  );
};
export default ProductPrice;

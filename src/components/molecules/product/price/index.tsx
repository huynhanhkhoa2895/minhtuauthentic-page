import { ProductDto } from '@/dtos/Product.dto';
import { twMerge } from 'tailwind-merge';
import { formatMoney } from '@/utils';
import { VariantDto } from '@/dtos/Variant.dto';

const ProductPrice = ({
  variant,
  className,
  prefix,
  classNameRegularPrice,
  classNamePrefix,
  classNamePrice,
  displayGap,
  classNameGap,
}: {
  variant?: VariantDto;
  className?: string;
  prefix?: string;
  classNameRegularPrice?: string;
  classNamePrice?: string;
  classNamePrefix?: string;
  displayGap?: boolean;
  classNameGap?: string;
}) => {
  return (
    <>
      {variant && (
        <p className={twMerge('flex items-center gap-2', className)}>
          {prefix && <span className={classNamePrefix}>{prefix}</span>}
          <span
            className={twMerge(
              'text-[16px] font-semibold text-price',
              classNameRegularPrice,
            )}
          >
            {variant.regular_price &&
              formatMoney(variant.regular_price, 0, '.', ',')}
          </span>
          <span
            className={twMerge(
              'text-[12px] text-textSecondary line-through',
              classNamePrice,
            )}
          >
            {variant.price && formatMoney(variant.price, 0, '.', ',')}
          </span>
          {displayGap && (
            <span className={classNameGap}>
              -
              {Math.round(
                (((variant?.price || 0) - (variant?.regular_price || 0)) /
                  (variant?.price || 1)) *
                  100,
              )}
              %
            </span>
          )}
        </p>
      )}
    </>
  );
};
export default ProductPrice;

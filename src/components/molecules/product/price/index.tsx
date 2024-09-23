import { ProductDto } from '@/dtos/Product.dto';
import { twMerge } from 'tailwind-merge';
import { formatMoney } from '@/utils';
import { VariantDto } from '@/dtos/Variant.dto';
import PriceWithLineThrough from '@/components/atoms/priceWithLineThrough';

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
        <p className={twMerge('flex items-center gap-0.5 lg:gap-2', className)}>
          {prefix && <span className={classNamePrefix}>{prefix}</span>}
          <PriceWithLineThrough
            regularPrice={variant.regular_price}
            price={variant.price}
            classNamePrice={classNamePrice}
            classNameRegularPrice={classNameRegularPrice}
          />
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

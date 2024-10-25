import { twMerge } from 'tailwind-merge';
import { calculatePriceMinus, formatMoney, getPriceWithCoupon } from '@/utils';
import CouponsDto from '@/dtos/Coupons.dto';

export default function PriceWithLineThrough({
  regularPrice,
  price,
  classNameRegularPrice,
  classNamePrice,
  coupons,
}: {
  regularPrice?: number;
  price?: number;
  classNameRegularPrice?: string;
  classNamePrice?: string;
  coupons?: CouponsDto[];
}) {
  return (
    <>
      <span className={'bk-product-price hidden'}>{regularPrice}</span>
      <span
        className={twMerge(
          'text-[16px] lg:text-[18px] font-bold text-price mr-2',
          classNameRegularPrice,
        )}
      >
        {regularPrice && formatMoney(regularPrice, 0, '.', '.')}
      </span>
      <span
        className={twMerge(
          'text-[12px] lg:text-[14px] text-textSecondary line-through',
          classNamePrice,
        )}
      >
        {price && formatMoney(price, 0, '.', '.')}
      </span>
    </>
  );
}

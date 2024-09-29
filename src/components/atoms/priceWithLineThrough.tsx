import { twMerge } from 'tailwind-merge';
import { formatMoney } from '@/utils';

export default function PriceWithLineThrough({
  regularPrice,
  price,
  classNameRegularPrice,
  classNamePrice,
}: {
  regularPrice?: number;
  price?: number;
  classNameRegularPrice?: string;
  classNamePrice?: string;
}) {
  return (
    <>
      <span
        className={twMerge(
          'text-[14px] lg:text-[18px] font-bold text-price mr-2',
          classNameRegularPrice,
        )}
      >
        {regularPrice && formatMoney(regularPrice, 0, '.', '.')}
      </span>
      <span
        className={twMerge(
          'text-[10px] lg:text-[12px] text-textSecondary line-through',
          classNamePrice,
        )}
      >
        {price && formatMoney(price, 0, '.', '.')}
      </span>
    </>
  );
}

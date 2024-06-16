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
          'text-[16px] font-semibold text-price mr-2',
          classNameRegularPrice,
        )}
      >
        {regularPrice && formatMoney(regularPrice, 0, '.', '.')}
      </span>
      <span
        className={twMerge(
          'text-[12px] text-textSecondary line-through',
          classNamePrice,
        )}
      >
        {price && formatMoney(price, 0, '.', '.')}
      </span>
    </>
  );
}

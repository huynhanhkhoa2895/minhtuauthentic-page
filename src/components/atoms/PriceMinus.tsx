import { calculatePriceMinus, formatMoney, promotionName } from '@/utils';
import { Tooltip } from 'antd';
import CouponsDto from '@/dtos/Coupons.dto';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';

type Props = {
  item: OrderItemsDto;
  isDisplayTotal?: boolean;
};

export default function PriceMinus({ item }: Props) {
  return (
    <>
      {(item?.coupons || []).map((coupon: CouponsDto, index: number) => {
        return (
          <Tooltip
            key={index}
            placement="topRight"
            title={promotionName(coupon.promotion)}
          >
            <span className={'text-red-600 text-sm text-right cursor-pointer'}>
              -
              {formatMoney(
                calculatePriceMinus(item?.variant_regular_price || 0, coupon),
              )}
            </span>
          </Tooltip>
        );
      })}
    </>
  );
}

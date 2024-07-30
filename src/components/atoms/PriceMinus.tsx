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
            title={
              coupon?.promotion?.name || coupon?.promotion?.is_system
                ? promotionName(coupon.promotion)
                : 'Mã giảm giá: ' + coupon.code
            }
          >
            <span className={'text-red-600 text-sm text-right cursor-pointer'}>
              -{formatMoney(item.price_minus || 0)}
            </span>
          </Tooltip>
        );
      })}
    </>
  );
}

import { calculatePriceMinus, formatMoney } from '@/utils';
import { Tooltip } from 'antd';
import CouponsDto from '@/dtos/Coupons.dto';
import { PROMOTION_TYPE } from '@/config/enum';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';

type Props = {
  item: OrderItemsDto;
  isDisplayTotal?: boolean;
};

export default function PriceMinus({ item }: Props) {
  const getPromotionName = (coupon: CouponsDto): string => {
    switch (coupon?.promotion?.type) {
      case PROMOTION_TYPE.FLASH_SALE:
        return 'Flash Sale';
      case PROMOTION_TYPE.DEAL_SOCK:
        return 'Deal Sock';
      default:
        return coupon?.promotion?.name || '';
    }
  };
  return (
    <>
      {(item?.coupons || []).map((coupon: CouponsDto, index: number) => {
        return (
          <Tooltip
            key={index}
            placement="topRight"
            title={getPromotionName(coupon)}
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

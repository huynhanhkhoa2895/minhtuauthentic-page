import CouponsDto from '@/dtos/Coupons.dto';
import { formatMoney } from '@/utils';
import { PROMOTION_PRICE_TYPE } from '@/config/enum';
import { Button } from 'antd';

type Props = {
  coupon: CouponsDto;
};
export default function ItemCoupon({ coupon }: Props) {
  return (
    <div className={'p-3 rounded-[10px] border border-gray-200 w-full'}>
      <p className={'font-bold text-xl text-primary'}>
        <span>Giảm </span>
        {coupon?.price_minus_type === PROMOTION_PRICE_TYPE.PRICE
          ? formatMoney(coupon.price_minus_value || 0)
          : coupon.price_minus_value + '%'}
      </p>
      {coupon?.promotion?.description && (
        <div
          dangerouslySetInnerHTML={{ __html: coupon?.promotion?.description }}
        />
      )}
      <div
        className={
          'p-3 bg-[#efefef] rounded-[4px] flex items-center justify-between w-full'
        }
      >
        <span className={'font-bold'}>{coupon.code}</span>
        <Button
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(coupon.code || '');
          }}
        >
          Sao chép
        </Button>
      </div>
    </div>
  );
}

import CouponsDto from '@/dtos/Coupons.dto';
import { formatMoney } from '@/utils';
import { PROMOTION_PRICE_TYPE } from '@/config/enum';
import { Button } from 'antd/es';

type Props = {
  coupon: CouponsDto;
  onClick?: () => void;
};
export default function ItemCoupon({ coupon, onClick }: Props) {
  return (
    <div className={'p-3 rounded-[10px] border border-gray-200 w-full'}>
      <p className={'font-[700] lg:font-bold text-xl text-primary'}>
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
        <span className={'font-[700] lg:font-bold'}>{coupon.code}</span>
        <Button
          type="primary"
          onClick={() => {
            onClick
              ? onClick()
              : navigator.clipboard.writeText(coupon.code || '');
          }}
        >
          {onClick ? 'Áp dụng' : 'Sao chép'}
        </Button>
      </div>
    </div>
  );
}

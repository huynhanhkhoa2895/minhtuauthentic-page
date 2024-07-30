import { useContext, useEffect, useState } from 'react';
import OrderContext from '@/contexts/orderContext';
import { formatMoney } from '@/utils';
import CheckItemCart from '@/components/organisms/checkout/itemCart';
import CouponsDto from '@/dtos/Coupons.dto';
import ItemCoupon from '@/components/atoms/coupons';

export default function ListCart() {
  const order = useContext(OrderContext);
  const [coupons, setCoupons] = useState<CouponsDto[]>([]);
  useEffect(() => {
    fetchCoupon().catch();
  }, []);
  const fetchCoupon = async () => {
    return fetch(`/api/coupons`)
      .then((response) => response.json())
      .then((data: { data: CouponsDto[] }) => {
        console.log('fetchCoupon', data);
        setCoupons(data?.data || []);
      })
      .catch((error) => {});
  };
  const onChange = (value: null | number, index: number) => {
    order?.updateCart && order.updateCart(index, value || 0);
  };
  return (
    <div className={'border-l border-gray-200 px-3'}>
      <h3 className={'text-3xl font-bold'}>Thông tin giỏ hàng</h3>
      <div className={'flex flex-col gap-3 border-b border-gray-200 p-6'}>
        {order?.cart?.map((item, key) => (
          <CheckItemCart
            key={key}
            item={item}
            onChange={(value) => onChange(value, key)}
          />
        ))}
      </div>
      {coupons && coupons.length > 0 && (
        <div
          className={
            'w-full shadow-custom rounded-[10px] border-t border-gray-200 my-3'
          }
        >
          {coupons?.map((coupon, index) => {
            return <ItemCoupon coupon={coupon} key={index} />;
          })}
        </div>
      )}
      <div className={'mt-3 border-t border-gray-200 pt-3'}>
        <div className={'font-semibold flex justify-between items-center'}>
          <span>Tạm tính:</span>
          <span className={'text-primary'}>
            {formatMoney(
              order?.cart?.reduce(
                (total, item) => total + (item.price || 0),
                0,
              ) || 0,
            )}
          </span>
        </div>
        <div className={'font-semibold flex justify-between items-center'}>
          <span>Phí vận chuyển:</span>
          <span className={'text-primary'}>0</span>
        </div>
        <div
          className={'text-xl font-semibold flex justify-between items-center'}
        >
          <span>Tổng tiền:</span>
          <span className={'text-primary'}>
            {formatMoney(
              order?.cart?.reduce(
                (total, item) => total + (item.price || 0),
                0,
              ) || 0,
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

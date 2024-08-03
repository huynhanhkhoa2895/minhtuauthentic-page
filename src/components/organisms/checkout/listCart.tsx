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
        setCoupons(data?.data || []);
      })
      .catch((error) => {});
  };
  const applyCoupon = (coupon: CouponsDto) => {
    order?.applyCoupon && coupon.code && order.applyCoupon(coupon.code);
  };
  const onChange = (value: null | number, index: number) => {
    order?.updateCart && order.updateCart(index, value || 0);
  };
  return (
    <div className={'border-l border-gray-200 px-3'}>
      <h3 className={'text-3xl font-bold'}>Thông tin giỏ hàng</h3>
      <div className={'flex flex-col gap-3 border-b border-gray-200 p-6'}>
        {order?.cart?.items?.map((item, key) => (
          <CheckItemCart
            key={key}
            item={item}
            onChange={(value) => onChange(value, key)}
          />
        ))}
      </div>
      <div className={'mt-3 border-b border-gray-200 py-3'}>
        <div className={'font-semibold flex justify-between items-center'}>
          <span>Tạm tính:</span>
          <span className={'text-primary'}>
            {formatMoney(
              order?.cart?.items?.reduce(
                (total, item) => total + (item.price || 0),
                0,
              ) || 0,
            )}
          </span>
        </div>
        {order?.cart?.coupons?.[0] && (
          <div className={'font-semibold flex justify-between items-center'}>
            <span>Mã giảm giá:</span>
            <span className={'text-primary'}>
              {order?.cart?.coupons?.[0]?.code}
            </span>
          </div>
        )}
        {(order?.cart?.price_minus || 0) > 0 && (
          <div className={'font-semibold flex justify-between items-center'}>
            <span>Số tiền giảm:</span>
            <span className={'text-primary'}>
              {order?.cart?.price_minus &&
                formatMoney(order?.cart?.price_minus || 0)}
            </span>
          </div>
        )}
        <div className={'font-semibold flex justify-between items-center'}>
          <span>Phí vận chuyển:</span>
          <span className={'text-primary'}>0</span>
        </div>
        <div
          className={'text-xl font-semibold flex justify-between items-center'}
        >
          <span>Tổng tiền:</span>
          <span className={'text-primary'}>
            {formatMoney(order?.cart?.total_price || 0)}
          </span>
        </div>
      </div>
      {coupons && coupons.length > 0 && (
        <div className={'w-full  my-3 flex flex-col gap-3'}>
          {coupons?.map((coupon, index) => {
            return (
              <div className={'shadow-custom rounded-[10px]'} key={index}>
                <ItemCoupon
                  coupon={coupon}
                  onClick={() => {
                    applyCoupon(coupon);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

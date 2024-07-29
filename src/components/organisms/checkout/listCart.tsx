import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { formatMoney } from '@/utils';
import { InputNumber, Space, Input, Button } from 'antd';
import PriceOnCart from '@/components/atoms/priceOnCart';
import CheckItemCart from '@/components/organisms/checkout/itemCart';

export default function ListCart() {
  const order = useContext(OrderContext);
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
      <div className={'mt-6'}>
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

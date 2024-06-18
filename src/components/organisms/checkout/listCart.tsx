import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { formatMoney } from '@/utils';
import { InputNumber } from 'antd';

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
          <div key={item.variant_id} className={'flex gap-3'}>
            <div
              className={
                'w-[100px] h-[100px] shrink-0 boder border-gray-200 rounded-[10px] overflow-hidden'
              }
            >
              <ImageWithFallback
                image={item.image}
                className={'w-[100px] h-[100px] object-contain'}
              />
            </div>
            <div>
              <p className={'text-primary font-semibold'}>
                {item.variant_name}
              </p>
              <InputNumber
                min={1}
                value={item.qty}
                onChange={(value) => onChange(value, key)}
              />
            </div>
            <div>
              <span>{formatMoney((item.price || 0) * (item.qty || 0))}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={'mt-6'}>
        <div className={'font-semibold flex justify-between items-center'}>
          <span>Tạm tính:</span>
          <span className={'text-primary'}>
            {formatMoney(
              order?.cart?.reduce(
                (total, item) => total + (item.price || 0) * (item.qty || 0),
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
                (total, item) => total + (item.price || 0) * (item.qty || 0),
                0,
              ) || 0,
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

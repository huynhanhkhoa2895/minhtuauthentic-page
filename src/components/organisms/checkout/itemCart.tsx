import ImageWithFallback from '@/components/atoms/images/ImageWithFallback';
import { Button, Input, InputNumber, Space } from 'antd/es';
import PriceOnCart from '@/components/atoms/priceOnCart';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import { useContext, useState } from 'react';
import OrderContext from '@/contexts/orderContext';
import { toast } from 'react-toastify';
type Props = {
  item: OrderItemsDto;
  onChange: (value: null | number) => void;
};
export default function CheckItemCart({ item, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const orderCtx = useContext(OrderContext);
  const applyCoupon = async () => {
    if (couponCode) {
      setLoading(true);
      if (orderCtx?.applyCoupon) {
        const status = await orderCtx.applyCoupon(couponCode, item.variant_id);
        if (status) {
          setCouponCode('');
          toast.success('Áp dụng mã giảm giá thành công');
        }
      }
      setLoading(false);
    }
  };

  return (
    <div key={item.variant_id} className={'flex gap-3 '}>
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
      <div className={'flex flex-col'}>
        <div className={'flex gap-3'}>
          <div>
            <p className={'text-primary font-semibold'}>{item.variant_name}</p>
            {item?.variant_configurations?.map((config, index) => {
              return (
                <p key={index} className={'text-sm'}>
                  ({config.name}: {config.value})
                </p>
              );
            })}
            <InputNumber
              className={'mt-3'}
              min={1}
              value={item.qty}
              onChange={(value) => onChange(value)}
            />
          </div>
          <PriceOnCart item={item} isDisplayTotal={true} />
        </div>
      </div>
    </div>
  );
}

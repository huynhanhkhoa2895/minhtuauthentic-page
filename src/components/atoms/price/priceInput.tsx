import { InputNumber } from 'antd';
import { useContext, useEffect, useState } from 'react';
import OrderContext from '@/contexts/orderContext';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';

type Props = {
  qty: number;
  item: OrderItemsDto;
  className?: string;
};

export default function PriceInput({ qty, item, className }: Props) {
  const orderCtx = useContext(OrderContext);
  const index =
    (orderCtx?.cart?.items || []).findIndex(
      (cartItem: OrderItemsDto) => cartItem.variant_id === item.variant_id,
    ) || 0;
  const [_qty, setQty] = useState(qty);

  useEffect(() => {
    const item = orderCtx?.cart?.items ? orderCtx?.cart?.items[index] : null;
    if (item) {
      setQty(item.qty || 1);
    }
  }, [orderCtx?.cart?.items]);

  return (
    <InputNumber
      min={1}
      value={qty}
      className={className}
      onChange={(value) => {
        if (value && value > 0) {
          setQty(value);
          orderCtx?.updateCart &&
            orderCtx.updateCart(index, Number(value) || 1);
        }
      }}
    />
  );
}

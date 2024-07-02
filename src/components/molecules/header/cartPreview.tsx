import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatMoney, generateSlugToHref } from '@/utils';
import Link from 'next/link';

export default function CartPreview() {
  const order = useContext(OrderContext);
  const onChange = (value: null | number, index: number) => {
    order?.updateCart && order.updateCart(index, value || 0);
  };
  return (
    <div className={'flex flex-col gap-3'}>
      {order?.cart?.length === 0 ? (
        <div className={'text-center text-lg font-semibold'}>
          Giỏ hàng trống
        </div>
      ) : (
        <>
          {order?.cart?.map((item: OrderItemsDto, key: number) => {
            return (
              <div
                className={'flex gap-2 w-[300px] border-b border-gray-200 pb-3'}
                key={key + '_' + item.variant_id}
              >
                <div className={'w-[80px] h-[80px] shrink-0'}>
                  <ImageWithFallback
                    className={'w-[80px] h-[80px]'}
                    image={item?.image}
                  />
                </div>
                <div className={'flex flex-col gap-2 '}>
                  <Link
                    href={generateSlugToHref(item?.slug)}
                    className={'text-primary text-[12px] text-left'}
                  >
                    {item?.variant_name}
                  </Link>
                  <div className={'flex justify-between items-center'}>
                    <InputNumber
                      min={1}
                      value={item.qty}
                      onChange={(value) => onChange(value, key)}
                    />
                    <span className={'text-red-600 font-semibold'}>
                      {formatMoney(item?.price || 0, 0, '.', '.')}
                    </span>
                  </div>
                </div>
                <div>
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    type={'link'}
                    onClick={() => order?.removeCart && order.removeCart(key)}
                  ></Button>
                </div>
              </div>
            );
          })}
          <Link
            className={
              'block w-full p-2 text-lg font-semibold bg-primary text-white text-center rounded-[10px] shadow-custom cursor-pointer'
            }
            href={'/gio-hang/tom-tat'}
          >
            Thanh toán
          </Link>
        </>
      )}
    </div>
  );
}

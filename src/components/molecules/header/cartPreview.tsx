import { useContext, useEffect, useRef } from 'react';
import OrderContext from '@/contexts/orderContext';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { generateSlugToHref } from '@/utils';
import Link from 'next/link';
import PriceOnCart from '@/components/atoms/priceOnCart';

export default function CartPreview() {
  const order = useContext(OrderContext);
  const ref = useRef<HTMLDivElement>(null);
  const onChange = (value: null | number, index: number) => {
    order?.updateCart && order.updateCart(index, value || 0);
  };
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        order?.setIsOpenHeaderCart && order.setIsOpenHeaderCart(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return (
    <div className={'flex flex-col gap-3'} ref={ref}>
      {order?.cart?.items?.length === 0 ? (
        <div className={'text-center text-lg font-semibold'}>
          Giỏ hàng trống
        </div>
      ) : (
        <>
          {order?.cart?.items?.map((item: OrderItemsDto, key: number) => {
            return (
              <div
                className={'flex gap-2 w-[350px] border-b border-gray-200 pb-3'}
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
                    <PriceOnCart item={item} isDisplayTotal={true} />
                  </div>
                </div>
                <div>
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    type={'link'}
                    onClick={() =>
                      order?.updateCart && order.updateCart(key, 0)
                    }
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
            Xem giỏ hàng
          </Link>
          <Link
            className={
              'block w-full p-2 text-lg font-semibold bg-primary text-white text-center rounded-[10px] shadow-custom cursor-pointer'
            }
            href={'/gio-hang/thanh-toan'}
          >
            Thanh toán
          </Link>
        </>
      )}
    </div>
  );
}

import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import { isMobile } from 'react-device-detect';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { formatMoney, generateSlugToHref } from '@/utils';
import Link from 'next/link';
import PriceWithLineThrough from '@/components/atoms/priceWithLineThrough';
import PriceMinus from '@/components/atoms/PriceMinus';
import { Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
export default function CartSummaryMobile() {
  const orderCtx = useContext(OrderContext);
  return (
    <>
      {isMobile && (
        <div className={'flex flex-col'}>
          {orderCtx?.cart?.items?.map((item, index) => {
            return (
              <div
                key={index}
                className={'p-3 border rounded-[10px] flex flex-col relative'}
              >
                <ImageWithFallback
                  className={'w-[100px] h-[100px] mx-auto'}
                  image={item?.image}
                  alt={item.variant_name}
                />
                <div>
                  <Link
                    href={generateSlugToHref(item.slug)}
                    className={'text-primary font-semibold '}
                  >
                    {item.variant_name}
                  </Link>
                  {item?.variant_configurations?.map((config, index2) => {
                    return (
                      <p key={index2} className={'text-sm'}>
                        ({config.name}: {config.value})
                      </p>
                    );
                  })}
                  <PriceWithLineThrough
                    regularPrice={item.variant_regular_price}
                    price={item.variant_price}
                  />
                  <PriceMinus item={item} className={'justify-start'} />
                </div>
                <div className={'flex gap-3 justify-between items-center mt-3'}>
                  <InputNumber
                    min={1}
                    value={item.qty}
                    onChange={(value) => {
                      orderCtx?.updateCart &&
                        orderCtx.updateCart(index, Number(value) || 1);
                    }}
                  />
                  <span className={'text-primary font-bold'}>
                    {formatMoney(item.price || 0, 0, '.', '.')}
                  </span>
                </div>
                <div className={'absolute top-0 right-0'}>
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    type={'link'}
                    onClick={() =>
                      orderCtx?.updateCart && orderCtx.updateCart(index, 0)
                    }
                  ></Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import Link from 'next/link';
import { formatMoney, generateSlugToHref } from '@/utils';
import PriceWithLineThrough from '@/components/atoms/priceWithLineThrough';
import PriceMinus from '@/components/atoms/PriceMinus';
import { Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import { isDesktop } from 'react-device-detect';
export default function CartSummaryDesktop() {
  const orderCtx = useContext(OrderContext);
  return (
    <>
      {isDesktop && (
        <table className={'border border-gray-200 w-full'}>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Khuyến mãi</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {orderCtx?.cart?.items?.map((item, index) => {
              return (
                <tr key={item.variant_id + '_' + index}>
                  <td className={'border-y border-gray-200 p-3 text-center'}>
                    <div className={'w-[100px] h-[100px] mx-auto'}>
                      <ImageWithFallback
                        className={'w-[100px] h-[100px] bk-product-image'}
                        image={item?.image}
                        alt={item.variant_name}
                      />
                    </div>
                  </td>
                  <td className={'border-y border-gray-200 max-w-[200px]'}>
                    <Link
                      href={generateSlugToHref(item.slug)}
                      className={'text-primary font-semibold bk-product-name'}
                    >
                      {item.variant_name}
                    </Link>
                    {item?.variant_configurations?.map((config, index) => {
                      return (
                        <p
                          key={index}
                          className={'text-sm bk-product-property'}
                        >
                          ({config.name}: {config.value})
                        </p>
                      );
                    })}
                  </td>
                  <td className={'border-y border-gray-200 text-center'}>
                    <PriceWithLineThrough
                      regularPrice={item.variant_regular_price}
                      price={item.variant_price}
                    />
                  </td>
                  <td className={'border-y border-gray-200 text-center'}>
                    <div className={'flex flex-col gap-1'}>
                      <PriceMinus item={item} />
                    </div>
                  </td>
                  <td className={'border-y border-gray-200 text-center'}>
                    <InputNumber
                      min={1}
                      value={item.qty}
                      className={'bk-product-qty'}
                      onChange={(value) => {
                        orderCtx?.updateCart &&
                          orderCtx.updateCart(index, Number(value) || 1);
                      }}
                    />
                    <input
                      type={'hidden'}
                      className={'hidden bk-product-qty'}
                      value={item.qty || 1}
                    />
                  </td>
                  <td className={'border-y border-gray-200 text-center'}>
                    {formatMoney(item.price || 0, 0, '.', '.')}
                  </td>
                  <td className={'border-y border-gray-200 text-center'}>
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => {
                        orderCtx?.updateCart && orderCtx.updateCart(index, 0);
                      }}
                    ></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

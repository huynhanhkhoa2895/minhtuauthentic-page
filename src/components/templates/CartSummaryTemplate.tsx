import { twMerge } from 'tailwind-merge';
import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import { Button, InputNumber, Table } from 'antd';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { DeleteOutlined, DeleteRowOutlined } from '@ant-design/icons';
import { formatMoney, generateSlugToHref } from '@/utils';
import Link from 'next/link';
import PriceWithLineThrough from '@/components/atoms/priceWithLineThrough';
import PriceOnCart from '@/components/atoms/priceOnCart';
import PriceMinus from '@/components/atoms/PriceMinus';

export default function CartSummaryTemplate() {
  const orderCtx = useContext(OrderContext);
  const total = orderCtx?.cart?.reduce((acc, item) => {
    return acc + (item.price || 0);
  }, 0);
  return (
    <div
      className={twMerge(
        'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3',
      )}
    >
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
          {orderCtx?.cart?.map((item, index) => {
            return (
              <tr key={item.variant_id + '_' + index}>
                <td className={'border-y border-gray-200 p-3 text-center'}>
                  <div className={'w-[100px] h-[100px] mx-auto'}>
                    <ImageWithFallback
                      className={'w-[100px] h-[100px]'}
                      image={item?.image}
                      alt={item.variant_name}
                    />
                  </div>
                </td>
                <td className={'border-y border-gray-200 max-w-[200px]'}>
                  <Link
                    href={generateSlugToHref(item.slug)}
                    className={'text-primary font-semibold '}
                  >
                    {item.variant_name}
                  </Link>
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
                    onChange={(value) => {
                      orderCtx?.updateCart &&
                        orderCtx.updateCart(index, value || 1);
                    }}
                  />
                </td>
                <td className={'border-y border-gray-200 text-center'}>
                  {formatMoney(item.price || 0, 0, '.', '.')}
                </td>
                <td className={'border-y border-gray-200 text-center'}>
                  <Button icon={<DeleteOutlined />} danger onClick={()=>{
                    orderCtx?.updateCart &&
                    orderCtx.updateCart(index, 0);
                  }}></Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={'w-full lg:w-[40%] lg:ml-auto max-w-full mt-6'}>
        <h4 className={'text-2xl text-primary font-bold mb-3'}>
          Tổng giỏ hàng
        </h4>
        <table className={'w-full border border-gray-200'}>
          <tbody>
            <tr>
              <td className={'p-3 border-b border-gray-200'}>Tạm tính</td>
              <td
                className={
                  'text-right text-primary font-semibold p-3 border-b border-gray-200'
                }
              >
                {formatMoney(total || 0, 0, '.', '.')}
              </td>
            </tr>
            <tr>
              <td className={'p-3'}>
                <p>Tổng tiền</p>
                <p className={'text-sm italic'}>(Miễn phí vận chuyển)</p>
              </td>
              <td className={'text-right text-primary font-semibold p-3'}>
                {formatMoney(total || 0, 0, '.', '.')}
              </td>
            </tr>
          </tbody>
        </table>
        <Link
          href={'/gio-hang/thanh-toan'}
          className={
            'block w-full p-3 text-xl font-semibold bg-primary text-white text-center rounded-[10px] shadow-custom cursor-pointer mt-3'
          }
        >
          Tiến hành thanh toán
        </Link>
      </div>
    </div>
  );
}

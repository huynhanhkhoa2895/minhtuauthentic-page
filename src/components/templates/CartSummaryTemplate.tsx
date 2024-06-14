import { twMerge } from 'tailwind-merge';
import { useContext } from 'react';
import OrderContext from '@/contexts/orderContext';
import { Button, Table } from 'antd';
import type { TableProps } from 'antd';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { DeleteRowOutlined } from '@ant-design/icons';
import { formatMoney, generateSlugToHref } from '@/utils';
import Link from 'next/link';

export default function CartSummaryTemplate() {
  const orderCtx = useContext(OrderContext);
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
          <th>Số lượng</th>
          <th>Tổng tiền</th>
          <th>Xóa</th>
        </tr>
        </thead>
        <tbody>
          {orderCtx?.cart?.map((item, index) => {
            return (
              <tr key={item.variant_id+'_'+index}>
                <td className={'border-y border-gray-200'}>
                  <div className={'w-[100px] h-[100px]'}>
                    <ImageWithFallback className={'w-[100px] h-[100px]'} image={item?.image} alt={item.variant_name} />
                  </div>
                </td>
                <td className={'border-y border-gray-200'}>
                  <Link href={generateSlugToHref(item.slug)}>{item.variant_name}</Link>
                </td>
                <td className={'border-y border-gray-200'}>{formatMoney(item.variant_price || 0)}</td>
                <td className={'border-y border-gray-200'}></td>
                <td className={'border-y border-gray-200'}>{formatMoney(((item.variant_price || 0) * (item.qty || 0)) || 0)}</td>
                <td className={'border-y border-gray-200'}>
                  <Button icon={<DeleteRowOutlined />}></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
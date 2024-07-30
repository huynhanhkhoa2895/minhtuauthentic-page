import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import { OrdersDto } from '@/dtos/Orders.dto';
import { ReactNode, useEffect, useState } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { formatMoney } from '@/utils';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';

type Props = {
  order: OrdersDto;
  order_items: OrderItemsDto[];
};
export default function OrderDetailTemplate({ order_items, order }: Props) {
  const [orderField, setOrderField] = useState<
    {
      label: string;
      render: ReactNode;
    }[]
  >([]);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, item: OrderItemsDto) => (
        <div className={'flex gap-3'}>
          <ImageWithFallback
            image={item?.image}
            className={'w-[50px] h-[50px] object-contain'}
          />
          <span>{item.variant_name}</span>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: unknown, item: OrderItemsDto) => <span>{item.qty}</span>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
      render: (_: unknown, item: OrderItemsDto) => (
        <span>{formatMoney(item?.price || 0)}</span>
      ),
    },
  ];

  useEffect(() => {
    const items: {
      label: string;
      render: ReactNode;
    }[] = [];
    for (const key in order) {
      const value = (order as any)[key];
      switch (key) {
        case 'id':
          items.push({
            label: 'Mã số đơn hàng',
            render: value,
          });
          break;
        case 'total_price':
          items.push({
            label: 'Tổng tiền',
            render: formatMoney(value),
          });
          break;
        case 'status':
          items.push({
            label: 'Trạng thái',
            render: value,
          });
          break;
        case 'payment':
          items.push({
            label: 'Phương thức thanh toán',
            render: value?.label || value?.name,
          });
          break;
        case 'shipping_address':
          items.push({
            label: 'Địa chỉ nhận hàng',
            render:
              value +
              ', ' +
              (order?.ward as any)?.full_name +
              ', ' +
              (order?.district as any)?.full_name +
              ', ' +
              (order?.city as any)?.full_name,
          });
          break;
        case 'note':
          items.push({
            label: 'Note',
            render: <div dangerouslySetInnerHTML={{ __html: value }} />,
          });
          break;
        case 'created_at':
          items.push({
            label: 'Ngày tạo',
            render: dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
          });
          break;
      }
      setOrderField(items);
    }
  }, []);

  return (
    <>
      {order && (
        <>
          <h1 className={'text-2xl text-primary font-bold mb-3'}>
            Chi tiết đơn hàng
          </h1>
          <div className={'grid grid-cols-2 gap-3'}>
            {orderField.map((item, key) => {
              return (
                <div key={key}>
                  <p className={'font-semibold'}>{item.label}</p>
                  <p>{item.render}</p>
                </div>
              );
            })}
          </div>
          <div className={'mt-3'}>
            <h2 className={'text-xl text-primary font-bold mb-3'}>Sản phẩm</h2>
            <Table
              dataSource={order_items}
              columns={columns}
              pagination={false}
            />
          </div>
        </>
      )}
    </>
  );
}

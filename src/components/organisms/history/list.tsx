import
{ Button, Table }
  from
    'antd'
  ;
import { OrdersDto } from '@/dtos/Orders.dto';
import Link from 'next/link';
import dayjs from 'dayjs';
import { formatMoney } from '@/utils';
type Props = {
  orders: OrdersDto[]
}
export default function HistoryList({orders}: Props){
  console.log(orders)
  const column = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      render: (_: unknown,item: OrdersDto) => <span>{item.id}</span>,
    },
    {
      title: 'Được tạo lúc',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_: unknown,item: OrdersDto) => <span>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
      render: (_: unknown,item: OrdersDto) => <span>{formatMoney(item?.total_price || 0)}</span>,
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown,item: OrdersDto) => <span>{item?.payment?.label || item?.payment?.name}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_: unknown,item: OrdersDto) => <span>{item.status}</span>,
    },
    {
      title: 'Xem',
      dataIndex: 'view',
      key: 'view',
      render: (_: unknown,item: OrdersDto) => <Link className={'text-primary'} href={'/tai-khoan/lich-su/'+item.id}>Xem chi tiết</Link>,
    },
  ]

  return (
    <>
      <h1 className={'text-2xl font-bold mb-3 text-primary'}>Lịch sử</h1>
      <Table dataSource={orders} columns={column} pagination={false} />
    </>

  )
}
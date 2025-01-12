import { OrdersDto } from '@/dtos/Orders.dto';
import Link from 'next/link';
import dayjs from 'dayjs';
import { formatMoney, statusOrder } from '@/utils';
import { isDesktop, isMobile, MobileView } from 'react-device-detect';
import dynamic from 'next/dynamic';
import { DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import Loading from '@/components/atoms/loading';
const HistoryMobileView = dynamic(
  () => import('@/pages/tai-khoan/lich-su/MobileView'),
  {
    ssr: false,
  },
);
const HistoryDesktopView = dynamic(
  () => import('@/pages/tai-khoan/lich-su/DesktopView'),
  {
    ssr: false,
  },
);
const { RangePicker } = DatePicker;

export default function HistoryList() {
  const [orders, setOrder] = useState<OrdersDto[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const column = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      render: (_: unknown, item: OrdersDto) => <span>{item.id}</span>,
    },
    {
      title: 'Được tạo lúc',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_: unknown, item: OrdersDto) => (
        <span>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
      render: (_: unknown, item: OrdersDto) => (
        <span>{formatMoney(item?.total_price || 0)}</span>
      ),
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, item: OrdersDto) => (
        <span>{item?.payment?.label || item?.payment?.name}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_: unknown, item: OrdersDto) => (
        <span>{statusOrder(item.status)}</span>
      ),
    },
    {
      title: 'Xem',
      dataIndex: 'view',
      key: 'view',
      render: (_: unknown, item: OrdersDto) => (
        <Link className={'text-primary'} href={'/tai-khoan/lich-su/' + item.id}>
          Xem chi tiết
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      getHistoryList();
    }, 1000);
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [date]);

  const getHistoryList = () => {
    const search = new URLSearchParams();
    setLoading(true);
    if (date.length > 0) {
      search.append('from', date[0]);
      search.append('to', date[1]);
    } else {
      search.append('from', dayjs().format('YYYY-MM-DD'));
      search.append('to', dayjs().format('YYYY-MM-DD'));
    }
    fetch('/api/orders/history?' + search.toString())
      .then((res) => res.json())
      .then((res: { data: OrdersDto[] }) => {
        setOrder(res?.data || []);
      })
      .catch((err) => null)
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className={'flex justify-between mb-3'}>
        <h1 className={'text-2xl font-[700] lg:font-bold mb-3 text-primary'}>
          Lịch sử
        </h1>
        <RangePicker
          placeholder={['Từ ngày', 'Tới ngày']}
          format={'DD/MM/YYYY'}
          defaultPickerValue={[dayjs(), dayjs()]}
          defaultValue={[dayjs(), dayjs()]}
          lang={'vi'}
          onChange={(date) => {
            if (date) {
              const fromDate = dayjs(date[0]).format('YYYY-MM-DD');
              const toDate = dayjs(date[1]).format('YYYY-MM-DD');
              setDate([fromDate, toDate]);
            }
          }}
        />
      </div>
      <div className={'relative'}>
        {loading ? (
          <div
            className={
              'absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center'
            }
          >
            <Loading />
          </div>
        ) : orders?.length > 0 ? (
          <>
            {isMobile && <HistoryMobileView orders={orders} column={column} />}
            {isDesktop && (
              <HistoryDesktopView orders={orders} column={column} />
            )}
          </>
        ) : (
          <p className={'text-center text-gray-500'}>Không có dữ liệu</p>
        )}
      </div>
    </>
  );
}

import { OrdersDto } from '@/dtos/Orders.dto';

type Props = {
  orders: OrdersDto[];
  column: unknown[];
};
export default function HistoryMobileView({ orders, column }: Props) {
  return (
    <>
      {orders.map((item, index) => {
        return (
          <table className={'mb-3 w-full'} key={index}>
            <tbody>
              {column.map((col, i) => {
                return (
                  <tr key={'table-' + i}>
                    <td className={'border '}>{col.title}</td>
                    <td className={'border w-[70%]'}>
                      {col.render(null, item)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </>
  );
}

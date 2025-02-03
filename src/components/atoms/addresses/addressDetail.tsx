import { AddressesDto } from '@/dtos/Addresses.dto';
import { twMerge } from 'tailwind-merge';
import BookOutlined from '@ant-design/icons/BookOutlined';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import UserOutlined from '@ant-design/icons/UserOutlined';

type Props = {
  address: AddressesDto;
  className?: string;
};
export default function AddressDetail({ address, className }: Props) {
  return (
    <div className={twMerge('w-full p-3 border-dashed border', className)}>
      <p className={'text-lg font-bold mb-3 text-primary'}>{address.title}</p>
      <p className={'flex gap-1 mb-2'}>
        <UserOutlined />
        <span className={'font-semibold'}>{address.name}</span>
      </p>
      <p className={'flex gap-1 mb-2'}>
        <BookOutlined />
        <span>
          {address.shipping_address}, {address.ward?.full_name},{' '}
          {address.district?.full_name}, {address.city?.full_name}
        </span>
      </p>
      <p className={'flex gap-1 mb-2'}>
        <PhoneOutlined />
        <span>{address.phone}</span>
      </p>
      <p className={'flex gap-1 mb-2'}>
        <MailOutlined />
        <span>{address.email}</span>
      </p>
    </div>
  );
}

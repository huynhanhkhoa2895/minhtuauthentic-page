import { AddressesDto } from '@/dtos/Addresses.dto';

type Props = {
  address: AddressesDto;
};
export default function AddressDetail({ address }: Props) {
  return (
    <div className={'w-full p-3 border-dashed'}>
      <p className={'text-md font-bold'}>{address.title}</p>
      <p>
        {address.shipping_address}, {address.ward?.full_name}
      </p>
    </div>
  );
}

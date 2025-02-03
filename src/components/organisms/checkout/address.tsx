import { useEffect, useState } from 'react';
import { AddressesDto } from '@/dtos/Addresses.dto';
import { Button, Radio } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import Select from 'antd/es/select';
import AddressDetail from '@/components/atoms/addresses/addressDetail';
import AddressPopup from '@/components/molecules/addresses/popup';
type Props = {
  setValue: any;
  setFullAddress: any;
};
export default function CheckoutAddress({ setValue, setFullAddress }: Props) {
  const [addresses, setAddresses] = useState<AddressesDto[]>([]);
  const [address, setAddress] = useState<AddressesDto | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    getListAddress().catch();
  }, []);

  useEffect(() => {
    if (setValue) {
      setValue('address', address?.shipping_address);
      setValue('email', address?.email);
      setValue('name', address?.name);
      setValue('phone', address?.phone);
      setValue('shipping_city', address?.city?.code);
      setValue('shipping_district', address?.district?.code);
      setValue('shipping_ward', address?.ward?.code);
      setFullAddress(address);
    }
  }, [address]);

  const getListAddress = async (isGetLast?: boolean) => {
    const rs: { data: AddressesDto[] } = await fetch(`/api/orders/addresses`, {
      method: 'GET',
    }).then((res) => res.json());
    setAddresses(rs?.data || []);
    if (rs?.data?.length && (!address || isGetLast)) {
      setAddress(rs?.data[rs?.data?.length - 1]);
    }
  };
  return (
    <>
      <div className={'flex flex-col'}>
        <div className={'flex justify-between'}>
          <h3 className={'text-3xl font-[700] lg:font-bold mb-6'}>
            Thông tin vận chuyển
          </h3>
          <Button
            htmlType={'button'}
            onClick={() => {
              setOpen(true);
            }}
            type={'link'}
            icon={<PlusOutlined />}
          >
            Thêm địa chỉ
          </Button>
        </div>
        <Select
          value={address?.id}
          options={addresses.map((item) => ({
            label:
              item?.shipping_address +
              ', ' +
              item?.ward?.full_name +
              ', ' +
              item?.district?.full_name +
              ', ' +
              item?.city?.full_name,
            value: item?.id,
          }))}
          onChange={(item) => setAddress(addresses.find((i) => i.id === item))}
        />
        {address && <AddressDetail address={address} className={'mt-3'} />}
      </div>
      <AddressPopup
        open={open}
        refresh={() => {
          getListAddress(true).catch();
        }}
      />
    </>
  );
}

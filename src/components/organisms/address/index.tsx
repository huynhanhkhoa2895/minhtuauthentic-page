import Modal from 'antd/es/modal/Modal';
import Button from 'antd/es/button/button';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useEffect, useState } from 'react';
import FormAddress from '@/components/organisms/account/formAddress';
import { PROMOTION_TYPE } from '@/config/enum';
import useSWR from 'swr';
import { AddressesDto } from '@/dtos/Addresses.dto';
import AddressListItem from '@/components/atoms/addresses/addressListItem';
const fetcher = () =>
  fetch('/api/orders/addresses', {
    method: 'GET',
  }).then((res) => res.json());
export default function Addresses() {
  const { data, error, mutate } = useSWR('list-adddress', fetcher);
  const [addresses, setAddresses] = useState<AddressesDto[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setAddresses(data?.data || []);
    }
  }, [data]);

  return (
    <>
      <div className={'mt-3'}>
        <div className={'flex items-center justify-between w-full'}>
          <h1 className={'text-2xl font-[700] lg:font-bold mb-3 text-primary'}>
            Địa chỉ giao hàng
          </h1>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Thêm địa chỉ
          </Button>
        </div>
        <div className={'grid grid-cols-1 lg:grid-cols-2'}>
          {(addresses || []).map((item: AddressesDto) => {
            return (
              <AddressListItem key={item.id} address={item} refresh={mutate} />
            );
          })}
        </div>
      </div>
      <Modal
        destroyOnClose={true}
        title="Thêm địa chỉ"
        open={open}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <FormAddress
          onDone={() => {
            setOpen(false);
            mutate().catch();
          }}
        />
      </Modal>
    </>
  );
}

import FormAddress from '@/components/organisms/account/formAddress';
import Modal from 'antd/es/modal/Modal';
import { useEffect, useState } from 'react';
type Props = {
  open: boolean;
  refresh?: () => Promise<void> | void;
};
export default function AddressPopup({ open, refresh }: Props) {
  const [_open, _setOpen] = useState(false);

  useEffect(() => {
    _setOpen(open);
  }, [open]);

  return (
    <Modal
      destroyOnClose={true}
      title="Thêm địa chỉ"
      open={_open}
      footer={null}
      onCancel={() => {
        _setOpen(false);
      }}
    >
      <FormAddress
        onDone={() => {
          _setOpen(false);
          refresh && refresh();
        }}
      />
    </Modal>
  );
}

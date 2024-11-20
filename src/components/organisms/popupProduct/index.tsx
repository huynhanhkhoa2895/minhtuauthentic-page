import { Modal } from 'antd/es';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@/contexts/appContext';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';

export default function PopupProduct() {
  const appCtx = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ResponseProductDetailPageDto | null>(null);

  useEffect(() => {

  }, []);

  const getProductWithSlug = async (slug: string) => {};

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return <>
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}></Modal>
  </>
}

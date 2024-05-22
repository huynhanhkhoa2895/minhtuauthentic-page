import { ProductDto } from '@/dtos/Product.dto';
import { useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import AppContext from '@/contexts/appContext';
import { SETTING_KEY } from '@/config/enum';
import TabsContainer from '@/components/molecules/tabsContainer';

type Props = {
  product: ProductDto;
};
export default function ProductDescription({ product }: Props) {
  const ctx = useContext(AppContext);

  return (
    <TabsContainer
      header={[
        'Mô tả sản phẩm',
        'Hướng dẫn mua hàng & thanh toán',
        'Chính sách đổi trả & bảo hành',
      ]}
      content={[
        product?.product_property?.content || '',
        ctx?.settings?.[SETTING_KEY.PRODUCT_DETAIL_HOW_TO_BUY.KEY] || '',
        ctx?.settings?.[SETTING_KEY.PRODUCT_DETAIL_GUARANTEE.KEY] || '',
      ]}
    />
  );
}

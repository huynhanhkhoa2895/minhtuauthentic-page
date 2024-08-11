import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import ProductDetailCard from '@/components/organisms/product/detailCard';
import { Suspense, useContext, useEffect, useState } from 'react';
import { SettingsDto } from '@/dtos/Settings.dto';
import AppContext from '@/contexts/appContext';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import { generateSlugToHref } from '@/utils';

type Props = {
  data: ResponseProductDetailPageDto;
};
const ProductTemplate = ({ data }: Props) => {
  const generateSettingProductDetail = (): Record<string, string> => {
    const obj: Record<string, string> = {};
    (data?.settings || []).forEach((setting: SettingsDto) => {
      if (setting && setting.key) {
        obj[setting?.key] = setting?.value?.content || '';
      }
    });
    return obj;
  };
  const ctx = useContext(AppContext);
  useEffect(() => {
    if (ctx?.setSettings) {
      ctx?.setSettings?.(generateSettingProductDetail());
    }
  }, []);
  return (
    <>
      <BreadcrumbComponent
        label={'Sản phẩm'}
        link={'/san-pham'}
        current={{
          label: data?.product?.name || '',
          link: generateSlugToHref(data?.product?.slugs?.slug),
        }}
      />
      {data?.product && (
        <ProductDetailCard
          product={data.product}
          relatedProducts={data?.relatedProducts || []}
          productConfigurations={data?.productConfigurations || []}
        />
      )}
    </>
  );
};
export default ProductTemplate;

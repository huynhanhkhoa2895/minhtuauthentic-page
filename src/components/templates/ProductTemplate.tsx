import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import ProductDetailCard from '@/components/organisms/product/detailCard';
import { Suspense, useContext, useEffect, useState } from 'react';
import { SettingsDto } from '@/dtos/Settings.dto';
import AppContext from '@/contexts/appContext';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import { generateSlugToHref } from '@/utils';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';

const ProductTemplate = ({
  data,
}: ResponseSlugPageDto<ResponseProductDetailPageDto>) => {
  return (
    <>
      <BreadcrumbComponent
        label={data?.product?.categories?.[0]?.category?.name || 'Sản phẩm'}
        link={
          data?.product?.categories?.[0]?.category?.slugs?.slug || '/san-pham'
        }
        current={{
          label: data?.product?.title || data?.product?.name || '',
          link: generateSlugToHref(data?.product?.slugs?.slug),
        }}
      />
      {data?.product && (
        <ProductDetailCard
          product={data?.product}
          relatedProducts={data?.relatedProducts || []}
          productConfigurations={data?.productConfigurations || []}
        />
      )}
    </>
  );
};
export default ProductTemplate;

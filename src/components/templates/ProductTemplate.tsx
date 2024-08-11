import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import ProductDetailCard from '@/components/organisms/product/detailCard';
import { Suspense, useContext, useEffect, useState } from 'react';
import { SettingsDto } from '@/dtos/Settings.dto';
import AppContext from '@/contexts/appContext';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import { generateSlugToHref } from '@/utils';
import { Entity } from '@/config/enum';
import { SlugDto } from '@/dtos/Slug.dto';
import { ProductDto } from '@/dtos/Product.dto';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';

const ProductTemplate = ({ data }:  ResponseSlugPageDto<ResponseProductDetailPageDto> ) => {
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
          product={data?.product}
          relatedProducts={data?.relatedProducts || []}
          productConfigurations={data?.productConfigurations || []}
        />
      )}
    </>
  );
};
export default ProductTemplate;

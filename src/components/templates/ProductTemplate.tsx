import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import ProductDetailCard from '@/components/organisms/product/detailCard';
import '@/styles/bk.css';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import { generateSlugToHref } from '@/utils';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const CustomScript = dynamic(() => import('@/components/atoms/customScript'), {
  ssr: false,
});

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
          settings={data?.settings || []}
        />
      )}
      <CustomScript />
    </>
  );
};
export default ProductTemplate;

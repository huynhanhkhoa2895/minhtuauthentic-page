import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import ProductDetailCard from '@/components/organisms/product/detailCard';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import { generateSlugToHref } from '@/utils';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import dynamic from 'next/dynamic';
import Script from 'next/script';
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
        className={'breakcrumb-no-wrap'}
      />
      {data?.product && (
        <ProductDetailCard
          product={data?.product}
          variantActive={data?.variantActive}
          relatedProducts={data?.relatedProducts || []}
          productConfigurations={data?.productConfigurations || []}
          settings={data?.settings || []}
        />
      )}
      <div id="script-general-container"></div>
      <CustomScript />
      <iframe src="/iframe?product_price=500000000" frameBorder="0" width="100%" />
      {/*<Script*/}
      {/*  data-partytown-config*/}
      {/*  strategy={'afterInteractive'}*/}
      {/*  src={process.env.NEXT_PUBLIC_FUNDIN_URL + `/merchants/productdetailjs/${process.env.NEXT_PUBLIC_FUNDIN_MERCHANT_ID}.js`}*/}
      {/*/>*/}
    </>
  );
};
export default ProductTemplate;

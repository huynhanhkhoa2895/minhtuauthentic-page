import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import ProductDetailCard from '@/components/organisms/product/detailCard';
import { Suspense } from 'react';

type Props = {
  data: ResponseProductDetailPageDto;
};
const ProductTemplate = ({ data }: Props) => {
  console.log('data', data);
  return (
    <>
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

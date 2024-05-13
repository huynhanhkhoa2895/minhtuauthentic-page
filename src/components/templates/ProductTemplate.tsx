import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import ProductDetailCard from '@/components/organisms/product/detailCard';
import { Suspense } from 'react';

type Props = {
  data: ResponseProductDetailPageDto;
};
const ProductTemplate = ({ data }: Props) => {
  return (
    <Suspense fallback={'Loading...'}>
      {data?.product && <ProductDetailCard product={data.product} />}
    </Suspense>
  );
};
export default ProductTemplate;

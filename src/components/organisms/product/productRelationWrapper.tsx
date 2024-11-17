import dynamic from 'next/dynamic';
import { ProductDto } from '@/dtos/Product.dto';
import { isMobile, isDesktop } from 'react-device-detect';

const ProductRelation = dynamic(
  () => import('@/components/molecules/product/productRelation'),
  {
    ssr: false,
  },
);
type Props = {
  display?: 'mobile' | 'desktop';
  products: ProductDto[];
};
export default function ProductRelationWrapper({ display, products }: Props) {
  return (
    <>
      {display === 'mobile' && (
        <>{isMobile && <ProductRelation products={products} />}</>
      )}
      {display === 'desktop' && (
        <>{isDesktop && <ProductRelation products={products} />}</>
      )}
    </>
  );
}

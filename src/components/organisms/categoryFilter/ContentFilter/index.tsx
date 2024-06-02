import { ProductDto } from '@/dtos/Product.dto';
import ProductCard from '@/components/organisms/product/card';
import SortBy from '@/components/organisms/categoryFilter/ContentFilter/sortBy';
import { useMemo } from 'react';
import PageLimit from '@/components/organisms/categoryFilter/ContentFilter/pageLimit';

type Props = {
  products: ProductDto[];
};

export default function ContentFilter({ products }: Props) {
  const renderProduct = useMemo(() => {
    return (
      <div className={'grid grid-cols-1 lg:grid-cols-4 w-full gap-3'}>
        {products.map((product, index) => {
          const variant = product?.variants?.find(item=>item.is_default || []);
          if (!variant) {
            return;
          }
          return <ProductCard key={index} product={product} variant={variant} />;
        })}
      </div>
    );
  }, []);
  return (
    <div className={'p-3 w-full lg:col-span-5'}>
      <div>
        <span className={'font-semibold text-[16px]'}>Lọc theo:</span>
      </div>
      <div className={'flex flex-col mb-6'}>
        <span className={'font-semibold text-[16px] w-full mb-3'}>
          Sắp xếp theo
        </span>
        <div className={'flex max-lg:flex-col lg:justify-between items-center'}>
          <SortBy />
          <PageLimit />
        </div>
      </div>
      {renderProduct}
    </div>
  );
}

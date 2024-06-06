import { ProductDto } from '@/dtos/Product.dto';
import ProductCard from '@/components/organisms/product/card';
import SortBy from '@/components/organisms/categoryFilter/ContentFilter/sortBy';
import { useContext, useEffect, useMemo, useState } from 'react';
import PageLimit from '@/components/organisms/categoryFilter/ContentFilter/pageLimit';
import CategoryFilterContext from '@/contexts/categoryFilterContext';
import Loading from '@/components/atoms/loading';

type Props = {
  products: ProductDto[];
};

export default function ContentFilter({ products }: Props) {
  const ctx = useContext(CategoryFilterContext);
  const [_products, setProducts] = useState<ProductDto[]>(products);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);
  useEffect(() => {
    if (isReady) {
      setProducts((ctx?.products || []) as ProductDto[]);
    }
  }, [ctx?.products]);
  const renderProduct = useMemo(() => {
    return (
      <>
        {_products?.length ? (
          <div
            className={'grid grid-cols-1 lg:grid-cols-4 w-full gap-3 relative'}
          >
            {_products.map((product, index) => {
              const variant = product?.variants?.find(
                (item) => item.is_default || [],
              );
              if (!variant) {
                return;
              }
              return (
                <ProductCard key={index} product={product} variant={variant} />
              );
            })}
          </div>
        ) : (
          <h4 className={'text-center text-primary font-semibold w-full'}>
            Không có sản phẩm nào
          </h4>
        )}
      </>
    );
  }, [_products]);
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
      <div className={'relative'}>
        {ctx?.loading && (
          <div
            className={
              'absolute h-full w-full flex top-0 left-0 p-1 justify-center items-center z-[1] bg-[rgb(255_255_255_/_70%)]'
            }
          >
            <Loading />
          </div>
        )}
        {renderProduct}
      </div>
    </div>
  );
}

import { ProductDto } from '@/dtos/Product.dto';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { twMerge } from 'tailwind-merge';
import { calculatePricePercent, generateSlugToHref } from '@/utils';
import Link from 'next/link';
import StartRating from '@/components/atoms/product/startRating';
import ProductPrice from '@/components/molecules/product/price';
import Badge from '@/components/atoms/badge';

type Props = {
  products: ProductDto[];
};
export default function ProductRelation({ products }: Props) {
  return (
    <>
      {products?.length > 0 && (
        <div className={'flex flex-col gap-3 mt-3'}>
          {products.map((product, index) => {
            const _variantActive =
              product?.variants?.find((item) => item.is_default) ||
              product?.variants?.[0];
            return (
              <div
                key={index}
                className={twMerge(
                  'bg-white rounded-[10px] p-3 border-[#e4e4e4] border-2 transition-colors duration-500 hover:border-primary',
                )}
              >
                <div className={'flex items-center gap-2'}>
                  <Badge className={'bg-green'}>
                    Giảm {calculatePricePercent(_variantActive)}%
                  </Badge>
                  <Badge className={'bg-price'}>Trả góp 0%</Badge>
                </div>
                <div className={twMerge('flex gap-3 mt-3')} key={index}>
                  <div>
                    <ImageWithFallback
                      image={
                        product?.feature_image_detail?.image ||
                        _variantActive?.images?.[0]?.image ||
                        product?.images?.[0]?.image
                      }
                      className={'w-[100px] h-[100px] object-contain'}
                    />
                  </div>
                  <div>
                    <h5 className={'font-semibold'}>
                      <Link href={generateSlugToHref(product?.slugs?.slug)}>
                        {product.name}
                      </Link>
                    </h5>
                    <ProductPrice
                      variant={_variantActive}
                      classNameRegularPrice={'text-[14px] font-semibold'}
                      classNamePrice={'font-[500] text-[10px]'}
                    />
                    <StartRating />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

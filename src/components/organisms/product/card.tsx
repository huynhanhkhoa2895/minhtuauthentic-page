import { ProductDto } from '@/dtos/Product.dto';
import ProductPrice from '@/components/molecules/product/price';
import ProductCardImage from '@/components/molecules/product/image/productCardImage';
import Link from 'next/link';
import ProductCardButtonGroup from '@/components/molecules/product/button-group';
import Badge from '@/components/atoms/badge';
import { twMerge } from 'tailwind-merge';
import { VariantDto } from '@/dtos/Variant.dto';
import {
  calculatePriceMinus,
  calculatePricePercent,
  formatMoney,
  promotionName,
} from '@/utils';
import { Fragment } from 'react';
import { PromotionsDto } from '@/dtos/Promotions.dto';
import CouponsDto from '@/dtos/Coupons.dto';

const ProductCard = ({
  product,
  variant,
  promotions,
  addText,
  coupon,
  isShowConfiguration,
}: {
  product: ProductDto;
  variant: VariantDto;
  promotions?: PromotionsDto[];
  addText?: string;
  coupon?: CouponsDto;
  isShowConfiguration?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        'bg-white rounded-[10px] border-[2px] border-[#e4e4e4] py-2 transition-colors duration-300 hover:border-primary hover:shadow-md flex flex-col justify-between',
      )}
    >
      <div>
        <div className={'flex items-center justify-end gap-2 px-2'}>
          <Badge className={'bg-green'}>
            Giảm {calculatePricePercent(variant)}%
          </Badge>
          <Badge className={'bg-price'}>Trả góp 0%</Badge>
        </div>
        <ProductCardImage product={product} priority={false} />
        <div className={'px-2 min-h-[84px] lg:min-h-[63px]'}>
          <h6 className={'font-bold'}>
            <Link className={'block'} href={`/${product?.slugs?.slug}`}>
              {product.title || product.name}
            </Link>
          </h6>
        </div>
        <div className={'h-[50px]'}>
          {isShowConfiguration &&
            variant?.variant_product_configuration_values?.map(
              (item, index) => {
                return (
                  <p key={index} className={'text-sm px-2'}>
                    {
                      item.product_configuration_value?.product_configuration
                        ?.name
                    }
                    : {item.product_configuration_value?.value}
                  </p>
                );
              },
            )}
          {variant && <ProductPrice className={'px-2'} variant={variant} />}
        </div>
      </div>
      <div className={'h-[50px] px-[8px]'}>
        {promotions?.map((promotion, index) => {
          return (
            <Fragment key={'Product-card-' + index}>
              <p>
                <span className={'font-semibold mr-3'}>
                  {promotionName(promotion)}:
                </span>
                <span
                  className={'text-red-600 text-sm text-right cursor-pointer'}
                >
                  {formatMoney(
                    (variant?.regular_price || 0) -
                      calculatePriceMinus(variant?.regular_price || 0, coupon),
                  )}
                </span>
              </p>
              <p className={'text-sm'}>
                <span className={'mr-3'}>Tiết kiệm thêm:</span>
                <span>
                  {formatMoney(
                    calculatePriceMinus(variant?.regular_price || 0, coupon),
                  )}
                </span>
              </p>
            </Fragment>
          );
        })}
      </div>
      <ProductCardButtonGroup
        className={'mt-[10px] px-2'}
        variant={variant}
        product={product}
        addText={addText}
      />
    </div>
  );
};
export default ProductCard;

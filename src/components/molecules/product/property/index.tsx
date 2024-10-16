import { ProductDto } from '@/dtos/Product.dto';
import { twMerge } from 'tailwind-merge';
import ProductPrice from '@/components/molecules/product/price';
import { Star } from '@/components/icons/star';
import { useEffect, useState } from 'react';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import ProductConfiguration from '@/components/molecules/product/configuration';
import ProductCartCheckout from '@/components/molecules/product/productCartCheckout';
import PromotionDescription from '@/components/molecules/product/promotionDescription';
import Link from 'next/link';
import { generateSlugToHref, SexName } from '@/utils';
import StartRating from '@/components/atoms/product/startRating';
import { Rate } from 'antd';
import { SettingsDto } from '@/dtos/Settings.dto';
type Props = {
  product: ProductDto;
  productConfigurations: ProductConfigurationsDto[];
  variantActive: VariantDto;
  onChange?: (variant: VariantDto) => void;
  settings?: SettingsDto[];
};
const ProductProperty = ({
  product,
  productConfigurations,
  variantActive,
  onChange,
  settings,
}: Props) => {
  const [_variantActive, setVariantActive] =
    useState<VariantDto>(variantActive);
  useEffect(() => {
    onChange && onChange(_variantActive);
  }, [_variantActive]);

  const handleConfigurationChange = (
    value: { configurationId: number; valueId: number }[],
  ) => {
    let variant: VariantDto[] = product?.variants || [];

    value.forEach((item) => {
      variant?.forEach((variantItem) => {
        variantItem.variant_product_configuration_values?.forEach(
          (variantConfigurationValue) => {
            if (
              variantConfigurationValue.product_configuration_value_id ===
              item.valueId
            ) {
              variant = [variantItem];
            }
          },
        );
      });
    });
    setVariantActive(variant[0]);
  };

  const getConfigurationValue = (): {
    configurationId: number;
    valueId: number;
  }[] => {
    const value: { configurationId: number; valueId: number }[] = [];
    _variantActive?.variant_product_configuration_values?.map((item) => {
      value.push({
        configurationId:
          item.product_configuration_value?.product_configuration_id || 0,
        valueId: item.product_configuration_value_id || 0,
      });
    });
    return value;
  };

  return (
    <div>
      <h1 className={'font-bold text-[22px] leading-[1.2]'}>
        {product.title || product.name}
      </h1>
      <div className={'mt-3 grid grid-cols-2'}>
        <div>
          <span>Thương hiệu: </span>

          {product.brands?.map((item, index) => (
            <Link
              href={generateSlugToHref(item.brand?.slugs?.slug)}
              className={'font-semibold text-primary'}
              key={'brand-' + index}
            >
              {item.brand?.name +
                (index === (product?.brands?.length || 0) - 1 ? '' : ', ')}
            </Link>
          ))}
        </div>
        <div>
          <span>Giới tính: </span>
          <span className={'font-semibold text-primary'}>
            {SexName(product?.product_property?.sex || 2)}
          </span>
        </div>
        <div>
          <span>Trạng thái: </span>
          <span
            className={twMerge(
              'font-semibold text-primary',
              product?.is_in_stock ? 'text-green' : 'text-red-600',
            )}
          >
            {product?.is_in_stock ? 'Còn hàng' : 'Hết Hàng'}
          </span>
        </div>
        <div className={'flex gap-2'}>
          <span>Đánh giá: </span>
          <Rate rootClassName={'rate-custom'} disabled defaultValue={5} />
        </div>
      </div>
      <hr className={'mt-3'} />
      <div className={'mt-3 overflow-hidden'}>
        <ProductPrice
          prefix={'Giá'}
          variant={_variantActive}
          classNameRegularPrice={'text-[24px] lg:text-[28px] font-bold'}
          classNamePrice={'font-[500] lg:text-[20px]'}
          displayGap
          classNameGap={
            'text-[14px] bg-red-600 ml-2 inline-block py-1 px-2 rounded-[10px] text-white'
          }
        />
        <ProductConfiguration
          productConfigurations={productConfigurations}
          onChange={handleConfigurationChange}
          value={getConfigurationValue()}
        />
      </div>
      <div className={'mt-3'}>
        <ProductCartCheckout variant={_variantActive} />
      </div>
      <PromotionDescription
        settings={settings}
        variant_id={variantActive.id}
        className={'mt-3'}
      />
      <div className={'mt-3'}>
        <span className={'font-semibold'}>Danh mục </span>
        <span className={'text-[12px]'}>
          {product?.categories?.map((item, index) => {
            return (
              <Link
                key={index}
                className={'text-gray-400'}
                href={generateSlugToHref(item.category?.slugs?.slug)}
              >
                {(item.category?.name || '') +
                  (index < (product?.categories?.length || 0) - 1 ? ', ' : '')}
              </Link>
            );
          })}
        </span>
      </div>
    </div>
  );
};
export default ProductProperty;

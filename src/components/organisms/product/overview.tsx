import { ProductDto } from '@/dtos/Product.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import ProductDetailImage from '@/components/molecules/product/image/productDetailImage';
import ProductProperty from '@/components/molecules/product/property';
import { useState } from 'react';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { ImageDto } from '@/dtos/Image.dto';
import { SettingsDto } from '@/dtos/Settings.dto';

type Props = {
  product: ProductDto;
  variant?: VariantDto;
  setIsOpen?: (item: { display: boolean; image: ImageDto | null }) => void;
  productConfigurations?: ProductConfigurationsDto[];
  settings?: SettingsDto[];
  onChange?: (variant: VariantDto) => void;
};
export default function ProductOverview({
  product,
  variant,
  setIsOpen,
  productConfigurations,
  settings,
  onChange,
}: Props) {
  const [_variantActive, setVariantActive] = useState<VariantDto | undefined>(
    variant ||
      (product?.variants || [])?.find((item: VariantDto) => item.is_default) ||
      product?.variants?.[0],
  );
  return (
    <div
      className={
        'p-3 grid grid-cols-1 lg:grid-cols-2 rounded-[10px] shadow-custom mt-3 bg-white gap-3'
      }
    >
      <ProductDetailImage
        product={product}
        setIsOpen={setIsOpen}
        variantActive={_variantActive}
      />
      <ProductProperty
        product={product}
        variantActive={_variantActive as VariantDto}
        productConfigurations={productConfigurations || []}
        settings={settings}
        onChange={onChange}
      />
    </div>
  );
}

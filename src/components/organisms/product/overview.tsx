import { ProductDto } from '@/dtos/Product.dto';
import ProductDetailImage from '@/components/molecules/product/image/productDetailImage';
import ProductProperty from '@/components/molecules/product/property';
import { useContext, useState } from 'react';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { ImageDto } from '@/dtos/Image.dto';
import { SettingsDto } from '@/dtos/Settings.dto';
import ProductDetailContext from '@/contexts/productDetailContext';

type Props = {
  product: ProductDto;
  setIsOpen?: (item: { display: boolean; image: ImageDto | null }) => void;
  productConfigurations?: ProductConfigurationsDto[];
  settings?: SettingsDto[];
};
export default function ProductOverview({
  product,
  setIsOpen,
  productConfigurations,
  settings,
}: Props) {
  const productContext = useContext(ProductDetailContext);
  return (
    <div
      className={
        'p-3 grid grid-cols-1 lg:grid-cols-2 rounded-[10px] shadow-custom mt-3 bg-white gap-3'
      }
    >
      <ProductDetailImage product={product} setIsOpen={setIsOpen} />
      <ProductProperty
        product={product}
        productConfigurations={productConfigurations || []}
        settings={settings}
      />
    </div>
  );
}

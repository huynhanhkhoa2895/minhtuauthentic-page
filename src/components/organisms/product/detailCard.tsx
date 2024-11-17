import { ProductDto } from '@/dtos/Product.dto';
import ProductDetailImage from '@/components/molecules/product/image/productDetailImage';
import ProductProperty from '@/components/molecules/product/property';
import { useState } from 'react';
import { ImageDto } from '@/dtos/Image.dto';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import ProductDescription from '@/components/molecules/product/productDescription';
import ProductInformation from '@/components/molecules/product/productInformation';
import ProductRelation from '@/components/molecules/product/productRelation';
import ProductQuestionAnswer from '@/components/molecules/product/productQuestionAnswer';
import ProductDealSock from '@/components/molecules/product/productDealSock';
import ListKeyword from '@/components/organisms/product/listKeyword';
import dynamic from 'next/dynamic';
import { SettingsDto } from '@/dtos/Settings.dto';
import { SETTING_KEY } from '@/config/enum';
const ProductRating = dynamic(
  () => import('@/components/molecules/product/productRating'),
  {
    ssr: false,
  },
);

const ProductRelationWrapper = dynamic(
  () => import('@/components/organisms/product/productRelationWrapper'),
  {
    ssr: false,
  },
);

const PopupImage = dynamic(
  () => import('@/components/molecules/product/image/popupImage'),
  {
    ssr: false,
  },
);
type Props = {
  product?: ProductDto;
  relatedProducts: ProductDto[];
  productConfigurations: ProductConfigurationsDto[];
  settings: SettingsDto[];
  variantActive: VariantDto | undefined;
};
const ProductDetailCard = ({
  product,
  productConfigurations,
  relatedProducts,
  settings,
  variantActive,
}: Props) => {
  const [isOpen, setIsOpen] = useState<{
    display: boolean;
    image: ImageDto | null;
  }>({
    display: false,
    image: null,
  });

  const [_variantActive, setVariantActive] = useState<VariantDto | undefined>(
    variantActive ||
      (product?.variants || [])?.find((item: VariantDto) => item.is_default) ||
      product?.variants?.[0],
  );

  return (
    <>
      {product && (
        <>
          {_variantActive && (
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
                variantActive={_variantActive}
                productConfigurations={productConfigurations}
                settings={settings}
                onChange={(variant: VariantDto) => {
                  setVariantActive(variant);
                }}
              />
            </div>
          )}
          <ProductDealSock
            setting={settings.find(
              (item) => item.key === SETTING_KEY.DEAL_SOCK_SECTION.KEY,
            )}
          />
          <div
            className={
              'flex flex-col-reverse lg:grid lg:grid-cols-3 gap-3 my-3'
            }
          >
            <div className={'col-span-2'}>
              <ProductDescription product={product} settings={settings} />
              <ListKeyword product={product} />
              <ProductQuestionAnswer
                questions={product?.question_answers || []}
              />
              {product.id && <ProductRating product_id={product.id} />}
              <ProductRelationWrapper
                display={'mobile'}
                products={relatedProducts}
              />
            </div>

            <div>
              <ProductInformation product={product} />
              <ProductRelationWrapper
                display={'desktop'}
                products={relatedProducts}
              />
            </div>
          </div>

          <PopupImage
            open={isOpen.display}
            setIsOpen={setIsOpen}
            image={isOpen.image}
            product={product}
            variantActive={_variantActive}
          />
        </>
      )}
    </>
  );
};
export default ProductDetailCard;

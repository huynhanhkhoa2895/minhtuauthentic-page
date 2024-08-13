import { ProductDto } from '@/dtos/Product.dto';
import ProductDetailImage from '@/components/molecules/product/image/productDetailImage';
import ProductProperty from '@/components/molecules/product/property';
import PopupImage from '@/components/molecules/product/image/popupImage';
import { useState } from 'react';
import { ImageDto } from '@/dtos/Image.dto';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import ProductDescription from '@/components/molecules/product/productDescription';
import ProductInformation from '@/components/molecules/product/productInformation';
import ProductRelation from '@/components/molecules/product/productRelation';
import ProductQuestionAnswer from '@/components/molecules/product/productQuestionAnswer';
import { PromotionsDto } from '@/dtos/Promotions.dto';
import ProductDealSock from '@/components/molecules/product/productDealSock';
import { TagsOutlined } from '@ant-design/icons/lib/icons';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import ListKeyword from '@/components/organisms/product/listKeyword';

type Props = {
  product: ProductDto;
  relatedProducts: ProductDto[];
  productConfigurations: ProductConfigurationsDto[];
};
const ProductDetailCard = ({
  product,
  productConfigurations,
  relatedProducts,
}: Props) => {
  const [isOpen, setIsOpen] = useState<{
    display: boolean;
    image: ImageDto | null;
  }>({
    display: false,
    image: null,
  });

  const [variantActive, setVariantActive] = useState<VariantDto | undefined>(
    product?.variants?.find((item: VariantDto) => item.is_default) ||
      product?.variants?.[0],
  );
  return (
    <>
      {variantActive && (
        <div
          className={
            'p-3 grid grid-cols-1 lg:grid-cols-2 rounded-[10px] shadow-custom mt-3 bg-white gap-3'
          }
        >
          <ProductDetailImage
            product={product}
            setIsOpen={setIsOpen}
            variantActive={variantActive}
          />
          <ProductProperty
            product={product}
            variantActive={variantActive}
            productConfigurations={productConfigurations}
            onChange={(variant: VariantDto) => {
              setVariantActive(variant);
            }}
          />
        </div>
      )}
      <ProductDealSock />
      <div className={'grid grid-cols-1 lg:grid-cols-3 gap-3 my-3'}>
        <div className={'col-span-2'}>
          <ProductDescription product={product} />
          <ListKeyword product={product} />
          <ProductQuestionAnswer questions={product?.question_answers || []} />
        </div>

        <div>
          <ProductInformation product={product} />
          <ProductRelation products={relatedProducts} />
        </div>
      </div>

      <PopupImage
        open={isOpen.display}
        setIsOpen={setIsOpen}
        image={isOpen.image}
        product={product}
        variantActive={variantActive}
      />
    </>
  );
};
export default ProductDetailCard;

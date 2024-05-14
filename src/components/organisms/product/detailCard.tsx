import { ProductDto } from '@/dtos/Product.dto';
import ProductDetailImage from '@/components/molecules/product/image/productDetailImage';
import ProductProperty from '@/components/molecules/product/property';
import PopupImage from '@/components/molecules/product/image/popupImage';
import { useState } from 'react';
import { ImageDto } from '@/dtos/Image.dto';

type Props = {
  product: ProductDto;
};
const ProductDetailCard = ({ product }: Props) => {
  const [isOpen, setIsOpen] = useState<{
    display: boolean;
    image: ImageDto | null;
  }>({
    display: false,
    image: null,
  });
  return (
    <>
      <div className={'p-3 grid grid-cols-1 lg:grid-cols-2'}>
        <ProductDetailImage product={product} setIsOpen={setIsOpen} />
        <ProductProperty product={product} />
      </div>
      <PopupImage
        open={isOpen.display}
        setIsOpen={setIsOpen}
        image={isOpen.image}
        product={product}
      />
    </>
  );
};
export default ProductDetailCard;

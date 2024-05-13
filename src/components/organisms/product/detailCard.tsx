import { ProductDto } from '@/dtos/Product.dto';
import ProductDetailImage from '@/components/molecules/product/image/productDetailImage';
import ProductProperty from '@/components/molecules/product/property';
import PopupImage from '@/components/molecules/product/image/popupImage';

type Props = {
  product: ProductDto;
};
const ProductDetailCard = ({ product }: Props) => {
  return (
    <>
      <div className={'p-3 grid grid-cols-1 lg:grid-cols-2'}>
        <ProductDetailImage product={product} />
        <ProductProperty product={product} />
      </div>
      <PopupImage />
    </>
  );
};
export default ProductDetailCard;

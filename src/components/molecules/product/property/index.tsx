import { ProductDto } from '@/dtos/Product.dto';

type Props = {
  product: ProductDto;
}
const ProductProperty = ({product}: Props) => {
  return(
    <div>
     <h1>{product.name}</h1>
    </div>
  )
}
export default ProductProperty;

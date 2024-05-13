import { ProductDto } from '@/dtos/Product.dto';

export class ResponseProductDetailPageDto {
  product?: ProductDto;
  relatedProducts?: ProductDto[];
}

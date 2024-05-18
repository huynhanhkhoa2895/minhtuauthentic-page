import { ProductDto } from '@/dtos/Product.dto';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';

export class ResponseProductDetailPageDto {
  product?: ProductDto;
  relatedProducts?: ProductDto[];
  productConfigurations?: ProductConfigurationsDto[];
}

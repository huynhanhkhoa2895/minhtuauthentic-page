import { ProductDto } from '@/dtos/Product.dto';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { SettingsDto } from '@/dtos/Settings.dto';

export class ResponseProductDetailPageDto {
  product?: ProductDto;
  relatedProducts?: ProductDto[];
  productConfigurations?: ProductConfigurationsDto[];
  settings?: SettingsDto[];
}

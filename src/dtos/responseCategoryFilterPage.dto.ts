import { ProductDto } from '@/dtos/Product.dto';
import { ProductFilterOptionDto } from '@/dtos/ProductFilterSettingOption/ProductFilterOption.dto';

export class ResponseCategoryFilterPageDto {
  products?: ProductDto[];
  settings?: ProductFilterOptionDto;
}

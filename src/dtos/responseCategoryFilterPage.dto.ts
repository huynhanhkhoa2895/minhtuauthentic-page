import { ProductDto } from '@/dtos/Product.dto';
import { ProductFilterOptionDto } from '@/dtos/ProductFilterSettingOption/ProductFilterOption.dto';
import { CategoryDto } from '@/dtos/Category.dto';

export class ResponseCategoryFilterPageDto {
  products?: ProductDto[];
  total?: number;
  settings?: ProductFilterOptionDto;
  category?: CategoryDto;
  title?: string;
}

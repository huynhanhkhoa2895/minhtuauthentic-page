import { ProductDto } from '@/dtos/Product.dto';
import { SettingsDto } from '@/dtos/Settings.dto';

export class ResponseCategoryFilterPageDto {
  products?: ProductDto[];
  settings?: SettingsDto[];
}

import { ProductFilterPriceRangeDto } from '@/dtos/SettingOption/ProductFilterPriceRange.dto';

export class ProductFilterOptionDto {
  concentration_gradient_id?: number[];
  content?: string;
  fragrance_retention_id?: number[];
  product_configuration_id?: Record<number, number[]>
  sex?: number[];
  price_range?: ProductFilterPriceRangeDto[];
}
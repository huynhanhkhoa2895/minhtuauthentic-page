import { ProductFilterPriceRangeDto } from '@/dtos/ProductFilterSettingOption/ProductFilterPriceRange.dto';
import { ConcentrationGradientDto } from '@/dtos/ConcentrationGradient.dto';
import { FragranceRetentionDto } from '@/dtos/FragranceRetention.dto';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { ProductConfigurationValuesDto } from '@/dtos/productConfigurationValues.dto';

export class ProductFilterOptionDto {
  concentration_gradients?: ConcentrationGradientDto[];
  fragrance_retention?: FragranceRetentionDto[];
  product_configurations?: {
    configuration: ProductConfigurationsDto;
    values: ProductConfigurationValuesDto[];
  }[];
  sex?: number[];
  price_range?: ProductFilterPriceRangeDto[];
}

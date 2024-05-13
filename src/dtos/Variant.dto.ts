import { BaseDto } from '@/dtos/Base.dto';
import { ProductDto } from '@/dtos/Product.dto';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';

export class VariantDto extends BaseDto {
  product_id?: number;
  regular_price?: number;
  price?: number;
  is_default?: boolean;
  product?: ProductDto;
  images?: ImageDetailDto[];

  constructor(init?: Partial<VariantDto>) {
    super();
    Object.assign(this, init);
  }
}

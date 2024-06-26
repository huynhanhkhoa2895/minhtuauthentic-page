import { BaseDto } from '@/dtos/Base.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import { OrdersDto } from '@/dtos/Orders.dto';
import { CouponDetailDto } from '@/dtos/CouponDetail.dto';
import { ImageDto } from '@/dtos/Image.dto';

export class OrderItemsDto extends BaseDto {
  type?: string;
  variant_price?: number;
  variant_regular_price?: number;
  variant_name?: string;
  price_minus?: number;
  price?: number;
  variant_id?: number;
  order_id?: number;
  note?: string;
  qty?: number;
  variant?: VariantDto;
  order?: OrdersDto;
  coupons?: CouponDetailDto[];
  image?: ImageDto;
  slug?: string;
  constructor(init?: Partial<OrderItemsDto>) {
    super();
    Object.assign(this, init);
  }
}

import { PromotionsDto } from '@/dtos/Promotions.dto';
import { BaseDto } from '@/dtos/Base.dto';
import { CouponDetailDto } from '@/dtos/CouponDetail.dto';

export default class CouponsDto extends BaseDto {
  code?: string;
  promotion_id?: number;
  promotion?: PromotionsDto;
  coupon_details?: CouponDetailDto[];
}

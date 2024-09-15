import { BaseDto } from '@/dtos/Base.dto';
import { OrderStatus } from '@/config/enum';
import { UserDto } from '@/dtos/User.dto';
import { PaymentsDto } from '@/dtos/Payments.dto';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import { CouponDetailDto } from '@/dtos/CouponDetail.dto';

export class OrdersDto extends BaseDto {
  id?: number;
  type?: string;
  total_price?: number;
  user_id?: number;
  payment_id?: number;
  note?: string;
  status?: OrderStatus;
  phone?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_district?: string;
  shipping_ward?: string;
  city?: string;
  district?: string;
  ward?: string;
  shipping_price?: number;
  user?: UserDto;
  payment?: PaymentsDto;
  order_items?: OrderItemsDto[];
  coupons?: CouponDetailDto[];
}

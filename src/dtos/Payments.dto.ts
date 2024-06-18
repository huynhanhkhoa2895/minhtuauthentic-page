import { OrdersDto } from '@/dtos/Orders.dto';
import { BaseDto } from '@/dtos/Base.dto';

export class PaymentsDto extends BaseDto {
  name?: string;
  label?: string;
  type?: number;
  orders?: OrdersDto[];
}

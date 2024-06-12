import { OrdersDto } from '@/dtos/Orders.dto';
import { BaseDto } from '@/dtos/Base.dto';

export class PaymentsDto extends BaseDto {
  name?: string;
  value?: number;
  type?: number;
  orders?: OrdersDto[];
}

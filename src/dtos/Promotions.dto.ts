import { BaseDto } from '@/dtos/Base.dto';

export class PromotionsDto extends BaseDto {
  name?: string;
  type?: string;
  condition_syntax?: string;
  condition_value?: string;
  start_date?: Date;
  end_date?: Date;
}

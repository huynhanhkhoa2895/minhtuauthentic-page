import { BaseDto } from '@/dtos/Base.dto';
import { Index } from '@/dtos/SettingOption';

export class SettingsDto extends BaseDto {
  key?: string;
  value?: Index;
  type?: string;
}

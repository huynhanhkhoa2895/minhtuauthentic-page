import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import { BrandDto } from '@/dtos/Brand.dto';
export class ResponseMenuDto {
  homeMenuCategory?: StaticComponentDto[];
  brands?: BrandDto[];
  constructor(init?: Partial<ResponseMenuDto>) {
    Object.assign(this, init);
  }
}

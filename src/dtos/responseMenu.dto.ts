import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
export class ResponseMenuDto {
  homeMenuCategory?: StaticComponentDto[];

  constructor(init?: Partial<ResponseMenuDto>) {
    Object.assign(this, init);
  }
}

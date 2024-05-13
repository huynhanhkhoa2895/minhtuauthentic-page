import { ResponseProductDetailPageDto } from './responseProductDetailPage.dto';

export class ResponseSlugPageDto {
  slug?: string;
  model?: string;
  model_id?: number;
  type?: string;
  data?: ResponseProductDetailPageDto;
  constructor(init?: Partial<ResponseSlugPageDto>) {
    Object.assign(this, init);
  }
}

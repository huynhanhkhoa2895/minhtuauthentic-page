import { ResponseProductDetailPageDto } from './responseProductDetailPage.dto';

export class ResponseSlugPageDto<T> {
  slug?: string;
  model?: string;
  model_id?: number;
  type?: string;
  data?: T;
  constructor(init?: Partial<ResponseSlugPageDto<T>>) {
    Object.assign(this, init);
  }
}

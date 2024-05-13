export class SlugDto {
  slug?: string;
  model?: string;
  model_id?: number;
  constructor(init?: Partial<SlugDto>) {
    Object.assign(this, init);
  }
}

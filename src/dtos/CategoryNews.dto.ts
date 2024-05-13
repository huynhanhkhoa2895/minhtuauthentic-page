import { BaseDto } from '@/dtos/Base.dto';
import { INewsCategoriesDto } from '@/dtos/INewsCategories.dto';
import { SlugDto } from '@/dtos/Slug.dto';

export class CategoryNewsDto extends BaseDto {
  name?: string;
  is_feature?: boolean;
  description?: string;
  news?: INewsCategoriesDto[];
  slugs?: SlugDto;
}

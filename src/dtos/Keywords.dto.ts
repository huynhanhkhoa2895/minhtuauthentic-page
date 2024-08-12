import KeywordDetailDto from '@/dtos/KeywordDetail.dto';
import { SlugDto } from '@/dtos/Slug.dto';

export default class KeywordsDto {
  id?: number;
  value?: string;
  type?: string;
  keyword_detail?: KeywordDetailDto[];
  slugs?: SlugDto;
}

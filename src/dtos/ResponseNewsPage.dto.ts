import { NewsDto } from '@/dtos/News.dto';
import { CategoryNewsDto } from '@/dtos/CategoryNews.dto';

export class ResponseNewsPageDto {
  news?: NewsDto[];
  categoryNews?: CategoryNewsDto[];
  newest?: NewsDto[];
}

import { NewsDto } from '@/dtos/News.dto';

export class ResponseNewsDetailPageDto {
  news?: NewsDto;
  relationNews?: NewsDto[];
}

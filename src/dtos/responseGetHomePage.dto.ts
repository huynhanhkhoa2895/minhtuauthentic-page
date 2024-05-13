import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import {StaticContentsDto} from "@/dtos/StaticContents.dto";
import { BrandDto } from '@/dtos/Brand.dto';
import { NewsDto } from '@/dtos/News.dto';
import { SettingsDto } from '@/dtos/Settings.dto';

export class ResponseGetHomePageDto {
  banners?: StaticContentsDto[];
  homeMenuCategory?: StaticComponentDto[];
  homeCategory?: StaticComponentDto[];
  homeBlockUnderSlide?: StaticContentsDto[];
  homeBlockFeaturedCategory?: StaticContentsDto[];
  homeBrand?: BrandDto[];
  bannerUnderCategory?: StaticContentsDto[];
  homeNews?: {
    featured: NewsDto[];
    news: NewsDto[];
  }
  settings?: SettingsDto[];
}

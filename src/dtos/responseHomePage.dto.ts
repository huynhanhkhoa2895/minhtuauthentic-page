import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import { BrandDto } from '@/dtos/Brand.dto';
import { NewsDto } from '@/dtos/News.dto';
import { SettingsDto } from '@/dtos/Settings.dto';
import { PromotionsDto } from '@/dtos/Promotions.dto';

export class ResponseHomePageDto {
  banners?: StaticContentsDto[];
  homeCategory?: StaticComponentDto[];
  homeBlockUnderSlide?: StaticContentsDto[];
  homeBlockFeaturedCategory?: StaticContentsDto[];
  homeBrand?: BrandDto[];
  homeFlashSale?: PromotionsDto;
  homeNews?: {
    featured: NewsDto[];
    news: NewsDto[];
  };
  bannerUnderCategory?: StaticContentsDto[];
  settings?: SettingsDto[];

  constructor(init?: Partial<ResponseHomePageDto>) {
    Object.assign(this, init);
  }
}

import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { SettingsDto } from '@/dtos/Settings.dto';
import CommonSettingDto from '@/dtos/CommonSetting.dto';

export type PopupDisplay = {
  title?: string;
  type?: string;
  data: unknown;
  display: boolean;
  isHaveChildren?: boolean;
};
export type MenuDisplay = {
  type?: string;
  data: unknown;
};
export type TProductSeen = {
  created: number;
  data: number[];
};
export const enum POPUP_TYPE {
  CATEGORY = 'category',
  PRODUCT = 'product',
  BRAND = 'brand',
  NEWS = 'news',
}

export type ServerSideProps = {
  menu: ResponseMenuDto | undefined;
  footerContent: ResponseFooterDto | undefined;
  settings: SettingsDto[];
};

export type SEOProps = {
  title?: string | null;
  description?: string | null;
  canonical?: string;
  image?: string;
  width?: number;
  height?: number;
  keyword?: string;
};
export enum LogoProps {
  HEADER = 'header',
  FOOTER = 'footer',
}
export type PageSetting = {
  menu: ResponseMenuDto | undefined;
  footerContent: ResponseFooterDto | undefined;
  settings: SettingsDto[];
  commonSettings?: CommonSettingDto;
};

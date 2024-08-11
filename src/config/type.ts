import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { SettingsDto } from '@/dtos/Settings.dto';

export type PopupDisplay = {
  type?: string;
  data: unknown;
  display: boolean;
  isHaveChildren?: boolean;
};
export type MenuDisplay = {
  type?: string;
  data: unknown;
};
export enum POPUP_TYPE {
  CATEGORY = 'category',
  PRODUCT = 'product',
  BRAND = 'brand',
  NEWS = 'news',
}

export type ServerSideProps = {
  menu: ResponseMenuDto;
  footerContent: ResponseFooterDto;
  settings: SettingsDto[];
};

export type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  width?: number;
  height?: number;
};

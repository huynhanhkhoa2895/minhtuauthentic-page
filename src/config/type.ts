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

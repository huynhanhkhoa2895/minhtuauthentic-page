export enum CONTROLLER_GROUP {
  PRICE = 'price',
}
export enum SUBMIT_TYPE {
  STAY = 'stay',
  BACK = 'back',
}
export enum FIELD_TYPE {
  SORT = 'sort',
  STRING = 'string',
  TREE_STRING = 'tree-string',
  BOOLEAN = 'boolean',
  SELECT_MULTIPLE = 'select-multiple',
  SELECT = 'select',
  NUMBER = 'number',
  PRICE = 'price',
  IMAGE = 'image',
  SLUG = 'slug',
  TEXT_EDITOR = 'text-editor',
  TEXT_AREA = 'text-area',
  JSON = 'json',
  COLOR = 'color',
  RADIO = 'radio',
  GROUP = 'group',
  CONTROLLER_GROUP = 'controller-group',
  TAG_LINK = 'tag_link',
  VARIANT = 'variant',
  SEO = 'seo',
  STATIC_DESCRIPTION = 'static-description',
  SETTING = 'setting',
}
export enum Entity {
  PRODUCTS = 'ProductsEntity',
  NEWS = 'NewsEntity',
  KEYWORDS = 'KeywordEntity',
  CATEGORIES = 'CategoriesEntity',
  CATEGORY_NEWS = 'CategoryNewsEntity',
  BRANDS = 'BrandsEntity',
  IPRODUCTCATEGORIES = 'IProductCategoriesEntity',
  INEWSCATEGORIES = 'INewsCategoriesEntity',
  IPRODUCTBRANDS = 'IProductBrandsEntity',
}
export enum STATIC_COMPONENT_TYPE {
  CATEGORY = 'home-category',
  MENU_CATEGORY = 'home-menu-category',
}

export enum STATIC_CONTENT_TYPE {
  FOOTER = 'footer',
  FOOTER_LOGO_PAYMENT = 'footer-logo-payment',
  FOOTER_LOGO_SOCIAL = 'footer-logo-social',
  BANNER = 'banner',
  BANNER_ABOVE = 'banner-above',
  BANNER_BELOW = 'banner-below',
  BLOCK_UNDER_SLIDE = 'home-block-under-slide',
  BLOCK_UNDER_CATEGORY = 'banner-under-category',
  FEATURE_CATEGORY = 'home-feature-category',
}

export enum PRODUCT_CONFIGURATIONS {
  PRODUCT_CONFIGURATIONS = 'product-configurations',
  PRODUCT_CONFIGURATION_VALUES = 'product-configuration-values',
}
export enum BLOCK_UNDER_CATEGORY_POSITION {
  LEFT = 'trái',
  RIGHT = 'phải',
}
export enum SETTING_TYPE {
  HOME = 'home',
}
export const SETTING_KEY = {
  GENERAL: {
    PRIMARY_COLOR: {
      KEY: 'primary_color',
      LABEL: 'Màu chủ đạo',
    },
  },
  BRAND_SECTION: {
    KEY: 'brand_section',
    LABEL: 'Vùng thương hiệu nổi bật',
  },
  NEWS_SECTION: {
    KEY: 'news_section',
    LABEL: 'Vùng tin tức',
  },
  FEATURE_CATEGORY: {
    KEY: 'feature_category',
    LABEL: 'Danh mục nổi bật',
  },
  PRODUCT_DETAIL_OFFER_SPECIAL_CONTENT: {
    KEY: 'product_detail_offer_special_content',
    LABEL: 'Nội dung ưu đãi đặc biệt',
  },
  PRODUCT_DETAIL_HOW_TO_BUY: {
    KEY: 'product_detail_how_to_buy',
    LABEL: 'Hướng dẫn mua hàng và thanh toán',
  },
  PRODUCT_DETAIL_GUARANTEE: {
    KEY: 'product_detail_guarantee',
    LABEL: 'Chính sách đổi trả và bảo hành',
  },
};

export const CATEGORY_FILTER = {
  SORT_BY: {
    DATE_DESC: 'date_desc',
    DATE_ASC: 'date_asc',
    NAME_ASC: 'name_asc',
    NAME_DESC: 'name_desc',
    PRICE_ASC: 'price_asc',
    PRICE_DESC: 'price_desc',
  },
};

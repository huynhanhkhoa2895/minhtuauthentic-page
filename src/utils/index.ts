import { Entity, PROMOTION_PRICE_TYPE, PROMOTION_TYPE } from '@/config/enum';
import { VariantDto } from '@/dtos/Variant.dto';
import { IVariantProductConfigurationValuesDto } from '@/dtos/iVariantProductConfigurationValues.dto';
import CouponsDto from '@/dtos/Coupons.dto';
import { PromotionsDto } from '@/dtos/Promotions.dto';
import dayjs from 'dayjs';
import crypto from 'crypto';
import { OrdersDto } from '@/dtos/Orders.dto';
import querystring from 'qs';
export function formatMoney(
  amount: number | string,
  decimalCount = 0,
  decimal = '.',
  thousands = ',',
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = Number(amount) < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(Number(amount) - Number(i))
            .toFixed(decimalCount)
            .slice(2)
        : '') +
      '₫'
    );
  } catch (e) {
    console.log(e);
  }
}
export const parseNameToField = (
  data: any,
  listField: string[],
  index: number,
): string => {
  try {
    if (!data) return '';
    const _data = data[listField[index]];
    if (index === listField.length - 1) {
      return _data;
    }
    return parseNameToField(_data, listField, index + 1);
  } catch (e) {
    throw e;
  }
};

export const getModelEntity = (model: string) => {
  switch (model) {
    case 'product':
    case 'products':
      return Entity.PRODUCTS;
    case 'news':
      return Entity.NEWS;
    case 'category-news':
      return Entity.CATEGORY_NEWS;
    case 'category':
    case 'categories':
      return Entity.CATEGORIES;
    case 'brand':
    case 'brands':
      return Entity.BRANDS;
    case 'keywords':
    case 'keyword':
      return Entity.KEYWORDS;
  }
};

export const generateSlugToHref = (slug?: string) => {
  if (!slug || slug === '/') return '/';
  if (slug.charAt(0) !== '/') {
    if (slug.startsWith('http') || slug.startsWith('https')) {
      return slug;
    }
    return `/${slug}`;
  }
  return slug;
};

export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

export function isValidHttpUrl(string: string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

export function getPriceWithCoupon(
  price: number,
  coupons: CouponsDto | CouponsDto[],
) {
  if (!Array.isArray(coupons)) {
    coupons = [coupons];
  }
  for (const coupon of coupons) {
    price = price - calculatePriceMinus(price, coupon);
  }
  return price;
}

export function calculatePriceMinus(price: number, coupon?: CouponsDto) {
  let priceMinus = 0;

  if (!coupon) return priceMinus;
  if (coupon.price_minus_type === PROMOTION_PRICE_TYPE.PRICE) {
    priceMinus = coupon.price_minus_value || 0;
  } else {
    priceMinus = (price * (coupon?.price_minus_value || 0)) / 100;
  }
  return priceMinus;
}

export function calculatePricePercent(variant: VariantDto | undefined) {
  if (!variant) return 0;
  return Math.round(
    (((variant?.price || 0) - (variant?.regular_price || 0)) /
      (variant?.price || 1)) *
      100,
  );
}

export function SexName(sex: number) {
  switch (sex) {
    case 0:
      return 'Nữ';
    case 1:
      return 'Nam';
    case 2:
      return 'Unisex';
  }
}

export function parseQueryString(queryString: string) {
  // Decode the query string
  const decodedString = decodeURIComponent(queryString);

  // Split the query string into individual key-value pairs
  const pairs = decodedString.split('&');

  // Initialize the result object
  const result: any = {};

  pairs.forEach((pair) => {
    // Split each pair into key and value
    const [key, value] = pair.split('=');

    // Extract the main key and index from the query key
    const match = key.match(/filter\[(.*?)\]\[(\d+)\]/);

    if (match) {
      const mainKey = match[1];
      const index = match[2];

      // Initialize the array if it doesn't exist
      if (!result[mainKey]) {
        result[mainKey] = [];
      }

      // Assign the value to the correct index
      result[mainKey][index] = value;
    }
  });

  return result;
}

export function variantName(
  variant_product_configuration_values?: IVariantProductConfigurationValuesDto[],
) {
  if (!variant_product_configuration_values) return '';
  let str = '';
  variant_product_configuration_values.map((item) => {
    str += `(${item?.product_configuration_value?.product_configuration?.name}: ${item?.product_configuration_value?.value}) `;
  });
  return str.trim();
}

export function getCookie(
  name: string,
  cookie: string,
  toObject: boolean = false,
) {
  if (toObject) {
    const rs = cookie.split(';').reduce((cookieObject: any, cookieString) => {
      let splitCookie: any = cookieString.split('=');
      try {
        cookieObject[splitCookie[0].trim()] = decodeURIComponent(
          splitCookie[1],
        );
      } catch (error) {
        cookieObject[splitCookie[0].trim()] = splitCookie[1];
      }
      return cookieObject;
    }, []);
    return rs ? rs[name] : null;
  }
  const value = `; ${cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return (parts.pop() || '').split(';').shift();
}

export function promotionName(promotion?: PromotionsDto) {
  if (!promotion) return '';
  if (promotion.name) {
    return promotion.name;
  }
  switch (promotion.type) {
    case PROMOTION_TYPE.DEAL_SOCK:
      return 'Giá mua kèm';
    case PROMOTION_TYPE.FLASH_SALE:
      return 'Flash Sale';
  }
}

function sortObject(obj: Record<string, string>) {
  let sorted: Record<string, string> = {};
  let str = [];
  let key;
  for (let key in obj){
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (let key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export function createVNPayUrl({
  order,
  ip,
}: {
  order: OrdersDto;
  ip: string;
}) {
  console.log('order createVNPayUrl', order);
  let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  const hmac = crypto.createHmac('sha512', 'LJMH2I0INPF1CZLENWLTXMC3PN8ZWBSV');
  let signDataObject: Record<string, string> = {};
  const params = new URLSearchParams();
  params.append('vnp_Amount', ((order.total_price || 0) * 100).toString());
  params.append('vnp_Command', 'pay');
  params.append('vnp_CreateDate', dayjs().format('YYYYMMDDHHmmss'));
  params.append('vnp_CurrCode', 'VND');
  params.append('vnp_IpAddr', ip);
  params.append('vnp_Locale', 'vn');
  params.append(
    'vnp_OrderInfo',
    `Thanh toan don hang cua user ${order.user_id} voi gia tri ${order.total_price}`,
  );
  params.append('vnp_OrderType', 'other');
  params.append(
    'vnp_ReturnUrl',
    process.env.NEXT_PUBLIC_RETURN_URL_VNPAY || '',
  );
  params.append('vnp_TmnCode', 'MTAUTEST');
  params.append('vnp_TxnRef', (order?.id || Math.random()).toString());
  params.append('vnp_Version', '2.1.0');

  params.forEach((value, key) => {
    signDataObject[key] = value;
  });
  signDataObject = sortObject(signDataObject);
  const signData = querystring.stringify(signDataObject, { encode: false });
  console.log('order signData', signDataObject, signData);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  params.append('vnp_SecureHash', signed);
  vnpUrl += '?' + params.toString();
  console.log('order vnpUrl', vnpUrl);
  return vnpUrl;
}

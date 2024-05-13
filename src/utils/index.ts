import { Entity } from '@/config/enum';

export function formatMoney(
  amount: number | string,
  decimalCount = 3,
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
  if (!slug) return '/';
  if (slug.charAt(0) !== '/') return `/${slug}`;
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

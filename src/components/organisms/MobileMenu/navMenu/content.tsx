import React, { Fragment } from 'react';
import { ProductFilterOptionDto } from '@/dtos/ProductFilterSettingOption/ProductFilterOption.dto';
import { MenuDisplay } from '@/config/type';
import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import Link from 'next/link';
import { generateSlugToHref, SexName } from '@/utils';
import { BrandDto } from '@/dtos/Brand.dto';
import BrandWithImage from '@/components/atoms/brands/brandWithImage';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';
import { SlugDto } from '@/dtos/Slug.dto';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { ProductConfigurationValuesDto } from '@/dtos/productConfigurationValues.dto';
type Props = {
  setting?: ProductFilterOptionDto;
  menu: MenuDisplay;
  brands: BrandDto[];
};

type DataValue = {
  label: string;
  value: string;
  image?: ImageDetailDto[];
  slug?: SlugDto;
};

export default function NavMenuContent({ setting, menu, brands }: Props) {
  const _menu = menu.data as StaticComponentDto;

  const generateLabel = (label: string) => {
    const obj: Record<string, string> = {
      brands: 'Thương hiệu',
      price_range: 'Khoảng giá',
      concentration_gradients: 'Nồng độ',
      fragrance_retention: 'Độ giữ mùi',
      sex: 'Giới tính',
      product_configurations: 'Biến thể',
    };
    return obj[label];
  };

  const generateValue = (name: string, items: unknown[]): DataValue[] => {
    const obj: Record<string, () => any> = {
      brands: () => {
        return brands.slice(0, 20).map((item) => {
          return {
            label: item.name,
            value: item.id,
            image: item.images,
            slug: item.slugs,
          };
        });
      },
      sex: () => {
        return [0, 1, 2].map((item) => {
          return {
            label: SexName(item) as string,
            value: item.toString(),
          };
        });
      },
      price_range: () => {
        const priceRange = items as {
          label: string;
          min: number;
          max: number;
        }[];
        return priceRange.map((item) => {
          return {
            label: item.label,
            value: item.min + '_' + item.max,
          };
        });
      },
      product_configurations: () => {
        const _configurations = items as {
          configuration: ProductConfigurationsDto;
          values: ProductConfigurationValuesDto[];
        }[];
        const _itemConfigurations: { label: string; value: number }[] = [];
        _configurations.forEach((item) => {
          item.values.forEach((value) => {
            _itemConfigurations.push({
              label: item.configuration.name + ': ' + value.value,
              value: value.id || 0,
            });
          });
        });
        return _itemConfigurations;
      },
      fragrance_retention: () => {
        return items.map((item: any) => {
          return {
            label: item.name as string,
            value: item.id as number,
          };
        });
      },
      concentration_gradients: () => {
        return items.map((item: any) => {
          return {
            label: item.name as string,
            value: item.id as number,
          };
        });
      },
    };
    let data: any = [];
    if (obj[name]) {
      data = [...obj[name]()];
    }
    return data;
  };

  const renderItem = (name: string, url: string, item: DataValue) => {
    switch (name) {
      case 'brands':
        return (
          <BrandWithImage
            className={'p-[5px_10px]'}
            classNameImage={'max-w-[50px] object-contain'}
            brand={
              new BrandDto({
                images: item.image,
                slugs: item.slug,
              })
            }
          />
        );
      default:
        return (
          <Link
            href={url}
            className={'border border-gray-200 p-2 rounded-[10px] block'}
          >
            {item.label}
          </Link>
        );
    }
  };

  const filtersSetting: {
    label: string;
    name: string;
    data: DataValue[];
  }[] = Object.keys(setting || {}).map((key) => {
    return {
      name: key,
      label: generateLabel(key),
      data: generateValue(key, (setting as any)[key]),
      // value: setting[key],
    };
  });
  return (
    <>
      <div className={'flex items-center justify-between p-3'}>
        <span className={'text-xl font-bold'}>{_menu.category?.name}</span>
        <Link
          className={'text-sm'}
          href={generateSlugToHref(_menu?.category?.slugs?.slug)}
        >
          Xem tất cả
        </Link>
      </div>
      <div className={'flex flex-col'}>
        {filtersSetting.map((item, index) => {
          if (item.name === 'categories') {
            return null;
          }
          return (
            <div className={'p-3'} key={'filtersSetting' + index}>
              <p className={'font-semibold text-md'}>{item.label}</p>
              <div className={'flex flex-wrap gap-2'}>
                {item.data.map((_item, index) => {
                  const url =
                    generateSlugToHref(_menu?.slugs?.slug) +
                    `?${item.name}=${_item.value}`;
                  return (
                    <Fragment key={'content-filter-' + index}>
                      {renderItem(item.name, url, _item)}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

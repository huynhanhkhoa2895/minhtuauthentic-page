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
type Props = {
  setting: ProductFilterOptionDto;
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
        return <Link href={url}>{item.label}</Link>;
    }
  };

  const filtersSetting: {
    label: string;
    name: string;
    data: DataValue[];
  }[] = Object.keys(setting).map((key) => {
    return {
      name: key,
      label: generateLabel(key),
      data: generateValue(key, (setting as any)[key]),
      // value: setting[key],
    };
  });
  console.log('filtersSetting', filtersSetting);
  return (
    <>
      <div className={'flex items-center justify-between p-3'}>
        <span className={'text-xl font-bold'}>{_menu.category?.name}</span>
        <Link
          className={'text-sm'}
          href={generateSlugToHref(_menu?.slugs?.slug)}
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
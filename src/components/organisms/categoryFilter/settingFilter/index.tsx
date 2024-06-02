import { ProductFilterOptionDto } from '@/dtos/ProductFilterSettingOption/ProductFilterOption.dto';
import { ReactNode } from 'react';
import SettingFilterItem from '@/components/organisms/categoryFilter/settingFilter/item';
import { ConcentrationGradientDto } from '@/dtos/ConcentrationGradient.dto';
import { FragranceRetentionDto } from '@/dtos/FragranceRetention.dto';
import { SexName } from '@/utils';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { ProductConfigurationValuesDto } from '@/dtos/productConfigurationValues.dto';
import { ProductFilterPriceRangeDto } from '@/dtos/ProductFilterSettingOption/ProductFilterPriceRange.dto';

type Props = {
  settings?: ProductFilterOptionDto;
};
export default function SettingFilter({ settings }: Props) {
  const renderTree = () => {
    let xhtml: ReactNode[] = [];
    for (const key in settings) {
      switch (key) {
        case 'concentration_gradients':
          (settings[key] as ConcentrationGradientDto[]).length > 0 &&
            xhtml.push(
              <SettingFilterItem
                key={key}
                filterKey={key}
                title={'Nồng độ'}
                value={settings[key] || []}
              />,
            );
          break;
        case 'fragrance_retention':
          (settings[key] as FragranceRetentionDto[]).length > 0 &&
            xhtml.push(
              <SettingFilterItem
                key={key}
                filterKey={key}
                title={'Lưu hương'}
                value={settings[key] || []}
              />,
            );
          break;
        case 'sex':
          (settings[key] as number[]).length > 0 &&
            xhtml.push(
              <SettingFilterItem
                key={key}
                filterKey={key}
                title={'Giới tính'}
                value={(settings[key] || []).map((item) => ({
                  id: item,
                  name: SexName(item),
                }))}
              />,
            );
          break;
        case 'price_range':
          (settings[key] as ProductFilterPriceRangeDto[]).length > 0 &&
            xhtml.push(
              <SettingFilterItem
                key={key}
                filterKey={key}
                title={'Khoảng giá'}
                value={(settings[key] || []).map(
                  (item: ProductFilterPriceRangeDto) => {
                    return {
                      id: item.min + '_' + item.max,
                      name: item.label,
                    };
                  },
                )}
              />,
            );
          break;
        case 'product_configurations':
          (
            settings[key] as {
              configuration: ProductConfigurationsDto;
              values: ProductConfigurationValuesDto[];
            }[]
          ).length > 0 &&
            (settings[key] || []).map(
              (item: {
                configuration: ProductConfigurationsDto;
                values: ProductConfigurationValuesDto[];
              }) => {
                xhtml.push(
                  <SettingFilterItem
                    key={key}
                    filterKey={key}
                    title={item.configuration.name || ''}
                    value={item.values.map((value) => ({
                      id: value.id,
                      name: value.value,
                    }))}
                  />,
                );
              },
            );
          break;
      }
    }
    return xhtml;
  };
  return <div className={'hidden lg:block p-3'}>{renderTree()}</div>;
}

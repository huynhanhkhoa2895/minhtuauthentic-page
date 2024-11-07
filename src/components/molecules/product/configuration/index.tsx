import { CheckOutlined } from '@ant-design/icons/lib/icons';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { VariantDto } from '@/dtos/Variant.dto';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import { ProductConfigurationValuesDto } from '@/dtos/productConfigurationValues.dto';
import { useRouter } from 'next/router';
type Props = {
  productConfigurations: ProductConfigurationsDto[];
  onChange?: (value: StateProps[]) => void;
  value: StateProps[];
  variantMap: Map<number, VariantDto>;
};
type StateProps = {
  configurationId: number;
  valueId: number;
  variant?: VariantDto;
};
export default function ProductConfiguration({
  productConfigurations,
  onChange,
  value,
  variantMap,
}: Props) {
  const [valueIdActive, setValueActiveId] = useState<StateProps[]>(value);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      onChange && onChange(valueIdActive);
    }
  }, [valueIdActive]);

  const renderItem = (
    value: ProductConfigurationValuesDto,
    isActived?: StateProps,
    variant?: VariantDto,
  ): ReactNode => {
    return (
      <>
        <span>{value.value}</span>
        {isActived && (
          <span
            className={
              'absolute bg-primary bottom-[-20px] right-[-20px] w-[35px] h-[35px] rotate-45'
            }
          >
            <CheckOutlined
              style={{
                transform: variant?.slugs?.slug
                  ? 'rotate(-45deg) translateX(-4px) translateY(5px)'
                  : 'rotate(-45deg) translateX(-15px) translateY(-3px)',
              }}
              className={'text-white w-[8px] h-[8px]'}
            />
          </span>
        )}
      </>
    ) as ReactNode;
  };

  return (
    <>
      {(productConfigurations || []).map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}: </p>
            <div className={'flex gap-1 lg:gap-3 flex-wrap items-center'}>
              {item?.product_configuration_values?.map((value, index2) => {
                const isActived = (valueIdActive || []).find(
                  (item) => item.valueId === value.id,
                );
                if (!value.id) {
                  return null;
                }
                const variant = variantMap.get(value.id);
                if (!variant) {
                  return null;
                }

                return (
                  <div
                    key={index + '_' + index2}
                    className={'flex gap-3 flex-wrap'}
                  >
                    {variant?.slugs &&
                    router.asPath !==
                      generateSlugToHref(variant?.slugs?.slug) ? (
                      <Link
                        href={generateSlugToHref(variant?.slugs?.slug)}
                        className={twMerge(
                          'rounded-[10px] p-2 lg:p-3 border border-gray-300 text-gray-500 relative overflow-hidden font-extrabold',
                          isActived ? 'border-primary' : '',
                        )}
                      >
                        {renderItem(value, isActived, variant)}
                      </Link>
                    ) : (
                      <button
                        type={'button'}
                        onClick={() => {
                          setValueActiveId(() => {
                            const indexConfiguration = valueIdActive.findIndex(
                              (_item) => _item.configurationId === item.id,
                            );
                            const newValue = [...valueIdActive];
                            newValue[indexConfiguration].valueId = value.id!;
                            return newValue;
                          });
                        }}
                        className={twMerge(
                          'rounded-[10px] p-2 lg:p-3 border border-gray-300 text-gray-500 relative overflow-hidden font-extrabold',
                          isActived ? 'border-primary' : '',
                        )}
                      >
                        {renderItem(value, isActived)}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

import { CheckOutlined } from '@ant-design/icons/lib/icons';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
type Props = {
  productConfigurations: ProductConfigurationsDto[];
  onChange?: (value: StateProps[]) => void;
  value: StateProps[];
};
type StateProps = {
  configurationId: number;
  valueId: number;
};
export default function ProductConfiguration({
  productConfigurations,
  onChange,
  value,
}: Props) {
  const [valueIdActive, setValueActiveId] = useState<StateProps[]>(value);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      onChange && onChange(valueIdActive);
    }
  }, [valueIdActive]);

  return (
    <>
      {(productConfigurations || []).map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}: </p>
            <div className={'flex gap-3 flex-wrap items-center'}>
              {item?.product_configuration_values?.map((value, index2) => {
                const isActived = valueIdActive.find(
                  (item) => item.valueId === value.id,
                );
                return (
                  <div
                    key={index + '_' + index2}
                    className={'flex gap-3 flex-wrap py-3'}
                  >
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
                        'rounded-[10px] p-3 border border-gray-300 text-gray-500 relative overflow-hidden font-bold',
                        isActived ? 'border-primary' : '',
                      )}
                    >
                      <span>{value.value}</span>
                      {isActived && (
                        <span
                          className={
                            'absolute bg-primary bottom-[-20px] right-[-20px] w-[35px] h-[35px] rotate-45'
                          }
                        >
                          <CheckOutlined
                            style={{
                              transform:
                                'rotate(-45deg) translateX(-15px) translateY(-3px)',
                            }}
                            className={'text-white w-[8px] h-[8px]'}
                          />
                        </span>
                      )}
                    </button>
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

import { Checkbox, Tree } from 'antd';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import CategoryFilterContext from '@/contexts/categoryFilterContext';
type Props = {
  title: string;
  value: Partial<{ id: string | number; name: string }>[];
  filterKey: string;
  entity?: string;
};
export default function SettingFilterItem({
  title,
  value,
  filterKey,
  entity,
}: Props) {
  const [check, setCheck] = useState<Record<string | number, boolean>>({});
  const ctx = useContext(CategoryFilterContext);
  useEffect(() => {
    const _check: Record<string | number, boolean> = {};
    (ctx?.filters?.[filterKey] || []).map((item) => {
      _check[item] = true;
    });
    setCheck(_check);
    // setDebounceCheck(_check);
  }, [ctx?.filters]);

  const onClickCheck = (id: string | number) => {
    let _filter = { ...ctx?.filters };
    const value = _filter[filterKey] || [];
    const checked = !check[id];
    const indexValue = value.findIndex(
      (item) => item.toString() === id.toString(),
    );
    if (indexValue === -1 && checked && !value.includes(id)) {
      value.push(id);
    } else if (indexValue > -1 && !checked) {
      value.splice(indexValue, 1);
    }
    _filter[filterKey] = value;
    ctx?.setFilters && ctx.setFilters(_filter);
  };
  const renderValue = () => {
    return (
      <>
        {((value as any[]) || []).map((item: any, index: number) => {
          return (
            <Checkbox
              key={filterKey + '_' + item.name + '_' + item.id + '_'}
              checked={check[item.id]}
              onClick={() => onClickCheck(item.id)}
              className={'filter-checkbox'}
              disabled={
                ctx?.loading ||
                (ctx?.dataSlug?.model ? ctx?.dataSlug?.model === entity : false)
              }
            >
              {item.name}
            </Checkbox>
          );
        })}
      </>
    );
  };
  return (
    <div className={'flex flex-col gap-2 mb-3'}>
      <h4 className={'font-semibold text-[16px] pb-2 border-b border-gray-500'}>
        {title}
      </h4>
      <div className={'max-h-[220px] overflow-auto flex flex-col'}>
        {renderValue()}
      </div>
    </div>
  );
}

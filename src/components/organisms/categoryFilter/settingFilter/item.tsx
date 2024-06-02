import { Checkbox, Tree } from 'antd';
import { useContext, useEffect, useState } from 'react';
import CategoryFilterContext from '@/contexts/categoryFilterContext';
type Props = {
  title: string;
  value: Partial<{ id: string | number; name: string }>[];
  filterKey: string;
};
export default function SettingFilterItem({ title, value,filterKey }: Props) {
  const ctx = useContext(CategoryFilterContext);
  const [filterValue, setFilterValue] = useState<{checked: boolean, id: string | number}[]>([])
  useEffect(() => {
    const timeout = setTimeout(()=>{
      let _filter = {...ctx?.filters}
      filterValue.map((item)=>{
        if (item) {
          if (!_filter[filterKey]) {
            if (item?.checked) {
              _filter = {..._filter,...{[filterKey] : [item?.id]}}
            }
          } else {
            const value = [..._filter[filterKey]] || [];
            const index = value.findIndex((_item)=>item?.id === _item);
            if (index > -1) {
              if (!item?.checked) {
                value.splice(index, 1)
              }
            } else {
              if (item?.checked && item?.id) {
                value.push(item?.id)
              }
            }
            _filter[filterKey] = value;

          }
        }

      })

      ctx?.setFilters && ctx.setFilters(_filter)
    },200)
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [filterValue]);
  useEffect(() => {
    console.log('ctx?.filters',ctx?.filters)
  }, [ctx?.filters]);
  const handleChange = (checked: boolean, id: number | string) => {
    let _filter = {...ctx?.filters}

    return _filter;
  }
  const renderValue = () => {

    return (
      <>
        {((value as any[]) || []).map((item: any, index: number) => {
          return (
            <Checkbox
              key={item.name + '_' + item.id}
              onChange={(_value) => {
                item.id && setFilterValue((value)=>{
                  if (value) {
                    value[index] = { checked: _value.target.checked, id: item.id }
                  }
                  return [...value]
                })
              }}
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
      {renderValue()}
    </div>
  );
}

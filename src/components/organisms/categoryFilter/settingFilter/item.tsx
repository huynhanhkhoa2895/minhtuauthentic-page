import { Checkbox, Tree } from 'antd';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import CategoryFilterContext from '@/contexts/categoryFilterContext';
import { parseQueryString } from '@/utils';
import { useRouter } from 'next/router';
type Props = {
  title: string;
  value: Partial<{ id: string | number; name: string }>[];
  filterKey: string;
};
export default function SettingFilterItem({ title, value, filterKey }: Props) {
  const router = useRouter();
  const queryString = new URLSearchParams(
    router.query as Record<string, string>,
  );
  const ctx = useContext(CategoryFilterContext);
  const [filterValue, setFilterValue] = useState<
    { checked: boolean; id: string | number }[]
  >([]);
  const [isReady, setIsReady] = useState(false);
  const refFilter = useRef<Record<any, any>[]>(
    parseQueryString(queryString.toString()),
  );
  useEffect(() => {
    setIsReady(true);
  }, []);
  useEffect(() => {
    let timeout = null;
    if (isReady) {
      timeout = setTimeout(() => {
        let _filter = { ...ctx?.filters };
        filterValue.map((item) => {
          if (item) {
            if (!_filter[filterKey]) {
              if (item?.checked) {
                _filter = { ..._filter, ...{ [filterKey]: [item?.id] } };
              }
            } else {
              const value = [..._filter[filterKey]] || [];
              const index = value.findIndex(
                (_item) => item?.id.toString() === _item.toString(),
              );
              if (index > -1) {
                if (!item?.checked) {
                  value.splice(index, 1);
                }
              } else {
                if (item?.checked && item?.id) {
                  value.push(item?.id);
                }
              }
              _filter[filterKey] = value;
            }
          }
        });
        console.log('filter', _filter);
        ctx?.setFilters && ctx.setFilters(_filter);
      }, 200);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [filterValue]);
  const renderValue = () => {
    return (
      <>
        {((value as any[]) || []).map((item: any, index: number) => {
          const isDefaultChecked = refFilter.current[
            filterKey as any
          ]?.includes(item.id.toString());
          return (
            <Checkbox
              key={
                filterKey +
                '_' +
                item.name +
                '_' +
                item.id +
                '_' +
                (isDefaultChecked ? 'true' : 'false')
              }
              defaultChecked={isDefaultChecked}
              onChange={(_value) => {
                console.log('value change', _value, item.id);
                item.id != null &&
                  setFilterValue((value) => {
                    if (value != null) {
                      value[index] = {
                        checked: _value.target.checked,
                        id: item.id,
                      };
                    }
                    return [...value];
                  });
              }}
              disabled={ctx?.loading}
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

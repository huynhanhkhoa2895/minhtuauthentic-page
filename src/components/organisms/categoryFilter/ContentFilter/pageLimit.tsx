import { Select } from 'antd';
import { useContext } from 'react';
import CategoryFilterContext from '@/contexts/categoryFilterContext';
export default function PageLimit() {
  const ctx = useContext(CategoryFilterContext);
  const pages = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: -1, label: 'All' },
  ];
  return (
    <div className="flex lg:items-center">
      <Select
        className={'w-20'}
        defaultValue={ctx?.limit || 10}
        options={pages}
        onChange={(value) => {
          ctx?.setLimit && ctx.setLimit(value);
        }}
      />
    </div>
  );
}

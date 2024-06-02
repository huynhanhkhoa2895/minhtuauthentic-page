import { Select } from 'antd';
import { useContext } from 'react';
import CategoryFilterContext from '@/contexts/categoryFilterContext';
export default function PageLimit() {
  const ctx = useContext(CategoryFilterContext);
  const pages = [
    { value: 24, label: '24' },
    { value: 48, label: '48' },
    { value: 64, label: '64' },
    { value: -1, label: 'All' },
  ];
  return (
    <div className="flex items-center">
      <Select
        className={'w-20'}
        defaultValue={24}
        options={pages}
        onChange={(value) => {
          ctx?.setLimit && ctx.setLimit(value);
        }}
      />
    </div>
  );
}

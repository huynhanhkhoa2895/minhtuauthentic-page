import { Checkbox, Tree } from 'antd';
type Props = {
  title: string;
  value: Partial<{ id: string | number; name: string }>[];
  onChange: (value: number) => void;
};
export default function SettingFilterItem({ title, value, onChange }: Props) {
  const renderValue = () => {
    return (
      <>
        {((value as any[]) || []).map((item: any) => {
          return (
            <Checkbox
              key={item.name + '_' + item.id}
              onChange={() => {
                item.id && onChange(item.id);
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

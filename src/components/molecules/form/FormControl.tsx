import { Checkbox, Input, Select } from 'antd';
import { Controller } from 'react-hook-form';
import { ReactNode } from 'react';
import { UserOutlined } from '@ant-design/icons';

type Props = {
  control: any;
  errors: any;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  prefix?: ReactNode;
  field?: any;
  selectOptions?: { label: string | ReactNode; value: string }[];
};
type RenderFieldProps = Omit<Props, 'control' | 'errors' | 'name'> & {
  onChange: (value: string) => void;
};
const RenderField = ({
  type,
  field,
  prefix,
  placeholder,
  onChange,
  selectOptions,
}: RenderFieldProps) => {
  switch (type) {
    case 'password':
      return (
        <Input
          type={'password'}
          placeholder={placeholder}
          {...field}
          prefix={prefix}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'checkbox':
      return <Checkbox {...field} />;
    case 'select':
      return <Select
        className={'w-full'}
        options={selectOptions || []}
        onChange={(value) => onChange(value)}
        placeholder={placeholder}
      />
    default:
      return (
        <Input
          placeholder={placeholder}
          {...field}
          prefix={prefix}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};
export default function FormControl({
  control,
  errors,
  name,
  type,
  placeholder,
  prefix,
  className,
  selectOptions,
}: Props) {
  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <RenderField
            prefix={prefix}
            placeholder={placeholder}
            type={type}
            selectOptions={selectOptions}
            onChange={(value: string) => {
              field.onChange(value);
            }}
          />
        )}
      />
      {errors && errors[name] && errors[name]?.message && (
        <p className={'ml-2 text-red-400 text-sm'}>{errors[name]?.message}</p>
      )}
    </div>
  );
}

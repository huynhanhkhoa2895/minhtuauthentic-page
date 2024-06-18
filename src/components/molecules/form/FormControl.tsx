import { Checkbox, Input, Radio, Select } from 'antd';
import { Controller } from 'react-hook-form';
import { ReactNode } from 'react';
import { UserOutlined } from '@ant-design/icons';
import RadioForm from '@/components/atoms/radioForm';
const { TextArea } = Input;
type Props = {
  control: any;
  errors: any;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  prefix?: ReactNode;
  field?: any;
  selectOptions?: {
    label: string | ReactNode;
    value: string;
    code_name?: string;
  }[];
  radioOptions?: { label: string; value: string }[];
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
  radioOptions,
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
    case 'radio':
      return (
        <RadioForm
          radioOptions={radioOptions || []}
          value={field.value}
          onChange={(value) => onChange(value)}
        />
      );
    case 'select':
      return (
        <Select
          className={'w-full'}
          options={selectOptions || []}
          onChange={(value) => onChange(value)}
          placeholder={placeholder}
          showSearch
          filterOption={(input, option) => {
            return (
              (option?.label || '')
                ?.toString()
                .toLowerCase()
                .search(input.toLowerCase()) >= 0 ||
              (option?.code_name || '')
                ?.toString()
                .toLowerCase()
                .search(input.toLowerCase()) >= 0
            );
          }}
        />
      );
    case 'textarea':
      return (
        <TextArea
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ height: 100 }}
          value={field.value}
        />
      );
    default:
      return (
        <Input
          placeholder={placeholder}
          value={field.value}
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
  radioOptions,
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
            radioOptions={radioOptions}
            field={field}
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

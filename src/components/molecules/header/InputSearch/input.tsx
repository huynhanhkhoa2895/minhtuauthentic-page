import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { Button, Input } from 'antd';
import CloseCircle from '@/components/icons/closeCircle';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onCloseClick?: () => void;
};
export default function InputSearch({
  className,
  onChange,
  onClick,
  onCloseClick,
}: Props) {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (value.length > 0) {
      onChange && onChange(value);
    }
  }, [value]);

  return (
    <Input
      className={twMerge(
        'h-[40px] text-black rounded-[10px] border-0 p-[5px_10px] focus-visible:outline-none focus-visible:border-0 w-full',
        className,
      )}
      type="text"
      placeholder="Tìm kiếm sản phẩm"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      prefix={<SearchOutlined className={'w-6 h-6'} />}
      suffix={
        <Button
          icon={<CloseCircle className={'w-6 h-6'} />}
          type={'link'}
          onClick={() => {
            setValue('');
            onCloseClick && onCloseClick();
          }}
        ></Button>
      }
      onClick={() => {
        onClick && onClick();
        // ctx?.setIsOpenSearch && ctx.setIsOpenSearch(true);
      }}
    />
  );
}

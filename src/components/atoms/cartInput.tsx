import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { PlusIcon } from '@/components/icons/plus';
import { MinusIcon } from '@/components/icons/minus';

type Props = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};
export default function CartInput({ value, onChange, className }: Props) {
  const [_value, setValue] = useState(value || 0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      onChange && onChange(_value);
    }
  }, [_value]);
  return (
    <div
      className={twMerge(
        'flex items-center gap-2 justify-center border rounded-[10px] border-grey',
        className,
      )}
    >
      <button className="text-[16px] font-extrabold block text-[#d3d3d3]">
        <MinusIcon className={'w-6 h-6 text-[#d3d3d3]'} />
      </button>
      <input
        type="text"
        className="text-[16px] font-semibold w-[35px] text-black text-center"
        value={_value}
      />
      <button className="text-[16px] font-extrabold block text-[#d3d3d3]">
        <PlusIcon className={'w-6 h-6 text-[#d3d3d3]'} />
      </button>
    </div>
  );
}

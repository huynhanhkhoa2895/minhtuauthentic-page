import { Radio, RadioChangeEvent } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  radioOptions: { label: string; value: string }[];
};
export default function RadioForm({ value, onChange, radioOptions }: Props) {
  const [_val, setVal] = useState(value);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      onChange(_val);
    }
  }, [_val]);
  const handleChange = (e: RadioChangeEvent) => {
    setVal(e.target.value);
  };

  return (
    <Radio.Group onChange={handleChange} value={_val.toString()}>
      {radioOptions.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}

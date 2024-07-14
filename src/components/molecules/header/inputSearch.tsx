import { useCallback, useEffect, useState } from 'react';
import { ProductDto } from '@/dtos/Product.dto';

export const InputSearch = () => {
  const [value, setValue] =   useState<string>('');
  const [debouceValue, setDebouceValue] = useState<string>('');
  const [data, setData] = useState<ProductDto[]>([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouceValue(value);
    },350)
    return () => {
      clearTimeout(timeout);
    }
  }, [value]);

  useEffect(() => {
    searchProduct();
  }, [debouceValue]);

  const searchProduct = useCallback(() => {
    if (debouceValue.length < 3) return;
    fetch(`/api/search/product?search=${debouceValue}`).then((res) => res.json()).then((data) => {
      console.log(data);
    })
  },[debouceValue])

  return (
    <div className={'w-full relative z-[3]'}>
      <input
        className={
          'h-[40px] rounded-[10px] border-0 p-[5px_45px_5px_25px] focus-visible:outline-none focus-visible:border-0 w-full'
        }
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {/*{*/}
      {/*  <div className={'absolute inset-0'}></div>*/}
      {/*}*/}

    </div>
  );
};
export default InputSearch;

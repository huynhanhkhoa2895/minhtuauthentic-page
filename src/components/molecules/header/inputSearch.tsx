import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { ProductDto } from '@/dtos/Product.dto';
import PriceWithLineThrough from '@/components/atoms/priceWithLineThrough';
import { Button, Input, List, Skeleton } from 'antd/es';
import { twMerge } from 'tailwind-merge';
import CloseCircle from '@/components/icons/closeCircle';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SearchContainer from '@/components/molecules/search/seachContainer';
import { SEARCH_KEYWORD } from '@/config/enum';
import { SearchData } from '@/config/type';
import appContext from '@/contexts/appContext';
type Props = {
  classname?: string;
  classNameInput?: string;
  isMobile?: boolean;
};
export const InputSearch = ({ classname, isMobile, classNameInput }: Props) => {
  const [value, setValue] = useState<string>('');
  const [debouceValue, setDebouceValue] = useState<string>('');
  const ctx = useContext(appContext);
  const [data, setData] = useState<SearchData>();
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [urlSearch, setUrlSearch] = useState<string>('');
  const [loading, startTransition] = useTransition();
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (urlSearch && event.key === 'Enter') {
        window.location.href = urlSearch;
      }
    };
    document.addEventListener('keydown', handleEnter);
    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, [urlSearch]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ctx?.setIsOpenSearch
      ) {
        ctx.setIsOpenSearch(false);
        setData(undefined);
        setValue('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (!ctx?.isOpenSearch && ready && value && ctx?.setIsOpenSearch) {
      ctx.setIsOpenSearch(true);
    }
    const timeout = setTimeout(() => {
      setDebouceValue(value);
    }, 350);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  useEffect(() => {
    if (isMobile) {
      if (ctx?.isOpenSearch) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }, [ctx?.isOpenSearch]);

  useEffect(() => {
    searchProduct();
    if (debouceValue) {
      setUrlSearch(`/san-pham?search=${debouceValue}`);
    } else {
      setUrlSearch('');
    }
  }, [debouceValue]);

  const searchProduct = useCallback(() => {
    if (debouceValue.length < 1) return;
    startTransition(async () => {
      const keyword: string | null = localStorage.getItem(SEARCH_KEYWORD);
      const keywordList: string[] = keyword
        ? keyword.toString().split(',')
        : [];
      if (!keywordList.includes(debouceValue)) {
        if (keywordList.length >= 10) {
          keywordList.pop();
        }
        keywordList.unshift(debouceValue);
        localStorage.setItem(SEARCH_KEYWORD, keywordList.join(','));
      }
      fetch(`/api/search/product?search=${debouceValue}&limit=12`)
        .then((res) => res.json())
        .then((data) => {
          setData(data?.data || []);
        })
        .finally(() => {});
    });
  }, [debouceValue]);

  return (
    <div className={twMerge('w-full relative z-[3]', classname)} ref={ref}>
      <Input
        className={
          'h-[40px] text-black rounded-[10px] border-0 p-[5px_10px] focus-visible:outline-none focus-visible:border-0 w-full'
        }
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
              setData(undefined);
              ctx?.setIsOpenSearch && ctx.setIsOpenSearch(false);
            }}
          ></Button>
        }
        onClick={() => {
          ctx?.setIsOpenSearch && ctx.setIsOpenSearch(true);
        }}
      />
      {ctx?.isOpenSearch && (
        <SearchContainer
          isMobile={isMobile}
          data={data}
          loading={loading}
          urlSearch={urlSearch}
        />
      )}
    </div>
  );
};
export default InputSearch;

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { Button, Input, List, Skeleton } from 'antd/es';
import { twMerge } from 'tailwind-merge';
import { SEARCH_KEYWORD } from '@/config/enum';
import { SearchData } from '@/config/type';
import appContext from '@/contexts/appContext';
import dynamic from 'next/dynamic';
import { isDesktop, isMobile } from 'react-device-detect';
import { SettingsDto } from '@/dtos/Settings.dto';
import InputSearch from '@/components/molecules/header/InputSearch/input';
import searchContext from '@/contexts/searchContext';
type Props = {
  classname?: string;
  classNameInput?: string;
  isForMobile?: boolean;
  settings?: SettingsDto[];
};
export const InputSearchWrapper = ({
  classname,
  isForMobile,
  classNameInput,
  settings,
}: Props) => {
  const [value, setValue] = useState<string>('');
  const [debouceValue, setDebouceValue] = useState<string>('');
  const ctx = useContext(searchContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  const [loading, startTransition] = useTransition();
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ctx?.setIsOpenSearch &&
        isDesktop
      ) {
        ctx.setIsOpenSearch(false);
        setValue('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (isMobile) {
      if (ctx?.isOpenSearch) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }, [ctx?.isOpenSearch]);

  const saveKeyword = useCallback(() => {
    const keyword: string | null = localStorage.getItem(SEARCH_KEYWORD);
    const keywordList: string[] = keyword ? keyword.toString().split(',') : [];
    if (!keywordList.includes(debouceValue)) {
      if (keywordList.length >= 10) {
        keywordList.pop();
      }
      keywordList.unshift(debouceValue);
      localStorage.setItem(SEARCH_KEYWORD, keywordList.join(','));
    }
  }, [debouceValue]);

  const renderContent = () => {
    return (
      <div className={twMerge('w-full relative z-[3]', classname)} ref={ref}>
        <InputSearch
          onChange={(value) => {
            setValue(value);
          }}
          onCloseClick={() => {
            ctx?.setIsOpenSearch && ctx.setIsOpenSearch(false);
            saveKeyword();
          }}
          onClick={() => {
            ctx?.setIsOpenSearch && ctx.setIsOpenSearch(true);
          }}
        />
      </div>
    );
  };

  if (!isForMobile && isMobile) {
    return null;
  }

  return <>{renderContent()}</>;
};
export default InputSearchWrapper;

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export type TypeSearchState = {
  isOpenSearch: boolean;
  setIsOpenSearch: Dispatch<SetStateAction<boolean>> | undefined;
  setSearchValue: Dispatch<SetStateAction<string>> | undefined;
  debounceValue: string;
};
const SearchContext = createContext<TypeSearchState | undefined>(undefined);
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchValue);
    }, 350);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  useEffect(() => {
    if (isOpenSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpenSearch]);

  return (
    <SearchContext.Provider
      value={{
        isOpenSearch,
        setIsOpenSearch,
        setSearchValue,
        debounceValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchContext;

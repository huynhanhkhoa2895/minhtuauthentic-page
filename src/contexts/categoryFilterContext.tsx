import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { CATEGORY_FILTER } from '@/config/enum';
const CategoryFilterContext = createContext<TypeAppState | undefined>(
  undefined,
);
import { useRouter } from 'next/router';

export type TypeAppState = {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>> | undefined;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>> | undefined;
  settings?: Record<string, string>;
  setSettings?: Dispatch<SetStateAction<Record<string, string>>> | undefined;
};

export const CategoryFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sortBy, setSortBy] = useState<string>(
    CATEGORY_FILTER.SORT_BY.DATE_DESC,
  );
  const [limit, setLimit] = useState<number>(24);
  const router = useRouter();
  const [count, setCount] = useState(0);
  const refTimer = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', sortBy);
    params.set('limit', limit.toString());

    updateRouter(params.toString());
  }, [sortBy, limit]);

  const updateRouter = (params: string) => {
    setCount(count + 1);
    router.push(
      {
        pathname: router.pathname,
        query: params.toString(),
      },
      router.asPath.split('?')[0] + '?' + params,
      { shallow: true },
    );
  };

  useEffect(() => {
    if (count > 1) {
      refTimer.current = setTimeout(() => {}, 500);
    }
    return () => {
      refTimer.current && clearTimeout(refTimer.current);
    };
  }, [count]);

  return (
    <CategoryFilterContext.Provider
      value={{ sortBy, setSortBy, limit, setLimit }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};

export default CategoryFilterContext;

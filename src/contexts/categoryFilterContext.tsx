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
import { parseQueryString } from '@/utils';

export type TypeAppState = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>> | undefined;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>> | undefined;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>> | undefined;
  settings?: Record<string, string>;
  setSettings?: Dispatch<SetStateAction<Record<string, string>>> | undefined;
  filters?: Record<string, (number | string)[]>;
  setFilters?:
    | Dispatch<SetStateAction<Record<string, (number | string)[]>>>
    | undefined;
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
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const queryString = new URLSearchParams(
    router.query as Record<string, string>,
  );
  const [filters, setFilters] = useState<Record<string, (number | string)[]>>(
    parseQueryString(queryString.toString()),
  );
  const [count, setCount] = useState(0);
  const refTimer = React.useRef<NodeJS.Timeout | null>(null);
  const refTimerCount = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let _filter = '';
    params.set('sort', sortBy);
    params.set('limit', limit.toString());
    console.log('params', params);
    for (const key in filters) {
      for (const [index, value] of (filters[key] as any).entries()) {
        params.delete(`filter[${key}][${index}]`);
        params.append(`filter[${key}][${index}]`, value.toString());
      }
    }
    refTimerCount.current = setTimeout(() => {
      updateRouter(params.toString());
    }, 500);
  }, [sortBy, limit, filters]);

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
    if (count > 1 && router.query?.slug?.length && !loading) {
      refTimer.current = setTimeout(() => {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        fetch(
          `/api/getProduct/${((router?.query?.slug as string[]) || []).join('/')}?` +
            params.toString(),
        )
          .then((res) => {
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      }, 500);
    }
    return () => {
      refTimer.current && clearTimeout(refTimer.current);
    };
  }, [count]);

  return (
    <CategoryFilterContext.Provider
      value={{
        sortBy,
        setSortBy,
        limit,
        setLimit,
        filters,
        setFilters,
        loading,
        setLoading,
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};

export default CategoryFilterContext;

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { CATEGORY_FILTER, Entity } from '@/config/enum';
const CategoryFilterContext = createContext<TypeAppState | undefined>(
  undefined,
);
import { useRouter } from 'next/router';
import { parseQueryString } from '@/utils';
import { ProductDto } from '@/dtos/Product.dto';
import { ResponseCategoryFilterPageDto } from '@/dtos/responseCategoryFilterPage.dto';
import { SlugDto } from '@/dtos/Slug.dto';

export type TypeAppState = {
  objFilterByValue: Record<string, Record<string, string>>;
  setObjFilterByValue:
    | Dispatch<SetStateAction<Record<string, Record<string, string>>>>
    | undefined;
  page: number;
  setPage: Dispatch<SetStateAction<number>> | undefined;
  total: number;
  setTotal: Dispatch<SetStateAction<number>> | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>> | undefined;
  search: string;
  setSearch: Dispatch<SetStateAction<string>> | undefined;
  dataSlug: SlugDto | null;
  setDataSlug: Dispatch<SetStateAction<SlugDto | null>> | undefined;
  products: ProductDto[];
  setProducts: Dispatch<SetStateAction<ProductDto[]>> | undefined;
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
  isOpenFilter?: boolean;
  setIsOpenFilter?: Dispatch<SetStateAction<boolean>> | undefined;
};

export const CategoryFilterProvider = ({
  children,
  isSearch,
}: {
  children: React.ReactNode;
  isSearch?: boolean;
}) => {
  const router = useRouter();
  const queryString = new URLSearchParams(
    router.query as Record<string, string>,
  );
  const [sortBy, setSortBy] = useState<string>(
    queryString.get('sort') || CATEGORY_FILTER.SORT_BY.DATE_DESC,
  );
  const [dataSlug, setDataSlug] = useState<SlugDto | null>(null);

  const [limit, setLimit] = useState<number>(
    Number(queryString.get('limit')) || 10,
  );
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(queryString.get('search') || '');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [objFilterByValue, setObjFilterByValue] = useState<
    Record<string, Record<string, string>>
  >({});
  const [filters, setFilters] = useState<Record<string, (number | string)[]>>(
    parseQueryString(queryString.toString()),
  );
  const [count, setCount] = useState(0);
  const refTimer = React.useRef<NodeJS.Timeout | null>(null);
  const refTimerCount = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('sort', sortBy);
    params.append('limit', limit.toString());
    params.append('page', page.toString());
    params.append('search', search.toString());

    for (const key in filters) {
      for (const [index, value] of (filters[key] as any).entries()) {
        params.delete(`filter[${key}][${index}]`);
        params.append(`filter[${key}][${index}]`, value.toString());
      }
    }

    refTimerCount.current = setTimeout(() => {
      updateRouter(params.toString());
    }, 500);
  }, [sortBy, limit, filters, page, search]);
  useEffect(() => {
    const _filters: Record<string, (string | number)[]> = {};
    if (dataSlug?.model === Entity.CATEGORIES) {
      _filters['categories'] = [dataSlug.model_id as number];
    } else if (dataSlug?.model === Entity.BRANDS) {
      _filters['brands'] = [dataSlug.model_id as number];
    }
    setFilters(Object.assign(_filters, filters));
  }, [dataSlug]);
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
      setLoading(true);
      refTimer.current = setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const url = isSearch
          ? `/api/getProduct/filter/?`
          : `/api/getProduct/${((router?.query?.slug as string[]) || []).join('/')}?`;
        fetch(url + params.toString())
          .then((res) => res.json())
          .then((res: { data: { data: ResponseCategoryFilterPageDto } }) => {
            setProducts(res?.data?.data?.products || []);
            setLoading(false);
            setTotal(res?.data?.data?.total || 0);
          })
          .catch((err) => {
            setLoading(false);
          });
      }, 200);
    }
    return () => {
      refTimer.current && clearTimeout(refTimer.current);
      if (loading) setLoading(false);
    };
  }, [count]);

  return (
    <CategoryFilterContext.Provider
      value={{
        total,
        setTotal,
        sortBy,
        setSortBy,
        limit,
        setLimit,
        filters,
        setFilters,
        loading,
        setLoading,
        products,
        setProducts,
        objFilterByValue,
        setObjFilterByValue,
        dataSlug,
        setDataSlug,
        page,
        setPage,
        search,
        setSearch,
        isOpenFilter,
        setIsOpenFilter,
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};

export default CategoryFilterContext;

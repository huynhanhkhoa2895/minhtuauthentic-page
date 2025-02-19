import { twMerge } from 'tailwind-merge';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import ImageWithFallback from '@/components/atoms/images/ImageWithFallback';
import { generateSlugToHref } from '@/utils';
import PriceWithLineThrough from '@/components/atoms/priceWithLineThrough';
import useSWR from 'swr';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { BrandDto } from '@/dtos/Brand.dto';
import Loading from '@/components/atoms/loading';
import { SEARCH_KEYWORD } from '@/config/enum';
import Tag from 'antd/es/tag';
import { createPortal } from 'react-dom';
import { SearchData } from '@/config/type';
import { isMobile } from 'react-device-detect';
import MenuFooter from '@/components/organisms/MobileMenu/menuFooter';
import { SettingsDto } from '@/dtos/Settings.dto';
import NavbarMenuListButton from '@/components/organisms/MobileMenu/navMenu/header/listHeaderButton';
import SearchContext from '@/contexts/searchContext';
import { NewsDto } from '@/dtos/News.dto';
import { ProductDto } from '@/dtos/Product.dto';
import InputSearch from '@/components/molecules/header/InputSearch/input';

type Props = {
  classNameInput?: string;
  settings?: SettingsDto[];
};

export default function SearchContainer({ classNameInput, settings }: Props) {
  const ctx = useContext(SearchContext);
  const [data, setData] = useState<SearchData>();
  const [urlSearch, setUrlSearch] = useState<string>('');
  const [height, setHeight] = useState<number>(0);
  const [loading, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement | null>(null);
  const fetcherBrand = () =>
    fetch(`/api/pages/feature-brand`, {
      method: 'GET',
    }).then((res) => res.json());
  const fetcherFeatureCategory = () =>
    fetch(`/api/pages/feature-category`, {
      method: 'GET',
    }).then((res) => res.json());
  const { data: dataFeatureCategory, isLoading: isLoadingFeatureCategory } =
    useSWR<{
      data: { homeBlockFeaturedCategory: StaticContentsDto[] };
    }>(`featureBlockCategorySearch`, fetcherFeatureCategory);

  const { data: dataFeatureBrand, isLoading: isLoadingBrand } = useSWR<{
    data: { brands: BrandDto[] };
  }>(`brandSearch`, fetcherBrand);

  useEffect(() => {
    searchProduct();
    const debouceValue = ctx?.debounceValue;
    console.log('debouceValue', debouceValue);
    if (debouceValue) {
      setUrlSearch(`/san-pham?search=${debouceValue}`);
    } else {
      setUrlSearch('');
    }
  }, [ctx?.debounceValue]);

  const searchProduct = useCallback(() => {
    const debouceValue = ctx?.debounceValue;
    if (!debouceValue || debouceValue.length < 1) return;
    startTransition(async () => {
      fetch(`/api/search/product?search=${debouceValue}&limit=12`)
        .then((res) => res.json())
        .then((data) => {
          setData(data?.data || []);
        })
        .finally(() => {});
    });
  }, [ctx?.debounceValue]);

  useEffect(() => {
    const handleResize = () => {
      if (window?.visualViewport?.height) {
        if (window.innerHeight - 68 < window.visualViewport.height) {
          setHeight(window.innerHeight - 68);
        } else {
          setHeight(window.visualViewport.height);
        }
      }
    };
    handleResize();
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const renderItemList = useMemo(() => {
    return (
      <div className={'flex flex-col lg:col-span-2 gap-3'}>
        {data?.products.length || loading ? (
          <ul className={'grid grid-cols-3 lg:grid-cols-6'}>
            {(data?.products || []).map((item: ProductDto, index: number) => {
              const variant = item?.variants?.[0];
              return (
                <li
                  key={index}
                  className={'shadow-[-1px_1px_#e1e1e1] p-[10px]'}
                >
                  <a
                    className={'flex flex-col gap-3'}
                    href={generateSlugToHref(item?.slugs?.slug)}
                  >
                    <ImageWithFallback
                      image={item?.feature_image_detail?.image}
                      className={'object-contain h-[100px]'}
                      unoptimized={true}
                    />
                    <div className={'flex flex-col'}>
                      <p className={'h-[65px] overflow-hidden'}>{item?.name}</p>
                      <PriceWithLineThrough
                        price={variant?.price}
                        regularPrice={variant?.regular_price}
                        classNameRegularPrice={'text-[12px] lg:text-[15px]'}
                      />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
        <a
          className={'w-full text-center text-primary font-bold p-1 block'}
          href={generateSlugToHref(urlSearch)}
        >
          Xem toàn bộ sản phẩm
        </a>
      </div>
    );
  }, [data, loading]);

  const renderNews = useMemo(() => {
    return (
      <div className={'flex flex-col'}>
        <p className={'font-bold text-xl border-b mb-3'}>Tin tức</p>
        <div className={'flex flex-col gap-3'}>
          {data?.news.map((item: NewsDto, index: number) => {
            return (
              <a href={generateSlugToHref(item?.slugs?.slug)} key={index}>
                <p>{item?.name}</p>
              </a>
            );
          })}
        </div>
        <a
          className={'w-full text-center text-primary font-bold p-1'}
          href={generateSlugToHref('/tin-tuc')}
        >
          Xem toàn bộ tin tức
        </a>
      </div>
    );
  }, [data]);

  const renderOldKeyword = () => {
    const keyword: string | null = localStorage.getItem(SEARCH_KEYWORD);
    const keywordList: string[] = keyword ? keyword.toString().split(',') : [];
    return (
      <>
        {keywordList.length > 0 && (
          <>
            <p className={'font-bold text-md'}>Bạn đã tìm kiếm</p>
            {
              <div className={'flex flex-wrap gap-2'}>
                {keywordList.map((item, index) => {
                  return (
                    <Tag key={index}>
                      <a href={'/san-pham?search=' + item}>{item}</a>
                    </Tag>
                  );
                })}
              </div>
            }
          </>
        )}
      </>
    );
  };

  const renderFeatureBrand = () => {
    return (
      <>
        <p className={'font-bold text-md'}>Thương hiệu nổi bật</p>
        {isLoadingBrand ? (
          <Loading center />
        ) : (
          <div className={'grid grid-cols-3 max-lg:gap-x1 lg:grid-cols-6'}>
            {dataFeatureBrand?.data?.brands.map((item, index) => {
              return (
                <a
                  href={generateSlugToHref(item?.slugs?.slug)}
                  key={index}
                  className={'flex items-center justofy-center'}
                >
                  <ImageWithFallback
                    image={item?.images?.[0].image}
                    className={'w-full'}
                    unoptimized={true}
                  />
                </a>
              );
            })}
          </div>
        )}
      </>
    );
  };

  const renderFeatureCategory = () => {
    return (
      <>
        <p className={'font-bold text-md'}>Danh mục nổi bật</p>
        {isLoadingFeatureCategory ? (
          <Loading center />
        ) : (
          <div className={'grid grid-cols-3 lg:grid-cols-6 gap-3'}>
            {dataFeatureCategory?.data?.homeBlockFeaturedCategory.map(
              (item, index) => {
                return (
                  <a
                    href={generateSlugToHref(item?.properties?.slug)}
                    key={index}
                    className={
                      'flex flex-col lg:flex-row items-center bg-[#f1f1f1]'
                    }
                  >
                    <ImageWithFallback
                      image={item?.images?.[0].image}
                      className={'w-[70px] h-[70px]'}
                      unoptimized={true}
                    />
                    <p className={'text-center'}>{item?.title}</p>
                  </a>
                );
              },
            )}
          </div>
        )}
      </>
    );
  };

  const renderPreSearch = () => {
    return (
      <>
        {renderOldKeyword()}
        {renderFeatureCategory()}
        {renderFeatureBrand()}
      </>
    );
  };

  const renderContent = () => {
    return (
      <div
        key={'search-container'}
        className={
          'flex flex-col gap-3 p-[1.5rem_1rem_1.5rem_1rem] lg:p-6 overflow-auto'
        }
      >
        {urlSearch ? (
          <>
            <div
              className={
                'lg:max-h-[550px] overflow-y-auto lg:grid lg:grid-cols-3'
              }
            >
              {renderItemList}
              {renderNews}
            </div>
          </>
        ) : (
          renderPreSearch()
        )}
      </div>
    );
  };

  return (
    <>
      {ctx?.isOpenSearch && (
        <>
          {isMobile ? (
            <>
              {createPortal(
                <div
                  className={
                    'fixed bg-white inset-0 w-[100dvw] h-[100dvh] z-[10000] flex flex-col overflow-hidden'
                  }
                >
                  <div
                    className={'overflow-auto'}
                    style={{ height: isMobile ? `${height}px` : 'auto' }}
                  >
                    <div className={'bg-primary'}>
                      <NavbarMenuListButton settings={settings} />
                      <div
                        className={twMerge('w-full relative z-[3] p-3')}
                        ref={ref}
                      >
                        <InputSearch
                          onChange={(value) => {
                            console.log('value', value);
                            ctx?.setSearchValue && ctx.setSearchValue(value);
                          }}
                          onCloseClick={() => {
                            ctx?.setIsOpenSearch && ctx.setIsOpenSearch(false);
                          }}
                        />
                      </div>
                    </div>
                    {renderContent()}
                    <MenuFooter isNoNeedFix={true} />
                  </div>
                </div>,
                document.body,
              )}
            </>
          ) : (
            <div
              className={twMerge(
                'absolute text-black top-[50px] bg-white w-[65vw] max-w-[1140px] rounded-[10px] left-0 shadow-custom2 z-[100]',
                classNameInput,
              )}
            >
              {renderContent()}
            </div>
          )}
        </>
      )}
    </>
  );
}

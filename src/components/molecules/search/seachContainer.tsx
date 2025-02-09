import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';
import { List, Skeleton } from 'antd';
import { ProductDto } from '@/dtos/Product.dto';
import ImageWithFallback from '@/components/atoms/images/ImageWithFallback';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import PriceWithLineThrough from '@/components/atoms/priceWithLineThrough';
import useSWR from 'swr';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { BrandDto } from '@/dtos/Brand.dto';
import Loading from '@/components/atoms/loading';
import { SEARCH_KEYWORD } from '@/config/enum';
import Tag from 'antd/es/tag';
import { NewsDto } from '@/dtos/News.dto';
import { createPortal } from 'react-dom';

type Props = {
  isMobile?: boolean;
  classNameInput?: string;
  data: ProductDto[];
  loading: boolean;
  urlSearch?: string;
  setIsOpened: (value: boolean) => void;
};

export default function SearchContainer({
  isMobile,
  classNameInput,
  data,
  loading,
  urlSearch,
  setIsOpened,
}: Props) {
  const fetcherBrand = () =>
    fetch(`/api/pages/feature-brand`, {
      method: 'GET',
    }).then((res) => res.json());
  const fetcherFeatureCategory = () =>
    fetch(`/api/pages/feature-category`, {
      method: 'GET',
    }).then((res) => res.json());
  const fetcherNews = () =>
    fetch(`/api/news/`, {
      method: 'GET',
    }).then((res) => res.json());
  const { data: dataFeatureCategory, isLoading: isLoadingFeatureCategory } =
    useSWR<{
      data: { homeBlockFeaturedCategory: StaticContentsDto[] };
    }>(`featureBlockCategorySearch`, fetcherFeatureCategory);

  const { data: dataFeatureBrand, isLoading: isLoadingBrand } = useSWR<{
    data: { brands: BrandDto[] };
  }>(`brandSearch`, fetcherBrand);

  const { data: dataNews, isLoading: isLoadingnews } = useSWR<{
    data: { news: NewsDto[] };
  }>(`newsSearch`, fetcherNews);

  const handleClick = () => {
    setIsOpened(false);
  };

  const renderItemList = useMemo(() => {
    return (
      <div className={'flex flex-col lg:col-span-2 gap-2'}>
        {data.length || loading ? (
          <ul className={'grid grid-cols-3 lg:grid-cols-6'}>
            {data.map((item, index) => {
              const variant = item?.variants?.[0];
              return (
                <li
                  key={index}
                  className={'shadow-[-1px_1px_#e1e1e1] p-[10px]'}
                >
                  <Link
                    onClick={handleClick}
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
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
        <Link
          onClick={handleClick}
          className={'w-full text-center text-primary font-bold p-1'}
          href={generateSlugToHref(urlSearch)}
        >
          Xem toàn bộ sản phẩm
        </Link>
      </div>
    );
  }, [data, loading]);

  const renderNews = useMemo(() => {
    return (
      <div className={'flex flex-col'}>
        <p className={'font-bold text-xl border-b mb-3'}>Tin tức</p>
        {isLoadingnews ? (
          <Loading center />
        ) : (
          <div className={'flex flex-col gap-3'}>
            {dataNews?.data?.news.map((item, index) => {
              return (
                <Link
                  onClick={handleClick}
                  href={generateSlugToHref(item?.slugs?.slug)}
                  key={index}
                >
                  <p>{item?.name}</p>
                </Link>
              );
            })}
          </div>
        )}
        <Link
          onClick={handleClick}
          className={'w-full text-center text-primary font-bold p-1'}
          href={generateSlugToHref('/tin-tuc')}
        >
          Xem toàn bộ tin tức
        </Link>
      </div>
    );
  }, [dataNews, isLoadingnews]);

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
                      <Link
                        onClick={handleClick}
                        href={'/san-pham?search=' + item}
                      >
                        {item}
                      </Link>
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
          <div className={'grid grid-cols-6'}>
            {dataFeatureBrand?.data?.brands.map((item, index) => {
              return (
                <Link
                  onClick={handleClick}
                  href={generateSlugToHref(item?.slugs?.slug)}
                  key={index}
                  className={'flex items-center justofy-center'}
                >
                  <ImageWithFallback
                    image={item?.images?.[0].image}
                    className={'w-full'}
                    unoptimized={true}
                  />
                </Link>
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
                  <Link
                    onClick={handleClick}
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
                  </Link>
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
        className={
          'flex flex-col gap-3 p-[140px_1rem_1.5rem_1rem] lg:p-6 max-lg:h-[calc(100%-67px)] overflow-auto'
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
      {isMobile ? (
        <>
          {createPortal(
            <div className={'fixed bg-white inset-0 w-screen h-screen z-[3]'}>
              {renderContent()}
            </div>,
            document.body,
          )}
        </>
      ) : (
        <div
          className={twMerge(
            'absolute text-black top-[50px] bg-white w-[65vw] max-w-[1140px] rounded-[10px] left-0 shadow-custom2',
            classNameInput,
          )}
        >
          {renderContent()}
        </div>
      )}
    </>
  );
}

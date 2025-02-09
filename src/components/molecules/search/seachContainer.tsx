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
type Props = {
  isMobile?: boolean;
  classNameInput?: string;
  data: ProductDto[];
  loading: boolean;
  urlSearch?: string;
};

export default function SearchContainer({
  isMobile,
  classNameInput,
  data,
  loading,
  urlSearch,
}: Props) {
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

  console.log(
    'dataFeatureCategory',
    dataFeatureCategory?.data?.homeBlockFeaturedCategory,
    dataFeatureBrand?.data?.brands,
  );

  const renderItemList = useMemo(() => {
    return (
      <>
        {data.length || loading ? (
          <List
            loading={loading}
            itemLayout="horizontal"
            key={Math.random()}
            dataSource={data}
            renderItem={(item: ProductDto) => {
              const variant = (item?.variants || [])?.find(
                (variant) => variant.is_default,
              );
              return (
                <List.Item>
                  <Skeleton avatar title={false} loading={loading} active>
                    <List.Item.Meta
                      avatar={
                        <ImageWithFallback
                          image={item?.feature_image_detail?.image}
                          className={'w-[50px] h-[50px]'}
                          unoptimized={true}
                        />
                      }
                      title={
                        <Link href={generateSlugToHref(item?.slugs?.slug)}>
                          {item.title || item.name}
                        </Link>
                      }
                      description={
                        !variant ? (
                          'Không có sản phẩm'
                        ) : (
                          <PriceWithLineThrough
                            regularPrice={variant.regular_price}
                            price={variant.price}
                          />
                        )
                      }
                    />
                  </Skeleton>
                </List.Item>
              );
            }}
          />
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </>
    );
  }, [data, loading]);

  const renderOldKeyword = () => {
    return (
      <>
        <p className={'font-bold text-md'}>Bạn đã tìm kiếm</p>
      </>
    );
  };

  const renderFeatureBrand = () => {
    return (
      <>
        <p className={'font-bold text-md'}>Thương hiệu nổi bật</p>
        {isLoadingFeatureCategory ? (
          <Loading center />
        ) : (
          <div className={'grid grid-cols-6'}>
            {dataFeatureBrand?.data?.brands.map((item, index) => {
              return (
                <Link
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
          <div className={'grid grid-cols-6 gap-3'}>
            {dataFeatureCategory?.data?.homeBlockFeaturedCategory.map(
              (item, index) => {
                return (
                  <Link
                    href={generateSlugToHref(item?.properties?.slug)}
                    key={index}
                    className={'flex items-center bg-[#f1f1f1]'}
                  >
                    <ImageWithFallback
                      image={item?.images?.[0].image}
                      className={'w-[50px] h-[50px]'}
                      unoptimized={true}
                    />
                    <p>{item?.title}</p>
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

  return (
    <div
      className={twMerge(
        'absolute text-black top-[50px] bg-white w-screen max-w-[1140px] rounded-[10px] shadow-custom left-0 shadow-custom2',
        isMobile && 'fixed w-[95vw] left-3 top-[60px]',
        classNameInput,
      )}
    >
      <div className={'flex flex-col gap-3 p-6'}>
        {urlSearch ? (
          <>
            <div className={'max-h-[50vh] overflow-y-auto'}>
              {renderItemList}
            </div>
            <a
              className={'w-full text-center text-primary font-semibold p-1'}
              href={urlSearch}
            >
              Xem tất cả
            </a>
          </>
        ) : (
          renderPreSearch()
        )}
      </div>
    </div>
  );
}

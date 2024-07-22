import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProductDto } from '@/dtos/Product.dto';
import PriceWithLineThrough from '@/components/atoms/priceWithLineThrough';
import { Avatar, List, Skeleton } from 'antd';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
export const InputSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [debouceValue, setDebouceValue] = useState<string>('');
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [data, setData] = useState<ProductDto[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpened(false);
        setData([]);
        setValue('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (!isOpened && ready && value) {
      setIsOpened(true);
    }
    const timeout = setTimeout(() => {
      setDebouceValue(value);
    }, 350);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  useEffect(() => {
    searchProduct();
  }, [debouceValue]);

  const searchProduct = useCallback(() => {
    if (debouceValue.length < 1) return;
    setLoading(true);
    fetch(`/api/search/product?search=${debouceValue}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data?.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouceValue]);

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
              const variant = item?.variants?.find(
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
                          loading={'lazy'}
                          unoptimized={true}
                        />
                      }
                      title={
                        <Link href={generateSlugToHref(item?.slugs?.slug)}>
                          {item.name}
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

  return (
    <div className={'w-full relative z-[3]'} ref={ref}>
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
      {isOpened && (
        <div
          className={
            'hidden lg:block absolute top-[50px] bg-white w-full rounded-[10px] shadow-custom left-0 p-6 max-h-[50vh] overflow-y-auto'
          }
        >
          {renderItemList}
        </div>
      )}
    </div>
  );
};
export default InputSearch;

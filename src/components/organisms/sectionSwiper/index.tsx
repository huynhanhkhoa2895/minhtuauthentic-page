import { Grid, Pagination } from 'swiper/modules';
import { ReactNode, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { twMerge } from 'tailwind-merge';
import { LeftOutlined, RightOutlined } from '@ant-design/icons/lib/icons';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import SectionSwiperSlide from '@/components/organisms/sectionSwiper/slide';
type Props = {
  classNameContainer?: string;
  classNameItems?: string;
  renderItem: (content: unknown) => ReactNode;
  data: unknown[];
  loop?: boolean;
  heightItem?: number;
  slidesPerView?: number;
  slidesPerViewMobile?: number;
  spaceBetween?: number;
  isGrid?: boolean;
  isUseHeightWrapper?: boolean;
  isCenter?: boolean;
  onSlideChange?: (activeIndex: number) => void;
  isNotDisplayNavigation?: boolean;
  debug?: boolean;
};
import { Skeleton } from 'antd';
const SectionSwiper = ({
  classNameContainer,
  renderItem,
  data,
  loop,
  classNameItems,
  slidesPerView,
  spaceBetween,
  isGrid,
  isUseHeightWrapper,
  isCenter,
  onSlideChange,
  slidesPerViewMobile,
  isNotDisplayNavigation,
  heightItem,
  debug,
}: Props) => {
  const rows = 2;
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [heightWrapper, setHeightWrapper] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
    if (typeof window !== 'undefined') {
      if (heightItem) {
        handlerHeightWrapper(heightItem);
      }
      if (window.innerWidth <= 768) {
        setCurrentSlide(slidesPerViewMobile || 0);
      } else {
        setCurrentSlide(slidesPerView || 0);
      }
    }
  }, []);
  const renderNavigatorButton = (variant: string) => {
    return (
      <div
        onClick={() => {
          if (swiper) {
            if (variant === 'next') {
              swiper.slideNext();
            } else {
              swiper.slidePrev();
            }
          }
        }}
        className={twMerge(
          'absolute z-[2] w-[32px] h-[32px] rounded-full border border-[#dad4d4] cursor-pointer top-[calc(50%-22px)] lg:top-[calc(50%-16px)] bg-white flex justify-center items-center',
          variant === 'next'
            ? 'right-[-10px] lg:right-[-16px]'
            : 'left-[-10px] lg:left-[-16px]',
        )}
      >
        {variant === 'next' ? (
          <RightOutlined className={'text-[#dad4d4] text-center '} />
        ) : (
          <LeftOutlined className={'text-[#dad4d4] text-center '} />
        )}
      </div>
    );
  };

  const handlerHeightWrapper = (height: number) => {
    setHeightWrapper(height * rows + (spaceBetween || 50));
  };

  return (
    <>
      {ready ? (
        <div className={twMerge('relative', classNameContainer)}>
          <Swiper
            effect={'fade'}
            grid={isGrid ? { rows } : {}}
            style={{ height: heightWrapper || '100%' }}
            modules={isGrid ? [Grid] : [Pagination]}
            loop={loop || false}
            className={twMerge('mx-auto w-full')}
            wrapperClass={'mx-auto'}
            onSwiper={(swiper) => setSwiper(swiper)}
            centeredSlides={isCenter}
            breakpoints={{
              425: {
                slidesPerView: currentSlide || 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: currentSlide || 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: slidesPerView,
                spaceBetween: spaceBetween,
              },
            }}
            onSlideChange={() => {
              onSlideChange && onSlideChange(swiper?.activeIndex || 0);
            }}
          >
            {data &&
              data.map((content, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <SectionSwiperSlide
                      setHeightItem={(height: number) => {
                        if (index === 0 && isUseHeightWrapper && !heightItem) {
                          handlerHeightWrapper(height);
                        }
                      }}
                      className={classNameItems}
                      key={index}
                    >
                      {renderItem(content)}
                    </SectionSwiperSlide>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          {data.length > (currentSlide || 0) * rows &&
            !isNotDisplayNavigation && (
              <>
                {renderNavigatorButton('prev')}
                {renderNavigatorButton('next')}
              </>
            )}
        </div>
      ) : (
        <div className={'flex gap-3 p-3 bg-white my-3'}>
          <Skeleton.Image
            active={true}
            style={{ width: '100px', height: '100px' }}
          />
          <Skeleton.Image
            active={true}
            style={{ width: '100px', height: '100px' }}
          />
          <Skeleton.Image
            active={true}
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      )}
    </>
  );
};
export default SectionSwiper;

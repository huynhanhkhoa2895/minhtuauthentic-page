import { JSX, ReactNode, useEffect, useMemo, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper/types';
import { twMerge } from 'tailwind-merge';
import { LeftOutlined, RightOutlined } from '@ant-design/icons/lib/icons';

import SectionSwiperSlide from '@/components/organisms/sectionSwiper/slide';
import SkeletonMobile from '@/components/atoms/skeletonMobile';
import { Grid, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
export type SwiperProps = {
  classNameContainer?: string;
  classNameItems?: string;
  renderItem: (content: unknown) => ReactNode;
  data: unknown[];
  loop?: boolean;
  heightItem?: number;
  slidesPerView?: number;
  spaceBetween?: number;
  isGrid?: boolean;
  isUseHeightWrapper?: boolean;
  isCenter?: boolean;
  onSlideChange?: (activeIndex: number) => void;
  isNotDisplayNavigation?: boolean;
  debug?: boolean;
  onLoad?: () => void;
  isMobile?: boolean;
  auto?: boolean;
  slidePerViewMobile?: number;
  spaceBetweenMobile?: number;
};
export default function SectionSwiperItem({
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
  isNotDisplayNavigation,
  heightItem,
  onLoad,
  auto,
                                            slidePerViewMobile,
  spaceBetweenMobile,
}: SwiperProps) {
  const rows = 2;
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [heightWrapper, setHeightWrapper] = useState<number>(heightItem || 0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
    if (heightItem) {
      handlerHeightWrapper(heightItem);
    }
    setCurrentSlide(slidesPerView || 0);
    onLoad && onLoad();
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

  const renderSwiper = useMemo(() => {
    return (
      <>
        <Swiper
          effect={'fade'}
          grid={isGrid ? { rows } : {}}
          style={{ height: heightWrapper || '100%' }}
          modules={isGrid ? [Grid, Autoplay] : [Pagination, Autoplay]}
          autoplay={auto}
          loop={loop || false}
          className={twMerge('mx-auto w-full')}
          wrapperClass={'mx-auto'}
          onSwiper={(swiper) => setSwiper(swiper)}
          centeredSlides={isCenter}
          breakpoints={{
            320: {
              slidesPerView: slidePerViewMobile || slidesPerView,
              spaceBetween: spaceBetween || spaceBetweenMobile,
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
        {data.length > 0 && !isNotDisplayNavigation && (
          <>
            {renderNavigatorButton('prev')}
            {renderNavigatorButton('next')}
          </>
        )}
      </>
    );
  }, [heightWrapper, ready]);

  return (
    <>
      {!ready ? (
        <SkeletonMobile />
      ) : (
        <div className={twMerge('relative', classNameContainer)}>
          {renderSwiper}
        </div>
      )}
    </>
  );
}

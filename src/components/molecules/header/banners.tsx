import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  EffectFade,
  Pagination,
  Autoplay,
  EffectCreative,
} from 'swiper/modules';
import 'swiper/css/effect-fade';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
export const Banners = ({
  banners,
  className,
  classNameImage,
  isMobile,
}: {
  banners: StaticContentsDto[];
  className?: string;
  classNameImage?: string;
  isMobile?: boolean;
}) => {
  return (
    <Swiper
      className={className}
      effect={'fade'}
      spaceBetween={50}
      slidesPerView={1}
      pagination={true}
      modules={[Pagination, EffectCreative, Autoplay]}
      autoplay={{
        delay: 6000,
      }}
      loop={true}
    >
      {banners.map((banner, index) => {
        const imageDetail = banner?.images?.[0];
        if (!imageDetail) {
          return null;
        }
        return (
          <SwiperSlide key={index}>
            <Image
              src={imageDetail?.image?.url || ''}
              alt={imageDetail?.image?.alt || ''}
              width={imageDetail?.image?.width || 0}
              height={imageDetail?.image?.height || 0}
              className={classNameImage || 'object-contain w-full'}
              unoptimized={!isMobile}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7u2tBwAFdgImpqLKKAAAAABJRU5ErkJggg=="
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default Banners;

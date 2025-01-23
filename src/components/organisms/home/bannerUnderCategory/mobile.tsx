import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import Image from 'next/image';
import { ImageDto } from '@/dtos/Image.dto';
import { ReactNode, useMemo } from 'react';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';
import ImageWithRatio from '@/components/atoms/images/imageWithRatio';

export default function BannerUnderCategoryMobile({
  contents,
}: {
  contents: StaticContentsDto[];
}) {
  const renderContent = useMemo(() => {
    const xhtml: ReactNode[] = [];
    contents.forEach((content: StaticContentsDto, index: number) => {
      content?.images &&
        (content?.images || []).forEach((item: ImageDetailDto, index2) => {
          const imageDisplay = item?.image?.url;
          xhtml.push(
            <SwiperSlide key={index + '_' + index2}>
              {imageDisplay && item.image ? (
                <ImageWithRatio
                  image={item.image}
                  href={generateSlugToHref(content?.properties?.slug)}
                />
              ) : (
                <></>
              )}
            </SwiperSlide>,
          );
        });
    });
    return xhtml;
  }, []);

  return (
    <div className={'grid grid-cols-1 gap-3 mt-3'}>
      <div className={'rounded-[10px] overflow-hidden'}>
        <Swiper
          effect={'fade'}
          spaceBetween={50}
          slidesPerView={1}
          modules={[EffectFade, Autoplay]}
          autoplay={true}
          loop={true}
        >
          {renderContent}
        </Swiper>
      </div>
    </div>
  );
}

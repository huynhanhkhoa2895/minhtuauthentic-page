import { BLOCK_UNDER_CATEGORY_POSITION } from '@/config/enum';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateSlugToHref } from '@/utils';
import { Autoplay, EffectFade } from 'swiper/modules';
import dynamic from 'next/dynamic';

const ImageWithRatio = dynamic(
  () => import('@/components/atoms/images/imageWithRatio'),
  {
    ssr: false,
  },
);

export default function BannerUnderCategoryDesktop({
  contents,
}: {
  contents: StaticContentsDto[];
}) {
  const contentLeft = contents.filter(
    (content, index) =>
      content.properties?.direction === BLOCK_UNDER_CATEGORY_POSITION.LEFT,
  );
  const contentRight = contents.filter(
    (content, index) =>
      content.properties?.direction === BLOCK_UNDER_CATEGORY_POSITION.RIGHT,
  );

  const renderImage = (image: ImageDetailDto, content: StaticContentsDto) => {
    const imageDisplay = image.image?.url;

    return (
      <SwiperSlide key={image.id}>
        {imageDisplay && image.image ? (
          <ImageWithRatio
            image={image.image}
            href={generateSlugToHref(content?.properties?.slug)}
          />
        ) : (
          <></>
        )}
      </SwiperSlide>
    );
  };

  return (
    <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'}>
      {['left', 'right'].map((direction, index) => {
        const contents = direction === 'left' ? contentLeft : contentRight;
        return (
          <div key={index} className={'rounded-[10px] overflow-hidden'}>
            <Swiper
              effect={'fade'}
              spaceBetween={50}
              slidesPerView={1}
              modules={[EffectFade, Autoplay]}
              autoplay={true}
              loop={true}
            >
              {contents.map((content) => {
                const image = content?.images?.[0];
                return image && renderImage(image, content);
              })}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
}

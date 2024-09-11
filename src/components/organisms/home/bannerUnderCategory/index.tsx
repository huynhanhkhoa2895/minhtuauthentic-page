import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { BLOCK_UNDER_CATEGORY_POSITION } from '@/config/enum';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';
import Image from 'next/image';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';

export default function BannerUnderCategory({
  contents,
  position,
}: {
  contents: StaticContentsDto[];
  position: number;
}) {
  const contentLeft = contents.find(
    (content, index) =>
      (content?.position_index || 0) === position &&
      content.properties?.direction === BLOCK_UNDER_CATEGORY_POSITION.LEFT,
  );
  const contentRight = contents.find(
    (content, index) =>
      (content?.position_index || 0) === position &&
      content.properties?.direction === BLOCK_UNDER_CATEGORY_POSITION.RIGHT,
  );
  const refContainer = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const ratio = 610 / 170;
  const [wh, setWh] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      if (refContainer.current) {
        const width = refContainer.current?.clientWidth || 1;
        const height = width / ratio;
        setWh({ width, height });
      }
    }
  }, [ready]);

  const renderImage = (image: ImageDetailDto) => {
    const imageDisplay = image.image?.url;

    return (
      <SwiperSlide key={image.id}>
        {imageDisplay && (
          <div
            ref={refContainer}
            style={{ height: wh.height }}
            className={'w-full h-full relative'}
          >
            <Image
              src={imageDisplay}
              className={'w-full h-auto object-cover'}
              alt={image.image?.alt || 'image'}
              fill={true}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
      </SwiperSlide>
    );
  };

  return (
    <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'}>
      {['left', 'right'].map((direction, index) => {
        const content = direction === 'left' ? contentLeft : contentRight;
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
              {content &&
                (content?.images || []).map((content) => {
                  return renderImage(content);
                })}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
}

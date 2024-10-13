import { BLOCK_UNDER_CATEGORY_POSITION } from '@/config/enum';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { useEffect, useRef, useState } from 'react';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import Image from 'next/image';
import { Autoplay, EffectFade } from 'swiper/modules';

export default function BannerUnderCategoryDesktop({
                                                     contents,
                                                   }: {
  contents: StaticContentsDto[];
}){
  const contentLeft = contents.filter(
    (content, index) =>
      content.properties?.direction === BLOCK_UNDER_CATEGORY_POSITION.LEFT,
  );
  const contentRight = contents.filter(
    (content, index) =>
      content.properties?.direction === BLOCK_UNDER_CATEGORY_POSITION.RIGHT,
  );
  const refContainer = useRef<HTMLDivElement | null>(null);
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

  const renderImage = (image: ImageDetailDto, content: StaticContentsDto) => {
    const imageDisplay = image.image?.url;

    return (
      <SwiperSlide key={image.id}>
        {imageDisplay ? (
          <div
            ref={refContainer}
            style={{ height: wh.height }}
            className={'w-full h-full relative'}
          >
            <Link href={generateSlugToHref(content?.properties?.slug)}>
              <Image
                src={imageDisplay}
                className={'w-full h-auto object-cover'}
                alt={image.image?.alt || 'image'}
                fill={true}
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized={true}
              />
            </Link>
          </div>
        ) : <></>}
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
              {
                contents.map((content) => {
                  const image = content?.images?.[0];
                  return image && renderImage(image, content);
                })
              }
            </Swiper>
          </div>
        );
      })}
    </div>
  );
}
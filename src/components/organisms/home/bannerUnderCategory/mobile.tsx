import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import Image from 'next/image';
import { ImageDto } from '@/dtos/Image.dto';
import { ReactNode, useMemo } from 'react';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';

export default function BannerUnderCategoryMobile({
                                                     contents,
                                                   }: {
  contents: StaticContentsDto[];
}) {

  const renderContent = useMemo(() => {
    const xhtml: ReactNode[] = []
    contents.forEach((content: StaticContentsDto,index: number) => {
      content?.images && (content?.images || []).forEach((item: ImageDetailDto, index2) => {
        const imageDisplay = item?.image?.url  ;
        xhtml.push(<SwiperSlide key={index+'_'+index2}>
          {imageDisplay && item ? (
            <div
              style={{ height: 80 }}
              className={'w-full h-full relative'}
            >
              <Link href={generateSlugToHref(content?.properties?.slug)}>
                <Image
                  src={imageDisplay}
                  className={'w-full h-auto object-cover'}
                  alt={item?.image?.alt || 'image'}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized={true}
                />
              </Link>
            </div>
          ) : <></>}
        </SwiperSlide>)
      })
    })
    return xhtml
  },[])

  return <div className={'grid grid-cols-1 gap-3 mt-3'}>
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
    }
import { ProductDto } from '@/dtos/Product.dto';
import { useEffect, useState } from 'react';
import { ImageDto } from '@/dtos/Image.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';
import ImageMagnifier from '@/components/atoms/imageMaginifier';
import { Swiper } from 'swiper/react';
import SectionSwiper from '@/components/organisms/sectionSwiper';
import noImage from '@/static/images/no-image.png';
import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useProductImageDetail } from '@/hooks/useProductImageDetail';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
type Props = {
  product: ProductDto;
  containerClassName?: string;
  setIsOpen?: (item: { display: boolean; image: ImageDto | null }) => void;
};
const ProductDetailImage = ({
  product,
  containerClassName,
  setIsOpen,
}: Props) => {
  const { images, imageActive, setImageActive } = useProductImageDetail({
    product,
  });

  const handleClickImage = (image: ImageDto) => {
    setImageActive(image);
  };

  return (
    <div className={twMerge('p-3', containerClassName)}>
      <ImageMagnifier
        image={imageActive}
        onClick={(image: ImageDto | null) => {
          setIsOpen && setIsOpen({ display: true, image });
        }}
      />
      <SectionSwiper
        classNameContainer={'mt-3'}
        classNameItems={
          'p-1 hover:shadow-md transition-shadow duration-300 hover:border-primary border border-transparent'
        }
        renderItem={(item) => {
          const imageItem = item as ImageDto;
          return (
            <ImageWithFallback
              image={imageItem}
              className={
                'w-full h-full object-contain hover:scale-105 transition-transform duration-300 cursor-pointer'
              }
              onClick={() => handleClickImage(imageItem)}
              onMouseEnter={() => {
                if (imageActive?.url !== imageItem.url) {
                  setImageActive(imageItem);
                }
              }}
            />
            // <Image
            //   onClick={() => handleClickImage(imageItem)}
            //   onMouseEnter={() => {
            //     if (imageActive?.url !== imageItem.url) {
            //       setImageActive(imageItem);
            //     }
            //   }}
            //   src={url}
            //   alt={imageItem.alt || ''}
            //   width={imageItem.width || 0}
            //   height={imageItem.height || 0}
            //   className={
            //     'w-full h-full object-contain hover:scale-105 transition-transform duration-300 cursor-pointer'
            //   }
            //   blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7u2tBwAFdgImpqLKKAAAAABJRU5ErkJggg=="
            // />
          );
        }}
        loop={true}
        slidesPerView={6}
        spaceBetween={10}
        data={images}
      />
    </div>
  );
};
export default ProductDetailImage;

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
type Props = {
  product: ProductDto;
};
const ProductDetailImage = ({ product }: Props) => {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [ready, setReady] = useState(false);
  const [imageActive, setImageActive] = useState<ImageDto | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
    const images: ImageDto[] = product?.feature_image_detail?.image
      ? [
          {
            ...product.feature_image_detail?.image,
            alt: product.feature_image_detail.alt || product.name,
          },
        ]
      : [];
    let variant = (product?.variants || [])?.find(
      (variant: VariantDto) => variant.is_default,
    );
    if (!variant) {
      variant = product?.variants?.[0];
    }
    (variant?.images || []).map((item: ImageDetailDto) => {
      if (item.image) {
        images.push({
          ...item.image,
          alt: item.alt || product.name,
        });
      }
    });
    (product?.images || []).map((item: ImageDetailDto) => {
      item.image &&
        images.push({
          ...item.image,
          alt: item.alt || product.name,
        });
    });
    setImages(images);
    setImageActive(images[0]);
  }, []);

  const handleClickImage = (image: ImageDto) => {
    console.log('image', image);
    setImageActive(image);
  };

  return (
    <div className={'p-3'}>
      <ImageMagnifier
        image={imageActive}
        onClick={(image: ImageDto | null) => {
          console.log('click image', image);
        }}
      />
      <SectionSwiper
        classNameContainer={'mt-3'}
        classNameItems={
          'p-1 hover:shadow-md transition-shadow duration-300 hover:border-primary border border-transparent'
        }
        renderItem={(item) => {
          const imageItem = item as ImageDto;
          const url = imageItem?.url || noImage;
          return (
            <Image
              onClick={() => handleClickImage(imageItem)}
              onMouseEnter={() => {
                if (imageActive?.url !== imageItem.url) {
                  setImageActive(imageItem);
                }
              }}
              src={url}
              alt={imageItem.alt || ''}
              width={imageItem.width || 0}
              height={imageItem.height || 0}
              className={
                'w-full h-full object-contain hover:scale-105 transition-transform duration-300 cursor-pointer'
              }
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7u2tBwAFdgImpqLKKAAAAABJRU5ErkJggg=="
            />
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

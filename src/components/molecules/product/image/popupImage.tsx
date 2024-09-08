import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ProductDto } from '@/dtos/Product.dto';
import { useProductImageDetail } from '@/hooks/useProductImageDetail';
import { ImageDto } from '@/dtos/Image.dto';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import Close from '@/components/icons/close';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/types';
import { VariantDto } from '@/dtos/Variant.dto';
import PopupImageItem from '@/components/molecules/product/image/popupImageItem';
type Props = {
  open: boolean;
  product: ProductDto;
  image: ImageDto | null;
  setIsOpen?: (item: { display: boolean; image: ImageDto | null }) => void;
  variantActive?: VariantDto;
};
export default function PopupImage({
  open,
  product,
  image,
  setIsOpen,
  variantActive,
}: Props) {
  const [isReady, setIsReady] = useState(false);
  const { images, imageActive, setImageActive } = useProductImageDetail({
    product,
    variant: variantActive,
  });
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (image) {
      setImageActive(image);
    }
  }, [image]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(
        images.findIndex((item) => item.url === imageActive?.url),
      );
    }
  }, [imageActive]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const renderImage = useMemo(() => {
    return (
      <div className={'w-max mx-auto flex gap-3 h-full py-3 max-lg:px-3'}>
        {images.map((imageItem, index) => (
          <PopupImageItem
            key={index}
            imageItem={imageItem}
            setImageActive={setImageActive}
            isActive={imageItem.id === imageActive?.id}
          />
        ))}
      </div>
    );
  }, [images, imageActive]);

  return (
    <>
      {isReady &&
        createPortal(
          <div
            style={{
              backgroundImage: `url("${imageActive?.url}")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            className={twMerge(
              'fixed inset-0 transition-all duration-300 ',
              open
                ? 'visible opacity-100 z-[100]'
                : 'invisible opacity-0 z-[-1]',
            )}
          >
            <div className={'backdrop-blur-3xl bg-black/30 h-full relative'}>
              <div
                className={
                  'h-[calc(100%-220px)] lg:h-[calc(100%-140px)] pb-0 pt-[40px] w-full box-content'
                }
              >
                <div className={'relative h-full max-lg:px-3'}>
                  <Swiper
                    className={'h-full'}
                    modules={[Pagination, EffectFade, Autoplay]}
                    effect={'fade'}
                    loop={true}
                    speed={1000}
                    fadeEffect={{
                      crossFade: true,
                    }}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                      const activeIndex = swiper.activeIndex;
                      setImageActive(images[activeIndex]);
                    }}
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={image.url + '_' + index}>
                        <div className={'w-screen lg:w-[600px] lg:h-[600px]  m-auto'}>
                          <ImageWithFallback
                            className={'object-contain'}
                            image={image}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className={'h-[120px] w-full overflow-auto'}>
                {renderImage}
              </div>
              <button
                type="button"
                className={'w-6 h-6 absolute top-3 right-3 cursor-pointer'}
                onClick={() => {
                  setIsOpen && setIsOpen({ display: false, image: null });
                }}
              >
                <Close className={' cursor-pointer w-6 h-6 block'} />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

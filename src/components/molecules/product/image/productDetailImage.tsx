import { ProductDto } from '@/dtos/Product.dto';
import { ImageDto } from '@/dtos/Image.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import ImageMagnifier from '@/components/atoms/imageMaginifier';
import SectionSwiper from '@/components/organisms/sectionSwiper';
import { twMerge } from 'tailwind-merge';
import { useProductImageDetail } from '@/hooks/useProductImageDetail';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { useMemo } from 'react';
type Props = {
  product: ProductDto;
  containerClassName?: string;
  setIsOpen?: (item: { display: boolean; image: ImageDto | null }) => void;
  variantActive?: VariantDto;
};
const ProductDetailImage = ({
  product,
  containerClassName,
  setIsOpen,
  variantActive,
}: Props) => {
  const { images, imageActive, setImageActive } = useProductImageDetail({
    product,
    variant: variantActive,
  });

  const handleClickImage = (image: ImageDto) => {
    setImageActive(image);
  };

  const renderSlideImage = useMemo(() => {
    return (
      <SectionSwiper
        classNameContainer={'mt-3'}
        slidesPerViewMobile={4}
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
              product={product}
              onMouseEnter={() => {
                setImageActive(imageItem);
              }}
            />
          );
        }}
        slidesPerView={6}
        spaceBetween={10}
        data={images}
      />
    );
  }, [images]);

  return (
    <div className={twMerge(containerClassName)}>
      <ImageWithFallback
        image={imageActive}
        className={'object-contain cursor-pointer'}
        onClick={(image: ImageDto | null) => {
          setIsOpen && setIsOpen({ display: true, image });
        }}
        product={product}
      />
      <div className={'px-3'}>{renderSlideImage}</div>
    </div>
  );
};
export default ProductDetailImage;

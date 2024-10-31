import { ProductDto } from '@/dtos/Product.dto';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import noImage from '@/static/images/no-image.png';
import { ImageDto } from '@/dtos/Image.dto';
import Link from 'next/link';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { isMobile } from 'react-device-detect';
const ProductCardImage = ({
  product,
  className,
}: {
  product: ProductDto;
  className?: string;
}) => {
  const image: ImageDto | undefined =
    product?.feature_image_detail?.image ||
    product?.variants?.[0]?.images?.[0]?.image ||
    undefined;
  return (
    <div className={'relative pt-[100%]'}>
      <Link
        className={'block absolute w-full h-full inset-0 p-2 '}
        href={`/${product.slugs?.slug}`}
      >
        <div className={twMerge('w-full h-full overflow-hidden', className)}>
          <ImageWithFallback
            image={image}
            className={
              'object-contain w-full h-full hover:scale-105 transition-transform duration-300'
            }
            product={product}
            unoptimized={!isMobile}
          />
        </div>
      </Link>
    </div>
  );
};
export default ProductCardImage;

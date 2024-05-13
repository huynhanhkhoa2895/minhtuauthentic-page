import { ProductDto } from '@/dtos/Product.dto';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import noImage from '@/static/images/no-image.png';
import { ImageDto } from '@/dtos/Image.dto';
import Link from 'next/link';
const ProductCardImage = ({
  product,
  className,
}: {
  product: ProductDto;
  className?: string;
}) => {
  const image: ImageDto | undefined = product?.images?.[0]?.image;
  const imageUrl = image?.url || noImage;
  return (
    <Link className={'block p-2 '} href={`/${product.slugs?.slug}`}>
      <div className={twMerge('w-full h-full overflow-hidden', className)}>
        <Image
          src={imageUrl}
          alt={image?.alt || image?.name || product.name || ''}
          width={image?.width || 0}
          height={image?.height || 0}
          className={
            'object-cover w-full h-full hover:scale-105 transition-transform duration-300'
          }
        />
      </div>
    </Link>
  );
};
export default ProductCardImage;

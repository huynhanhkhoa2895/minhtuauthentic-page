import { ImageDto } from '@/dtos/Image.dto';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import noImage from '@/static/images/no-image.png';

type Props = {
  image: ImageDto | null;
  isFill?: boolean;
  onMouseEnter?: (event: unknown) => void;
  onClick?: (image: ImageDto) => void;
  alt?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
};
const ImageWithFallback = ({
  image,
  isFill,
  onMouseEnter,
  onClick,
  alt,
  className,
  loading,
  priority,
}: Props) => {
  const [imgActiveSrc, setImageActiveSrc] = useState<string | StaticImageData>(
    image?.url || noImage,
  );
  useEffect(() => {
    setImageActiveSrc(image?.url || noImage);
  }, [image]);
  const renderImage = () => {
    return (
      <>
        {isFill ? (
          <Image
            onClick={() => {
              onClick && image && onClick(image);
            }}
            onMouseEnter={(e) => onMouseEnter && onMouseEnter(e)}
            src={imgActiveSrc}
            alt={alt || image?.alt || ''}
            fill={true}
            sizes={'(max-width: 768px) 100vw, 33vw'}
            className={className}
            onError={() => {
              setImageActiveSrc(noImage);
            }}
            priority={priority}
            loading={loading}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7u2tBwAFdgImpqLKKAAAAABJRU5ErkJggg=="
          />
        ) : (
          <Image
            onClick={() => {
              onClick && image && onClick(image);
            }}
            onMouseEnter={(e) => {
              onMouseEnter && onMouseEnter(e);
            }}
            src={imgActiveSrc}
            alt={alt || image?.alt || ''}
            width={image?.width || 0}
            height={image?.height || 0}
            priority={priority}
            className={className}
            onError={() => {
              setImageActiveSrc(noImage);
            }}
            loading={loading}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7u2tBwAFdgImpqLKKAAAAABJRU5ErkJggg=="
          />
        )}
      </>
    );
  };
  return <>{renderImage()}</>;
};
export default ImageWithFallback;

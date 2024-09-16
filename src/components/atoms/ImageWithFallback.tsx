import { ImageDto } from '@/dtos/Image.dto';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import noImage from '@/static/images/no-image.png';

type Props = {
  image: ImageDto | null | undefined;
  isFill?: boolean;
  onMouseEnter?: (event: unknown) => void;
  onClick?: (image: ImageDto) => void;
  alt?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number;
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
  unoptimized,
  quality,
}: Props) => {
  const [imgActiveSrc, setImageActiveSrc] = useState<string | StaticImageData>(
    image?.url || noImage,
  );
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setImageActiveSrc(image?.url || noImage);
  }, [image]);
  const renderImage = () => {
    return (
      <>
        {isFill ? (
          <Image
            ref={ref}
            onClick={() => {
              onClick && image && onClick(image);
            }}
            onMouseEnter={(e) => onMouseEnter && onMouseEnter(e)}
            src={imgActiveSrc}
            alt={alt || image?.alt || ''}
            fill={true}
            sizes={'(max-width: 768px) 100vw, 33vw'}
            className={className}
            unoptimized={unoptimized}
            onError={() => {
              setImageActiveSrc(noImage);
            }}
            priority={priority}
            loading={loading}
            quality={quality || 100}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7u2tBwAFdgImpqLKKAAAAABJRU5ErkJggg=="
          />
        ) : (
          <Image
            ref={ref}
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
            unoptimized={unoptimized}
            priority={priority}
            className={className}
            quality={quality || 100}
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

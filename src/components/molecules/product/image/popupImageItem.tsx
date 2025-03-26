import { twMerge } from 'tailwind-merge';
import ImageWithFallback from '@/components/atoms/images/ImageWithFallback';
import { ImageDto } from '@/dtos/Image.dto';
import { useEffect, useMemo, useState } from 'react';
type Props = {
  imageItem: ImageDto;
  isActive: boolean;
  setImageActive: (image: ImageDto) => void;
};
export default function PopupImageItem({
  imageItem,
  isActive,
  setImageActive,
}: Props) {
  const [active, setActive] = useState<boolean>(isActive);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setActive(isActive);
  }, [isActive]);
  const renderImage = useMemo(() => {
    return (
      <ImageWithFallback
        // onClick={() => handleClickImage(imageItem)}
        image={imageItem}
        onMouseEnter={() => {
          const timeout = setTimeout(() => {
            console.log('setImageActive');
            setImageActive(imageItem);
          }, 70);
          setHoverTimeout(timeout);
        }}
        onMouseLeave={() => {
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            console.log('clearTimeout');
          }
        }}
        alt={imageItem.alt || ''}
        className={
          'w-full h-full object-contain hover:scale-105 transition-transform duration-300 cursor-pointer'
        }
      />
    );
  }, [hoverTimeout]);

  return (
    <div
      className={twMerge(
        'w-[80px] h-[80px]',
        active && 'border-2 overflow-hidden rounded-[10px] border-primary',
      )}
    >
      {renderImage}
    </div>
  );
}

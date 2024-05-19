import { useEffect, useState } from 'react';
import { ImageDto } from '@/dtos/Image.dto';
import { ProductDto } from '@/dtos/Product.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';
type Props = {
  product: ProductDto;
  variant?: VariantDto;
};
export function useProductImageDetail({ product, variant }: Props) {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [imageActive, setImageActive] = useState<ImageDto | null>(null);
  useEffect(() => {
    const images: ImageDto[] = product?.feature_image_detail?.image
      ? [
          {
            ...product.feature_image_detail?.image,
            alt: product.feature_image_detail.alt || product.name,
          },
        ]
      : [];
    let _variant =
      variant ||
      (product?.variants || [])?.find(
        (variant: VariantDto) => variant.is_default,
      );
    if (!_variant) {
      _variant = product?.variants?.[0];
    }
    (_variant?.images || []).map((item: ImageDetailDto) => {
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
  }, [variant]);
  return {
    images,
    imageActive,
    setImageActive,
  };
}

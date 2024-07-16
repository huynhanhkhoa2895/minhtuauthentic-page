import { useEffect, useState } from 'react';
import { ImageDto } from '@/dtos/Image.dto';
import { ProductDto } from '@/dtos/Product.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import { ImageDetailDto } from '@/dtos/ImageDetail.dto';
import { orderBy } from 'lodash';
type Props = {
  product: ProductDto;
  variant?: VariantDto;
};
export function useProductImageDetail({ product, variant }: Props) {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [imageActive, setImageActive] = useState<ImageDto | null>(null);
  useEffect(() => {
    const listImage: ImageDto[] = [];
    orderBy(variant?.images, 'sort')?.map((item) => {
      if (item?.image) {
        listImage.push(item.image);
      }
    });
    setImages(listImage);
    setImageActive(listImage[0]);
  }, [variant]);
  return {
    images,
    imageActive,
    setImageActive,
  };
}

import { CategoryDto } from '@/dtos/Category.dto';
import ProductCard from '../product/card';
import { TagLink } from '@/components/molecules/tagLink';
import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import { useEffect, useRef, useState } from 'react';
import { TagLinkDto } from '@/dtos/tagLink.dto';
import { generateSlugToHref } from '@/utils';
import Link from 'next/link';
import SectionSwiper from '@/components/organisms/sectionSwiper';
import { IProductCategoryDto } from '@/dtos/IProductCategory.dto';

const GroupCategory = ({
  staticComponent,
}: {
  staticComponent: StaticComponentDto;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const [tagLinks, setTagLinks] = useState<TagLinkDto[]>(
    staticComponent?.properties?.tagLink || [],
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      setTagLinks((tagLinks: TagLinkDto[]) => {
        return [
          ...tagLinks,
          new TagLinkDto({
            id: 0,
            name: 'Xem tất cả',
            slug: generateSlugToHref(staticComponent?.properties?.slug) || '/',
          }),
        ];
      });
    }
  }, [isReady]);

  return (
    <div
      className={'mt-3 mx-auto p-3 rounded-[10px]'}
      style={{ backgroundColor: staticComponent?.properties?.backgroundColor }}
    >
      <div className={'flex flex-col lg:flex-row justify-between mb-3 gap-2'}>
        <h3
          style={{ color: staticComponent?.properties?.textColor }}
          className={
            'text-[18px] lg:text-[24px] uppercase font-bold w-max shrink-0'
          }
        >
          <Link
            href={generateSlugToHref(staticComponent?.category?.slugs?.slug)}
          >
            {staticComponent?.title || staticComponent?.category?.name}
          </Link>
        </h3>
        <div
          ref={ref}
          className={'w-full lg:basis-[60%] lg:w-[70%] overflow-x-auto '}
        >
          <div
            ref={refContainer}
            className={'flex gap-3 pb-2 justify-end w-max min-w-full'}
          >
            {tagLinks.map((tagLink, key: number) => {
              return (
                <TagLink
                  key={key}
                  tagLinks={tagLink}
                  className={'last:mr-0 whitespace-nowrap'}
                />
              );
            })}
          </div>
        </div>
      </div>
      <SectionSwiper
        isGrid={true}
        slidesPerView={5}
        spaceBetween={10}
        isUseHeightWrapper={true}
        renderItem={(item: unknown) => {
          const iProduct = item as IProductCategoryDto;
          const variantMap = new Map(
            iProduct.product?.variants?.map((variant) => [
              variant.is_default,
              variant,
            ]),
          );
          const variant = variantMap.get(true);
          if (!variant) {
            return;
          }
          return (
            iProduct.product && (
              <ProductCard product={iProduct.product} variant={variant} />
            )
          );
        }}
        data={
          staticComponent?.category?.products?.filter(
            (item: IProductCategoryDto) => item.product,
          ) || []
        }
      />
    </div>
  );
};
export default GroupCategory;

import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import SkeletonMobile from '@/components/atoms/skeletonMobile';
import BlockUnderSlideItem from '@/components/molecules/blockUnderSlide/item';
import SectionSwiper from '@/components/organisms/sectionSwiper';
type Props = {
  contents: StaticContentsDto[];
};
export default function BlockUnderSlide({ contents }: Props) {
  return (
    <Suspense>
      <div className={'grid grid-cols-10 gap-1 mt-3 max-lg:hidden'}>
        {contents.map((content, index) => {
          return (
            <div key={index} className={'flex flex-col gap-1'}>
              <BlockUnderSlideItem
                content={content}
                classImage={'w-[100px] h-[100px] object-contain'}
              />
            </div>
          );
        })}
      </div>
      <SectionSwiper
        classNameContainer={'mt-3 lg:hidden'}
        isGrid={true}
        slidePerViewMobile={4}
        heightItem={145}
        isUseHeightWrapper={true}
        isNotDisplayNavigation={true}
        renderItem={(item: unknown) => {
          const content = item as StaticContentsDto;
          return (
            <BlockUnderSlideItem content={content} isUseImageFill={true} />
          );
        }}
        data={contents}
      />
    </Suspense>
  );
}

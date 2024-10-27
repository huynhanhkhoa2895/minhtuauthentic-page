import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import SkeletonMobile from '@/components/atoms/skeletonMobile';
const SlideMobileView = dynamic(
  () => import('@/components/organisms/home/blockUnderSlide/slideMobileView'),
  {
    ssr: false,
  },
);
const SlideBrowserView = dynamic(
  () => import('@/components/organisms/home/blockUnderSlide/slideBrowserView'),
  {
    ssr: false,
  },
);
type Props = {
  contents: StaticContentsDto[];
};
export default function BlockUnderSlide({ contents }: Props) {
  const [isReady, setIsReady] = useState(false);
  return (
    <Suspense>
      {
        !isReady && (
          <>
            <SkeletonMobile className={'lg:hidden'} classNameItem={'h-[145px]'} />
            <SkeletonMobile className={'max-lg:hidden grid-cols-10'} total={20} classNameItem={'h-[145px]'} />
          </>
        )
      }
      <SlideBrowserView contents={contents} onLoad={()=>{
        setIsReady(true);
      }}/>
      <SlideMobileView contents={contents} onLoad={()=>{
        setIsReady(true);
      }}/>
    </Suspense>
  );
}

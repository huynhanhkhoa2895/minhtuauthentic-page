import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { isDesktop, isMobile } from 'react-device-detect';
import Banners from '@/components/molecules/header/banners';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd/lib';
import Image from 'next/image';

type Props = {
  banners: StaticContentsDto[];
};
export default function HomeBanner({ banners }: Props) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <Banners
          className={'flex-1 rounded-3xl lg:h-[380px]'}
          banners={banners || []}
          classNameImage={'object-contain lg:object-cover w-full  '}
          isMobile={isMobile}
        />
      ) : (
        <div className={'relative'}>
          <Image
            className={'object-cover w-full h-full inset-0'}
            src=""
            alt={'loading'}
            fill
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7u2tBwAFdgImpqLKKAAAAABJRU5ErkJggg=="
          />
        </div>
      )}
      {/*{isDesktop && (*/}
      {/*  <Banners*/}
      {/*    key={'home-banner-desktop'}*/}
      {/*    className={'flex-1 rounded-3xl lg:h-[380px]'}*/}
      {/*    banners={banners || []}*/}
      {/*    classNameImage={'object-contain lg:object-cover w-full  '}*/}
      {/*    isMobile={false}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
}

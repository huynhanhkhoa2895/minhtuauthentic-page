import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import Banners from '@/components/molecules/header/banners';
import { isMobile } from 'react-device-detect';

type Props = {
  banners: StaticContentsDto[];
};
export default function HomeBanner({ banners }: Props) {
  return (
    <>
      <Banners
        className={'flex-1 rounded-3xl lg:h-[380px]'}
        banners={banners || []}
        classNameImage={'object-contain lg:object-cover w-full  '}
        isMobile={isMobile}
      />
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

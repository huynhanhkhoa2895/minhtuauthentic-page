import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { isDesktop, isMobile } from 'react-device-detect';
import Banners from '@/components/molecules/header/banners';

type Props = {
  banners: StaticContentsDto[];
};
export default function HomeBanner({ banners }: Props) {
  return (
    <>
      {isMobile && (
        <Banners
          className={'flex-1 rounded-3xl lg:h-[380px]'}
          banners={banners || []}
          classNameImage={'object-contain lg:object-cover w-full  '}
          isMobile={true}
        />
      )}
      {isDesktop && (
        <Banners
          className={'flex-1 rounded-3xl lg:h-[380px]'}
          banners={banners || []}
          classNameImage={'object-contain lg:object-cover w-full  '}
          isMobile={false}
        />
      )}
    </>
  );
}

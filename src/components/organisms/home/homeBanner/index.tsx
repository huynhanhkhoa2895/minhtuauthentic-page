import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import Banners from '@/components/molecules/header/banners';
import { isMobile } from 'react-device-detect';
import MenuWrapper from '@/components/molecules/header/menu/menuWrapper';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';

type Props = {
  banners: StaticContentsDto[];
  menu?: ResponseMenuDto;
};
export default function HomeBanner({ banners, menu }: Props) {
  return (
    <div
      id={'main-home-page'}
      className={'lg:mt-[10px] lg:flex w-full gap-2 relative container mx-auto'}
    >
      {menu && <MenuWrapper menu={menu} className={'w-[220px] h-[380px]'} />}
      <div
        className={
          'min-h-[140px] lg:h-[380px] w-full basis-[calc(100%-230px)] lg:w-[calc(100%-230px)] max-w-full'
        }
      >
        <Banners
          className={'flex-1 rounded-3xl lg:h-[380px]'}
          banners={banners || []}
          classNameImage={'object-contain lg:object-cover w-full  '}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

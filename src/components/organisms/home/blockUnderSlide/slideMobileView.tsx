import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import BlockUnderSlideItem from '@/components/molecules/blockUnderSlide/item';
import { MobileView } from 'react-device-detect';
import SectionSwiper from '@/components/organisms/sectionSwiper';

export default function SlideMobileView({contents}: {contents: StaticContentsDto[]}) {
  return <MobileView>
    <SectionSwiper
      classNameContainer={'mt-3 max-lg:p-3'}
      isGrid={true}
      slidesPerView={10}
      slidesPerViewMobile={4}
      spaceBetween={10}
      heightItem={145}
      isUseHeightWrapper={true}
      isNotDisplayNavigation={true}
      debug={true}
      renderItem={(item: unknown) => {
        const content = item as StaticContentsDto;
        return (
          <BlockUnderSlideItem content={content} isUseImageFill={true} />
        );
      }}
      data={contents}
    />
  </MobileView>
}
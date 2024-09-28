import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import BlockUnderSlideItem from '@/components/molecules/blockUnderSlide/item';
import dynamic from 'next/dynamic';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';
const SectionSwiper = dynamic(
  () => import('@/components/organisms/sectionSwiper'),
  {
    ssr: false,
  },
);
type Props = {
  contents: StaticContentsDto[];
};
export default function BlockUnderSlide({ contents }: Props) {
  return (
    <>
      <BrowserView>
        <div className={'grid grid-cols-10 gap-1 mt-3'}>
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
      </BrowserView>
      <MobileView>
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
    </>
  );
}

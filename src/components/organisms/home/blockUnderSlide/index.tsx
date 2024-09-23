import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import BlockUnderSlideItem from '@/components/molecules/blockUnderSlide/item';
import dynamic from 'next/dynamic';
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
          return <BlockUnderSlideItem content={content} />;
        }}
        data={contents}
      />
    </>
  );
}

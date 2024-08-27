import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import Link from 'next/link';
import Image from 'next/image';
import noImage from '@/static/images/no-image.png';
import BlockUnderSlideItem from '@/components/molecules/blockUnderSlide/item';
import SectionSwiper from '@/components/organisms/sectionSwiper';
type Props = {
  contents: StaticContentsDto[];
};
export default function BlockUnderSlide({ contents }: Props) {
  return (
    <>
      <SectionSwiper
        classNameContainer={'mt-3 max-lg:p-3'}
        isGrid={true}
        slidesPerView={12}
        slidesPerViewMobile={6}
        spaceBetween={10}
        isUseHeightWrapper={true}
        isNotDisplayNavigation={true}
        renderItem={(item: unknown) => {
          const content = item as StaticContentsDto;
          return <BlockUnderSlideItem content={content} />;
        }}
        data={contents}
      />
      {/*        <div*/}
      {/*        className={'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 mt-3 gap-3'}*/}
      {/*        >*/}
      {/*      {contents.map((content: StaticContentsDto, key: number) => {*/}
      {/*        return <BlockUnderSlideItem key={key} content={content} />;*/}
      {/*  })}*/}
      {/*</div>*/}
    </>
  );
}

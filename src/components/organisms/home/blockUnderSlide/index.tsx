import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import Link from 'next/link';
import Image from 'next/image';
import noImage from '@/static/images/no-image.png';
import BlockUnderSlideItem from '@/components/molecules/blockUnderSlide/item';
type Props = {
  contents: StaticContentsDto[];
};
export default function BlockUnderSlide({ contents }: Props) {
  return (
    <div
      className={'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 mt-3 gap-3'}
    >
      {contents.map((content: StaticContentsDto, key: number) => {
        return <BlockUnderSlideItem key={key} content={content} />;
      })}
    </div>
  );
}

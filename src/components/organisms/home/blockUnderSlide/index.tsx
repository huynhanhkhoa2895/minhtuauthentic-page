import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import dynamic from 'next/dynamic';
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
  return (
    <>
      <SlideBrowserView contents={contents}/>
      <SlideMobileView contents={contents}/>
    </>
  );
}

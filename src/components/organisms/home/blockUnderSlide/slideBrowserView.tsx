import BlockUnderSlideItem from '@/components/molecules/blockUnderSlide/item';
import { BrowserView } from 'react-device-detect';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';

export default function SlideBrowserView({contents}: {contents: StaticContentsDto[]}){
  return <BrowserView>
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
}
import BlockUnderSlideItem from '@/components/molecules/blockUnderSlide/item';
import { BrowserView } from 'react-device-detect';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { useEffect } from 'react';

export default function SlideBrowserView({contents,onLoad}: {contents: StaticContentsDto[], onLoad: ()=>void}){
  useEffect(() => {
    onLoad();
  }, []);
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

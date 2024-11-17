import { isDesktop } from 'react-device-detect';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
type Props = {
  item: StaticContentsDto,
  index: number
}
export default function FooterContent({item, index}: Props){
  const renderFooterDesktop = (
  ) => {
    switch (index) {
      case 0:
        return (
          <div key={item.id}>
            <p
              className={
                'uppercase font-[700] lg:font-bold lg:mb-[10px] text-[16px]'
              }
            >
              VỀ CHÚNG TÔI
            </p>
            <div
              className={'lg:mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
      case 1:
      case 2:
        return (
          <div key={item.id}>
            <p className={'uppercase font-semibold text-[16px]'}>
              {item.title}
            </p>
            <div
              className={'lg:mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
      case 3:
        return (
          <div key={item.id}>
            <p className={'uppercase font-semibold text-[16px]'}>
              {item.title}
            </p>
            <div
              className={'lg:mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
    }
  };
  const renderFooterMobile = () => {
    switch (index) {
      case 0:
        return (
          <div key={item.id}>
            <p
              className={
                'uppercase font-[700] lg:font-bold lg:mb-[10px] text-[16px]'
              }
            >
              VỀ CHÚNG TÔI
            </p>

            <div
              className={'lg:mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
      case 1:
      case 2:
        return (
          <div key={item.id}>
            <p className={'uppercase font-semibold text-[16px]'}>
              {item.title}
            </p>
            <div
              className={'lg:mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
      case 3:
        return (
          <div key={item.id}>
            <p className={'uppercase font-semibold text-[16px]'}>
              {item.title}
            </p>
            <div
              className={'lg:mt-[12px]'}
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
        );
    }
  }
  return (
    <>
      {isDesktop ? renderFooterDesktop() : renderFooterMobile()}
    </>
  );
}

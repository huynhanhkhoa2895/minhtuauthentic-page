import Image, { StaticImageData } from 'next/image';
import imageQuality from '@/static/images/quality-assurance.png';
import securityInfo from '@/static/images/security-information.png';
import productQuality from '@/static/images/product-quality.png';
import support from '@/static/images/support.png';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import { ImageDto } from '@/dtos/Image.dto';
import SectionSwiper from '@/components/organisms/sectionSwiper';

type Props = {
  contents?: StaticContentsDto[];
};

export default function HomeSupport({ contents }: Props) {
  return (
    <>
      <SectionSwiper
        classNameContainer={
          'mt-3 border border-primary p-10 rounded-[10px] bg-white'
        }
        classNameLeft={'lg:left-[-11px]'}
        classNameRight={'lg:right-[-11px]'}
        classNameItems={'flex items-center gap-3 justify-center'}
        slidePerViewMobile={4}
        data={contents || []}
        renderItem={(item) => {
          const _item = item as StaticContentsDto;
          const image = _item?.images?.[0]?.image?.url || support;
          return (
            <>
              <Image
                src={image || ''}
                className={'object-contain w-[60px] h-auto'}
                width={128}
                height={128}
                alt={
                  'Minh Tu Authentic, Nước hoa chính hãng Tphcm, Quận Tân Phú, Mỹ phẩm'
                }
              />
              <div>
                <p className={'text-[14px] font-[700] lg:font-bold'}>
                  {_item.title}
                </p>
                <p className={'mt-1 text-[12px]'}>{_item.description}</p>
              </div>
            </>
          );
        }}
      />
    </>
  );
}

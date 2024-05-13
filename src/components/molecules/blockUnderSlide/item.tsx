import noImage from '@/static/images/no-image.png';
import Link from 'next/link';
import Image from 'next/image';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';

const BlockUnderSlideItem = ({ content }: { content: StaticContentsDto }) => {
  const imageDetail = content?.images?.[0];
  const image = imageDetail?.image || null;
  const url = image?.url || noImage;
  return (
    <div className={'w-full '} >
      <div className={'rounded-[10px] overflow-hidden pt-[100%] relative'} style={{backgroundColor: content.properties?.backgroundColor || 'transparent'}}>
        <Link href={content?.properties?.slug|| '/'}>
          <Image
            src={url}
            alt={imageDetail?.alt || content?.title || ''}
            fill={true}
            className={'object-cover w-full h-full hover:scale-105 transition-transform duration-300'}
            sizes="(max-width: 768px) 100vw, 33vw"
            loading={'eager'}
            priority
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7u2tBwAFdgImpqLKKAAAAABJRU5ErkJggg=="
          />
        </Link>
      </div>
      <p className={'text-center mt-3'}>{content.title || ''}</p>
    </div>
  )
}
export default BlockUnderSlideItem;

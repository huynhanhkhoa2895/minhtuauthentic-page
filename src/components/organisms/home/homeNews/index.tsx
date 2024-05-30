import { NewsDto } from '@/dtos/News.dto';
import { SettingsDto } from '@/dtos/Settings.dto';
import noImage from '@/static/images/no-image.png';
import Image from 'next/image';

import Link from 'next/link';
import { generateSlugToHref, truncateString } from '@/utils';
import NewsClock from '@/components/atoms/news/clock';
import { Index } from '@/dtos/SettingOption';

type Props = {
  content: {
    featured: NewsDto[];
    news: NewsDto[];
  };
  setting?: Index;
};
export default function HomeNews({ content, setting }: Props) {
  return (
    <div
      className={'p-3 mt-3 rounded-[10px]'}
      style={{ backgroundColor: setting?.backgroundColor || '#fff' }}
    >
      <h4 className={'text-[24px] font-bold'}>Tin tức nổi bật </h4>
      <div className={'mt-3 flex gap-3'}>
        <div className={'grid grid-cols-1 lg:grid-cols-2 gap-3'}>
          {content.featured.map((item: NewsDto, key: number) => {
            const imageDetail = item?.images?.[0];
            const image = imageDetail?.image || null;
            const url = image?.url || noImage;
            return (
              <div
                className={'p-3 rounded-[10px] border border-primary'}
                key={key}
              >
                <div
                  className={
                    'relative pt-[100%] rounded-[10px] overflow-hidden'
                  }
                >
                  <Link key={key} href={generateSlugToHref(item.slugs?.slug)}>
                    <Image
                      src={url}
                      alt={imageDetail?.alt || item.name || ''}
                      fill={true}
                      className={'object-contain'}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                </div>
                <div className={'mt-3'}>
                  <div className={'h-[65px]'}>
                    <h5 className={'font-semibold text-[16px]'}>
                      <NewsClock item={item} />
                      <Link
                        key={key}
                        href={generateSlugToHref(item.slugs?.slug)}
                      >
                        {item.name}
                      </Link>
                    </h5>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        truncateString(item?.description || '', 250) || '',
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={'shrink-0 basis-[33%] w-[33%] h-[500px] overflow-auto'}>
          {content.news.map((item: NewsDto, key: number) => {
            const imageDetail = item?.images?.[0];
            const image = imageDetail?.image || null;
            const url = image?.url || noImage;
            return (
              <div key={key} className={'flex gap-3 mb-3 last:mb-0  '}>
                <div
                  className={'w-[100px] overflow-hidden basis-[100px] shrink-0'}
                >
                  <Link key={key} href={generateSlugToHref(item.slugs?.slug)}>
                    <Image
                      src={url}
                      alt={imageDetail?.alt || item.name || ''}
                      className={
                        'object-contain rounded-[10px] w-[100px] h-[100px]'
                      }
                      width={image?.width || 0}
                      height={image?.height || 0}
                    />
                  </Link>
                </div>
                <div className={'h-[100px]'}>
                  <NewsClock item={item} />
                  <h5 className={'font-semibold text-[14px] leading-[1] mb-1'}>
                    <Link key={key} href={generateSlugToHref(item.slugs?.slug)}>
                      {truncateString(item.name || '', 60)}
                    </Link>
                  </h5>
                  <div
                    className={'h-[47px] overflow-hidden'}
                    dangerouslySetInnerHTML={{
                      __html: truncateString(item?.description || '', 80) || '',
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { twMerge } from 'tailwind-merge';
import FormRegister from '@/components/organisms/account/formRegister';
import NewsList from '@/components/organisms/news/list';
import { NewsDto } from '@/dtos/News.dto';
import { CategoryNewsDto } from '@/dtos/CategoryNews.dto';
import NewsItem from '@/components/organisms/news/item';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import NewsSmallList from '@/components/organisms/news/smallList';
import NewsClock from '@/components/atoms/news/clock';
import Image from 'next/image';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import NewsDetail from '@/components/organisms/news/detail';

type Props = {
  news: NewsDto | NewsDto[];
  total?: number;
  categoryNews: CategoryNewsDto[];
  newest?: NewsDto[];
  relationNews?: NewsDto[];
  isDetail?: boolean;
};

export default function NewsTemplate({
  news,
  categoryNews,
  newest,
  relationNews,
  isDetail,
  total,
}: Props) {
  return (
    <div className={'grid grid-cols-1 lg:grid-cols-6 gap-3'}>
      <div
        className={
          'col-span-4 w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3'
        }
      >
        <>
          {!isDetail ? (
            <NewsList news={news as NewsDto[]} total={total || 0} />
          ) : (
            <>
              <NewsDetail news={news as NewsDto} />
              {(relationNews || [])?.length > 0 && (
                <div
                  className={
                    'p-3 rounded-[10px] border bg-gray-200 border-gray-200 mt-3'
                  }
                >
                  <h3 className={'font-bold text-xl '}>Xem thêm</h3>
                  <ul className={'flex flex-col gap-3'}>
                    {relationNews?.map((item, key) => {
                      return (
                        <li
                          key={key}
                          className={'py-3 border-b border-gray-200'}
                        >
                          <Link href={generateSlugToHref(item.slugs?.slug)}>
                            {item?.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
        </>
      </div>
      <div className={'col-span-2 flex flex-col gap-3'}>
        <div
          className={
            'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3'
          }
        >
          <h2 className={'text-3xl text-primary font-bold mb-3'}>
            Danh mục tin tức
          </h2>
          <ul className={'flex flex-col gap-3'}>
            {categoryNews.map((item: CategoryNewsDto, key: number) => {
              return (
                <li
                  key={key}
                  className={'p-3 border border-gray-100 text-lg font-semibold'}
                >
                  <Link href={generateSlugToHref(item?.slugs?.slug)}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {newest && (
          <div
            className={
              'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3'
            }
          >
            <h3 className={'text-3xl text-primary font-bold mb-3'}>
              Bài viết gần đây
            </h3>
            <div>
              <NewsSmallList news={newest} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

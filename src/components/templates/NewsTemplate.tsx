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
import NewsRelation from '@/components/organisms/news/relation';
import LayoutNews from '@/components/organisms/news/layout';
import { ReactNode } from 'react';

type Props = {
  news: NewsDto | NewsDto[];
  total?: number;
  categoryNews: CategoryNewsDto[];
  newest?: NewsDto[];
  relationNews?: NewsDto[];
  isDetail?: boolean;
  title?: string;
};

export default function NewsTemplate({
  news,
  categoryNews,
  newest,
  relationNews,
  title,
  isDetail,
  total,
}: Props) {
  return (
    <div className={'grid grid-cols-1 lg:grid-cols-6 gap-3'}>
      <>
        {!isDetail ? (
          <LayoutNews className={'col-span-4 '}>
            <NewsList
              title={title}
              news={news as NewsDto[]}
              total={total || 0}
            />
          </LayoutNews>
        ) : (
          <div className={'flex flex-col col-span-4 gap-3'}>
            <LayoutNews>
              <NewsDetail news={news as NewsDto} />
            </LayoutNews>
            <LayoutNews>
              <NewsRelation news={relationNews || []} />
            </LayoutNews>
          </div>
        )}
      </>
      <div className={'col-span-2 flex flex-col gap-3'}>
        <div
          className={
            'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3'
          }
        >
          <h2 className={'text-3xl text-primary font-[700] lg:font-bold mb-3'}>
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
            <h3
              className={'text-3xl text-primary font-[700] lg:font-bold mb-3'}
            >
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

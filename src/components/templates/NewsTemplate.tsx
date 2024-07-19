import { twMerge } from 'tailwind-merge';
import FormRegister from '@/components/organisms/account/formRegister';
import NewsList from '@/components/organisms/news/list';
import { NewsDto } from '@/dtos/News.dto';
import { CategoryNewsDto } from '@/dtos/CategoryNews.dto';
import NewsItem from '@/components/organisms/news/item';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import NewsSmallList from '@/components/organisms/news/smallList';

type Props = {
  news: NewsDto[];
  categoryNews: CategoryNewsDto[];
  newest: NewsDto[];
};

export default function NewsTemplate({ news, categoryNews, newest }: Props) {
  return (
    <div className={'grid grid-cols-1 lg:grid-cols-6 gap-3'}>
      <div
        className={
          'col-span-4 w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3'
        }
      >
        <h1 className={'text-3xl text-primary font-bold'}>Tin tức</h1>
        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-3'}>
          {news.map((item: NewsDto, key: number) => {
            return <NewsItem news={item} key={key} />;
          })}
        </div>
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
      </div>
    </div>
  );
}

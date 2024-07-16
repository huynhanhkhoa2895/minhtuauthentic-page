import { twMerge } from 'tailwind-merge';
import FormRegister from '@/components/organisms/account/formRegister';
import NewsList from '@/components/organisms/news/list';
import { NewsDto } from '@/dtos/News.dto';
import { CategoryNewsDto } from '@/dtos/CategoryNews.dto';
import NewsItem from '@/components/organisms/news/item';

type Props = {
  news: NewsDto[]
  categoryNews: CategoryNewsDto[];
}

export default function NewsTemplate({
  news,
 categoryNews
}: Props) {
  return (
    <div
      className={twMerge(
        'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto',
      )}
    >
      <div className={'grid grid-cols-1 lg:grid-cols-6'}>
        <div className={'col-span-4 p-3'}>
          <h1 className={'text-3xl text-primary font-bold my-3'}>Tin tức</h1>
          <div className={'grid grid-cols-1 lg:grid-cols-3 gap-3'}>
            {
              news.map((item: NewsDto, key: number) => {
                return <NewsItem news={item} key={key} />;
              })
            }
          </div>
        </div>
        <div className={'col-span-2'}>

        </div>
      </div>
    </div>
  );
}

import { twMerge } from 'tailwind-merge';
import FormRegister from '@/components/organisms/account/formRegister';
import NewsList from '@/components/organisms/news/list';
import { NewsDto } from '@/dtos/News.dto';
import { CategoryNewsDto } from '@/dtos/CategoryNews.dto';

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
        <div className={'col-span-4'}>
          <NewsList news={news} />
        </div>
        <div className={'col-span-2'}>

        </div>
      </div>
    </div>
  );
}

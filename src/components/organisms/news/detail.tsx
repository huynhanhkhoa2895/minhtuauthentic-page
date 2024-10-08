import NewsClock from '@/components/atoms/news/clock';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { NewsDto } from '@/dtos/News.dto';

type Props = {
  news: NewsDto;
};

export default function NewsDetail({ news }: Props) {
  return (
    <>
      {news && <NewsClock item={news} />}
      <div
        className={'container-html'}
        dangerouslySetInnerHTML={{ __html: news?.content || '' }}
      />
    </>
  );
}

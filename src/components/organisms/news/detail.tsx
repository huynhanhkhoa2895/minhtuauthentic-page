import NewsClock from '@/components/atoms/news/clock';
import { NewsDto } from '@/dtos/News.dto';
import Script from 'next/script';
import NewsToc from '@/components/atoms/news/toc';

type Props = {
  news: NewsDto;
};

export default function NewsDetail({ news }: Props) {
  return (
    <>
      {news && <NewsClock item={news} />}
      <NewsToc />
      <div
        id={'toc-content'}
        className={'container-html'}
        dangerouslySetInnerHTML={{ __html: news?.content || '' }}
      />
      <Script
        strategy={'beforeInteractive'}
        src={'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'}
        async={false}
      />
      <Script
        strategy={'beforeInteractive'}
        src={'/toc.min.js'}
        async={false}
      />
      <Script
        strategy={'afterInteractive'}
        src={'/news-detail.min.js'}
        async={false}
      />
    </>
  );
}

import NewsClock from '@/components/atoms/news/clock';
import ImageWithFallback from '@/components/atoms/ImageWithFallback';
import { NewsDto } from '@/dtos/News.dto';

type Props = {
  news: NewsDto;
}

export default function NewsDetail({news}: Props){
  return <>
    {news && <NewsClock item={news} />}
    {news?.images?.[0] && (
      <div className={'w-full lg:w-[650px] p-3 mx-auto'}>
        <ImageWithFallback
          image={news?.images?.[0]?.image}
        />
      </div>
    )}
    <div
      className={'container-html'}
      dangerouslySetInnerHTML={{ __html: news?.description || '' }}
    />
    <div
      className={'container-html'}
      dangerouslySetInnerHTML={{ __html: news?.content || '' }}
    />
  </>
}
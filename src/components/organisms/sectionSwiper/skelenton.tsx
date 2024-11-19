import { Skeleton } from 'antd/es';

export default function SwiperSkeleton() {
  return (
    <div className={'flex gap-3 p-3 bg-white my-3'}>
      <Skeleton.Image
        active={true}
        style={{ width: '100px', height: '100px' }}
      />
      <Skeleton.Image
        active={true}
        style={{ width: '100px', height: '100px' }}
      />
      <Skeleton.Image
        active={true}
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
}

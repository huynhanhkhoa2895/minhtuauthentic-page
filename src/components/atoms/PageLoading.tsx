import Loading from '@/components/atoms/loading';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PageLoading() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.on('routeChangeComplete', handleRouteComplete);
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          className={
            'fixed w-screen h-screen z-[100000000] inset-0 bg-[rgb(255_255_255_/_71%)]'
          }
        >
          <div className={'flex w-full h-full items-center justify-center'}>
            <Loading />
          </div>
        </div>
      )}
    </>
  );
}

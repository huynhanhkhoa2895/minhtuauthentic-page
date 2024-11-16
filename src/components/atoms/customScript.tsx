import Script from 'next/script';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
type Props = {
  isHaveFudiin: boolean;
};
export default function CustomScript({ isHaveFudiin }: Props) {
  const router = useRouter();

  useEffect(() => {
    const loadEvent = new Event('load');
    window.dispatchEvent(loadEvent);
  }, [router.pathname]);

  useEffect(() => {
    if (isHaveFudiin) {
      const script = document.createElement('script');
      script.src = `${process.env.NEXT_PUBLIC_FUNDIN_URL}/merchants/productdetailjs/${process.env.NEXT_PUBLIC_FUNDIN_MERCHANT_ID}.js`;
      script.type = 'application/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {createPortal(
        (
          <>
            <Script
              data-partytown-config
              strategy={'afterInteractive'}
              src="https://pc.baokim.vn/js/bk_plus_v2.popup.js"
              onLoad={() => {
                const loadEvent = new Event('load');
                window.dispatchEvent(loadEvent);
              }}
            />
          </>
        ) as any,
        document.body,
      )}
    </>
  );
}

import Script from 'next/script';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CustomScript() {
  const router = useRouter();

  useEffect(() => {
    const loadEvent = new Event('load');
    window.dispatchEvent(loadEvent);
  }, [router.pathname]);
  return (
    <>
      {createPortal(
        (
          <Script
            data-partytown-config
            strategy={'afterInteractive'}
            src="https://pc.baokim.vn/js/bk_plus_v2.popup.js"
            onLoad={() => {
              const loadEvent = new Event('load');
              window.dispatchEvent(loadEvent);
            }}
          />
        ) as any,
        document.body,
      )}
    </>
  );
}

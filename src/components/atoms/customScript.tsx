import Script from 'next/script';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CustomScript() {
  const router = useRouter();

  useEffect(() => {
    const loadEvent = new Event('load');
    document.dispatchEvent(loadEvent);
  }, [router.pathname]);
  return (
    <>
      {createPortal(
        (
          <Script
            data-partytown-config
            src="https://pc.baokim.vn/js/bk_plus_v2.popup.js"
            onLoad={() => {
              const loadEvent = new Event('load');
              document.dispatchEvent(loadEvent);
            }}
          />
        ) as any,
        document.body,
      )}
    </>
  );
}

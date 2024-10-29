import Script from 'next/script';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export default function CustomScript() {
  useEffect(() => {
    console.log('CustomScript');
  }, []);
  return (
    <>
      {createPortal(
        (
          <Script
            data-partytown-config
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

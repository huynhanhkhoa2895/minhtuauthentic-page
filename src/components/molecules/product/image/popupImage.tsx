import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export default function PopupImage() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);
  return (
    <>
      {isReady &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"></div>,
          document.body,
        )}
    </>
  );
}

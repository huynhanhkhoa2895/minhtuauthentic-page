import { useContext, useEffect, useRef } from 'react';
import appContext from '@/contexts/appContext';
import { twMerge } from 'tailwind-merge';

export default function NavMenu(){
  const appCtx = useContext(appContext)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        appCtx?.isOpenNavMenu && appCtx?.setIsOpenNavMenu && appCtx.setIsOpenNavMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className={twMerge('fixed inset-0 z-[1000] w-[80vw] bg-primary text-white py-6 px-3 h-screen transition-all duration-300',
        appCtx?.isOpenNavMenu ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-full'
      )}>
      NavMenu
    </div>
  )
}
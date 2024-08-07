import { ReactNode, useContext, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import Menu from '@/components/molecules/header/menu';
import appContext from '@/contexts/appContext';

type Props = {
  className?: string;
  children: ReactNode;
  menu?: ResponseMenuDto
}
export default function Layout({ children, className, menu }: Props) {
  const appCtx = useContext(appContext)
  const ref=useRef<HTMLDivElement | null>(null)
  return <div ref={ref} id={'main-body'} className={twMerge('relative container mx-auto p-3', className)}>
    {children}
    {
      menu && <Menu
        menu={menu}
        isPopup={true}
        className={twMerge(
          'absolute left-0 top-3 transition-all duration-500',
          appCtx?.isOpenMenu ? 'opacity-100 visible z-50' : 'opacity-0 invisible z-0'
        )}
      />
    }
  </div>
}
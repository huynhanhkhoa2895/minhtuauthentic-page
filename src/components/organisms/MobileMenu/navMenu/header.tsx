import Logo from '@/static/images/logo.png';
import Image from 'next/image';
const InputSearch = dynamic(
  () => import('@/components/molecules/header/inputSearch'),
  {
    ssr: false,
  },
);
import HeaderCart from '@/components/icons/header-cart';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
type Props = {
  className?: string;
  isMobile?: boolean;
};
export default function NavMenuHeader({ className, isMobile }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const refTimeOut = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    let lastScrollY = 0;
    let isScrollDown = false;
    function onScroll() {
      if (
        typeof window !== 'undefined' &&
        ref.current &&
        ref?.current?.classList
      ) {
        const currentScrollY = window.scrollY;
        if (refTimeOut.current) {
          clearTimeout(refTimeOut.current as NodeJS.Timeout);
        }

        console.log('currentScrollY', currentScrollY, lastScrollY);

        if (currentScrollY > lastScrollY) {
          isScrollDown = true;
        } else if (currentScrollY < lastScrollY) {
          isScrollDown = false;
        }

        if (isScrollDown) {
          ref.current.classList.add('invisible');
          ref.current.classList.add('opacity-0');
          ref.current.classList.remove('visible');
          ref.current.classList.remove('opacity-100');
          // ref.current.style.height = 'translateY(-100%)';
        } else {
          ref.current.classList.remove('invisible');
          ref.current.classList.remove('opacity-0');
          ref.current.classList.add('visible');
          ref.current.classList.add('opacity-100');
          // ref.current.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      refTimeOut.current && clearTimeout(refTimeOut.current as NodeJS.Timeout);
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);
  const renderItem = () => {
    return (
      <>
        <Link className={'shrink-0'} href={'/'}>
          <Image
            src={Logo}
            width={161}
            height={30}
            className={'object-contain h-z w-auto'}
            alt={'Minhtuauhentic'}
          />
        </Link>
        {/*<InputSearch isMobile={true} />*/}
        <div className={'w-full'}></div>
        <HeaderCart
          className={'w-[40px] h-[40px] shrink-0'}
          classNumber={'text-white'}
        />
      </>
    );
  };
  return (
    <div className={'relative'}>
      <div className={twMerge('flex p-3 gap-2 items-center', className)}>
        {renderItem()}
      </div>
      {isMobile && (
        <div
          className={
            'p-3 absolute top-[65px] bg-primary left-0 w-screen transition-all duration-300'
          }
          ref={ref}
        >
          <InputSearch isMobile={true} />
        </div>
      )}
    </div>
  );
}

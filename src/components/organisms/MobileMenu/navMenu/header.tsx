import Logo from '@/static/images/logo.png';
import Image from 'next/image';
import InputSearch from '@/components/molecules/header/inputSearch';
import HeaderCart from '@/components/icons/header-cart';
import { twMerge } from 'tailwind-merge';
import { MobileView } from 'react-device-detect';
import Link from 'next/link';
type Props = {
  className?: string;
  isMobile?:boolean;
}
export default function NavMenuHeader({className,isMobile}: Props) {
  const renderItem = () => {
    return <>
      <Link className={'shrink-0'} href={'/'}>
        <Image src={Logo} width={161} height={30} className={'object-contain h-z w-auto'} alt={'Minhtuauhentic'} />
      </Link>
      <InputSearch isMobile={true} />
      <HeaderCart className={'w-[40px] h-[40px] shrink-0'} classNumber={'text-white'} />
    </>
  }
  return (
    <>
      {isMobile ? <MobileView className={twMerge('flex p-3 gap-2 items-center', className)}>
        {renderItem()}
      </MobileView> : <div className={twMerge('flex p-3 gap-2 items-center', className)}>
        {renderItem()}
      </div>}
    </>
  )
}
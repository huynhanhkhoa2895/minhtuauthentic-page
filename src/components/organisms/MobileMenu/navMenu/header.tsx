import Logo from '@/static/images/logo.png';
import Image from 'next/image';
import InputSearch from '@/components/molecules/header/inputSearch';
import HeaderCart from '@/components/icons/header-cart';
import { twMerge } from 'tailwind-merge';
type Props = {
  className?: string;
}
export default function NavMenuHeader({className}: Props) {
  return (
    <div className={twMerge('flex p-3 gap-2 items-center', className)}>
      <Image src={Logo} width={161} height={30} className={'shrink-0 object-contain h-auto w-auto'} alt={'Minhtuauhentic'} />
      <InputSearch />
      <HeaderCart className={'w-[40px] h-[40px] shrink-0'} />
    </div>
  )
}
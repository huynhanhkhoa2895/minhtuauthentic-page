import Image from 'next/image';
import Logo from '@/static/images/logo.png';
import HeaderItem from '@/components/molecules/header/item';
import InputSearch from '@/components/molecules/header/inputSearch';
import { IconPhone } from '@/components/icons/phone';
import IconTruck from '@/components/icons/truck';
import IconCart from '@/components/icons/cart';
import IconUser from '@/components/icons/user';
import ButtonMenu from '@/components/organisms/header/buttonMenu';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <div className={'bg-primaryGrey relative z-[3]'}>
        <div className={'py-4 container mx-auto text-center'}>Nhiều ưu đãi</div>
      </div>
      <header
        id={'header'}
        className={'bg-primary py-[15px] sticky top-0 left-0 z-[3] relative'}
      >
        <div
          className={
            'container mx-auto flex justify-between items-center gap-[10px]'
          }
        >
          <Link className={'shrink-0'} href={'/'}>
            <Image
              src={Logo}
              priority={true}
              height={54}
              width={288}
              className={'object-contain w-auto h-auto '}
              alt={
                'Minh Tu Authentic, Nước hoa chính hãng Tphcm, Quận Tân Phú, Mỹ phẩm'
              }
            />
          </Link>

          <ButtonMenu />
          <InputSearch />
          <HeaderItem
            className={'w-max'}
            icon={<IconPhone className={'w-[24px] h-[24px]'} />}
          >
            <p className={'block'}>Gọi Ngay</p>
            <p>09555555</p>
          </HeaderItem>
          <HeaderItem
            className={'w-max'}
            icon={<IconTruck className={'w-[40px] h-[40px]'} />}
          >
            <p className={'w-max'}>Tra cứu</p>
            <p className={'w-max'}>đơn hàng</p>
          </HeaderItem>

          <HeaderItem
            className={'w-max'}
            icon={<IconCart className={'w-[30px] h-[30px]'} />}
          >
            Giỏ hàng
          </HeaderItem>
          <HeaderItem
            className={'w-max'}
            icon={<IconUser className={'w-[30px] h-[30px]'} />}
          >
            Tài Khoản
          </HeaderItem>
        </div>
      </header>
      <div
        className={twMerge(
          `relative`,
          pathname === '/'
            ? "before:block before:content-[''] before:bg-primary before:rounded-[0_0_50%_50%] before:h-[125px] before:absolute before:left-[50%] before:-translate-x-[50%] before:w-full"
            : '',
        )}
      ></div>
    </>
  );
};
export default Header;

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
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { Button, Dropdown } from 'antd';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import HeaderCart from '@/components/icons/header-cart';
import CartPreview from '@/components/molecules/header/cartPreview';
import { CloseCircleOutlined } from '@ant-design/icons';
import OrderContext from '@/contexts/orderContext';
import { useContext } from 'react';

export const Header = (menu: ResponseMenuDto | null) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUser();
  const orderCtx = useContext(OrderContext);
  return (
    <>
      <div className={'bg-primaryGrey relative z-[3]'}>
        <div className={'py-4 container mx-auto text-center'}>Nhiều ưu đãi</div>
      </div>
      <header
        id={'header'}
        className={'bg-primary py-[10px] sticky top-0 left-0 z-[3] relative'}
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
              width={227}
              className={'object-contain w-auto h-auto '}
              alt={
                'Minh Tu Authentic, Nước hoa chính hãng Tphcm, Quận Tân Phú, Mỹ phẩm'
              }
            />
          </Link>

          <ButtonMenu homeMenuCategory={menu?.homeMenuCategory} />
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
          <div className={'relative'}>
            <HeaderItem
              className={'w-max'}
              icon={<HeaderCart className={'w-[40px] h-[40px]'} />}
              isButton
              onClick={() =>
                orderCtx?.setIsOpenHeaderCart &&
                orderCtx?.setIsOpenHeaderCart(!orderCtx?.isOpenHeaderCart)
              }
            >
              Giỏ hàng
            </HeaderItem>
            <div
              className={twMerge(
                'absolute max-h-[500px] overflow-auto top-12 -left-12 bg-white p-3 z-[2] rounded-[10px] shadow-custom transition-opacity duration-500',
                orderCtx?.isOpenHeaderCart
                  ? 'visible opacity-100 '
                  : 'invisible opacity-0',
              )}
            >
              <div className={'flex justify-between items-center mb-3 w-full'}>
                <span className={'text-black font-semibold'}>Giỏ hàng</span>
                <Button
                  icon={<CloseCircleOutlined />}
                  type={'link'}
                  onClick={() => {
                    orderCtx?.setIsOpenHeaderCart &&
                      orderCtx?.setIsOpenHeaderCart(false);
                  }}
                ></Button>
              </div>
              <CartPreview />
            </div>
          </div>

          <Dropdown
            menu={{
              items: user
                ? [
                    {
                      key: '1',
                      label: <Link href={'/tai-khoan/lich-su'}>Tài khoản</Link>,
                    },
                    {
                      key: '2',
                      label: (
                        <button type={'button'} onClick={() => logout()}>
                          Đăng xuất
                        </button>
                      ),
                    },
                  ]
                : [
                    {
                      key: '1',
                      label: (
                        <Link
                          href={
                            '/tai-khoan/dang-nhap?' +
                            new URLSearchParams({
                              redirectUrl: router.asPath,
                            }).toString()
                          }
                        >
                          Đăng nhập
                        </Link>
                      ),
                    },
                    {
                      key: '2',
                      label: (
                        <Link
                          href={
                            '/tai-khoan/dang-ky' +
                            new URLSearchParams({
                              redirectUrl: router.asPath,
                            }).toString()
                          }
                        >
                          Đăng ký
                        </Link>
                      ),
                    },
                  ],
            }}
            placement="bottomLeft"
          >
            <Button
              icon={<IconUser className={'w-[30px] h-[30px]'} />}
              type={'link'}
              className={'!text-white items-center flex hover:!text-white'}
            >
              {user ? user.name || user.email : 'Tài Khoản'}
            </Button>
          </Dropdown>
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

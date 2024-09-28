import Image from 'next/image';
import Logo from '@/static/images/logo.png';
import HeaderItem from '@/components/molecules/header/item';
import InputSearch from '@/components/molecules/header/inputSearch';
import { IconPhone } from '@/components/icons/phone';
import IconTruck from '@/components/icons/truck';
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
import { CloseCircleOutlined, BarsOutlined } from '@ant-design/icons';
import OrderContext from '@/contexts/orderContext';
import { useContext } from 'react';
import NavMenuHeader from '@/components/organisms/MobileMenu/navMenu/header';
import IconWifi from '@/components/icons/wifi';
import { SettingsDto } from '@/dtos/Settings.dto';
import { SETTING_KEY } from '@/config/enum';
type Props = { menu: ResponseMenuDto | null; settings: SettingsDto[] };
export const Header = ({ menu, settings }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useUser();
  const orderCtx = useContext(OrderContext);
  const pageHeader = settings.find(
    (item) => item?.key && item?.key === SETTING_KEY.GENERAL.PAGE_HEADER.KEY,
  );

  return (
    <>
      {pageHeader?.value && (
        <div
          className={
            ' hidden lg:grid  bg-primaryGrey relative z-[3] grid-cols-3 items-center p-3'
          }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: pageHeader?.value?.page_title_left || '',
            }}
          />
          <div
            className={'text-center'}
            dangerouslySetInnerHTML={{
              __html: pageHeader?.value?.page_title_center || '',
            }}
          />
          <div
            className={'text-right'}
            dangerouslySetInnerHTML={{
              __html: pageHeader?.value?.page_title_right || '',
            }}
          />
        </div>
      )}

      <header
        id={'header'}
        className={
          'bg-primary lg:py-[10px] sticky top-0 left-0 z-[100] relative'
        }
      >
        <NavMenuHeader className={'lg:hidden'} />
        <div
          className={
            'max-lg:hidden container mx-auto flex justify-between items-center gap-[10px]'
          }
        >
          <Link className={'shrink-0'} href={'/'}>
            <Image
              src={Logo}
              height={54}
              width={227}
              className={'object-contain w-[230px]] h-[60px] '}
              alt={
                'Minh Tu Authentic, Nước hoa chính hãng Tphcm, Quận Tân Phú, Mỹ phẩm'
              }
            />
          </Link>

          <ButtonMenu menu={menu} />
          <InputSearch />
          <HeaderItem
            className={'w-max'}
            icon={<IconPhone className={'w-[24px] h-[24px]'} />}
          >
            <p className={'block'}>Gọi mua hàng</p>
            <p>0961693869</p>
          </HeaderItem>
          <HeaderItem
            className={'w-max text-left'}
            icon={<IconWifi className={'w-[30px] h-[30px]'} />}
            isButton
            onClick={() => {
              window.open(
                'https://www.google.com/maps/place/N%C6%B0%E1%BB%9Bc+Hoa+Ch%C3%ADnh+H%C3%A3ng+-+Minh+T%C3%BA+Authentic/@10.7726,106.62672,15z/data=!4m6!3m5!1s0x31752df3970ab413:0x908ad6fe074c5688!8m2!3d10.7726003!4d106.6267201!16s%2Fg%2F11j_8xbgmd?hl=vi&entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D',
              );
            }}
          >
            <p>Cửa hàng</p>
            <p>gần bạn</p>
          </HeaderItem>
          <HeaderItem
            className={'w-max'}
            icon={<IconTruck className={'w-[40px] h-[40px]'} />}
            href={'/kiem-tra-don-hang'}
          >
            <p className={'w-max'}>Tra cứu</p>
            <p className={'w-max'}>đơn hàng</p>
          </HeaderItem>
          <div className={'relative'}>
            <HeaderItem
              className={'w-max text-left'}
              icon={<HeaderCart className={'w-[40px] h-[40px]'} />}
              isButton
              onClick={() =>
                orderCtx?.setIsOpenHeaderCart &&
                orderCtx?.setIsOpenHeaderCart(!orderCtx?.isOpenHeaderCart)
              }
            >
              <p>Giỏ</p>
              <p>hàng</p>
            </HeaderItem>
            <div
              className={twMerge(
                'absolute max-h-[600px] overflow-auto top-14 right-0 bg-white p-3 z-[2] rounded-[10px] shadow-custom transition-opacity duration-500',
                orderCtx?.isOpenHeaderCart
                  ? 'visible opacity-100 '
                  : 'invisible opacity-0',
              )}
            >
              <div className={'flex justify-between items-center mb-3 w-full'}>
                <span className={'text-black font-semibold'}>Giỏ hàng</span>
                <button
                  className={'ant-btn ant-btn-link ant-btn-icon-only'}
                  onClick={() => {
                    orderCtx?.setIsOpenHeaderCart &&
                      orderCtx?.setIsOpenHeaderCart(false);
                  }}
                >
                  <CloseCircleOutlined />
                </button>
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
                            '/tai-khoan/dang-ky?' +
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
              className={
                '!text-white items-center flex hover:!text-white w-max'
              }
            >
              {user ? (
                <span className={'capitalize'}>{user.name || user.email}</span>
              ) : (
                <>
                  <p>Tài</p>
                  <p>khoản</p>
                </>
              )}
            </Button>
          </Dropdown>
        </div>
      </header>
      <div
        className={twMerge(
          `relative max-lg:hidden`,
          pathname === '/'
            ? "before:block before:content-[''] before:bg-primary before:rounded-[0_0_50%_50%] before:h-[125px] before:absolute before:left-[50%] before:-translate-x-[50%] before:w-full"
            : '',
        )}
      ></div>
    </>
  );
};
export default Header;

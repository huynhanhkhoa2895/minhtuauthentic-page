import { Fragment, ReactNode, useContext } from 'react';
import { HomeOutlined } from '@ant-design/icons/lib/icons';
import HomeIconFooter from '@/components/icons/menuFooter/Home';
import CategoryIcon from '@/components/icons/menuFooter/Category';
import UserIconFooter from '@/components/icons/menuFooter/User';
import useUser from '@/hooks/useUser';
import PhoneIconFooter from '@/components/icons/menuFooter/Phone';
import { useRouter } from 'next/router';
import MapIconFooter from '@/components/icons/menuFooter/Map';
import AppContext from '@/contexts/appContext';

export default function MenuFooter() {
  const user = useUser();
  const appCtx = useContext(AppContext)
  const router = useRouter();
  const elementFooter: {
    icon: ReactNode;
    label: string;
    onClick: () => void | ReactNode;
  }[] = [
    {
      icon: <HomeIconFooter className={'text-center w-6'} />,
      label: 'Trang chủ',
      onClick: () => {
        appCtx?.setIsOpenNavMenu && appCtx.setIsOpenNavMenu(false);
        router.push('/');
      },
    },
    {
      icon: <CategoryIcon className={'text-center w-6'} />,
      label: 'Danh mục',
      onClick: () => {
        appCtx?.setIsOpenNavMenu && appCtx.setIsOpenNavMenu(!appCtx?.isOpenNavMenu);
      },
    },
    {
      icon: <PhoneIconFooter className={'text-center w-6'} />,
      label: 'Điện thoại',
      onClick: () => {
        router.push('tel:0961693869');
      },
    },
    {
      icon: <MapIconFooter className={'text-center w-6'} />,
      label: 'Cửa hàng',
      onClick: () => {
        window.open('https://www.google.com/maps/dir/?api=1&origin=&destination=278%20H%C3%B2a%20b%C3%ACnh,%20Hi%E1%BB%87p%20t%C3%A2n,%20Q%20T%C3%A2n%20ph%C3%BA,%20TpHCM', '_blank');
      },
    },
    {
      icon: <UserIconFooter className={'text-center w-6'} />,
      label: user?.user
        ? user?.user?.name || user?.user?.email || ''
        : 'Đăng nhập',
      onClick: () => {
        if (user?.user) {
          router.push('/tai-khoan/lich-su');
        } else {
          router.push('/tai-khoan/dang-nhap');
        }
      },
    },
  ];

  const ItemMenu = (item: {
    icon: ReactNode;
    label: string;
    onClick: () => void | ReactNode;
  }) => {
    return (
      <div
        className={'flex flex-col gap-1 justify-center flex-1'}
        onClick={item.onClick}
      >
        <div className={'mx-auto '}>{item.icon}</div>
        <span className={'text-sm text-center'}>{item.label}</span>
      </div>
    );
  };

  return (
    <div
      className={
        'lg:hidden fixed bottom-0 left-0 z-10 bg-white w-full shadow-custom rounded-tr-2xl rounded-tl-2xl z-[1001]'
      }
    >
      <div className={'p-3 flex items-center justify-center'}>
        {elementFooter.map((item, index) => {
          return (
            <Fragment key={'menufooter' + index}>{ItemMenu(item)}</Fragment>
          );
        })}
      </div>
    </div>
  );
}

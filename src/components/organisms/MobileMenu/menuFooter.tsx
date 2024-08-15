import { Fragment, ReactNode } from 'react';
import { HomeOutlined } from '@ant-design/icons/lib/icons';
import HomeIconFooter from '@/components/icons/menuFooter/Home';
import CategoryIcon from '@/components/icons/menuFooter/Category';
import UserIconFooter from '@/components/icons/menuFooter/User';
import useUser from '@/hooks/useUser';
import PhoneIconFooter from '@/components/icons/menuFooter/Phone';
import { useRouter } from 'next/router';

export default function MenuFooter() {
  const user = useUser();
  const router = useRouter();
  const elementFooter: {
    icon: ReactNode;
    label: string;
    onClick: () => void | ReactNode;
  }[] = [
    {
      icon: <HomeIconFooter className={'text-center w-6'} />,
      label: 'Trang chủ',
      onClick: () => {},
    },
    {
      icon: <CategoryIcon className={'text-center w-6'} />,
      label: 'Danh mục',
      onClick: () => {},
    },
    {
      icon: <PhoneIconFooter className={'text-center w-6'} />,
      label: 'Gọi điện thoại',
      onClick: () => {
        router.push('tel:0961693869');
      },
    },
    {
      icon: <UserIconFooter className={'text-center w-6'} />,
      label: user?.user
        ? user?.user?.name || user?.user?.email || ''
        : 'Đăng nhập',
      onClick: () => {},
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
        'lg:hidden fixed bottom-0 left-0 z-10 bg-white w-full shadow-custom rounded-tr-2xl rounded-tl-2xl'
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

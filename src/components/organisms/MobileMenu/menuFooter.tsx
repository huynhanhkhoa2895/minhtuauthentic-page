import { ReactNode } from 'react';
import { HomeOutlined } from '@ant-design/icons/lib/icons';

export default function MenuFooter() {
  const elementFooter: {
    icon: ReactNode;
    label: string;
    link: string;
  }[] = [
    {
      icon: <HomeOutlined />,
      label: 'Trang chủ',
      link: '/',
    },
  ];

  const itemMenu = () => {};

  return (
    <div className={'fixed bottom-0 left-0 z-10'}>
      <div className={'p-3 flex'}></div>
    </div>
  );
}

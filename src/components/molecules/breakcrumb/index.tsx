import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
  link: string
  label: string
  current?: {label: string, link: string}
}
export default function BreadcrumbComponent({link, label, current}: Props) {
  const [items, setItems] = useState<{title: ReactNode | string}[]>([
    {
      title: <Link href={'/'}>Trang chủ</Link>,
    },
    {
      title: <Link href={link}>{label}</Link>,
    },
  ]);
  useEffect(() => {
    if(current) {
      const _items = [...items];
      _items.push({
        title: <Link href={current?.link}>{current?.label}</Link>
      });
      setItems(_items);
    }
  }, []);
  return <Breadcrumb
    className={'mb-3'}
    items={items}
  />
}
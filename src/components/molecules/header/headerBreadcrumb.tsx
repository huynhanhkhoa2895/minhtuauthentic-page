import React from 'react';
import { useSelector } from 'react-redux';
import { selectorBreadcrumb } from '@/reducers/select';
import { Breadcrumb } from 'antd';

export default function HeaderBreadcrumb() {
  const breadcrumb = useSelector(selectorBreadcrumb);
  return (
    <Breadcrumb
      items={breadcrumb}
      className="m-y-4"
      style={{ margin: '16px 0' }}
    ></Breadcrumb>
  );
}

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AccountInfoUpdate from '@/components/organisms/accountInfo/updateInfo';
import AccountUpdatePassword from '@/components/organisms/accountInfo/updatePassword';
const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Hồ sơ',
    children: <AccountInfoUpdate />,
  },
  {
    key: '2',
    label: 'Đổi mật khẩu',
    children: <AccountUpdatePassword />,
  },
];
export default function AccountInfo(){
  const onChange = (key: string) => {
    console.log(key);
  };
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}
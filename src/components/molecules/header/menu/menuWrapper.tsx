import Menu from '@/components/molecules/header/menu';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';

const MenuWrapper = ({ menu }: { menu: ResponseMenuDto }) => {
  return <Menu className={'h-full'} menu={menu} />;
};
export default MenuWrapper;

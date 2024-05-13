import Menu from '@/components/molecules/header/menu';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';

const MenuWrapper = (menu: ResponseMenuDto | null) => {
  return <Menu className={'h-full'} data={menu?.homeMenuCategory || []} />;
};
export default MenuWrapper;

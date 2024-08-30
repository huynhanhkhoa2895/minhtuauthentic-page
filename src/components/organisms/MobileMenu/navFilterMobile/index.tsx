import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import useMenu from '@/hooks/useMenu';
import NavMenuContent from '@/components/organisms/MobileMenu/navMenu/content';
import React from 'react';

type Props = {
  menu: ResponseMenuDto
}
export default function NavFilterMobile({
  menu
}: Props){
  const {menuDisplay} = useMenu(menu);
  console.log('menuDisplay', menuDisplay);
  return (
    <div className={'fixed right-0 top-0 w-[80vw] h-screen bg-white pt-[67px] pb-[63px] overflow-auto'}>
      <div className={'h-full overflow-auto'}>
        {/*{itemMenu && menu?.filterSetting && (*/}
        {/*  <NavMenuContent*/}
        {/*    menu={itemMenu}*/}
        {/*    brands={menu?.brands || []}*/}
        {/*    setting={menu?.filterSetting}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    </div>
  )
}
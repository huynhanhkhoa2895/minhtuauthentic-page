import IconBars from '@/components/icons/bars';
import { useEffect, useState } from 'react';
import Menu from '@/components/molecules/header/menu';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';

const ButtonMenu = ({ menu }: { menu: ResponseMenuDto | null }) => {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    setIsReady(true);
  }, []);
  const handleClickMenu = () => {
    setDisplayMenu(!displayMenu);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <>
      <button
        type={'button'}
        className={
          'flex p-2 rounded-[10px] items-center gap-2 text-white grow bg-[hsla(0,0%,100%,.2)]'
        }
        onClick={handleClickMenu}
      >
        <IconBars className={'w-[24px] h-[24px]'} />
        <span className={'w-max'}>Danh mục</span>
      </button>
      {isReady &&
        document.getElementById('header') &&
        createPortal(
          <div className={'fixed left-0 top-[180px]'}>
            {menu && (
              <Menu
                menu={menu}
                isPopup={true}
                className={twMerge(
                  'absolute left-0 transition-all duration-500',
                  displayMenu
                    ? 'opacity-100 z-[100] visible'
                    : 'opacity-0 z-[-1] invisible',
                )}
              />
            )}
          </div>,
          document.getElementById('header') as HTMLElement,
        )}
      {isReady &&
        document.getElementById('main-body') &&
        createPortal(
          <div
            onClick={() => {
              setDisplayMenu(false);
            }}
            className={twMerge(
              'bg-[rgba(0,0,0,.53)] fixed top-0 left-0 w-full h-screen z-[2] transition-all duration-300',
              displayMenu
                ? 'opacity-100 z-2 visible'
                : 'opacity-0 z-[-1] invisible',
            )}
          ></div>,
          document.getElementById('main-body') as HTMLElement,
        )}
    </>
  );
};
export default ButtonMenu;

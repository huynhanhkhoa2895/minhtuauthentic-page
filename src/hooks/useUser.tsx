import { UserDto } from '@/dtos/User.dto';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppContext from '@/contexts/appContext';

export default function useUser() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const pathnameNeedLogin = [
    '/gio-hang/thanh-toan',
    '/gio-hang/thanh-cong',
    '/tai-khoan/lich-su/[id]',
  ];

  useEffect(() => {
    const user = getCookie('user');
    if (user) {
      const obj = JSON.parse(user);
      appContext?.setUser && appContext.setUser(obj);
    } else {
      if (pathnameNeedLogin.includes(router.pathname)) {
        router.push('/tai-khoan/dang-nhap?redirectUrl=' + router.pathname);
      }
    }
  }, []);
  const setCookieUser = (user: UserDto) => {
    appContext?.setUser && appContext.setUser(user);
    setCookie('user', JSON.stringify(user), {
      maxAge: 86400,
      path: '/',
    });
  };

  const logout = () => {
    appContext?.setUser && appContext.setUser(undefined);
    deleteCookie('user');
  };

  return { user: appContext?.user, setCookieUser, logout };
}

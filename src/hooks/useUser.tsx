import { UserDto } from '@/dtos/User.dto';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function useUser() {
  const router = useRouter();
  const pathnameNeedLogin = [
    '/gio-hang/thanh-toan',
    '/gio-hang/thanh-cong',
    '/tai-khoan/lich-su/[id]',
  ];
  const [user, setUser] = useState<UserDto | null>(null);
  useEffect(() => {
    const user = getCookie('user');
    if (user) {
      const obj = JSON.parse(user);
      setUser(obj);
    } else {
      if (pathnameNeedLogin.includes(router.pathname)) {
        router.push('/tai-khoan/dang-nhap?redirectUrl=' + router.pathname);
      }
    }
  }, []);
  const setCookieUser = (user: UserDto) => {
    setUser(user);
    setCookie('user', JSON.stringify(user), {
      maxAge: 86400,
      path: '/',
    });
  };

  const logout = () => {
    setUser(null);
    deleteCookie('user');
  };

  return { user, setCookieUser, logout };
}

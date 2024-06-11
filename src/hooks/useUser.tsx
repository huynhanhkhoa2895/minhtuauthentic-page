import { UserDto } from '@/dtos/User.dto';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState<UserDto | null>(null);
  useEffect(() => {
    const user = getCookie('user');
    if (user) {
      setUser(JSON.parse(user));
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
    console.log('logout');
    setUser(null);
    deleteCookie('user');
  };

  return { user, setCookieUser, logout };
}

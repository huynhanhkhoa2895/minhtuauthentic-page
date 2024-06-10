import { UserDto } from '@/dtos/User.dto';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState<UserDto | null>(null);
  useEffect(() => {
    const user = getCookie('user');
    if (user) {
      console.log('useUser', JSON.parse(user));
      setUser(JSON.parse(user));
    }
  }, []);
  const setCookieUser = (user: UserDto) => {
    setUser(user);
    console.log('setCookieUser', user);
    setCookie('user', JSON.stringify(user), {
      maxAge: 86400,
      path: '/',
    });
  };

  const removeCookieUser = () => {
    setUser(null);
    setCookie('user', '', {
      maxAge: 0,
      path: '/',
    });
  };

  return { user, setCookieUser };
}

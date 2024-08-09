import { handleHeader } from '@/utils/api';
import { UserDto } from '@/dtos/User.dto';
import { getCookie } from '@/utils/index';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export default async function getDefaultSeverSide(): Promise<{
  resMenu: Response | null;
  resFooter: Response | null;
}> {
  const resMenu = await fetch(process.env.BE_URL + '/api/pages/menu').catch(
    (error) => {
      return null;
    },
  );
  const resFooter = await fetch(process.env.BE_URL + '/api/pages/footer').catch(
    (error) => {
      return null;
    },
  );
  return { resMenu, resFooter };
}

export async function getProfile(
  cookies: NextApiRequestCookies,
): Promise<UserDto> {
  const url = `${process.env.BE_URL}/api/users/profile`;
  const user = JSON.parse(cookies.user || '');
  const profile = await fetch(url, {
    method: 'GET',
    headers: handleHeader(user?.token),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data?.data;
    })
    .catch((error) => {});
  return profile;
}

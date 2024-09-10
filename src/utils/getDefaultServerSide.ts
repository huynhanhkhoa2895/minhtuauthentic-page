import { handleHeader } from '@/utils/api';
import { UserDto } from '@/dtos/User.dto';
import { getCookie } from '@/utils/index';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { SettingsDto } from '@/dtos/Settings.dto';

export default async function getDefaultSeverSide() {
  const resMenu: { data: ResponseMenuDto } = await fetch(
    process.env.BE_URL + '/api/pages/menu',
  )
    .then((res) => res.json())
    .catch((error) => {
      return null;
    });
  const resFooter: { data: ResponseFooterDto } = await fetch(
    process.env.BE_URL + '/api/pages/footer',
  )
    .then((res) => res.json())
    .catch((error) => {
      return null;
    });
  const resSetting: { data: SettingsDto[] } = await fetch(
    process.env.BE_URL + '/api/pages/settings',
  )
    .then((res) => res.json())
    .catch((error) => {
      return null;
    });
  return {
    menu: resMenu?.data || null,
    footerContent: resFooter?.data || null,
    settings: (resSetting?.data as SettingsDto[]) || null,
  };
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

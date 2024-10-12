import { NextApiRequest, NextApiResponse } from 'next';
import { handleDataFetch } from '@/utils/api';
import { ResponseMenuDto } from '@/dtos/responseMenu.dto';
import { ResponseFooterDto } from '@/dtos/responseFooter.dto';
import { SettingsDto } from '@/dtos/Settings.dto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
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
    res.status(200).json({
      menu: resMenu?.data || undefined,
      footerContent: resFooter?.data || undefined,
      settings: resSetting?.data as SettingsDto[],
    });
  } else {
    res.status(400).json({ error: 'Only GET requests are allowed' });
  }
}

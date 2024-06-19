import type { NextApiRequest, NextApiResponse } from 'next';
import { handleDataFetch } from '@/utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const query = req.query;
    const url =
      `${process.env.BE_URL}/api/orders/create?` +
      new URLSearchParams(query as any).toString();

    const rs = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + req.cookies['token'] || '',
      },
      body: req.body,
    })
      .then((response) => response.json())
      .then((data) => {
        const _data = handleDataFetch(data);
        res.status(200).json(_data);
      }).catch((error) => {
        res
          .status(error?.response?.statusCode || error?.status || 500)
          .json(error);
      });;
    res.status(200).json(rs);
  } else {
    res.status(400).json({ error: 'Only POST requests are allowed' });
  }
}

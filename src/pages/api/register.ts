import { NextApiRequest, NextApiResponse } from 'next';
import { handleDataFetch } from '@/utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const url = `${process.env.BE_URL}/api/users/register`;
    fetch(url, {
      method: 'POST',
      body: req.body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const _data = handleDataFetch(data);
        res.status(200).json(_data);
      })
      .catch((error) => {
        res
          .status(error?.response?.statusCode || error?.status || 500)
          .json(error);
      });
  } else {
    res.status(400).json({ error: 'Only POST requests are allowed' });
  }
}

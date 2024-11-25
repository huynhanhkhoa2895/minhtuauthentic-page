import type { NextApiRequest, NextApiResponse } from 'next';
import { validateGoogleRecaptcha } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const url = `${process.env.BE_URL}/api/pages/product/rate/`;
    const result: boolean = await validateGoogleRecaptcha(req.body);
    if (!result && process.env.NODE_ENV === 'production') {
      res.status(400).json({ message: 'Invalid reCAPTCHA' });
      return;
    }

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { handleDataFetch } from '@/utils/api';
import jwt from 'jsonwebtoken';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const url = `${process.env.NEXT_PUBLIC_BAO_KIM_URL}/payment/api/v5/order/send`;
    const sign = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      iss: process.env.NEXT_PUBLIC_BAO_KIM_API,
      aud: process.env.NEXT_PUBLIC_BAO_KIM_SECRET,
    };
    const auth = await jwt.sign(sign, process.env.NEXT_PUBLIC_BAO_KIM_SECRET);
    console.log(
      'url baokim',
      process.env.NEXT_PUBLIC_BAO_KIM_API,
      process.env.NEXT_PUBLIC_BAO_KIM_SECRET,
      url,
    );
    console.log('sign', sign);
    console.log('jwt', auth);
    fetch(url, {
      method: 'POST',
      body: req.body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
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

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const url = `${process.env.BE_URL}/api/pages/product/rate/${id}`;
    return fetch(url, {
      method: 'GET',
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

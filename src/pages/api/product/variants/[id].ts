import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const query = req.query;
    const rs = await fetch(
      process.env.BE_URL + '/api/pages/products/variant/' + query.id,
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => {
        console.error('Error:', error);
      });
    res.status(200).json(rs);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
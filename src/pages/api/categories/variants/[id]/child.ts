import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res
      .status(400)
      .json({ status: 400, message: 'Invalid category ID' });
  }

  try {
    const response = await fetch(
      `${process.env.BE_URL}/api/pages/category/${id}/children`,
    );
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error calling child categories API:', error);
    return res.status(500).json({
      status: 500,
      message: 'Failed to fetch child categories',
    });
  }
}

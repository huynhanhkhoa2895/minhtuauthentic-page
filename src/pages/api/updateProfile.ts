import { NextApiRequest, NextApiResponse } from 'next';
import { handleDataFetch, handleHeader } from '@/utils/api';
import { getCookie } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const url = `${process.env.BE_URL}/api/users/update-profile`;
    const user = JSON.parse(
      getCookie('user', req.headers.cookie || '', true),
    );
    fetch(url, {
      method: 'PUT',
      body: req.body,
      headers: handleHeader(user.token),
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

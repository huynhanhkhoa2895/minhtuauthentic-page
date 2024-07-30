import { NextApiResponse } from 'next';

export const handleDataFetch = (data: any, res?: NextApiResponse) => {
  if (data.statusCode !== 200 && data.statusCode !== 201) {
    if (res) {
      res.status(data.statusCode).json(data);
    } else {
      throw new Error(data.statusCode);
    }
  }
  return data;
};

import { NextApiRequest, NextApiResponse } from 'next';
import zxcvbn from 'zxcvbn';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = zxcvbn(req.query['password'] + '');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).json(result);
};

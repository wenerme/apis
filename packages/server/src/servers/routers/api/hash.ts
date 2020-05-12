import { NextApiRequest, NextApiResponse } from 'next';
import { isValidRequest } from 'src/modules/hash/types';
import { hashing } from 'src/modules/hash/libs/hasings';

export async function handleHash(req: NextApiRequest, res: NextApiResponse) {
  const { algorithm, alg, encoding = 'base64', format = 'txt', content } = req.query;
  const request = { algorithm: algorithm || alg, encoding, format, content };
  const errors = [];
  if (!isValidRequest(request, errors)) {
    res.status(400).json({ code: 400, message: errors.join(';') });
    return;
  }
  const result = hashing(request);

  res.setHeader('Cache-Control', 'public, max-age=86400');
  if (request['format'] === 'txt') {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(result['digest']);
    return;
  }
  res.status(200).json(result);
}

import {NextApiRequest, NextApiResponse} from 'next';
import {hashing} from 'modules/hash/libs/hasings';
import {isValidRequest} from 'modules/hash/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const request = req.query;
  // console.log(`Hashing`, request);
  const errors = [];
  if (!isValidRequest(request, errors)) {
    res.status(400).json({code: 400, message: errors.join(';')});
    return
  }
  const result = hashing(request);
  if (request['format'] === 'txt') {
    res.status(200).send(result['digest']);
    return
  }
  res.status(200).json(result)
}

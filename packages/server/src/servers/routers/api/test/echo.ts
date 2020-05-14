import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';

export async function handleTestEcho(req: NextApiRequest, res: NextApiResponse) {
  const picked = _.pick(req, ['body', 'headers', 'cookie', 'query', 'url', 'method']);
  console.debug(`Echo Request`, picked);
  res.json(picked);
  res.end();
}

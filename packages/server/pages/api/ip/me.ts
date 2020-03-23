import { NextApiRequest, NextApiResponse } from 'next';
import { getClientAddress } from 'libs/nexts/utils/requests';
import { cors } from 'libs/nexts/middlewares/cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(getClientAddress(req));
};

export default cors()(handler);

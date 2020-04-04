import { NextApiRequest, NextApiResponse } from 'next';
import { getClientAddress } from 'src/libs/nexts/utils/requests';
import { cors } from 'src/libs/nexts/middlewares/cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const address = getClientAddress(req);
  const { 'cf-ipcountry': countryCode } = req.headers;

  console.log(`Headeer`, req.headers);

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send({
    address,
    raw: req?.socket?.address(),
    country: { code: countryCode },
  });
};

export default cors()(handler);

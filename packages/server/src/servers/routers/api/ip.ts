import { getClientAddress } from 'src/libs/nexts/utils/requests';
import { NextApiRequest, NextApiResponse } from 'next';

export function handleMyIpText(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(getClientAddress(req));
}

export async function handleMyIpJson(req: NextApiRequest, res: NextApiResponse) {
  const address = getClientAddress(req);
  const { 'cf-ipcountry': countryCode = null } = req.headers;

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send({
    address,
    raw: req?.socket?.address(),
    country: { code: countryCode },
  });
}

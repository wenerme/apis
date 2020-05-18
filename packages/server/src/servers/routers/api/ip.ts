import { NextApiRequest, NextApiResponse } from 'next';
import { getClientAddress } from 'src/libs/http/getClientAddress';

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

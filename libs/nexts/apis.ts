import {NextApiRequest} from 'next';

export function getClientAddress(req: NextApiRequest) {
  const {
    'true-client-ip': a,
    'cf-connecting-ip': b,
    'x-forwarded-for': c,
  } = req.headers;
  let ip = a ?? b ?? c;

  if (typeof req?.socket?.address() === 'string') {
    ip = ip ?? req.socket.address() as string
  } else {
    ip = ip ?? req?.socket?.address()?.['address']
  }

  return ip
}

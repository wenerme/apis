import { IncomingMessage } from 'http';
import { firstOfMaybeArray } from '@wener/utils';

export function getClientAddress(req: IncomingMessage) {
  const { 'true-client-ip': a, 'cf-connecting-ip': b, 'x-forwarded-for': c } = req.headers;
  let ip = firstOfMaybeArray(a ?? b ?? c) || '';

  ip = ip || req.connection.remoteAddress;
  if (typeof req?.socket?.address() === 'string') {
    ip = ip ?? (req.socket.address() as string);
  } else {
    ip = ip ?? req?.socket?.address()?.['address'];
  }
  // prevent ::ffff:127.0.0.1
  if (ip.startsWith('::ffff:')) {
    ip = ip.substr(7);
  }
  return ip;
}

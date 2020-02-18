import {IncomingMessage} from 'http';

export function getClientAddress(req: IncomingMessage) {
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


/// https://github.com/jekrb/next-absolute-url/blob/master/index.ts
export function parseRequestUrl(req: IncomingMessage, def: string) {
  let host = (req ? req.headers.host : window.location.host) || def;
  let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';

  if (
    req &&
    req.headers['x-forwarded-host'] &&
    typeof req.headers['x-forwarded-host'] === 'string'
  ) {
    host = req.headers['x-forwarded-host']
  }

  if (
    req &&
    req.headers['x-forwarded-proto'] &&
    typeof req.headers['x-forwarded-proto'] === 'string'
  ) {
    protocol = `${req.headers['x-forwarded-proto']}:`
  }

  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  }
}

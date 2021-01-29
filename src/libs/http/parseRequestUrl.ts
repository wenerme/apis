import { IncomingMessage } from 'http';

/// https://github.com/jekrb/next-absolute-url/blob/master/index.ts
export function parseRequestUrl(req: IncomingMessage, def = 'http://localhost:3000') {
  let host = (req ? req.headers.host : window.location.host) || def;
  let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';

  if (req && req.headers['x-forwarded-host'] && typeof req.headers['x-forwarded-host'] === 'string') {
    host = req.headers['x-forwarded-host'];
  }

  if (req && req.headers['x-forwarded-proto'] && typeof req.headers['x-forwarded-proto'] === 'string') {
    protocol = `${req.headers['x-forwarded-proto']}:`;
  }

  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  };
}

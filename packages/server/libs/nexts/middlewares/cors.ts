import { parseRequestUrl } from 'libs/nexts/utils/requests';

const DEFAULT_ALLOW_METHODS = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

const DEFAULT_ALLOW_HEADERS = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept',
];

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

export interface CorsOption {
  origin: string | string[];
  maxAge: number;
  allowMethods: string[];
  allowHeaders: string[];
  allowCredentials: boolean;
  exposeHeaders: [];
}

export const cors = (options: Partial<CorsOption> = {}) => (handler) => (req, res, ...restArgs) => {
  const {
    origin = '*',
    maxAge = DEFAULT_MAX_AGE_SECONDS,
    allowMethods = DEFAULT_ALLOW_METHODS,
    allowHeaders = DEFAULT_ALLOW_HEADERS,
    allowCredentials = true,
    exposeHeaders = [],
  } = options as any;

  if (typeof origin === 'string') {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (Array.isArray(origin)) {
    const requestOrigin = parseRequestUrl(req).origin;
    if (origin.includes(requestOrigin)) {
      res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    }
  }

  if (allowCredentials) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (exposeHeaders.length) {
    res.setHeader('Access-Control-Expose-Headers', exposeHeaders.join(','));
  }

  const preFlight = req.method === 'OPTIONS';
  if (preFlight) {
    res.setHeader('Access-Control-Allow-Methods', allowMethods.join(','));
    res.setHeader('Access-Control-Allow-Headers', allowHeaders.join(','));
    res.setHeader('Access-Control-Max-Age', String(maxAge));
  }

  return handler(req, res, ...restArgs);
};

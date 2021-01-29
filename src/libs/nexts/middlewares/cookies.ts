import { CookieSerializeOptions, serialize } from 'cookie';
import { ApiHandler } from '../types';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res, name, value, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    if (!options.expires) {
      options.expires = new Date(Date.now() + options.maxAge * 1000);
    }
  } else if ('expires' in options) {
    options.maxAge = (Date.now() - +options.expires) / 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
export function cookies<Req = NextApiRequest, Res = NextApiResponse>(
  handler: ApiHandler<Req, Res & { cookie: (name, value, options?: CookieSerializeOptions) => void }>,
) {
  return (req, res) => {
    res.cookie = (name, value, options) => cookie(res, name, value, options);

    return handler(req, res);
  };
}

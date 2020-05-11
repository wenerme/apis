import { normalizeError } from 'src/libs/nexts/middlewares/errors';
import { sleep } from '@wener/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getCertificateByUrl } from 'src/libs/pki/utils/getCertificateByUrl';
import zxcvbn from 'zxcvbn';
import { getClientAddress } from 'src/libs/nexts/utils/requests';
import { isValidRequest } from 'src/modules/hash/types';
import { hashing } from 'src/modules/hash/libs/hasings';

export function routes(route) {
  // handle error
  route.use(async (req, res, next) => {
    try {
      await next();
    } catch (e) {
      const detail = normalizeError(e);
      res.status(detail.status).json(detail);
      console.error(`ERROR Handle ${req.url}`, e);
    }
  });

  route.get('/api/error', async () => {
    await sleep(200);
    throw new Error('error request');
  });

  route.get('/api/version', (req, res) => {
    res.status(200).json({
      version: process.env.APP_VERSION || '1.0.0',
      build: { date: process.env.APP_BUILD_DATE },
    });
  });

  route.post('/api/pki/cert/url', async (req: NextApiRequest, res: NextApiResponse) => {
    const { url } = req.body;
    const certificate = await getCertificateByUrl(url, { timeout: 5000 });
    res.status(200).json({
      url,
      certificate: certificate.pemEncoded,
    });
  });

  route.get('/api/password/zxcvbn/:password', (req, res) => {
    const result = zxcvbn(req.params['password'] + '');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).json(result);
  });

  route.get('/api/ip', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(getClientAddress(req));
  });
  route.get('/api/ip.json', async (req: NextApiRequest, res: NextApiResponse) => {
    const address = getClientAddress(req);
    const { 'cf-ipcountry': countryCode = null } = req.headers;

    // console.log(`Header`, req.headers);

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send({
      address,
      raw: req?.socket?.address(),
      country: { code: countryCode },
    });
  });

  route.get('/api/hash', async (req: NextApiRequest, res: NextApiResponse) => {
    const { algorithm, alg, encoding = 'base64', format = 'txt', content } = req.query;
    const request = { algorithm: algorithm || alg, encoding, format, content };
    const errors = [];
    if (!isValidRequest(request, errors)) {
      res.status(400).json({ code: 400, message: errors.join(';') });
      return;
    }
    const result = hashing(request);

    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (request['format'] === 'txt') {
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(result['digest']);
      return;
    }
    res.status(200).json(result);
  });

  return route;
}

import { normalizeError } from 'src/libs/nexts/middlewares/errors';
import { sleep } from '@wener/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleTestSse } from 'src/servers/routers/api/test/sse';
import { handleHash } from 'src/servers/routers/api/hash';
import { handleMyIpJson, handleMyIpText } from 'src/servers/routers/api/ip';
import { handleZxcvbnStrength } from 'src/servers/routers/api/password/zxcvbn';
import { handleCertOfUrl } from 'src/servers/routers/api/pki/cert/url';
import { Router } from 'src/servers/routers/interfaces';
import { handleLinearCodeGenerate } from 'src/servers/routers/api/barcode/handleLinearCodeGenerate';
import { handleQrCodeGenerate } from 'src/servers/routers/api/barcode/handleQrCodeGenerate';
import { routeVolatile } from 'src/servers/routers/api/volatile/routeVolatile';
import { handleTestEcho } from 'src/servers/routers/api/test/echo';
import cors from 'cors';
import { json, text, urlencoded } from 'body-parser';

export function routes(r: any) {
  const route = r as Router<NextApiRequest, NextApiResponse>;
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
  route.use(json());
  route.use(urlencoded({ extended: true }));
  route.use(text());

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

  route.get('/api/barcode/qrcode', handleQrCodeGenerate);
  route.get('/api/barcode/linear', handleLinearCodeGenerate);

  route.post('/api/pki/cert/url', handleCertOfUrl);

  route.get('/api/password/zxcvbn/:password', handleZxcvbnStrength);
  route.get('/api/password/zxcvbn', handleZxcvbnStrength);

  const corsOrigin = cors({ origin: true });
  route.get('/api/ip', corsOrigin, handleMyIpText);
  route.get('/api/ip.json', corsOrigin, handleMyIpJson);

  route.get('/api/hash', handleHash);

  route.get('/api/test/sse', handleTestSse);
  route.all('/api/test/echo', handleTestEcho);

  routeVolatile(route);

  return route;
}

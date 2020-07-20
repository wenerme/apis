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
import { handlePhoneAttribution } from './api/phone/attribution/handlePhoneAttribution';
import { createRequestHandler } from 'src/modules/service/provider/createRequestHandler';
import { ServerProviders } from 'src/servers/routers/services';
import { PasswordStrengthServiceImpl } from 'src/modules/password/services/PasswordStrengthServiceImpl';
import { PasswordStrengthService } from 'src/modules/client';

export function routes(r: any) {
  const route = r as Router<NextApiRequest, NextApiResponse>;
  // handle error
  route.use(async (req, res, next) => {
    try {
      return await next();
    } catch (e) {
      const detail = normalizeError(e);
      res.status(detail.status).json(detail);
      console.error(`ERROR Handle ${req.url}`, e);
    }
  });
  route.use(json());
  route.use(urlencoded({ extended: true }));
  route.use(text());

  const corsOrigin = cors({ origin: true });

  // testing
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

  // barcode
  route.get('/api/barcode/qrcode', handleQrCodeGenerate);
  route.get('/api/barcode/linear', handleLinearCodeGenerate);

  // pki
  route.post('/api/pki/cert/url', handleCertOfUrl);

  // password
  route.get('/api/password/zxcvbn/:password', handleZxcvbnStrength);
  route.get('/api/password/zxcvbn', handleZxcvbnStrength);

  // ip
  route.get('/api/ip', corsOrigin as any, handleMyIpText);
  route.get('/api/ip.json', corsOrigin as any, handleMyIpJson);

  // hashing
  route.get('/api/hash', handleHash);
  route.get('/api/hash/md/:algorithm/:encoding/:format/:content', handleHash);

  // phone number
  route.get('/api/phone/attribution/:num', handlePhoneAttribution);

  // testing
  route.get('/api/test/sse', handleTestSse);
  route.all('/api/test/echo', handleTestEcho);

  // volatile apis
  routeVolatile(route);

  //
  ServerProviders.registryInstance(new PasswordStrengthServiceImpl(), PasswordStrengthService);
  route.all('/api/service/:group/:service/:version/invoke/:method', createRequestHandler(ServerProviders));
  route.all('/api/service/:group/:service/:version/invoke', createRequestHandler(ServerProviders));

  return route;
}

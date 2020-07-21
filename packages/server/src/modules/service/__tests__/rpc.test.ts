/**
 * @jest-environment node
 */
import { ServiceProviderManager } from 'src/modules/service/provider/ServiceProviderManager';
import { ServiceConsumerManager } from 'src/modules/service/consumer/ServiceConsumerManager';
import { ServiceNameAttribute } from 'src/modules/service/interfaces';
import { createRequestHandler } from 'src/modules/service/provider/createRequestHandler';
import axios from 'axios';
import { json, text, urlencoded } from 'body-parser/index';
import { loggerMiddleware } from 'src/servers/middlewares/loggerMiddleware';
import { mergePathParamsToQueryMiddleware } from 'src/servers/middlewares/mergePathParamsToQueryMiddleware';
import { errorInterceptorMiddleware } from 'src/servers/middlewares/errorInterceptorMiddleware';
import { enhanceMiddleware } from 'src/servers/middlewares/enhanceMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors/lib/index';

class PingService {
  static [ServiceNameAttribute] = 'me.wener.test.PingService';
  static instance = new PingService();

  async ping() {
    return 'PONG';
  }

  async hello(name: string) {
    return `Hello ${name} !`;
  }

  async echo(body: any) {
    return body;
  }
}

test('provide and consume local', async () => {
  const provider = new ServiceProviderManager();
  const consumer = new ServiceConsumerManager();
  consumer.provider = provider;
  provider.registryInstance(PingService.instance);

  const svc = consumer.consume(PingService);
  await specPingService(svc);
});

async function specPingService(svc: PingService) {
  expect(await svc.ping()).toBe('PONG');
  expect(await svc.hello('Wener')).toBe('Hello Wener !');
  expect(await svc.echo({ message: 'Hi there' })).toEqual({ message: 'Hi there' });
}

test('provide and consume http', async () => {
  jest.setTimeout(600000);
  const provider = new ServiceProviderManager();
  provider.registryInstance(PingService.instance);
  // import polka from 'polka';
  const port = 51234;
  const route = require('polka')();
  route.use(enhanceMiddleware);
  route.use(loggerMiddleware);
  route.use(mergePathParamsToQueryMiddleware);
  route.use(errorInterceptorMiddleware);
  // body parser
  route.use(json());
  route.use(urlencoded({ extended: true }));
  route.use(text());

  const corsOrigin = cors({ origin: true });
  route.use(corsOrigin);

  route.all('/ping', (req: NextApiRequest, res: NextApiResponse, next) => res.send('PONG'));
  route.all('/api/service', (req: NextApiRequest, res: NextApiResponse, next) => res.send('OK'));

  const handler = createRequestHandler(provider);
  route.all('/api/service/:group/:service/:version/invoke/:method', handler);
  route.all('/api/service/:group/:service/:version/invoke', handler);

  await new Promise((resolve, reject) => {
    route.listen(port, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
      console.info(`Listen http://localhost:${port}`);
    });
  });

  const consumer = new ServiceConsumerManager();
  consumer.client = axios.create({
    baseURL: `http://localhost:${port}/api/service`,
    timeout: 30000,
  });

  expect((await consumer.client.get('/')).data).toBe('OK');

  const svc = consumer.consume(PingService);
  await specPingService(svc);

  await route.server.close();
});

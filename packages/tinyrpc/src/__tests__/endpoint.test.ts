/**
 * @jest-environment node
 */
import {
  getServiceCoordinateOfType,
  JsonInvocationRequest,
  JsonInvocationResponse,
  TinyConsumer,
  TinyProvider,
} from '..';
import http, { IncomingMessage, Server as HttpServer } from 'http';
import polka from 'polka';
import { json } from 'body-parser';
import { createFetchInvoke } from '../client/fetch';
import fetch from 'cross-fetch';

test('test in-mem provider', async () => {
  const provider = new TinyProvider();
  provider.registry(PingService.instance);

  await specPingService(PingService.instance);
  await specPingService(provider.consume(PingService));
});

async function specPingService(svc: PingService) {
  expect(await svc.ping()).toBe('PONG');
  expect(await svc.hello('Wener')).toBe('Hello Wener !');
  expect(await svc.echo({ message: 'Hi there' })).toEqual({ message: 'Hi there' });
}

class PingService {
  static service = 'me.wener.apis.PingService';
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

  async now() {
    return Date.now();
  }
}

test('server provider', async () => {
  const provider = new TinyProvider();
  provider.registry(PingService.instance);

  const { baseUrl, stop } = await createTestServer({ provider });

  const onInvoke = createFetchInvoke({ baseUrl: `${baseUrl}/api/service/`, fetch });
  const consumer = new TinyConsumer({ onInvoke });

  const svc = consumer.consume(PingService);
  await specPingService(svc);

  await stop();
});

function createTestServer({ provider }): Promise<any> {
  return new Promise((resolve, reject) => {
    polka()
      .use(json({ limit: '5mb' }))
      .post('/api/service/:group/:service/:version/:method', async (req: IncomingMessage, res) => {
        // added by polka
        const params = req['params'];
        const body: JsonInvocationRequest = req['body'];
        body.method = body.method || params.method;
        body.id = body.id || params.id || String(req.headers['x-request-id'] || '');

        const { id, method = '' } = body;
        const coord = getServiceCoordinateOfType(params);
        const service = provider.consume(coord);

        const response: JsonInvocationResponse = {};
        if (id) {
          response.id = id;
        }
        try {
          response.result = await service[method](...body.params);
        } catch (e) {
          response.error = normalizeError(e);
        }
        res.statusCode = response?.error?.status || 200;
        res.end(JSON.stringify(response));
      })
      .listen(0, function(this: HttpServer, err) {
        if (err) {
          reject(err);
          throw err;
        }
        const port = this.address()?.['port'];
        console.log(`> Running on localhost:${port}`);
        resolve({
          baseUrl: `http://localhost:${port}`,
          stop: () => {
            return new Promise((resolve, reject) => {
              this.close(e => {
                e ? reject(e) : resolve();
              });
            });
          },
        });
      });
  });
}

function normalizeError(err) {
  let status = err.code || err.status || 500;
  const code = err.code || status;
  status = parseInt(status, 10);
  status = status < 400 || status >= 600 ? 500 : status;
  const message = err.length && err || err.message || http.STATUS_CODES[status];
  return { status, code, message };
}

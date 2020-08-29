/**
 * @jest-environment node
 */
import { TinyConsumer, TinyProvider } from '..';

import { createFetchInvoke } from '../client/fetch';
import fetch from 'cross-fetch';
import { createTestServer } from '../server/testing';

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

describe('server provider', async () => {
  const provider = new TinyProvider();
  provider.registry(PingService.instance);

  let serviceBaseUrl, stop;
  beforeAll(async () => {
    const r = await createTestServer({ provider });
    serviceBaseUrl = r.serviceBaseUrl;
    stop = r.stop;
  });
  afterAll(async () => {
    await stop();
  });

  test('test fetch invoke', async () => {
    const onInvoke = createFetchInvoke({ baseUrl: serviceBaseUrl, fetch });
    const consumer = new TinyConsumer({ onInvoke });

    const svc = consumer.consume(PingService);
    await specPingService(svc);
  });

});

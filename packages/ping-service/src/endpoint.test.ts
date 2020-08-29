import { TinyProvider } from './tinyrpc/endpoint';
import { PingService } from './PingService';

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

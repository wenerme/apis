import { createServiceConsumer } from '../src/consumer';
import { PingService } from '../src/services/PingService';
import { GlobalRegistry } from '../src/global';
import { createServiceDefinition } from '../src/ServiceRegistry';

const consumeMemoryService = createServiceConsumer({ consumer: GlobalRegistry.invoke.bind(GlobalRegistry) });

test('Ping Service', async () => {
  GlobalRegistry.provide(
    createServiceDefinition({
      name: 'PingService',
      target: PingService.instance,
    })
  );

  const svc: PingService = consumeMemoryService({ service: 'PingService' });

  expect(await svc.ping()).toBe('PONG');
  expect(await svc.hello('Wener')).toBe('Hello Wener !');

  console.log(await svc.hello('xxx'));
  console.log(await svc.echo({ message: 'Hi there' }));
});

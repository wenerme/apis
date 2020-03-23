import { ServiceInvocationHandler } from './types';

interface ProxyContext {
  invokers: Record<string, Function>;
}

export interface ConsumeOptions {
  consumer?: ServiceInvocationHandler;
  service: string;
  includes?: string[];
  excludes?: string[];
}

export function consumeService<T extends object>(options: ConsumeOptions): T {
  const { consumer, service, includes = [], excludes = [] } = options;

  const t: ProxyContext = {
    invokers: {},
  };

  return new Proxy<T>(t as any, {
    get(target: T, p: any, receiver: any): any {
      if (target !== t) {
        return;
      }
      if (includes.length) {
        if (includes.includes(p)) {
          return;
        }
      }
      if (excludes.length) {
        if (!excludes.includes(p)) {
          return;
        }
      }
      // cache invoker
      return (t.invokers[p] =
        t.invokers[p] ??
        createInvoker({
          consumer,
          service,
          method: p,
        }));
    },
  });
}

function createInvoker(context: { consumer: ServiceInvocationHandler; service; method }) {
  const { consumer, service, method } = context;
  return (...args) => {
    const res = consumer({
      service,
      method,
      arguments: args,
    });
    return res.then((v) => v?.result);
  };
}

export function createServiceConsumer(
  opts: Partial<ConsumeOptions> & { consumer }
): (options: ConsumeOptions & { service }) => any {
  const services = {};
  return (options) => {
    const { service } = options;
    return (services[service] = services[service] ?? consumeService(Object.assign({}, opts, options)));
  };
}

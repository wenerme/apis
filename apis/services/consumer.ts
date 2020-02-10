import {ServiceInvocationHandler} from 'apis/services/types';

export function consumeService<T extends object>(options: {
  consumer: ServiceInvocationHandler,
  service: string,
  includes?: string[],
  excludes?: string[],
}): T {
  const {consumer, service, includes = [], excludes = []} = options;

  const t: any = {};

  return new Proxy<T>(t, {
    get(target: T, p: any, receiver: any): any {
      if (target !== t) {
        return;
      }
      if (includes.length) {
        if (includes.includes(p)) {
          return
        }
      }
      if (excludes.length) {
        if (!excludes.includes(p)) {
          return
        }
      }

      return createInvoker({
        consumer,
        service,
        method: p,
      })
    }
  })
}

export function createInvoker(context: { consumer: ServiceInvocationHandler, service, method }) {
  const {consumer, service, method} = context;
  return (...args) => {
    const res = consumer({
      service,
      method,
      arguments: args,
    });
    return res.then(v => v?.result);
  }
}

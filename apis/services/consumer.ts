import {ServiceInvocationHandler} from 'apis/services/types';
import unfetch from 'isomorphic-unfetch';

export function createFetchConsumer<T>({url, fetch = unfetch}): ServiceInvocationHandler {
  return async req => {
    const result = fetch(url, {
        method: 'POST',
        body: JSON.stringify(req)
      })
        .then(async v => {
          if (v.status !== 200) {
            const body = await v.text();
            let parsed;
            try {
              parsed = JSON.parse(body)
            } catch (e) {
            }
            const message = parsed?.message ?? body;
            throw Object.assign(new Error(`invoke failed ${v.status} ${req?.service}/${req?.method}: ${message}`), {
              status: v.status,
              headers: v.headers,
              content: parsed ?? body
            })
          }
          return v.json()
        })
    ;

    return result
  }
}

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

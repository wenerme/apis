const ProxyTargetSymbol = Symbol('ProxyTarget');

export type ProxyInvokeHandler = (ctx: ProxyContext, method: string, args: any[]) => any;

export function createProxy<T extends object>(options: { methods?: any; handler?: ProxyInvokeHandler }): T {
  const t: ProxyContext = { invokers: {}, [ProxyTargetSymbol]: true, ...options } as ProxyContext;
  return new Proxy<T>(t as any, {
    get(target: any, method: any, receiver: any): any {
      if (!target[ProxyTargetSymbol]) {
        throw new Error(`Invalid invoke target`);
      }

      const { invokers, methods, handler } = target as ProxyContext;

      let apply = methods?.[method];
      if (typeof apply !== 'function') {
        apply = (...args: any[]) => {
          return handler(target, method, args);
        };
      }

      if (!invokers[method]) {
        invokers[method] = {
          context: target,
          method: method,
          receiver,
          apply,
        };
      }
      // cache invoker
      return invokers[method].apply;
    },
  });
}

export interface ProxyContext {
  [ProxyTargetSymbol]: true;
  invokers: Record<string, ProxyInvoker>;
  methods?: Record<string, any>;
  handler?: any;
}
export interface ProxyInvoker {
  context: ProxyContext;
  method: string;
  receiver: any;
  apply?: Function;
}

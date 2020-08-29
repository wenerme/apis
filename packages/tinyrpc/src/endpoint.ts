import {
  AbstractType,
  Consumer,
  Provider,
  RegistrationMethod,
  ServiceConsumeType,
  ServiceCoordinate,
  ServiceRegistration,
  ServiceRegistrationType,
} from './interfaces';
import { MethodInterceptor, MethodInvocation } from './aop';
import { getPathOfCoordinate, getServiceCoordinateOfType } from './utils';

type Func = (...args) => any;

export class TinyConsumer implements Consumer {
  protected services: Record<string, any> = {};
  protected interceptors: MethodInterceptor[] = [];
  protected onInvoke: (invocation: MethodInvocation) => any;

  constructor(init: { onInvoke?: (invocation: MethodInvocation) => any } = {}) {
    const {
      onInvoke = () => {
        throw new Error('no invoke handler');
      },
    } = init;
    this.onInvoke = onInvoke;
  }

  use(...v: MethodInterceptor[]): this {
    this.interceptors = [...this.interceptors, ...v];
    return this;
  }

  consume<T = any>(consumeType: ServiceConsumeType<T>): T {
    let coord: ServiceCoordinate;
    if ('prototype' in consumeType) {
      coord = getServiceCoordinateOfType(consumeType);
    } else {
      if (consumeType.type) {
        coord = Object.assign(getServiceCoordinateOfType(consumeType.type), consumeType);
      } else {
        coord = consumeType;
      }
    }
    const key = getPathOfCoordinate(coord);

    return this.services[key] = this.services[key] || this.createProxy(coord);
  }

  private createProxy(coordinate: ServiceCoordinate, opts?): any {
    const target: ProxyServiceTarget = {
      coordinate, interceptors: this.interceptors, invoke: this.onInvoke,
    };
    return new Proxy(target, new ServiceProxy());
  }
}

interface ProxyServiceTarget {
  coordinate: ServiceCoordinate;
  interceptors: MethodInterceptor[];

  invoke(invocation: MethodInvocation): any
}

interface InvocationContext {
  coordinate: ServiceCoordinate;
}

class ServiceProxy implements ProxyHandler<any> {
  private _methods: Record<string, (...params: any[]) => any> = {};

  get(target: any, p: PropertyKey, receiver: any): any {
    if (typeof p !== 'string') {
      return undefined;
    }
    return this._methods[p] = this._methods[p] || this.createMethod(target, p, receiver);
  }

  isExtensible() {
    return false;
  }

  set(target: any, p: PropertyKey, value: any, receiver: any): boolean {
    return false;
  }

  private createMethod(target: any, method: string, receiver: any) {
    const { coordinate, interceptors, invoke } = target as ProxyServiceTarget;
    return (...params) => {
      const invocation: InterceptedMethodInvocation = {
        method,
        target,
        arguments: params,

        context: {
          coordinate,
        },

        interceptorIndex: 0,
        proceed(): any {
          const interceptorIndex = this.interceptorIndex;
          return interceptorIndex === interceptors.length
            ? invoke(this)
            : interceptors[interceptorIndex].invoke({
              ...this,
              interceptorIndex: interceptorIndex + 1,
            } as InterceptedMethodInvocation);
        },
      };
      return invocation.proceed();
    };
  }
}

interface InterceptedMethodInvocation extends MethodInvocation {
  interceptorIndex: number
}

interface RegistrationMethodMeta extends RegistrationMethod {
  name: string
}

interface RegistrationMeta extends ServiceRegistration {
  service: string;
  version: string;
  group: string;
  type: AbstractType<any>
  context: any
  methods: RegistrationMethodMeta[]
}

export class TinyProvider extends TinyConsumer implements Provider {
  private registries: RegistrationMeta[] = [];

  onInvoke = (invocation: MethodInvocation) => {
    const { method, arguments: args } = invocation;
    const { coordinate: coord } = invocation.context;
    const meta = this.registries.find(v => coord.service === v.service && coord.group === v.group && coord.version == v.version);
    if (!meta) {
      throw Object.assign(new Error(`Service not found`), { status: 500, request: { coordinate: coord, method } });
    }
    const call = meta.target[method] as Func;
    if (!call) {
      throw Object.assign(new Error(`Method not found`), { status: 500, request: { coordinate: coord, method } });
    }
    return call.apply(meta.target, args);
  };

  registry(metaLike: ServiceRegistrationType) {
    const meta = 'target' in metaLike ? metaLike : { target: metaLike };

    const type = meta.type || Object.getPrototypeOf(meta.target);
    // ignore typing check
    const r: RegistrationMeta = {
      context: {},
      methods: [],
      ...getServiceCoordinateOfType(type.constructor),
      ...meta,
      type: type,
    } as any;

    if (!(r.group && r.version && r.service)) {
      throw new Error(`Invalid registry: group:${r.group} version:${r.version} service:${r.service}`);
    }

    // hook
    console.info(`Registry group: ${r.group} version:${r.version} service:${r.service}`);
    this.registries.push(r);
  }
}

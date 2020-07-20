import {
  getServiceMetadataOfType,
  getServicePathOfCoordinate,
  ServiceCoordinate,
  ServiceProvider,
  ServiceRegistration,
} from '../interfaces';

function normalizeError(e) {
  return { status: e.status || 500, message: e.message || Object.prototype.toString.call(e) };
}

export interface ServiceInvocation {
  id: string;
  method: string;
  params;
}

export interface InvocationResponse {
  id: string;
  result?;
  error?;
}

export class ServiceMetadata {
  registration: ServiceRegistration;
  target;
  methods = {};

  async invoke(invoke: ServiceInvocation): Promise<InvocationResponse> {
    const { method: methodName, params, id } = invoke;
    const method = this.methods[methodName];
    // 不允许 _ 开头的方法
    // typescript abstract method 不会生成签名，因此不能用于 interface
    if (!method || methodName.startsWith('_')) {
      // console.error(`Method Not Found: ${this.registration.service} [${Object.keys(this.methods).join(',')}]`, invoke);
      return Promise.resolve({
        id,
        error: { status: 404, code: 400, message: `method not found: ${methodName}` },
      });
    }

    try {
      // apply need array
      let p = params;
      if (!Array.isArray(params)) {
        p = params === undefined ? [] : [params];
      }
      const result = await method.apply(this.target, p);
      return {
        id,
        result,
      };
    } catch (e) {
      const { status, message } = normalizeError(e);
      return {
        id,
        error: { status, code: status, message },
      };
    }
  }
}

export class ServiceProviderManager implements ServiceProvider {
  private _services = {};

  registryInstance(target, iface = target.constructor) {
    const meta = getServiceMetadataOfType(iface);
    return this.registry({
      ...meta,
      target,
      // NOTE typescript abstract method will not exists on prototype, iface is useless
      methods: Object.getPrototypeOf(target),
    });
  }

  registry(meta: ServiceRegistration) {
    const svc = new ServiceMetadata();
    svc.target = meta.target;
    svc.methods = meta.methods;
    svc.registration = meta;
    const key = getServicePathOfCoordinate(meta);
    if (this._services[key]) {
      console.error(`ReRegistry ${key}`);
    }
    console.info(`registry service ${key}`);
    this._services[key] = svc;
  }

  findService(query: ServiceCoordinate): ServiceRegistration {
    return this._services[getServicePathOfCoordinate(query)]?.registration;
  }
}

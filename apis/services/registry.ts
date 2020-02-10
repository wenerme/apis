import {ServiceDefinition, ServiceInvocation, ServiceResponse} from 'apis/services/types';

export class ServiceRegistry {
  services: Record<string, ServiceDefinition> = {};

  async invoke(req: ServiceInvocation): Promise<ServiceResponse> {
    const {service: serviceName, method: methodName, arguments: args, requestId} = req;
    const service = this.services[serviceName];
    if (!service) {
      throw Object.assign(new Error(`service not found: ${serviceName}/${methodName}`), {status: 404})
    }
    const method = service?.methods[methodName];
    if (!method) {
      throw Object.assign(new Error(`method not found: ${serviceName}/${methodName}`), {status: 404})
    }

    let result: any;
    try {
      result = await method.apply(service.target, args);
    } catch (e) {
      console.error(`invoke error ${serviceName}/${methodName}(${JSON.stringify(args)}): ${e.message}`, e);
      throw e;
    }
    return {
      requestId,
      result
    };
  }

  provide(def: ServiceDefinition) {
    this.services[def.name] = def
  }
}

export function createServiceDefinition(target, {name, includes = [], excludes = []}): ServiceDefinition {
  const prototype = Object.getPrototypeOf(target);
  if (includes.length === 0) {
    includes = Object.getOwnPropertyNames(prototype).filter(v => !['constructor'].includes(v))
  }
  let entries: Array<[string, Function]>;
  entries = includes.filter(v => target[v]).map(v => ([v, target[v]]));
  if (excludes.length) {
    entries = entries.filter(([k, v]) => !excludes.includes(k))
  }
  return {
    name,
    target,
    methods: Object.fromEntries(entries),
  }
}


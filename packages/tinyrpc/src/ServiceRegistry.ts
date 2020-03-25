import { ServiceDefinition, ServiceInvocation, ServiceResponse } from './types';

/**
 * Hold all services in server side
 */
export class ServiceRegistry {
  services: Record<string, ServiceDefinition> = {};

  async invoke(req: ServiceInvocation): Promise<ServiceResponse> {
    const { service: serviceName, method: methodName, arguments: args, requestId } = req;
    const service = this.services[serviceName];
    if (!service) {
      throw Object.assign(new Error(`service not found: ${serviceName}/${methodName}`), { status: 404 });
    }
    const method = service?.methods[methodName];
    if (!method) {
      throw Object.assign(new Error(`method not found: ${serviceName}/${methodName}`), { status: 404 });
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
      result,
    };
  }

  provide(def: ServiceDefinition) {
    this.services[def.name] = def;
  }
}

export interface ServiceDefinitionOptions {
  name: string;
  target?: any;
  provider?: any;
  prototype?: any;
  includes?: any[];
  excludes?: any[];
}

export function createServiceDefinition({
  name,
  target = null,
  provider = null,
  prototype = null,
  includes = [],
  excludes = [],
}: ServiceDefinitionOptions): ServiceDefinition {
  if (!target) {
    if (!provider) {
      throw new Error(`${name}: no target or provider for service`);
    }
    if (!includes.length && !prototype) {
      throw new Error(`${name}: use provider for service need includes or prototype`);
    }
  }

  prototype = prototype ?? (target ? Object.getPrototypeOf(target) : null);
  if (includes.length === 0) {
    includes = Object.getOwnPropertyNames(prototype).filter((v) => !['constructor'].includes(v));
  }
  if (excludes.length) {
    includes = includes.filter((v) => !excludes.includes(v));
  }

  let methods = {};
  // build methods
  if (target) {
    const entries: Array<[string, Function]> = includes.filter((v) => target[v]).map((v) => [v, target[v]]);
    // methods = Object.fromEntries(entries);
    methods = entries.reduce((o, [k, v]) => ((o[k] = v), o), {} as any);
  } else {
    // todo call provider
  }

  return {
    name,
    target,
    methods,
  };
}

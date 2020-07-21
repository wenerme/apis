/**
 * @description
 *
 * Represents an abstract class `T`, if applied to a concrete class it would stop being
 * instantiatable.
 *
 * @publicApi
 */
export interface AbstractType<T> extends Function {
  prototype: T;
}

export interface ServiceCoordinate {
  service: string;
  version?: string;
  group?: string;
}

export function getServicePathOfCoordinate(coord: ServiceCoordinate): string {
  const { group = 'default', service, version = '1.0.0' } = coord;
  if (!service) {
    throw new Error(`invalid service name`);
  }
  return `${group}/${service}/${version}`;
}

export function getServiceMetadataOfType(type: AbstractType<any> | ServiceCoordinate): ServiceCoordinate {
  return {
    service: type['service'] || type['name'],
    group: type['group'] || 'default',
    version: type['version'] || '1.0.0',
  };
}

export const ServiceNameAttribute = 'service';
export const ServiceGroupAttribute = 'group';
export const ServiceVersionAttribute = 'version';

export interface ServiceRegistration extends ServiceCoordinate {
  target: any;
  methods;
}

export interface ServiceProvider {
  registry(meta: ServiceRegistration);

  // resolveService(query: ServiceCoordinate): Promise<ServiceRegistration>;
  findRegistry(query: ServiceCoordinate): ServiceRegistration | undefined;
}

export interface ServiceConsumeOptions<T = any> extends ServiceCoordinate {
  type?: AbstractType<T>;
}

export type ServiceConsumeType<T> = ServiceConsumeOptions<T> | AbstractType<T>;

export interface ServiceConsumer {
  consume<T>(coord: ServiceConsumeType<T>): T;
}

export interface AbstractType<T> extends Function {
  prototype: T;
}

export interface ServiceCoordinate {
  service: string;
  version?: string;
  group?: string;
}

export function getPathOfCoordinate(coord: ServiceCoordinate): string {
  const { group = 'default', service, version = '1.0.0' } = coord;
  if (!service) {
    throw new Error(`invalid service name`);
  }
  return `${group}/${service}/${version}`;
}

export function getServiceCoordinateOfType(type: AbstractType<any> | ServiceCoordinate): ServiceCoordinate {
  return {
    service: 'prototype' in type ? type['name'] : type['service'],
    group: type['group'] || 'default',
    version: type['version'] || '1.0.0',
  };
}

export const ServiceNameAttribute = 'service';
export const ServiceGroupAttribute = 'group';
export const ServiceVersionAttribute = 'version';


export interface ServiceConsumeOptions<T = any> extends ServiceCoordinate {
  type?: AbstractType<T>;
}

export type ServiceConsumeType<T> = ServiceConsumeOptions<T> | AbstractType<T>;

export interface Consumer {
  consume<T>(coord: ServiceConsumeType<T>): T;
}

export interface ServiceRegistration<T = any> {
  service?: string;
  version?: string;
  group?: string;

  type?: AbstractType<T>
  target: T;
  methods?: RegistrationMethod[];

  context?: any
}

export type ServiceRegistrationType<T = any> = ServiceRegistration<T> | T

export interface RegistrationMethod {
  name: string
}

export interface Provider extends Consumer {
  registry(meta: ServiceRegistrationType);
}

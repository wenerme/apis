import { AbstractType, ServiceCoordinate } from './interfaces';

export const ServiceNameAttribute = 'service';
export const ServiceGroupAttribute = 'group';
export const ServiceVersionAttribute = 'version';

export function getPathOfCoordinate(coord: ServiceCoordinate): string {
  const { group = 'default', service, version = '1.0.0' } = coord;
  if (!service) {
    throw new Error(`invalid service name`);
  }
  return `${group}/${service}/${version}`;
}

export function getServiceCoordinateOfType(type: AbstractType<any> | ServiceCoordinate): ServiceCoordinate {
  return {
    service: type['service'],
    group: type['group'] || 'default',
    version: type['version'] || '1.0.0',
  };
}

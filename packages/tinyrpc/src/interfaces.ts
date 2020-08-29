export interface AbstractType<T> extends Function {
  prototype: T;
}

export interface ServiceCoordinate {
  service: string;
  version?: string;
  group?: string;
}

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

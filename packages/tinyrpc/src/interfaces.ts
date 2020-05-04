/// Represent a registry service
export interface ServiceDefinition {
  target: any;
  /// service name
  name: string;
  /// allowed methods
  methods: Record<string, Function>;
}

/// Represent a request from endpoint
export interface ServiceInvocation {
  requestId?: any;

  service: string;
  method: string;
  arguments: any[];
}

/// Represent a response from server
export interface ServiceResponse {
  requestId?: any;
  result: any;
  error?: ServiceError;
}

export interface ServiceError {
  code: number;
  message: string;
  data?: any;
}

/// Minimal handler signature
export type ServiceInvocationHandler = (req: ServiceInvocation) => Promise<ServiceResponse>;

export interface ServiceProvider {
  provide(sd: ServiceDefinition): void;

  invoke(req: ServiceInvocation): Promise<ServiceResponse>;
}

export interface ServiceConsumer {
  consume<T>(s: string): T;
}

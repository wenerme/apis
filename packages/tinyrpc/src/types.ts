/// Represent a registry service
export interface ServiceDefinition {
  target: any;
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
}

/// Minimal handler signature
export type ServiceInvocationHandler = (req: ServiceInvocation) => Promise<ServiceResponse>;

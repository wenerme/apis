export interface ServiceDefinition {
  target
  name: string
  methods: Record<string, Function>
}

export interface ServiceInvocation {
  requestId?

  service: string
  method: string
  arguments: any[]
}

export interface ServiceResponse {
  requestId?
  result: any
}

export type ServiceInvocationHandler = (req: ServiceInvocation) => Promise<ServiceResponse>

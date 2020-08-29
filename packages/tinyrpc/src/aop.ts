export interface MethodInvocation {
  method: any
  arguments: any[]
  target: any

  proceed(): any

  // explicit context
  context: any
}

export interface MethodInterceptor {
  invoke(invocation: MethodInvocation): any
}


export interface JsonInvocationRequest {
  id?: string
  method?: string
  params: any[]

  [k: string]: any
}

export interface JsonInvocationResponse {
  id?: string
  result?: any
  error?: JsonInvocationError

  [k: string]: any
}

export interface JsonInvocationError {
  message: string
  code?
  status?

  [k: string]: any
}

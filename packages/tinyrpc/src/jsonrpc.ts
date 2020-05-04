// https://www.jsonrpc.org/specification

export interface JsonRpcRequest {
  jsonrpc?: '2.0' | string;

  method: string;
  params: any[] | Record<string, any>;

  id?: number;
}

export interface JsonRpcResponse {
  jsonrpc?: '2.0' | string;

  result: any;
  error?: JsonRpcError;
  id?: number;
}

export interface JsonRpcError {
  code: number;
  message: string;

  data?: any;
}

export const JsonRpcErrors = {
  ParseError: { code: -32700, message: 'Parse error' },
  InvalidRequest: { code: -32600, message: 'Invalid Request' },
  MethodNotFound: { code: -32601, message: 'Method not found' },
  InvalidParams: { code: -32602, message: 'Invalid params' },
  InternalError: { code: -32603, message: 'Internal error' },
  ServerError: { code: -32000, message: 'Server error' },
};

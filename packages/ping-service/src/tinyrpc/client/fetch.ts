import { MethodInvocation } from '../aop';
import { getPathOfCoordinate } from '../interfaces';
import { JsonInvocationRequest, JsonInvocationResponse } from '../json';

export interface RequestInitExt extends RequestInit {
  path: string;
  baseUrl?: string
  headers: Headers
}

export function getRequestInit(v: MethodInvocation): RequestInitExt {
  return (v.context['getRequestInit'] = v.context['getRequestInit'] || {
    path: getPathOfCoordinate(v.context['coordinate']),
    baseUrl: globalThis?.location?.origin,

    method: 'POST',
    body: {
      method: String(v.method),
      params: v.arguments,
    } as JsonInvocationRequest,

    headers: new Headers({
      'content-type': 'application/json',
    }),
  });
}

export function createFetchInvoke({ fetch = globalThis.fetch, baseUrl = undefined }): any {
  return async (invocation: MethodInvocation): Promise<any> => {
    const init = getRequestInit(invocation);
    const { path, baseUrl: base = baseUrl } = init;
    const response = (await fetch(new URL(path, base).toString(), init));
    const body: JsonInvocationResponse = await response.json();
    if (body.error) {
      const { message, ...e } = body.error;
      throw Object.assign(new Error(message), e, {
        request: {
          method: invocation.method,
          coordinate: invocation.context['coordinate'],
        },
      });
    }
    return body.result;
  };
}

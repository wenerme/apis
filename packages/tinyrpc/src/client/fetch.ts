import { MethodInvocation } from '../aop';
import { JsonInvocationRequest, JsonInvocationResponse } from '../json';
import { getPathOfCoordinate } from '../utils';

export interface RequestInitExt extends RequestInit {
  path: string;
  baseUrl?: string
  headers: Headers
}

export function getRequestInit(v: MethodInvocation): RequestInitExt {
  return (v.context['getRequestInit'] = v.context['getRequestInit'] || {
    path: getPathOfCoordinate(v.context['coordinate']) + '/' + v.method,
    baseUrl: globalThis?.location?.origin,

    method: 'POST',
    body: {
      method: String(v.method),
      params: v.arguments,
    } as JsonInvocationRequest,

    headers: {
      'content-type': 'application/json',
    },
  });
}

export function createFetchInvoke({ fetch = globalThis.fetch, baseUrl = '' }): any {
  return async (invocation: MethodInvocation): Promise<any> => {
    const init = getRequestInit(invocation);
    init.body = typeof init.body !== 'string' ? JSON.stringify(init.body) : init.body;
    init.baseUrl = init.baseUrl || baseUrl;

    const { path, baseUrl: base } = init;
    const url = new URL(path, base).toString();
    // console.debug(`${init.method} ${url}`, init);
    const response = (await fetch(url, init));
    const text = await response.text();

    let res: JsonInvocationResponse;
    try {
      res = JSON.parse(text);
    } catch (e) {
      console.error(`Invalid response: `, text);
      res = { error: { message: `Invalid response: ${e.message}`, status: 500, code: 500 } };
    }
    if (res.error) {
      const { message, ...e } = res.error;
      throw Object.assign(new Error(message), e, {
        request: {
          method: invocation.method,
          coordinate: invocation.context['coordinate'],
        },
      });
    }
    return res.result;
  };
}

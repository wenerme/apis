import { ServiceInvocationHandler } from '../interfaces';

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface FetchConsumerOptions {
  url: string;
  fetch?: Fetch;
}

export function createFetchConsumer<T>({ url, fetch: maybeFetch }: FetchConsumerOptions): ServiceInvocationHandler {
  if (!maybeFetch && typeof globalThis !== 'undefined' && globalThis.fetch) {
    maybeFetch = globalThis.fetch;
  }
  if (!maybeFetch && typeof window !== 'undefined') {
    maybeFetch = window.fetch;
  }
  if (!maybeFetch) {
    throw new Error('please pass a fetch implementation to createFetchConsumer');
  }
  const fetch: Fetch = maybeFetch;
  return async (req) => {
    const result = fetch(url, {
      method: 'POST',
      body: JSON.stringify(req),
    }).then(async (v) => {
      if (v.status !== 200) {
        const body = await v.text();
        let parsed;
        try {
          parsed = JSON.parse(body);
        } catch (e) {
          // ignored
        }
        const message = parsed?.message ?? body;
        throw Object.assign(new Error(`invoke failed ${v.status} ${req?.service}/${req?.method}: ${message}`), {
          status: v.status,
          headers: v.headers,
          content: parsed ?? body,
        });
      }
      return v.json();
    });
    return result;
  };
}

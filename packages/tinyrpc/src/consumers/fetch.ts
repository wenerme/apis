import { ServiceInvocationHandler } from '../types';
import unfetch from 'isomorphic-unfetch';

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface FetchConsumerOptions {
  url: string;
  fetch?: Fetch;
}

export function createFetchConsumer<T>({ url, fetch = unfetch }: FetchConsumerOptions): ServiceInvocationHandler {
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

import {ServiceInvocationHandler} from 'apis/services/types';
import unfetch from 'isomorphic-unfetch';

export function createFetchConsumer<T>({url, fetch = unfetch}): ServiceInvocationHandler {
  return async req => {
    const result = fetch(url, {
        method: 'POST',
        body: JSON.stringify(req)
      })
        .then(async v => {
          if (v.status !== 200) {
            const body = await v.text();
            let parsed;
            try {
              parsed = JSON.parse(body)
            } catch (e) {
            }
            const message = parsed?.message ?? body;
            throw Object.assign(new Error(`invoke failed ${v.status} ${req?.service}/${req?.method}: ${message}`), {
              status: v.status,
              headers: v.headers,
              content: parsed ?? body
            })
          }
          return v.json()
        })
    ;

    return result
  }
}


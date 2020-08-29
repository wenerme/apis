import { createJsonInvocationHandler } from './json';
import { IncomingMessage } from 'http';
import { JsonInvocationRequest } from '../json';

export function createPolkaJsonInvocationHandler({ provider }) {
  const handler = createJsonInvocationHandler({ provider });
  return async (req: IncomingMessage, res) => {
    // added by polka
    const params = req['params'];
    const body: JsonInvocationRequest = req['body'];
    body.method = body.method || params.method;
    body.id = body.id || params.id || String(req.headers['x-request-id'] || '');
    body.coordinate = params;

    const response = await handler(body);

    res.statusCode = response?.error?.status || 200;
    res.end(JSON.stringify(response));
  };
}

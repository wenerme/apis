import { JsonInvocationRequest, JsonInvocationResponse } from '../json';
import { getServiceCoordinateOfType } from '../utils';
import http from 'http';
import { Provider } from '../interfaces';

export function createJsonInvocationHandler({ provider }: { provider: Provider }) {
  return async (request: JsonInvocationRequest): Promise<JsonInvocationResponse> => {
    const { id, method, coordinate } = request;
    if (!coordinate || !method) {
      throw Object.assign(new Error('invalid request'), { status: 500 });
    }
    const coord = getServiceCoordinateOfType(coordinate);
    const service = provider.consume(coord);

    const response: JsonInvocationResponse = {};
    if (id) {
      response.id = id;
    }
    try {
      response.result = await service[method](...request.params);
    } catch (e) {
      response.error = normalizeError(e);
    }
    return response;
  };
}

function normalizeError(err) {
  let status = err.code || err.status || 500;
  const code = err.code || status;
  status = parseInt(status, 10);
  status = status < 400 || status >= 600 ? 500 : status;
  const message = err.length && err || err.message || http.STATUS_CODES[status];
  return { status, code, message };
}


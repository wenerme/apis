import { NextApiHandler } from 'next';
import { getServicePathOfCoordinate } from '../interfaces';
import { InvocationResponse, ServiceProviderManager } from './ServiceProviderManager';

const nanoid = (t = 21) => {
  let e = '';
  const r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--; ) {
    const n = 63 & r[t];
    e += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? '_' : '-';
  }
  return e;
};

export const createRequestHandler = (
  provider: ServiceProviderManager,
  { idGenerator = nanoid } = {},
): NextApiHandler => {
  return async (req, res) => {
    const invoke = req.body ?? {};
    invoke.id = invoke.id || req.headers['x-request-id'] || idGenerator();
    invoke.method = invoke.method || req.query.method;

    let resp: InvocationResponse;
    const path = getServicePathOfCoordinate(req.query as any);

    try {
      const svc = provider.findService(req.query);
      if (!svc) {
        resp = {
          id: invoke.id,
          error: { status: 404, code: 404, message: `service not found: ${path}` },
        };
      } else {
        resp = await svc.invoke(invoke);
      }
    } catch (e) {
      resp = {
        id: invoke.id,
        error: {
          status: 500,
          code: 500,
          message: `failed to handle invoke: ${path} - ${e.message}`,
        },
      };
    }
    if (resp.error?.status) {
      res.status(resp.error.status);
    }
    res.json(resp);
    console.info(`INVOKE ${path}/${invoke.method} - ${resp.id} - ${resp.error?.message || 'success'}`);
  };
};

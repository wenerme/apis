import { httpEnhance } from 'src/servers/middlewares/httpEnhance';
import { IncomingMessage, ServerResponse } from 'http';
// https://github.com/vercel/next.js/blob/canary/packages/next/next-server/server/api-utils.ts

export async function enhanceMiddleware(req: IncomingMessage, res: ServerResponse, next) {
  await httpEnhance(req, res, {});
  return await next();
}

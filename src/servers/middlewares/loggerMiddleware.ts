import { NextApiResponse } from 'next';

export function loggerMiddleware(req, res: NextApiResponse, next) {
  const start = Date.now();
  res.on('finish', function () {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${duration}ms - ${req.url}`);
  });
  return next();
}

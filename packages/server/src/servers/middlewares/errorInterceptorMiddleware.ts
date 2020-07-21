export function normalizeError(e) {
  return { status: e.status || 500, message: e.message || Object.prototype.toString.call(e) };
}

export async function errorInterceptorMiddleware(req, res, next) {
  try {
    return await next();
  } catch (e) {
    const detail = normalizeError(e);
    res.status(detail.status).json(detail);
    console.error(`ERROR Handle ${req.url}`, e);
  }
}

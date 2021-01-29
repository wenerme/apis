export function mergePathParamsToQueryMiddleware(req, res, next) {
  // polka extra path params to params
  if (req.params) {
    const q = req.query;
    Object.entries(req.params).forEach(([k, v]) => (q[k] = q[k] ?? v));
  }
  return next();
}

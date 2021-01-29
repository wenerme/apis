// import Router from 'router';
import polka from 'polka';
import { routes } from './routes';

let _router;

export function getRouter() {
  return _router || (_router = routes(setup(polka())));
}

function setup(route) {
  // treat path params as query - same as how next api handle this
  route.use((req, res, next) => {
    if (req.params) {
      const q = req.query;
      for (const [k, v] of Object.entries(req.params)) {
        if (!q[k]) {
          q[k] = v;
        }
      }
    }
    return next();
  });
  return route;
}

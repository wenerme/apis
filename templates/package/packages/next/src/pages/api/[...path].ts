import { NextApiHandler } from 'next';
import polka from 'polka';
import cors from 'cors';
import { json, text, urlencoded } from 'body-parser';

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

export function routes(route: any) {
  // handle error
  route.use(async (req, res, next) => {
    try {
      return await next();
    } catch (e) {
      const detail = { message: e.message ?? Object.prototype.toString.call(e), status: e.status ?? 500 };
      res.status(detail.status).json(detail);
      console.error(`ERROR Handle ${req.url}`, e);
    }
  });
  route.use(json());
  route.use(urlencoded({ extended: true }));
  route.use(text());

  const corsOrigin = cors({ origin: true });

  // cors
  route.get('/api/cors', corsOrigin as any, (req, res) => res.json({}));
  // path params
  route.get('/api/user/:id', corsOrigin as any, (req, res) => res.json({ id: req.query.id }));

  return route;
}

const handler: NextApiHandler = (req, res) => {
  getRouter().handler(req, res);
};
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};

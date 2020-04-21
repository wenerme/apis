import { createServer } from 'http';
import next from 'next';
import path from 'path';

const { parse } = require('url');

// tslint:disable-next-line:ban
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const options = { dev, dir: process.env.NEXT_PATH || path.join(__dirname, '../..') };
const app = next(options);
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  });
  server.listen(port)

  console.log('Next Options', options);
  console.log(`> Server Ready on http://localhost:${port}`);
});

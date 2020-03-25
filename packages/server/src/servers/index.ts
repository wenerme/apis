import { createServer } from 'http';

const { parse } = require('url');
const next = require('next');
const path = require('path');

// tslint:disable-next-line:ban
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: path.join(__dirname, '..') });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res, parse(req.url, true).pathname)).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

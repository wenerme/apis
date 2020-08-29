import { createPolkaJsonInvocationHandler } from './polka';
import { Server as HttpServer } from 'http';
import polka from 'polka';
import { json } from 'body-parser';

export function createTestServer({ provider, serviceRoot = '/api/service', onHealth = () => true }): Promise<{ baseUrl, serviceBaseUrl; stop }> {
  return new Promise((resolve, reject) => {
    const handler = createPolkaJsonInvocationHandler({ provider });
    polka()
      .use(json({ limit: '5mb' }))
      .get('/ping', (req, res) => res.end('PONG'))
      .get('/health', (req, res) => {
        const r = onHealth();
        if (r === true) {
          res.end('healthy');
        } else {
          res.statusCode = 500;
          res.end(JSON.stringify(r));
        }
      })
      .post(`${serviceRoot}/:group/:service/:version/:method`, handler)
      .post(`${serviceRoot}/:group/:service/:version`, handler)
      .listen(0, function(this: HttpServer, err) {
        if (err) {
          reject(err);
          throw err;
        }
        const port = this.address()?.['port'];
        console.log(`> Running on localhost:${port}`);
        resolve({
          baseUrl: `http://localhost:${port}`,
          serviceBaseUrl: `http://localhost:${port}${serviceRoot}/`,
          stop: () => {
            return new Promise((resolve, reject) => {
              this.close((e) => {
                e ? reject(e) : resolve();
              });
            });
          },
        });
      });
  });
}

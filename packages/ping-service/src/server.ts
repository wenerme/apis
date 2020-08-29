import polka from 'polka';
import http, { IncomingMessage, Server as HttpServer } from 'http';
import { getServiceCoordinateOfType, JsonInvocationRequest, JsonInvocationResponse, TinyProvider } from '@wener/tinyrpc';
import { PingService } from './PingService';
import { json } from 'body-parser';

const port = process.env.PORT || 0;

// server.registry
const ServerProvider = new TinyProvider();
ServerProvider.registry(PingService.instance);

polka({ onError })
  .use(catchError)
  .use(json({ limit: '5mb' }))
  .get('/ping', (req, res) => {
    res.end('PONG');
  })
  .get('/health', (req, res) => {
    res.end('Service healthy');
  })
  // test error
  .get('/error/:code', (req, res) => {
    throw Object.assign(new Error(''), { code: req.params.code });
  })
  .post('/api/service/:group/:service/:version/:method', (req: IncomingMessage, res) => {
    // added by polka
    const params = req['params'];
    const body: JsonInvocationRequest = req['body'];

    const id: string = body.id || params.id || req.headers['x-request-id'];

    const coord = getServiceCoordinateOfType(params);
    const service = ServerProvider.consume(coord);
    const method = body.method || params.method;

    const response: JsonInvocationResponse = {};
    if (id) {
      response.id = id;
    }
    try {
      response.result = service[method](...body.params);
    } catch (e) {
      response.error = normalizeError(e);
    }
    res.statusCode = response?.error?.status || 200;
    res.end(JSON.stringify(response));
  })
  .listen(port, function(this: HttpServer, err) {
    if (err) throw err;
    const port = this.address()?.['port'];
    console.log(`> Running on localhost:${port}`);
  });

process.on('SIGINT', function() {
  console.log('Caught interrupt signal');
  process.exit();
});

function normalizeError(err) {
  let status = err.code || err.status || 500;
  const code = err.code || status;
  status = parseInt(status, 10);
  status = status < 400 || status >= 600 ? 500 : status;
  const message = err.length && err || err.message || http.STATUS_CODES[status];
  return { status, code, message };
}

async function catchError(req, res, next) {
  try {
    return await next();
  } catch (e) {
    onError(e, req, res);
  }
}


function onError(err, req, res, next?) {
  const { status, code, message } = normalizeError(err);
  res.statusCode = status;
  res.end(JSON.stringify({ error: { message, code, status } }));
}

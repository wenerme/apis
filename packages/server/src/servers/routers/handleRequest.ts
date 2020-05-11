import { getRouter } from 'src/servers/routers/getRouter';

export function handleRequest(req, res) {
  getRouter().handler(req, res);
}

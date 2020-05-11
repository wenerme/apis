// import Router from 'router';
import polka from 'polka';
import { routes } from 'src/servers/routers/routes';

let _router;

export function getRouter() {
  return _router || (_router = routes(polka()));
}

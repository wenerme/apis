import type { IncomingMessage, ServerResponse } from 'http';

export interface Router<REQ extends IncomingMessage, RES extends ServerResponse> {
  all: RouterMethod<REQ, RES>;
  get: RouterMethod<REQ, RES>;
  head: RouterMethod<REQ, RES>;
  options: RouterMethod<REQ, RES>;
  connect: RouterMethod<REQ, RES>;
  post: RouterMethod<REQ, RES>;
  patch: RouterMethod<REQ, RES>;
  put: RouterMethod<REQ, RES>;
  delete: RouterMethod<REQ, RES>;
  trace: RouterMethod<REQ, RES>;

  use(middleware: (req: REQ, res: RES, next) => any);

  use(path: string, middleware: (req: REQ, res: RES, next) => any);

  // find(method: string, url: string);
}

export interface RouterMethod<REQ, RES> {
  (path: string, ...handler: Array<(req: REQ, res: RES, next?) => any>);
}

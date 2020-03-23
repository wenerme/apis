import { NextApiRequest, NextApiResponse } from 'next';

export type ApiHandler<Req = NextApiRequest, Res = NextApiResponse> = (req: Req, res: Res) => void;
// export type ApiMiddleware<Opt = any> = (opt: Opt) => (handler: ApiHandler) => void;

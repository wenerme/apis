import {NextApiRequest, NextApiResponse} from 'next';

export interface ErrorDetail {
  code?
  status?
  message
  path?
  failedAt?
}

export class RequestError extends Error {

  detail: ErrorDetail;

  constructor(detail: ErrorDetail) {
    super(detail.message)
  }
}

export function normalizeErrorDetail(detail: ErrorDetail) {
  detail.status = detail.status ?? 500;
  detail.code = detail.code ?? detail.status;

  detail.failedAt = detail.failedAt ?? new Date()

  return detail
}

export function normalizeError(err: Error) {
  let detail: ErrorDetail
  if (err instanceof RequestError) {
    detail = err.detail;
  } else {
    const {message} = err;
    detail = {message};
  }

  return normalizeErrorDetail(detail);
}

export const handleErrors = () => handler => async (req: NextApiRequest, res: NextApiResponse, ...restArgs) => {
  try {
    return await handler(req, res, ...restArgs)
  } catch (e) {
    const detail = normalizeError(e);
    res.status(detail.status).json(detail)
  }
};

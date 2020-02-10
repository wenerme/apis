import {NextApiRequest, NextApiResponse} from 'next';
import {ApiError} from 'next/dist/next-server/server/api-utils';

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

  detail.failedAt = detail.failedAt ?? new Date();

  return detail
}

export function normalizeError(err: Error): ErrorDetail {
  let detail: ErrorDetail;
  if (err instanceof ApiError) {
    const {message, statusCode: status} = err;
    detail = {message, status};
  } else if (err instanceof RequestError) {
    detail = err.detail;
  } else {
    const {message, status, code} = err as any;
    detail = {message, status, code};
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

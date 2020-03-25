import { NextApiRequest, NextApiResponse } from 'next';
import { handleErrors } from '../../../../libs/nexts/middlewares/errors';
import { flow } from 'lodash';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import { getCertificateByUrl } from '../../../../libs/pki/utils/getCertificateByUrl';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    throw new ApiError(400, 'invalid request');
  }
  const { url } = req.body;
  const certificate = await getCertificateByUrl(url, { timeout: 5000 });
  res.status(200).json({
    url,
    certificate: certificate.pemEncoded,
  });
};

export default flow([handleErrors()])(handler);

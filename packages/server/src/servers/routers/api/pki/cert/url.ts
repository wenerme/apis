import { NextApiRequest, NextApiResponse } from 'next';
import { getCertificateByUrl } from 'src/libs/pki/utils/getCertificateByUrl';

export const handleCertOfUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const certificate = await getCertificateByUrl(url, { timeout: 5000 });
  res.status(200).json({
    url,
    certificate: certificate.pemEncoded,
  });
};

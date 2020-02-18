import {NextApiRequest, NextApiResponse} from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({version: process.env.APP_VERSION || '1.0.0', build: {date: process.env.APP_BUILD_DATE}})
};

export default handler;

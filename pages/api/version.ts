import {NextApiRequest, NextApiResponse} from 'next'

// API 文件模板

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({version: '0.0.1'})
}

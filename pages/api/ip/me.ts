import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let ip;
  if (req.headers['x-forwarded-for']) {
    ip = req?.headers['x-forwarded-for'];
  } else if (typeof req?.socket?.address() === 'string') {
    ip = req.socket.address()
  } else {
    ip = req?.socket?.address()?.['address']
  }

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(ip)
}

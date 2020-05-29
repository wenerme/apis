import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  res.status(200).json({ demo: true, url: req.url });
};
export default handler;

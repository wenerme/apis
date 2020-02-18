import {NextApiRequest, NextApiResponse} from 'next'

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// curl -Nv localhost:3000/test/see
// https://zeit.co/pricing#limits Zeit free only allowed 10s/req
// NOTE Zeit deploy not works - because the request will be buffered
// https://github.com/zeit/next.js/issues/9965
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  for (let i = 0; i < 5; i++) {
    res.write(`data: Hello seq ${i}\n\n`);
    await sleep(1000);
  }
  res.end('done\n');
};

export default handler;

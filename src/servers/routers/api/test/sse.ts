import { NextApiRequest, NextApiResponse } from 'next';
import { sleep } from '@wener/utils';

export async function handleTestSse(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  for (let i = 0; i < 5; i++) {
    res.write(`data: Hello seq ${i}\n\n`);
    await sleep(1000);
  }
  res.end('done\n');
}

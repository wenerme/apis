import { VolatileManager } from '../../../../modules/volatile/VolatileManager';
import { NextApiRequest, NextApiResponse } from 'next';
import { objectOfMaybeArray } from '@wener/utils';
import { File, IncomingForm } from 'formidable';
import { RequestError } from '../../../../libs/nexts/middlewares/errors';
import fs from 'fs-extra';

const mgr = new VolatileManager();

export function routeVolatile(route) {
  route.get('/api/volatile/:key', (req: NextApiRequest, res: NextApiResponse) => {
    const query = objectOfMaybeArray(req.query);
    const e = mgr.get(query as any);
    if (!e) {
      console.debug(`entry not found: ${query['key']}`);
      res.status(404).json({ message: 'Not found', status: 404 });
      return;
    }
    res.status(200).json(e);
  });
  route.get('/api/volatile/:key/data', (req, res: NextApiResponse) => {
    const e = mgr.get(req.query);
    if (!e) {
      res.status(404).json({ message: 'Not found', status: 404 });
      return;
    }
    if (e.format === 'file') {
      const { filename, type = 'application/octet-stream', base64 } = e.data;
      if (req.query['download'] || type === 'application/octet-stream') {
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
      } else {
        res.setHeader('Content-Disposition', `inline`);
      }
      res.setHeader('Content-Type', type);
      res.end(Buffer.from(base64, 'base64'));
      return;
    }
    res.status(200).json(e.data);
  });

  route.post('/api/volatile/:key', async (req, res) => {
    const { data: _, ...rest } = mgr.create(await extractEntry(req));
    res.status(201).json(rest);
  });

  route.put('/api/volatile/:key', async (req, res) => {
    const { data: _, ...rest } = mgr.update(await extractEntry(req));
    res.status(200).json(rest);
  });

  route.delete('/api/volatile/:key', (req, res) => {
    mgr.delete(req.query);
    res.status(201).json({ message: 'success' });
  });
}

async function extractEntry(req: NextApiRequest) {
  const { 'content-type': type, 'content-length': length } = req.headers;
  const maxFileSize = 1024 * 1024 * 1024;
  if (length && parseInt(length, 10) > maxFileSize + 1000) {
    throw new RequestError({ message: `body too large`, status: 400 });
  }

  const query = objectOfMaybeArray(req.query);
  const e = { key: query['key'], data: req.body, format: 'json' };
  const { mime, filename } = query;

  if (type.startsWith('multipart/form-data')) {
    const form = new IncomingForm();
    const file = await new Promise<File>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        try {
          if (err) {
            throw new RequestError({ message: `invalid body: ${err}`, status: 400 });
          }
          if (!files['file']) {
            throw new RequestError({ message: `no file`, status: 400 });
          }
          if (Array.isArray(files['file'])) {
            throw new RequestError({ message: `invalid file`, status: 400 });
          }
          resolve(files['file']);
        } catch (e) {
          reject(e);
        }
      });
    });

    if (file.size > maxFileSize) {
      throw new RequestError({ message: `body too large`, status: 400 });
    }
    e.data = {
      size: file.size,
      filename: file.name || filename,
      type: file.type || mime,
      base64: (await fs.readFile(file.path)).toString('base64'),
    };
    e.format = 'file';
  }
  return e;
}

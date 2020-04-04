import { NextApiRequest, NextApiResponse } from 'next';
import { flow } from 'lodash';
import { handleErrors } from 'src/libs/nexts/middlewares/errors';
import { BarcodeOptions, renderBarcode } from 'src/libs/barcodes/renders';
import objectHash from 'object-hash';
import { firstOfMaybeArray } from '@wener/utils/src';

const mime = require('mime');

function detectImageExtension(s: string): { ext?; name } {
  const ext = s.match(/[.]([a-zA-Z]{3,4})$/)?.[1];
  return { ext, name: ext ? s.substring(0, s.length - 1 - ext.length) : s };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { value, renderFormat, format } = req.query;
  format = firstOfMaybeArray(format);
  value = firstOfMaybeArray(value);
  renderFormat = firstOfMaybeArray(renderFormat);

  if (!renderFormat) {
    const { name, ext } = detectImageExtension(value);
    renderFormat = ext;
    value = name;
  }
  renderFormat = renderFormat || 'svg';

  console.log(`generate barcode ${format} ${renderFormat} ${value}`);

  const options: BarcodeOptions = {
    format,
    renderFormat,
    value,
  };

  const hash = objectHash(options);
  if (req.headers['if-none-match'] === hash) {
    res.status(304).end();
    return;
  }

  const result = await renderBarcode(options);

  res.setHeader('ETag', hash);
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
  res.setHeader('Content-Type', mime.getType(renderFormat));

  res.status(200).send(result);
};

export default flow([handleErrors()])(handler);

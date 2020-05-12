import { NextApiRequest, NextApiResponse } from 'next';
import objectHash from 'object-hash';
import { firstOfMaybeArray } from '@wener/utils/src';
import { BarcodeOptions, renderBarcode } from 'src/libs/barcodes/renders';

const mime = require('mime');

export const handleLinearCodeGenerate = async (req: NextApiRequest, res: NextApiResponse) => {
  let { value, renderFormat: format = 'svg', codec = 'CODE128' } = req.query;
  codec = firstOfMaybeArray(codec);
  value = firstOfMaybeArray(value);
  format = firstOfMaybeArray(format);

  console.log(`generate barcode linear ${codec} ${format} ${value}`);

  const options: BarcodeOptions = {
    format: codec,
    renderFormat: format,
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
  res.setHeader('Content-Type', mime.getType(format));

  res.status(200).send(result);
};

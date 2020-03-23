import QRCode, { CanvasQRCodeProps, SvgQRCodeProps } from 'qrcode.react';
import { NextApiRequest, NextApiResponse } from 'next';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import objectHash from 'object-hash';
import { handleErrors } from 'libs/nexts/middlewares/errors';
import { flow } from 'lodash';

type QrCodeProps = CanvasQRCodeProps | SvgQRCodeProps;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { value: v } = req.query;
  if (Array.isArray(v)) {
    v = v.join('/');
  }
  const props: QrCodeProps = {
    renderAs: 'svg',
    value: v,
    size: 128,
    level: 'L',
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    includeMargin: false,
  };

  const mapper = {
    size: (v) => Number(v),
    includeMargin: (v) => Boolean(v),
    level: (v) => (['L', 'M', 'Q', 'H'].includes(v) ? v : 'Q'),
    fgColor: (v) => v,
    bgColor: (v) => v,
  };
  Object.entries(mapper)
    .map(([k, v]) => {
      if (req.query[k]) {
        return [k, v(req.query[k])];
      }
      return [k, undefined];
    })
    .filter(([_, v]) => v !== undefined)
    .forEach(([k, v]) => {
      props[k] = v;
    });
  const hash = objectHash(props);
  if (req.headers['if-none-match'] === hash) {
    res.status(304).end();
    return;
  }

  const svg = ReactDOMServer.renderToString(<QRCode xmlns="http://www.w3.org/2000/svg" {...(props as any)} />);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('ETag', hash);
  res.status(200).send(svg);
};

export default flow([handleErrors()])(handler);

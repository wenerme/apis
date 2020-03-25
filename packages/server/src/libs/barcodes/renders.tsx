import { DOMImplementation, XMLSerializer } from 'xmldom';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import { getJsBarcodeFormat } from './formats';
import JsBarcode from 'jsbarcode';

export type BarcodeOptions = JsBarcode.Options & {
  target?: Element;
  value?;
  xmlDocument?;
  renderFormat?;
  renderer?;
};

export async function renderBarcode(options: BarcodeOptions) {
  const { renderer = 'svg', renderFormat = 'svg', target, ...opts } = options;

  if (!getJsBarcodeFormat(opts.format)) {
    throw new ApiError(400, `unsupported format ${opts.format}`);
  }

  if (!target && typeof window === 'undefined') {
    if (renderFormat === 'svg') {
      return renderSvg(opts);
    } else {
      return renderCanvas({ ...opts, renderFormat });
    }
  } else {
    throw new ApiError(400, 'not impl');
  }
}

let xmlSerializer: XMLSerializer;
let document: Document;

async function renderSvg(options: BarcodeOptions) {
  if (!document) {
    await import('xmldom').then(({ DOMImplementation, XMLSerializer }) => {
      xmlSerializer = new XMLSerializer();
      document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    });
  }
  const { value, ...opts } = options;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  opts.xmlDocument = document;
  JsBarcode(svg, value, opts);

  return xmlSerializer.serializeToString(svg);
}

async function renderCanvas(options: BarcodeOptions & { renderFormat }) {
  const { renderFormat } = options;
  switch (renderFormat) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'pdf':
      break;
    default:
      throw new ApiError(400, `unsupported format ${renderFormat}`);
  }
  return import('canvas').then(({ createCanvas }) => {
    const canvas = createCanvas(100, 100);
    const { value, renderFormat, ...opts } = options;
    JsBarcode(canvas, value, opts);

    switch (renderFormat) {
      case 'png':
        return canvas.createPNGStream();
      case 'jpg':
      case 'jpeg':
        return canvas.createJPEGStream();
      case 'pdf':
        return canvas.createPDFStream();
      default:
        return canvas;
    }
  });
}

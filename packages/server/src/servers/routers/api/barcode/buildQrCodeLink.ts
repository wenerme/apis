import { API } from 'src/apis/api';
import url from 'url';

export function buildQrCodeLink(query) {
  return API.apiOf(url.format({ pathname: '/api/barcode/qrcode', query }));
}

export function buildLinearCodeLink(query) {
  return API.apiOf(url.format({ pathname: '/api/barcode/linear', query }));
}

// https://github.com/johncrisostomo/get-ssl-certificate/blob/master/index.js

import https from 'https';
import { Certificate, TLSSocket } from 'tls';

function isEmpty(object) {
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) return false;
  }

  return true;
}

function pemEncode(str, n) {
  const ret = [];

  for (let i = 1; i <= str.length; i++) {
    ret.push(str[i - 1]);
    const mod = i % n;

    if (mod === 0) {
      ret.push('\n');
    }
  }

  const returnString = `-----BEGIN CERTIFICATE-----\n${ret.join('')}\n-----END CERTIFICATE-----`;

  return returnString;
}

function getOptions(hostname, port, protocol) {
  return {
    hostname,
    agent: false,
    rejectUnauthorized: false,
    ciphers: 'ALL',
    port,
    protocol,
  };
}

function validateUrl(url) {
  if (url.length <= 0 || typeof url !== 'string') {
    throw Error('A valid URL is required');
  }
}

function handleRequest(options, detailed = false, resolve, reject) {
  return https.get(options, (res) => {
    const socket = res.socket as TLSSocket;
    const certificate = socket.getPeerCertificate?.(detailed);

    if (isEmpty(certificate) || certificate === null) {
      reject({ message: 'The website did not provide a certificate' });
    } else {
      if (certificate.raw) {
        certificate['pemEncoded'] = pemEncode(certificate.raw.toString('base64'), 64);
      }
      resolve(certificate);
    }
  });
}

export function getCertificateByUrl(
  url,
  opts: { timeout?; detailed? } = {}
): Promise<Certificate & { pemEncoded: string }> {
  validateUrl(url);

  const { detailed, timeout } = opts;
  // host only
  if (!/^https?:/.test(url)) {
    url = `https://${url}`;
  }
  const u = new URL(url);
  const { port, protocol, hostname } = u;

  const options = getOptions(hostname, port, protocol);

  return new Promise((resolve, reject) => {
    const req = handleRequest(options, detailed, resolve, reject);

    if (timeout) {
      req.setTimeout(timeout, () => {
        reject({ message: 'Request timed out.' });
        req.abort();
      });
    }

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

import fetch from 'node-fetch';
import fs from 'fs';
import blobToBuffer from 'blob-to-buffer'
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {lib: 'phonedata', mod: 'source'},
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

function toBuffer(blob: Blob): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    blobToBuffer(blob, (err, buf) => {
      if (err) {
        reject(err)
      } else {
        resolve(buf)
      }
    })
  })
}

export async function fetchPhoneData({checkUpdate = true} = {}) {
  const filename = 'phone.dat';
  const metaCacheFile = `/tmp/${filename}.meta.json`;

  let meta;
  try {
    meta = JSON.parse(fs.readFileSync(metaCacheFile).toString());
  } catch (e) {
    //
  }
  if (checkUpdate || !meta) {
    meta = await fetch('https://api.github.com/repos/xluohome/phonedata/contents/')
      .then(v => v.json())
      .then(v => v.find(v => v.name === filename));

    fs.writeFileSync(metaCacheFile, JSON.stringify(meta));
  }

  const {sha, download_url: downloadUrl} = meta;
  const path = `/tmp/${sha}-${filename}`;
  if (fs.existsSync(path)) {
    logger.info('info', `using phonedata ${path}`);
    return fs.readFileSync(path);
  } else {
    logger.info('info', `downloading phonedata ${downloadUrl} to ${path}`);
    const buf = await fetch(downloadUrl).then(v => v.buffer());
    logger.info('info', `downloaded phonedata ${path}`);
    fs.writeFileSync(path, buf);
    return buf
  }
}

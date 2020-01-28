import fetch from 'node-fetch';
import fs from 'fs';
import blobToBuffer from 'blob-to-buffer'

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

export async function fetchPhoneData() {
  const filename = 'phone.dat';
  const meta = await fetch('https://api.github.com/repos/xluohome/phonedata/contents/')
    .then(v => v.json())
    .then(v => v.find(v => v.name === filename));

  const {sha, download_url: downloadUrl} = meta;
  const path = `/tmp/${sha}-${filename}`;
  if (fs.existsSync(path)) {
    console.log(`using phonedata ${path}`);
    return fs.readFileSync(path);
  } else {
    console.log(`downloading phonedata ${downloadUrl} to ${path}`);
    const buf = await fetch(downloadUrl).then(v => v.buffer());
    console.log(`downloaded phonedata ${path}`);
    fs.writeFileSync(path, buf);
    return buf
  }
}

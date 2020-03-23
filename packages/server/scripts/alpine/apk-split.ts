import fs from 'fs';
import tar, { ReadEntry } from 'tar';
import { Duplex } from 'stream';

function bufferToStream(buffer): Duplex {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

async function main() {
  const file = process.argv[2];
  console.log(`split ${file}`);
  const buf = fs.readFileSync(file);
  const idx = buf.indexOf(
    new Uint8Array([
      // magic
      0x1f,
      0x8b,
      // compress - deflate
      8,
      // flags
      0,
      // mtime
      // 0, 0, 0, 0
    ]),
    1
  );
  // cat signature.tar.gz APKINDEX.unsigned.tar.gz > APKINDEX.tar.gz
  if (idx < 0) {
    throw new Error('No found second gzip header');
  }
  fs.writeFileSync('control.tar.gz', buf.slice(0, idx));
  const dataBuf = buf.slice(idx);
  fs.writeFileSync('data.tar.gz', dataBuf);

  const pipe = bufferToStream(dataBuf)
    .pipe(
      tar.t({
        // onentry:(entry: FileStat) =>{
        //   const e: ReadEntry = entry as any;
        //   console.log(`path ${e.path} type ${e.type} ${e.uname}:${e.gname} ${e.size}\n\textended: ${JSON.stringify(e.extended)}`)
        // }
      })
    )
    .on('entry', (e: ReadEntry) => {
      // FileStat
      // const e: ReadEntry = entry as any;
      console.log(
        `path ${e.path} type ${e.type} ${e.uname}:${e.gname} ${e.size}\n\textended: ${JSON.stringify(e.extended)}`
      );
    });

  await new Promise((resolve, reject) => {
    pipe.on('close', resolve);
    pipe.on('finish', resolve);
    pipe.on('error', reject);
  });
  /*
ReadEntry {
  extended: Pax {
    atime: 2019-11-15T19:49:00.327Z,
    charset: null,
    comment: null,
    ctime: 2019-11-15T19:48:59.891Z,
    gid: null,
    gname: null,
    linkpath: null,
    mtime: 2019-11-15T19:48:59.891Z,
    path: null,
    size: null,
    uid: null,
    uname: null,
    dev: null,
    ino: null,
    nlink: null,
    global: false
  },
  globalExtended: null,
  header: Header {
    cksumValid: true,
    needPax: false,
    nullBlock: false,
    block: null,
    path: 'bin/umount',
    mode: 2541,
    uid: 0,
    gid: 0,
    size: 34704,
    mtime: 2019-11-15T19:48:59.891Z,
    cksum: 8407,
    linkpath: '',
    uname: 'root',
    gname: 'root',
    devmaj: 0,
    devmin: 0,
    atime: null,
    ctime: null,
    global: false,
    [Symbol(type)]: '0'
  },
  startBlockSize: 34816,
  blockRemain: 34816,
  remain: 34704,
  type: 'File',
  meta: false,
  ignore: false,
  path: 'bin/umount',
  mode: 2541,
  uid: 0,
  gid: 0,
  uname: 'root',
  gname: 'root',
  size: 34704,
  mtime: 2019-11-15T19:48:59.891Z,
  atime: 2019-11-15T19:49:00.327Z,
  ctime: 2019-11-15T19:48:59.891Z,
  linkpath: '',
  global: false,
  [Symbol(flowing)]: false,
  [Symbol(paused)]: true,
  [Symbol(objectMode)]: false,
  [Symbol(encoding)]: null,
  [Symbol(decoder)]: null,
  [Symbol(EOF)]: false,
  [Symbol(emittedEnd)]: false,
  [Symbol(emittingEnd)]: false,
  [Symbol(closed)]: false,
  [Symbol(bufferLength)]: 0,
  [Symbol(destroyed)]: false
}


const tar = require('./')
const data = []

const file = 'foo.tar'

const onentry = entry => {
  if (entry.path === 'foo/bar.txt')
    entry.on('data', c => data.push(c))
}

tar.t({
  onentry,
  file,
}, er => {
  const buf = Buffer.concat(data)
  console.log('got the file data', buf.toString('hex'))
})
   */
}

(async function run() {
  await main();
})();

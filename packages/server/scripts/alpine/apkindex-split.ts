import fs from 'fs';

// ts-node ./scripts/alpine/apkindex-split.ts data/APKINDEX.tar.gz
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
      0,
      0,
      0,
      0,
    ]),
    1
  );
  // cat signature.tar.gz APKINDEX.unsigned.tar.gz > APKINDEX.tar.gz
  if (idx < 0) {
    throw new Error('No found second gzip header');
  }
  fs.writeFileSync('signature.tar.gz', buf.slice(0, idx));
  fs.writeFileSync('APKINDEX.unsigned.tar.gz', buf.slice(idx));
}

(async function run() {
  await main();
})();

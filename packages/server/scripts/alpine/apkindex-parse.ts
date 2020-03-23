import fs from 'fs';

// ts-node --project ../tsconfig.ts-node.json ../scripts/alpine/apkindex-parse.ts apkindex/APKINDEX
async function main() {
  const file = process.argv[2];
  const content = fs.readFileSync(file).toString();
  const splits = content.split('\n\n');
  console.log(`${file} Records ${splits.length}`);

  const record = Object.fromEntries(
    splits[0]
      .split('\n')
      .map((v) => {
        const idx = v.indexOf(':');
        return [v.substring(0, idx), v.substring(idx + 1)];
      })
      .sort(([a], [b]) => (a > b ? 1 : -1))
  );
  console.log(record);
}

(async function run() {
  await main();
})();

import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';

async function main() {
  let modules: string[] = await new Promise((resolve, reject) => {
    // src/modules/
    glob('*/index.ts', { cwd: path.join(__dirname, '..') }, (e, v) => {
      if (e) {
        reject(e);
      } else {
        resolve(v);
      }
    });
  });
  modules = modules.map((v) => v.replace('/index.ts', ''));
  const meta = [];
  for (const module of modules) {
    const mod = { id: module, name: `@wener/apis-${module}` };
    meta.push(mod);
    if (fs.existsSync(__dirname + `/../${module}/metadata.json`)) {
      mod['metadata'] = fs.readJsonSync(__dirname + `/../${module}/metadata.json`);
    }
  }
  fs.writeJsonSync(__dirname + `/modules.json`, meta);
}

(async function run() {
  await main();
})();

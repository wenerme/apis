import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import { pascalCase } from '@wener/utils/src/strings/camelCase';
import { processFileContent, replaceGenerated } from './utils';

/*
ts-node --project ./tsconfig.ts-node.json ./scripts/icons.ts
 */
async function generate(svgPath, compPath, utilPath) {
  const files: string[] = await new Promise((resolve, reject) =>
    glob('*.svg', { cwd: svgPath }, (e, v) => {
      if (e) {
        reject(e);
      } else {
        resolve(v);
      }
    }),
  );
  console.log(files);
  const names: string[] = [];
  // files.ea
  for (let f of files) {
    const ext = path.extname(f);
    const basename = path.basename(f, ext);
    const name = pascalCase(basename);
    names.push(name);
    if (basename !== name) {
      const from = path.join(svgPath, basename) + ext;
      const to = (f = path.join(svgPath, name) + ext);
      console.log(`renaming ${from} to ${to}`);
      fs.renameSync(from, to);
    }

    await gen({
      svg: path.join(svgPath, f),
      svgImport: './' + path.join(path.relative(compPath, svgPath), f),
      name,
      comp: path.join(compPath, `${name}.tsx`),
      // force: true,
    });
  }

  names.sort();
  fs.writeFileSync(
    path.join(utilPath, 'index.ts'),
    names.map((v) => `export { default as ${v} } from './${path.relative(utilPath, compPath)}/${v}';`).join('\n') +
      '\n',
  );

  const resolveCase = names
    .map((v) => `    case '${v}':c = import('./${path.relative(utilPath, compPath)}/${v}');break;`)
    .join('\n');
  const resolver = path.join(utilPath, 'iconsResolver.ts');
  const rel = replaceGenerated(fs.readFileSync(resolver).toString(), resolveCase);

  processFileContent(path.join(utilPath, 'iconsResolverTypes.ts'), (v) => {
    return replaceGenerated(v, `export const iconsResolverTypes: string[] = ${JSON.stringify(names)};`, 'types');
  });

  fs.writeFileSync(resolver, rel);
}

async function gen({ svg, comp, name, svgImport, force = false }) {
  if (fs.existsSync(comp) && !force) {
    return;
  }
  console.log(`Generate ${name}`);
  fs.writeFileSync(
    comp,
    `
import React, {ForwardRefRenderFunction} from 'react';
import ${name}Svg from '${svgImport}'
import Icon, {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

const ${name}: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: ${name}Svg
  }));
};

${name}.displayName = '${name}';
export default React.forwardRef(${name});
`.trimLeft(),
  );
}

async function main() {
  await generate('./src/icons/svgs', './src/icons/components', './src/icons');
}

(async function run() {
  await main();
})();

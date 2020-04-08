import glob from 'glob';
import * as fs from 'fs';
import path from 'path';
import { pascalCase } from '@wener/utils/src/strings/camelCase';

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
  fs.writeFileSync(
    path.join(utilPath, 'manifest.json'),
    JSON.stringify(
      names.map((v) => ({ name: v })),
      null,
      '  ',
    ),
  );

  const resolveCase = names
    .map((v) => `    case '${v}':c = import('./${path.relative(utilPath, compPath)}/${v}');break;`)
    .join('\n');
  const resolver = path.join(utilPath, 'resolver.ts');
  const rel = replaceGenerated(fs.readFileSync(resolver).toString(), resolveCase);

  fs.writeFileSync(resolver, rel);
}

function replaceGenerated(s: string, v: string) {
  return s.replace(
    /^[^\n]*generated:begin.*?generated:end.*?$/ms,
    `    // generated:begin
${v}
    // generated:end`,
  );
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

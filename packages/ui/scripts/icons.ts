import glob from 'glob';
import fs from 'fs';
import path from 'path';
import { pascalCase } from '@wener/utils';
import { processFileContent, replaceGenerated } from './utils';

/*
ts-node --project ./tsconfig.ts-node.json ./scripts/icons.ts
 */
async function generate(svgPath, compPath, utilPath) {
  let files: string[] = await new Promise((resolve, reject) =>
    glob('*.tsx', { cwd: svgPath }, (e, v) => {
      if (e) {
        reject(e);
      } else {
        resolve(v);
      }
    }),
  );
  files = files.filter((v) => !/index[.]/i.test(v));
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
      force: true,
    });
  }

  names.sort();
  fs.writeFileSync(
    path.join(utilPath, 'index.ts'),
    names
      .flatMap((v) => [
        `export { default as ${v} } from './${path.relative(utilPath, compPath)}/${v}';`,
        `export { default as Svg${v} } from './svgr/${v}';`,
      ])
      .join('\n') + '\n',
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

async function gen({ svg, comp, name, svgImport, force = Boolean(process.env.FORCE) }) {
  if (fs.existsSync(comp) && !force) {
    return;
  }
  console.log(`Generate ${name}`);
  fs.writeFileSync(
    comp,
    `
import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import ${name}Svg from '${svgImport.replace(/[.]tsx$/, '')}'
import {IconProps,IconComponent} from '../types'

const ${name}: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: ${name}Svg
  }));
};

${name}.displayName = '${name}';
export default forwardRef(${name});
`.trimLeft(),
  );

  //   fs.writeFileSync(
  //     comp,
  //     `
  // import React,{ForwardRefRenderFunction,forwardRef,createElement} from 'react';
  // import ${name}Svg from '${svgImport.replace(/[.]tsx$/, '')}'
  // import {IconProps} from '../types'
  // import Icon from '@ant-design/icons';
  //
  // const ${name}: React.FC<IconProps> = (props) => {
  //   return createElement(Icon, Object.assign({}, props, {
  //     component: ${name}Svg
  //   }));
  // };
  //
  // ${name}.displayName = '${name}';
  // export default ${name};
  // `.trimLeft(),
  //   );
}

async function main() {
  await generate('./src/icons/svgr', './src/icons/components', './src/icons');
}

(async function run() {
  await main();
})();

import glob from 'glob';
import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { pascalCase } from '@wener/utils/src/strings/camelCase';

_.mixin({ pascalCase: _.flow(_.camelCase, _.upperFirst) });

/*
ts-node --project ./tsconfig.ts-node.json ./scripts/icons-generate.ts
 */
async function generate(svgPath: string, compPath: string) {
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
  // files.ea
  for (const f of files) {
    const name = pascalCase(path.basename(f, path.extname(f)));

    await gen({
      svg: path.join(svgPath, f),
      svgImport: path.join(path.relative(compPath, svgPath), f),
      name,
      comp: path.join(compPath, `${name}.tsx`),
      // force: true,
    });
  }
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
  await generate('./public/icons/svg', './src/components/icons');
}

(async function run() {
  await main();
})();

import * as Icons from '@ant-design/icons';
import * as fs from 'fs';
import { processFileContent, replaceGenerated } from './utils';

// console.log(Object.keys(Icons));
const names = Object.keys(Icons).filter((v) => /^[A-Z]/.test(v));
const resolved = names.map((v) => `    case '${v}':c = import('@ant-design/icons/${v}');break;`).join('\n');

const path = 'src/icons/antdIconsResolver.ts';
let content = fs.readFileSync(path).toString();
content = replaceGenerated(content, resolved, 'case');
fs.writeFileSync(path, content);

processFileContent('src/icons/antdIconsResolverTypes.ts', (v) => {
  return replaceGenerated(v, `export const antdIconsResolverTypes: string[] = ${JSON.stringify(names)};`, 'types');
});

console.log(`resolved icons ${names.length}`);

import pegjs from 'pegjs';
import tspegjs from 'ts-pegjs';
import fs from 'fs-extra';

const config = {
  output: 'source',
  format: 'commonjs',
  cache: true,
  plugins: [tspegjs],
  tspegjs: {
    noTslint: true,
    customHeader: `
/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */
`,
  },
};
const lang = 'asterisk-conf';
const parser = pegjs.generate(fs.readFileSync(`${__dirname}/${lang}/${lang}.pegjs`).toString(), config as any);
fs.writeFileSync(`${__dirname}/${lang}/parse.ts`, parser as any);

import { parse } from './parse';
import { buildIniObject } from 'src/modules/langs/ini/buildIniObject';
import { stringifyIni } from 'src/modules/langs/ini/stringifyIni';

class Ini {
  stringify(s: any) {
    return stringifyIni(s);
  }

  parse(s) {
    return buildIniObject(parse(s));
  }
}

export const INI = new Ini();

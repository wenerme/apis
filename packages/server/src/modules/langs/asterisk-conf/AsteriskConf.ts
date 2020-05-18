import { parse } from './parse';
import { buildAstConfObject } from 'src/modules/langs/asterisk-conf/buildAstConfObject';
import { stringifyIni } from 'src/modules/langs/ini/stringifyIni';

class AsteriskConfUtils {
  parseSyntax(s: string) {
    return parse(s);
  }

  parse(s: string) {
    return buildAstConfObject(this.parseSyntax(s));
  }

  stringify(s) {
    return stringifyIni(s);
  }
}

export const AsteriskConf = new AsteriskConfUtils();

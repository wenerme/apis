import { parse } from './parse';
import { plainToSyntaxClass } from 'src/modules/langs/cron/ast';

class CronUtils {
  predefined = {
    yearly: '0 0 1 1 *',
    annually: '0 0 1 1 *',
    monthly: '0 0 1 * *',
    weekly: '0 0 * * 0',
    daily: '0 0 * * *',
    midnight: '0 0 * * *',
    hourly: '0 * * * *',
  };
  parseSyntax(s: string, options?: ParseSyntaxOptions) {
    const { tryResolvePredefined } = options ?? {};
    const r = parse(s, options);
    if (tryResolvePredefined && r?.type === 'predefined') {
      const v = this.predefined[r.name];
      if (v) {
        return this.parseSyntax(v, options);
      }
    }
    if (Array.isArray(r)) {
      return r.map(plainToSyntaxClass);
    }
    return plainToSyntaxClass(r);
  }

  stringifySyntax(v) {
    return Array.isArray(v) ? v.map((vv) => vv.toString()).join(' ') : v.toString();
  }
}

export interface ParseSyntaxOptions {
  tryResolvePredefined?: boolean;
}

export const Cron = new CronUtils();

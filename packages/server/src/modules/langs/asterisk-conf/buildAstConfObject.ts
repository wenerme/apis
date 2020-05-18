import { buildIniLine, BuildIniObjectContext } from 'src/modules/langs/ini/buildIniObject';
import { isEmptyObject } from '@wener/utils';

export function buildAstConfObject(lines: any[]) {
  const context: BuildAsteriskConfObjectContext = { global: {}, section: {}, templates: {} };
  context.global[''] = context.section;

  for (const line of lines) {
    if (buildIniLine(line, context)) {
      continue;
    }
    if (buildAsteriskConfObjectLine(line, context)) {
      continue;
    }

    throw new Error(`unknown line: ${line.type}`);
  }
  if (!Object.keys(context.global['']).length) {
    delete context.global[''];
  }
  return context.global;
}

function buildAsteriskConfObjectLine(line, context: BuildAsteriskConfObjectContext) {
  const { section, global, templates } = context;
  switch (line.type) {
    case 'append-section': {
      const { conditions } = line;
      if (!isEmptyObject(conditions)) {
        throw new Error(`unsupported condition append: ${JSON.stringify(line)}`);
      }
      buildIniLine({ ...line, type: 'section' }, context);
      break;
    }
    case 'template-section': {
      const { extends: exts = [], templateOnly, name } = line;
      const sec = {};
      for (const ext of exts) {
        Object.assign(sec, templates[ext] || {});
      }
      if (templateOnly) {
        context.section = templates[name] = sec;
      } else {
        context.section = global[name] = sec;
      }
      break;
    }
    default:
      return false;
  }
  return true;
}

export interface BuildAsteriskConfObjectContext extends BuildIniObjectContext {
  templates: Record<string, any>;
}

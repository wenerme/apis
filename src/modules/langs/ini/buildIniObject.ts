export function buildIniObject(lines: any[]) {
  const context: BuildIniObjectContext = { global: {}, section: {} };
  context.global[''] = context.section;

  for (const line of lines) {
    if (!buildIniLine(line, context)) {
      throw new Error(`unknown line: ${line.type}`);
    }
  }
  if (!Object.keys(context.global['']).length) {
    delete context.global[''];
  }
  return context.global;
}

export function buildIniLine(line, context: BuildIniObjectContext) {
  const { section, global } = context;
  switch (line.type) {
    case 'section':
      {
        const { name } = line;
        context.section = global[name] = global[name] ?? {};
      }
      break;
    case 'comment':
      break;
    case 'entry': {
      const { key, value } = line;
      section[key] = section[key] ? [].concat(section[key], value) : value;
      break;
    }
    default:
      return false;
  }
  return true;
}

export interface BuildIniObjectContext {
  global: Record<string, Record<string, any>>;
  section: Record<string, any>;
}

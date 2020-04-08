import fs from 'fs';

export function replaceGenerated(s: string, v: string, modifier = '') {
  if (modifier) {
    modifier = `@${modifier}`;
  }
  const search = new RegExp(`^[^\\n]*generated:begin${modifier}.*?generated:end${modifier}.*?$`, 'ms');
  return s.replace(
    search,
    `// generated:begin${modifier}
${v}
// generated:end${modifier}`,
  );
}

export function processFileContent(path: string, processor: (v: string) => string) {
  const content = fs.readFileSync(path).toString();
  fs.writeFileSync(path, processor(content));
}

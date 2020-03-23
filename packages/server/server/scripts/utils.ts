import fs from 'fs';

export function lineInFile({ line, regex, file }) {
  let content = '';
  if (fs.existsSync(file)) {
    content = fs.readFileSync(file).toString().trimEnd();
  }
  let done = false;
  const lines = content.split('\n').map((v) => {
    if (regex.test(v)) {
      done = true;
      return line;
    }
    return v;
  });

  if (!done) {
    lines.push(line);
  }

  lines.push('');

  const neo = lines.join('\n');
  if (neo !== content) {
    fs.writeFileSync(file, neo);
  }
}

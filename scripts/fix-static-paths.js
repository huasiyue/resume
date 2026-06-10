const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');
const textFilePattern = /\.(html|js|json|css|map)$/i;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

let changed = 0;

for (const file of walk(publicDir)) {
  if (!textFilePattern.test(file)) continue;

  const before = fs.readFileSync(file, 'utf8');
  const after = before
    .replace(/page-data\\/g, 'page-data/')
    .replace(/\\page-data/g, '/page-data')
    .replace(/\\index\\page-data\.json/g, '/index/page-data.json')
    .replace(/\\app-data\.json/g, '/app-data.json');

  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

console.log(`Fixed static URL separators in ${changed} file(s).`);

const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || 'public');
const port = Number(process.argv[3] || 9000);
const host = process.argv[4] || '127.0.0.1';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.map': 'application/json; charset=utf-8',
};

function sendFile(file, res) {
  fs.readFile(file, (error, body) => {
    if (error) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'content-type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
    });
    res.end(body);
  });
}

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url || '/', `http://${host}:${port}`);
  let pathname = decodeURIComponent(parsed.pathname);

  if (pathname === '/') pathname = '/index.html';

  let file = path.normalize(path.join(root, pathname));

  if (!file.startsWith(root)) {
    res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(file, (error, stat) => {
    if (error || stat.isDirectory()) {
      file = path.join(root, 'index.html');
    }
    sendFile(file, res);
  });
});

server.listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});

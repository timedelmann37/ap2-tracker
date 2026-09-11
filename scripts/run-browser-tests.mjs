import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
};

const server = createServer(async (request, response) => {
  try {
    let relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+/, '');
    if (!relative || relative.endsWith('/')) relative += 'index.html';
    const target = path.resolve(distRoot, relative);
    if (target !== distRoot && !target.startsWith(`${distRoot}${path.sep}`)) throw new Error('ungueltiger Pfad');
    const info = await stat(target);
    if (!info.isFile()) throw new Error('keine Datei');
    response.writeHead(200, { 'content-type': contentTypes[path.extname(target).toLowerCase()] || 'application/octet-stream' });
    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
process.env.AP2_BASE_URL = `http://127.0.0.1:${address.port}`;

try {
  await import('./verify-navigation.mjs');
  await import('./verify-theme-persistence.mjs');
  await import('./verify-learning-browser.mjs');
  await import('./verify-space-browser.mjs');
} finally {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}

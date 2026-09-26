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
  await import('./verify-n8-browser.mjs');
  await import('./verify-n9-browser.mjs');
  await import('./verify-source-cases-browser.mjs');
  await import('./verify-trace-browser.mjs');
  await import('./verify-pseudocode-browser.mjs');
  await import('./verify-idempotency-browser.mjs');
  await import('./verify-control-structures-browser.mjs');
  await import('./verify-variables-browser.mjs');
  await import('./verify-data-formats-browser.mjs');
  await import('./verify-automation-batch-browser.mjs');
  await import('./verify-shell-batch-browser.mjs');
  await import('./verify-script-workshop-browser.mjs');
  await import('./verify-notation-browser.mjs');
  await import('./verify-nas-decision-browser.mjs');
  await import('./verify-object-storage-browser.mjs');
  await import('./verify-write-penalty-browser.mjs');
  await import('./verify-filesystems-browser.mjs');
  await import('./verify-lvm-browser.mjs');
  await import('./verify-storage-efficiency-browser.mjs');
  await import('./verify-sds-browser.mjs');
  await import('./verify-capacity-browser.mjs');
  await import('./verify-archive-browser.mjs');
  await import('./verify-rto-browser.mjs');
  await import('./verify-backup-choice-browser.mjs');
  await import('./verify-gfs-browser.mjs');
  await import('./verify-server-indicators-browser.mjs');
  await import('./verify-space-browser.mjs');
} finally {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}

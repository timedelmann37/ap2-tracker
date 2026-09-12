import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const repoRoot = path.resolve(import.meta.dirname, '..');
const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
    const file = path.join(repoRoot, relative);
    const body = await readFile(file);
    const type = file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ? 'text/javascript' : file.endsWith('.svg') ? 'image/svg+xml' : 'text/html';
    response.writeHead(200, { 'content-type': type });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end();
  }
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('ap2-tracker-state-v1', JSON.stringify({
      'ga1-3__3': true,
      'ts__ga1-3__3': 200
    }));
  });
  await page.route(/supabase-js/, route => route.fulfill({
    contentType: 'text/javascript',
    body: `window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:'fixture-user',email:'test@example.invalid'}}}}),onAuthStateChange:()=>{}},from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:{state:{'ga1-3__3':false,'ts__ga1-3__3':100,'ga2-1__0':true}},error:null})})}),upsert:async()=>({error:null})})})};`
  }));

  let dialogs = 0;
  page.on('dialog', async dialog => {
    dialogs += 1;
    await dialog.dismiss();
  });

  const base = `http://127.0.0.1:${server.address().port}`;
  await page.goto(base + '/');
  await page.waitForFunction(() => document.querySelector('#accountSyncStatus')?.textContent === 'Fortschritt gespeichert');
  await page.reload();
  await page.waitForFunction(() => document.querySelector('#accountSyncStatus')?.textContent === 'Fortschritt gespeichert');

  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ap2-tracker-state-v1')));
  assert.equal(dialogs, 0, 'Cloud-Sync darf beim Neuladen keinen Bestaetigungsdialog anzeigen');
  assert.equal(stored['ga1-3__3'], true, 'Der neuere lokale Stand muss erhalten bleiben');
  assert.equal(stored['ga2-1__0'], true, 'Ein zusaetzlicher Cloud-Stand muss automatisch uebernommen werden');
  console.log('PASS Cloud-Sync fuehrt beim Neuladen ohne Dialog sicher zusammen');
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}

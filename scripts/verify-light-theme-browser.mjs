import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const file = `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`;
    const body = await readFile(file);
    response.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ? 'text/javascript' : 'text/html');
    response.end(body);
  } catch {
    response.statusCode = 404;
    response.end();
  }
});

const alpha = color => Number(color.match(/[\d.]+(?=\))/g)?.at(-1) || 1);

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.route(/supabase-js/, route => route.fulfill({ contentType: 'text/javascript', body: `window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:null}}),onAuthStateChange:()=>{}},from:()=>({})})};` }));
  await page.goto(`http://127.0.0.1:${server.address().port}/netzwerke/`);
  await page.evaluate(() => document.documentElement.dataset.theme = 'light');
  await page.waitForTimeout(750);
  const values = await page.evaluate(() => {
    const style = selector => getComputedStyle(document.querySelector(selector));
    return {
      cardBackground: style('details.card').backgroundColor,
      cardBorder: style('details.card').borderTopColor,
      auroraOpacity: Number(style('.space-aurora').opacity),
      pageBackground: style('body').backgroundColor,
      secondaryText: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(),
      ga2: getComputedStyle(document.documentElement).getPropertyValue('--cat-ga2').trim()
    };
  });
  assert(alpha(values.cardBackground) >= 0.75, `light cards need a distinct surface (${values.cardBackground})`);
  assert(alpha(values.cardBorder) >= 0.25, `light cards need a visible edge (${values.cardBorder})`);
  assert(values.auroraOpacity <= 0.24, `light atmosphere must not wash out the page (${values.auroraOpacity})`);
  assert.notEqual(values.secondaryText, '#60536f', 'secondary text needs stronger light-mode contrast');
  assert.notEqual(values.ga2, '#2f6ecc', 'area colors need stronger light-mode presence');
  console.log('PASS light theme keeps distinct surfaces, edges, text and area color');
} finally {
  await browser.close();
  server.close();
}

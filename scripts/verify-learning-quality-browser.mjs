import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4337';
const captures = process.env.AP2_FINAL_CAPTURE_DIR;
if (captures) await mkdir(captures, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/lernen/rechtsformen-haftung-kapital-leitung-gewinn/');
  assert.equal(await page.locator('.learning-round').count(), 4);
  assert.equal(await page.locator('#toc .toc-round').count(), 4);
  assert.equal(await page.locator('#toc-mobile .toc-round').count(), 4);
  assert.equal(await page.locator('#s13 + h3, #s13 ~ h3').count() >= 8, true, 'Semantic form comparisons remain');
  for (const width of [320, 390, 820, 900, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.dataset.theme = t, theme);
      await page.evaluate(() => scrollTo(0, 0));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal page overflow at ' + width);
      assert(await page.locator('h1').evaluate(n => {
        const box = n.getBoundingClientRect(), range = document.createRange(); range.selectNodeContents(n);
        return [...range.getClientRects()].every(r => r.left >= box.left - 1 && r.right <= box.right + 1);
      }), 'Heading fits');
      if (width <= 900) {
        const overview = page.locator('#lesson-overview');
        assert(await overview.isVisible());
        await overview.locator('> summary').press('Enter');
        await page.waitForFunction(() => document.getElementById('lesson-overview').querySelector('.overview-body').scrollTop === 0);
        assert.equal(await overview.getAttribute('open') !== null, true);
        assert(await overview.locator('[data-mastery-count]').isVisible());
        assert(await overview.locator('[data-next-check]').isVisible());
        if (captures && [390, 900].includes(width)) await page.screenshot({ path: path.join(captures, 'quality-' + width + '-' + theme + '-overview.png') });
        const link = overview.locator('.toc a').last();
        const id = await link.getAttribute('data-t');
        await link.press('Enter');
        assert.equal(await overview.getAttribute('open'), null, 'Contents closes after navigation');
        assert.equal(await page.evaluate(() => document.activeElement.id), id, 'Heading receives focus');
        if (width <= 620) assert(await page.locator('.diagram-mobile-list').first().isVisible(), 'Layer labels/details readable without pan');
      } else {
        const rail = page.locator('.rail');
        assert(await rail.evaluate(n => n.scrollHeight > n.clientHeight && getComputedStyle(n).overflowY === 'auto'), 'Long rail scrolls independently');
        await rail.locator('.toc a').last().focus();
        assert(await rail.evaluate(n => n.scrollTop > 0), 'Last contents link reachable');
      }
      const done = page.locator('#mark-done');
      assert(await done.isDisabled());
      await done.scrollIntoViewIfNeeded();
      assert(await page.locator('#learning-action-reason').isVisible());
      assert(await page.locator('#learning-save').isVisible());
      assert.equal(await done.evaluate(n => getComputedStyle(n).boxShadow), 'none', 'Disabled completion has no success glow');
      if (captures && [390, 1440].includes(width)) await page.screenshot({ path: path.join(captures, 'quality-' + width + '-' + theme + '-actions.png') });
      assert.equal(await page.locator('.flashcard .face').first().evaluate(n => getComputedStyle(n).transitionDuration), '0s');
      assert.equal(await page.locator('[data-mastery-bar]').first().evaluate(n => getComputedStyle(n).transitionDuration), '0s');
    }
  }
  for (const slug of ['linux-verzeichnisse-dienste-pakete-logs', 'wiso-pruefungszeit-budget-kontrollpunkte', 'osi-model']) {
    await page.goto(base + '/lernen/' + slug + '/');
    assert(await page.locator('h2.sec').evaluateAll(nodes => nodes.every(n => !/^\d+\s*[·.]/.test(n.childNodes[n.childNodes.length - 1].textContent.trim()))), 'One numbering authority');
    assert(await page.locator('.meta').innerText().then(t => t.includes('menschliche Freigabe ausstehend')));
  }
  assert.deepEqual(errors, []);
  // Original generated HTML, deliberately delayed/offline SDK, no account or production request.
  const anonymous = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const html = await readFile(new URL('../dist/lernen/rechtsformen-haftung-kapital-leitung-gewinn/index.html', import.meta.url), 'utf8');
  await anonymous.route(base + '/qa-learning-anonymous', r => r.fulfill({ contentType: 'text/html', body: html }));
  await anonymous.route('**/supabase.js', async r => {
    await new Promise(resolve => setTimeout(resolve, 1600));
    await r.fulfill({ contentType: 'text/javascript', body: 'window.supabase=undefined;' });
  });
  await anonymous.goto(base + '/qa-learning-anonymous', { waitUntil: 'commit' });
  await anonymous.waitForTimeout(250);
  assert.equal(await anonymous.locator('h1').count(), 1, 'Reading HTML is parsed before the delayed SDK completes');
  await anonymous.waitForFunction(() => document.querySelector('[data-action-reason]').textContent.includes('Anmelden'));
  await anonymous.locator('#lesson-overview > summary').press('Enter');
  assert(await anonymous.locator('[data-learning-signin]').isVisible(), 'Mobile account entry is available near contents');
  assert.match(await anonymous.locator('#lesson-overview [data-action-reason]').textContent(), /ohne Konto/);
  if (captures) await anonymous.screenshot({ path: path.join(captures, 'quality-390-anonymous-overview.png') });
  await anonymous.close();
  console.log('PASS learning quality: round TOCs, focus, 320/390/820/900/1440 Dark/Light, action guidance, disabled semantics, mobile text alternatives and Reduced Motion');
} finally { await browser.close(); }

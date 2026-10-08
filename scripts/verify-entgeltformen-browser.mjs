import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_FORMEN_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/entgeltformen-zeitlohn-akkord-praemie-gehalt-vl/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="wiso-5__12"]').count() === 1, 'Tracker key');
  assert(32 * 24 === 768 && 80 * 960 === 76800, 'Independent time and piece calculations');
  const premium = (documented, durable) => 3100 + (documented && durable ? 180 : 0);
  assert(premium(true, true) === 3280 && premium(true, false) === 3100 && premium(false, true) === 3100 && premium(false, false) === 3100, 'Both premium conditions required');
  assert(28 + 22 === 50, 'VL funding split');
  const lessonText = await page.locator('body').innerText();
  for (const value of ['768 Euro', '3.280 Euro', '3.100 Euro', '28 Euro', '22 Euro', '50 Euro']) assert(lessonText.includes(value), 'Rendered calculation: ' + value);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Required checks lock completion');
  const diagnosis = page.locator('[data-quiz="formen-diagnose"]');
  await diagnosis.locator('[data-answer="0"]').press('Enter');
  assert(await done.isDisabled(), 'Wrong diagnosis does not unlock completion');
  assert((await diagnosis.locator('[data-selected-feedback]').textContent()).length > 25, 'Diagnosis explains learning-site boundary');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await page.locator('[data-quiz="formen-diagnose"] [data-answer="2"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not a gate');
  for (const [id, correct] of [['formen-zeit', 0], ['formen-akkord', 1], ['formen-praemie', 2], ['formen-vl', 0]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Explanatory feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(!await done.isDisabled(), 'All checks unlock');
  const recall = page.locator('[data-recall="formen-transfer"]');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Own recall first');
  await recall.locator('[data-recall-input]').fill('Nur Datum.');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Short recall remains locked');
  await recall.locator('[data-recall-input]').fill("Nika bekommt im eigenen Stundenmodell 32 mal 24 gleich 768 Euro brutto. Erens Stückgeldakkord ergibt 80 vergütete Einheiten mal 9,60 gleich ebenfalls 768 Euro brutto. Ein gleicher Betrag beweist keine gleiche Bemessungsgrundlage. Milas festes Monatsgehalt ist im regulären Monat 3.100 Euro; ich multipliziere es nicht nochmals mit Stunden. Die Prämie von 180 Euro setzt beide vereinbarten Bedingungen voraus. Nur dann sind es 3.280 Euro, sonst 3.100 Euro. Ein bloßer Ticketzähler könnte vorschnelles Schließen belohnen; ich prüfe daher im eigenen Fall Dokumentation und nachhaltige Fehlerbehebung. Die VL-Anlage besteht aus 28 Euro Arbeitgeberanteil und 22 Euro Eigenanteil, zusammen 50 Euro. Der Arbeitgeber überweist an das Anlageinstitut, nicht frei verfügbar ans Girokonto. VL sind nicht pauschal abgabenfrei. Netto kann ich ohne Abzugsdaten nicht berechnen.");
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model appears');
  for (const id of ['zeit', 'akkord', 'praemie', 'vl']) {
    const card = page.locator('[data-flashcard="' + id + '"]');
    await card.press('Enter');
    assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard card opens: ' + id);
    await card.press('Space');
    assert(await card.getAttribute('aria-pressed') === 'false', 'Keyboard card closes: ' + id);
  }
  await page.reload();
  assert(!await done.isDisabled(), 'Checks persist');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'true', 'Completion works');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'false', 'Completion can be undone');
  await page.locator('[data-quiz="formen-praemie"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Gate reset locks again');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
      for (const [name, target] of [['quiz', page.locator('[data-quiz="formen-akkord"]')], ['case', page.locator('p').filter({ hasText: 'Praxisfall:' }).first()], ['cards', page.locator('[data-flashcard="zeit"]')], ['transfer', recall]]) {
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No content overflow');
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-' + name + '.png') });
      }
      for (const card of await page.locator('[data-flashcard]').all()) {
        await card.scrollIntoViewIfNeeded();
        assert(await card.locator('.front').evaluate(n => {
          const t = n.querySelector('strong').getBoundingClientRect();
          return t.top >= n.querySelector('.k').getBoundingClientRect().bottom && t.bottom <= n.querySelector('small').getBoundingClientRect().top;
        }), 'Card front fits');
        await card.press('Enter');
        assert(await card.locator('.back').evaluate(n => {
          const t = n.querySelector('span:not(.k)').getBoundingClientRect();
          return t.top >= n.querySelector('.k').getBoundingClientRect().bottom && t.bottom <= n.getBoundingClientRect().bottom - 8;
        }), 'Card reverse fits');
        if (captures && await card.getAttribute('data-flashcard') === 'akkord') {
          await card.evaluate(n => n.scrollIntoView({ block: 'center' }));
          await page.screenshot({ path: path.join(captures, width + '-' + theme + '-card-reverse.png') });
        }
        await card.press('Space');
      }
      for (const [i, formula] of (await page.locator('math').all()).entries()) {
        await formula.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No formula page overflow');
        assert(await formula.getAttribute('aria-label'), 'Formula accessible name');
        if (captures && (i === 0 || i === 1)) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-formula-' + i + '.png') });
      }
      for (const [i, fig] of (await page.locator('.learning-figure').all()).entries()) {
        await fig.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No page overflow');
        const boxes = await fig.locator('svg text').evaluateAll(nodes => nodes.map(n => { const b = n.getBBox(); const v = n.ownerSVGElement.viewBox.baseVal; return b.x >= 0 && b.y >= 0 && b.x + b.width <= v.width && b.y + b.height <= v.height; }));
        assert(boxes.every(Boolean), 'Diagram labels inside canvas');
        const columns = await fig.locator('.diagram-comparison g, .diagram-flow g, .diagram-layers g').evaluateAll(groups => groups.every(g => {
          const r = g.querySelector('rect').getBBox();
          return [...g.querySelectorAll('text')].every(t => {
            const b = t.getBBox();
            return b.x >= r.x + 8 && b.x + b.width <= r.x + r.width - 8 && b.y >= r.y && b.y + b.height <= r.y + r.height;
          });
        }));
        if (!columns) console.log(JSON.stringify(await fig.locator('.diagram-comparison g').evaluateAll(groups => groups.map(g => { const r=g.querySelector('rect').getBBox(); return {x:r.x,width:r.width,texts:[...g.querySelectorAll('text')].map(t=>{ const b=t.getBBox(); return {text:t.textContent,x:b.x,width:b.width}; })}; }))));
        assert(columns, 'Board text stays inside its own column');
        assert(await fig.locator('.diagram-layers g').evaluateAll(groups => groups.every(g => {
          const key = g.querySelector('.diagram-key').getBBox();
          const texts = [...g.querySelectorAll('text')];
          const label = texts[0].getBBox();
          return label.x >= key.x + 8 && label.x + label.width <= key.x + key.width - 8 && texts.slice(1).every(t => t.getBBox().x >= key.x + key.width + 8);
        })), 'Parallel branch labels fit and do not overlap details');
        if (width === 390) {
          const scroll = fig.locator('.learning-diagram-scroll');
          await scroll.focus(); await page.keyboard.press('ArrowRight');
          await page.waitForFunction(n => n.scrollLeft > 0, await scroll.elementHandle());
          await scroll.evaluate(n => { n.scrollLeft = 0; });
        }
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-figure-' + i + '.png') });
      }
    }
  }
  assert(errors.length === 0, errors.join('; '));
  console.log('PASS Entgeltformen: quizzes, recall, keyboard cards, persistence, completion, responsive diagrams and label containment');
} finally { await browser.close(); }

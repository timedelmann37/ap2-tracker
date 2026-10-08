import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_CARDS_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/karteikarten-abruf-und-verteilte-wiederholung/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="ga1-12__3"]').count() === 1, 'Tracker key');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Required checks lock completion');
  await page.locator('[data-quiz="karten-diagnose"] [data-answer="1"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not a gate');
  for (const [id, correct] of [['karten-form', 1], ['karten-abruf', 0], ['karten-plan', 2]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Explanatory feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(!await done.isDisabled(), 'All checks unlock');
  const recall = page.locator('[data-recall="karten-transfer"]');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Own recall first');
  await recall.locator('[data-recall-input]').fill('Nur Uhr.');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Short recall remains locked');
  await recall.locator('[data-recall-input]').fill('Noras Karte fragt nach der Zeit bis Wiederherstellung und dem geforderten Datenstand. 80 Minuten sind RTO, 20 Minuten RPO. Ein mit Hinweis gelungener Abruf bleibt unterstützt. Nach gezielter Klärung wird später ohne Vorlage erneut geprüft. Eine Lösungsauswahl braucht Nachweise für Datenstand und Restore-Dauer.');
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model appears');
  for (const id of ['recovery', 'speicher', 'cloud', 'raidbasis', 'raidparitaet', 'raidpaare', 'cluster']) {
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
  await page.locator('[data-quiz="karten-plan"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Gate reset locks again');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
      for (const [name, target] of [['quiz', page.locator('[data-quiz="karten-abruf"]')], ['cards', page.locator('[data-flashcard="recovery"]')], ['transfer', recall]]) {
        await target.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No content overflow');
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-' + name + '.png') });
      }
      const recovery = page.locator('[data-flashcard="recovery"]');
      await recovery.scrollIntoViewIfNeeded();
      await recovery.press('Enter');
      assert(await recovery.getAttribute('aria-pressed') === 'true', 'Visible reverse');
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-card-reverse.png') });
      await recovery.press('Space');
      for (const card of await page.locator('[data-flashcard]').all()) {
        await card.scrollIntoViewIfNeeded();
        const frontFits = await card.locator('.front').evaluate(n => {
          const t = n.querySelector('strong').getBoundingClientRect();
          const k = n.querySelector('.k').getBoundingClientRect();
          const hint = n.querySelector('small').getBoundingClientRect();
          return t.top >= k.bottom && t.bottom <= hint.top;
        });
        assert(frontFits, 'Front text avoids labels: ' + await card.getAttribute('data-flashcard'));
        await card.press('Enter');
        const backFits = await card.locator('.back').evaluate(n => {
          const t = n.querySelector('span:not(.k)').getBoundingClientRect();
          const k = n.querySelector('.k').getBoundingClientRect();
          return t.top >= k.bottom && t.bottom <= n.getBoundingClientRect().bottom - 8;
        });
        assert(backFits, 'Reverse text fits: ' + await card.getAttribute('data-flashcard'));
        if (captures && ['cloud', 'cluster'].includes(await card.getAttribute('data-flashcard'))) {
          await card.evaluate(n => n.scrollIntoView({ block: 'center' }));
          await page.screenshot({ path: path.join(captures, width + '-' + theme + '-' + await card.getAttribute('data-flashcard') + '-reverse.png') });
        }
        await card.press('Space');
      }
      for (const [i, fig] of (await page.locator('.learning-figure').all()).entries()) {
        await fig.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No page overflow');
        const boxes = await fig.locator('svg text').evaluateAll(nodes => nodes.map(n => { const b = n.getBBox(); const v = n.ownerSVGElement.viewBox.baseVal; return b.x >= 0 && b.y >= 0 && b.x + b.width <= v.width && b.y + b.height <= v.height; }));
        assert(boxes.every(Boolean), 'Diagram labels inside canvas');
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
  console.log('PASS retrieval cards: quizzes, recall, keyboard cards, persistence, completion, responsive diagrams');
} finally { await browser.close(); }

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_HANDOVER_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/betriebsuebergabe-einweisung-anwenderschulung/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="ga1-10__8"]').count() === 1, 'Tracker key');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Required checks lock completion');
  await page.locator('[data-quiz="handover-diagnose"] [data-answer="1"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not a gate');
  for (const [id, correct] of [['handover-bereitschaft', 0], ['handover-protokoll', 1], ['handover-zielgruppe', 2], ['handover-nachweis', 0]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Explanatory feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(!await done.isDisabled(), 'All checks unlock');
  const recall = page.locator('[data-recall="handover-transfer"]');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Own recall first');
  await recall.locator('[data-recall-input]').fill('Ich prüfe Betriebsfunktion, Alarmempfang und Wiederherstellung mit der zuständigen Rolle. Ein fehlender Pflichtnachweis stoppt die Übergabe. Restpunkte brauchen Verantwortung, Akzeptanz und Frist. Anwender üben das Scannen und die sichere Meldung mit normalen Testkonten. Die selbstständige Aufgabe wird geprüft und konkret rückgemeldet. Eine aktuelle Anleitung und erreichbare Unterstützung begleiten die erste Arbeitsphase.');
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model appears');
  for (const id of ['bereit', 'umfang', 'restpunkt', 'rolle', 'ziel', 'feedback', 'betreuung']) {
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
  await page.locator('[data-quiz="handover-nachweis"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Gate reset locks again');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
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
  console.log('PASS handover and training: quizzes, recall, keyboard cards, persistence, completion, responsive diagrams');
} finally { await browser.close(); }

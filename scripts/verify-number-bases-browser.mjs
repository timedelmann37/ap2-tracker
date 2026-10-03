import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_BASECALC_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/zahlensysteme-binaer-hex-dezimal-umrechnen/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="ga1-11__12"]').count() === 1, 'Tracker key');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Required checks lock completion');
  await page.locator('[data-quiz="basecalc-diagnose"] [data-answer="1"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not a gate');
  for (const [id, correct] of [['basecalc-nachweis', 0]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Explanatory feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(await done.isDisabled(), 'Numeric gates still lock');
  for (const [id, wrong, correct] of [['binaer', '5', '182'], ['hex', '310', '58'], ['rest', '12', '13,0'], ['breite', '256', '255']]) {
    const n = page.locator('[data-numeric-practice="basecalc-' + id + '"]');
    await n.locator('[data-numeric-input]').fill(wrong);
    await n.locator('[data-numeric-check]').press('Enter');
    assert(await n.locator('[data-numeric-feedback]').getAttribute('data-result') === 'wrong', 'Wrong numeric rejected');
    await n.locator('[data-numeric-input]').fill(correct);
    await n.locator('[data-numeric-check]').press('Enter');
    assert(await n.locator('[data-numeric-feedback]').getAttribute('data-result') === 'correct', 'Correct numeric including comma');
  }
  assert(!await done.isDisabled(), 'All checks unlock');
  assert(await page.locator('math').count() === 3, 'Three semantic formulas');
  assert((await page.locator('math').evaluateAll(nodes => nodes.every(n => n.getAttribute('aria-label')))), 'Formula labels');
  const recall = page.locator('[data-recall="basecalc-transfer"]');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Own recall first');
  await recall.locator('[data-recall-input]').fill('10110110 setzt die Gewichte 128, 32, 16, 4 und 2, Summe 182. Die Nibbles ergeben B und 6; 11 mal 16 plus 6 ergibt denselben Wert. 205 durch 16 ergibt 12 Rest 13; weitere Division ergibt 0 Rest 12. Rückwärts C und D. Ein vorzeichenloses Byte hat 256 Muster von null bis 255. Die Basis bestimmt nicht die Bitbreite.');
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model appears');
  for (const id of ['binaer', 'hex', 'rest', 'breite', 'nachweis']) {
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
  await page.locator('[data-quiz="basecalc-nachweis"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Gate reset locks again');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
      for (const [i, formula] of (await page.locator('.math-display').all()).entries()) {
        await formula.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No math page overflow');
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-math-' + i + '.png') });
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
  assert(Number.parseInt('10110110', 2) === 182 && Number.parseInt('B6', 16) === 182, 'Independent register conversion');
  assert((205).toString(16) === 'cd' && (205).toString(2) === '11001101' && 205 % 16 === 13, 'Independent target conversion');
  assert(errors.length === 0, errors.join('; '));
  console.log('PASS number bases calculation: quizzes, recall, keyboard cards, persistence, completion, responsive diagrams');
} finally { await browser.close(); }

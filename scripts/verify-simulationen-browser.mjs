import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const spec = JSON.parse(await readFile(new URL('../content/learning-units/wiso-zwei-uebungsboegen-unter-zeit.unit.json', import.meta.url), 'utf8'));
const blocks = spec.sections.flatMap(section => section.blocks);
const browser = await chromium.launch();
const captures = process.env.AP2_FINAL_CAPTURE_DIR;
if (captures) await mkdir(captures, { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const url = (process.env.AP2_BASE_URL || 'http://127.0.0.1:4337') + '/lernen/' + spec.meta.slug + '/';
  assert.equal((await page.goto(url))?.status(), 200);
  assert.equal(await page.locator('body').getAttribute('data-progress-id'), 'wiso-9__6');
  const text = await page.locator('article').innerText();
  for (const prefix of ['A', 'B']) {
    for (let i = 1; i <= 24; i++) assert(text.includes(prefix + String(i).padStart(2, '0')), 'Every original question is rendered');
  }
  assert(!text.includes('LÖSUNGSSCHLÜSSEL'), 'Keys are hidden before self-evaluation');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled());
  for (const block of blocks.filter(b => b.type === 'quiz')) {
    const quiz = page.locator('[data-quiz="' + block.id + '"]');
    const correct = block.options.findIndex(o => o.correct);
    await quiz.locator('[data-answer="' + ((correct + 1) % block.options.length) + '"]').press('Enter');
    assert(await done.isDisabled());
    assert((await quiz.locator('[data-selected-feedback]').textContent()).length > 25);
    await quiz.locator('[data-quiz-reset]').press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.dataset.answer), '0', 'Retry focuses first option');
    await quiz.locator('[data-answer="' + correct + '"]').press('Enter');
    if (!block.requiredObjective) assert(await done.isDisabled(), 'Diagnosis does not pass a required goal');
  }
  assert(!await done.isDisabled(), 'Four method checks unlock completion');
  const recall = page.locator('[data-recall]');
  await recall.locator('textarea').fill('x'.repeat(499));
  assert(await recall.locator('[data-recall-reveal]').isDisabled());
  await recall.locator('textarea').fill('x'.repeat(500));
  await recall.locator('[data-recall-reveal]').press('Enter');
  const model = recall.locator('[data-recall-model]');
  assert(await model.isVisible());
  assert.equal((await model.innerText()).match(/\b[AB]\d{2} – [ABCD]:/g)?.length, 48);
  assert(await model.locator('p').count() >= 50, 'Every answer explanation has a semantic paragraph');
  await page.reload();
  assert(!await done.isDisabled(), 'Mastery persists on reload');
  assert.equal(await recall.locator('textarea').inputValue(), 'x'.repeat(500));
  await done.press('Enter');
  assert.equal(await done.getAttribute('aria-pressed'), 'true');
  await done.press('Enter');
  assert.equal(await done.getAttribute('aria-pressed'), 'false');
  await page.locator('[data-quiz="sim-transfer"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Reset locks completion');
  assert.equal(await model.locator('math[aria-label]').count(), 8, 'Eight semantic calculation paths');
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.dataset.theme = t, theme);
      for (const [name, target] of [
        ['start', page.locator('h1')], ['bogen-a', page.locator('#s4')], ['bogen-b', page.locator('#s6')],
        ['feedback', page.locator('[data-quiz="sim-auswertung"]')], ['keys', model],
        ['diagram', page.locator('.learning-figure')], ['cards', page.locator('.flashcard-grid')]
      ]) {
        await target.scrollIntoViewIfNeeded();
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No page overflow');
        if (captures) await page.screenshot({ path: path.join(captures, 'sim-' + width + '-' + theme + '-' + name + '.png') });
      }
      const svg = page.locator('.learning-diagram');
      assert(await svg.locator('text').evaluateAll(nodes => nodes.every(n => {
        const b = n.getBBox(), v = n.ownerSVGElement.viewBox.baseVal;
        return b.x >= 0 && b.x + b.width <= v.width && b.y >= 0 && b.y + b.height <= v.height;
      })), 'SVG labels fit canvas');
      assert(await svg.locator('g').evaluateAll(groups => groups.every(g => {
        const rect = g.querySelector('rect'); if (!rect) return true;
        const r = rect.getBBox();
        return [...g.querySelectorAll('text')].every(t => { const b = t.getBBox(); return b.x >= r.x + 8 && b.x + b.width <= r.x + r.width - 8 && b.y >= r.y && b.y + b.height <= r.y + r.height; });
      })), 'SVG labels fit their boxes');
      for (const card of await page.locator('[data-flashcard]').all()) {
        assert.equal(await card.locator('.back').getAttribute('aria-hidden'), 'true');
        await card.press('Enter');
        assert.equal(await card.locator('.front').getAttribute('aria-hidden'), 'true');
        assert(await card.locator('.back').evaluate(n => { const t = n.querySelector('span:not(.k)').getBoundingClientRect(); return t.top >= n.querySelector('.k').getBoundingClientRect().bottom && t.bottom <= n.getBoundingClientRect().bottom - 8; }), 'Card answer fits');
        await card.press('Space');
      }
    }
  }
  assert.deepEqual(errors, []);
  console.log('PASS simulationen: 48 questions, hidden paragraph keys, feedback, method gates, recall threshold, persistence, cards, SVG and Dark/Light mobile/desktop');
} finally { await browser.close(); }

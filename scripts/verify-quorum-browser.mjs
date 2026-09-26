import { chromium } from 'playwright';

const slug = 'quorum-split-brain-fencing-witness-tiebreaker';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/${slug}/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original diagrams');
  assert(await page.locator('.math-display math').count() === 1, 'Graphical majority formula');

  const numeric = page.locator('[data-numeric-practice="quorum-stimmen"]');
  await numeric.locator('[data-numeric-input]').fill('1');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('ein Drittel'), 'Minority misconception explained');
  await numeric.locator('[data-numeric-input]').fill('2');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Majority accepted');

  const sequence = page.locator('[data-sequence="quorum-uebernahme"]');
  await sequence.locator('[data-step="vote"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('nicht vor'), 'Wrong takeover order rejected');
  await sequence.locator('[data-step="signal"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard takeover order accepted');

  const recall = page.locator('[data-recall="quorum-erklaerung"]');
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Recall model hidden initially');
  await recall.locator('[data-recall-input]').fill('Jede Seite hat ohne Witness nur eine von drei Stimmen und darf nicht als exklusiver Schreiber starten. Ein Doppelstart könnte widersprüchliche Änderungen und beschädigte Daten verursachen. Die Unterbrechung schützt die Datenkonsistenz.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator('[data-quiz="quorum-transfer-a"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong majority answer does not unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="quorum-transfer-b"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="quorum-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('.math-display'), numeric, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS quorum: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

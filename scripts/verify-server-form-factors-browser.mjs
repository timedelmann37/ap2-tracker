import { chromium } from 'playwright';

const slug = 'serverbauformen-tower-rack-blade';
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

  const numeric = page.locator(`[data-numeric-practice="${slug}-zahl"]`);
  await numeric.locator('[data-numeric-input]').fill('5');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('vergessen'), 'Specific wrong feedback');
  await numeric.locator('[data-numeric-input]').fill('3');
  await numeric.locator('[data-numeric-check]').click();
  assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'correct', 'Correct height feedback');

  const sequence = page.locator(`[data-sequence="${slug}-reihenfolge"]`);
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Vor einer Freigabe'), 'Incorrect order rejected');
  for (const step of ['einsatz', 'masse']) {
    await sequence.locator(`[data-step="${step}"] [data-move="up"]`).focus();
    await page.keyboard.press('Enter');
  }
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard ordering accepted');

  const recall = page.locator(`[data-recall="${slug}-begruendung"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Recall answer hidden');
  await recall.locator('[data-recall-input]').fill('Die Höhe passt, die Tiefe samt Kabelraum aber nicht. Schienen und Gewicht müssen separat geprüft werden.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall answer revealed');
  assert(await done.isDisabled(), 'Exercises alone do not unlock');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong transfer does not unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective does not unlock');
  await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="1"]`).click();
  assert(!await done.isDisabled(), 'Two objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator(`[data-flashcard="${slug}-karte-0"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), numeric, page.locator('math').first()]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS server form factors: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

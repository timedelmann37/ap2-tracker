import { chromium } from 'playwright';

const slug = 'server-leistungsindikatoren-cpu-ram-io';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/${slug}/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial learning gate must be closed');

  const numeric = page.locator(`[data-numeric-practice="${slug}-zahl"]`);
  await numeric.locator('[data-numeric-input]').fill('96');
  await numeric.locator('[data-numeric-check]').click();
  assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'wrong', 'Decimal conversion misconception');
  await numeric.locator('[data-numeric-input]').fill('93.75');
  await numeric.locator('[data-numeric-check]').click();
  assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'correct', 'Binary conversion result');

  const recall = page.locator(`[data-recall="${slug}-begruendung"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Model begins hidden');
  await recall.locator('[data-recall-input]').fill('Kerne und IOPS beschreiben nur Teile der Last. Blockgröße, Latenz, Speicherbedarf und Parallelisierbarkeit müssen zur Anwendung passen.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model reveals after response');
  assert(await done.isDisabled(), 'Practice cannot complete objectives');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="0"]').click();
  assert(await done.isDisabled(), 'Wrong answer cannot unlock completion');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="1"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective cannot unlock completion');
  const second = page.locator(`[data-quiz="${slug}-transfer-b"]`);
  await second.locator('[data-answer="2"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock completion');

  const card = page.locator(`[data-flashcard="${slug}-karte-0"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard keyboard access');
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
  console.log(`PASS server indicators: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

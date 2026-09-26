import { chromium } from 'playwright';

const slug = 'windows-server-core-cal-open-source-lizenzen';
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
  assert(await page.locator('math').count() === 1, 'Core formula rendered as MathML');

  const numeric = page.locator(`[data-numeric-practice="${slug}-core-zahl"]`);
  await numeric.locator('[data-numeric-input]').fill('20');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('nur ein Core-Satz'), 'Wrong stacking feedback');
  await numeric.locator('[data-numeric-input]').fill('40');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('40'), 'Correct stacked cores');
  assert(await done.isDisabled(), 'Practice cannot unlock objectives');

  const sequence = page.locator(`[data-sequence="${slug}-pruefweg"]`);
  await sequence.locator('[data-step="nutzung"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Beginne'), 'Wrong license review order rejected');
  await sequence.locator('[data-step="inventar"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard license review accepted');

  const recall = page.locator(`[data-recall="${slug}-begruendung"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Recall model initially hidden');
  await recall.locator('[data-recall-input]').fill('Bei Standard sind drei komplette Core-Sätze für fünf Windows-Server-VMs nötig. Die sechs geteilten Geräte können Device-CALs nahelegen, weitere Zugriffe und RDS müssen geprüft werden. Bei Weitergabe eines GPLv3-Werks prüfe ich Lizenzhinweise und Quellcodepflichten.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="0"]').click();
  assert(await done.isDisabled(), 'Wrong answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="1"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="1"]`).click();
  assert(await done.isDisabled(), 'Two objectives insufficient');
  await page.locator(`[data-quiz="${slug}-transfer-c"] [data-answer="2"]`).click();
  assert(!await done.isDisabled(), 'Three objectives unlock');
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
      for (const element of [page.locator('.learning-figure').first(), page.locator('math'), page.locator('.learning-figure').last(), recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS licensing: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

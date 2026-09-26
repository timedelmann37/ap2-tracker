import { chromium } from 'playwright';

const slug = 'clients-fat-thin-zero-vdi-daas';
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

  const sequence = page.locator(`[data-sequence="${slug}-reihenfolge"]`);
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Beginne'), 'Wrong order rejected');
  for (const step of ['bedarf', 'modell']) {
    await sequence.locator(`[data-step="${step}"] [data-move="up"]`).focus();
    await page.keyboard.press('Enter');
  }
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard order accepted');

  const recall = page.locator(`[data-recall="${slug}-begruendung"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Model initially hidden');
  await recall.locator('[data-recall-input]').fill('Werkstatt braucht lokale Offline-Software am Fat Client. Schulungsraum kann zentrale Desktops nutzen. Peripherie und Netz müssen getestet werden.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model revealed after answer');
  assert(await done.isDisabled(), 'Practice alone does not unlock');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="0"]`).click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
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
      for (const element of [page.locator('.learning-figure').first(), recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS client models: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

import { chromium } from 'playwright';

const slug = 'live-migration-voraussetzungen-wartung-shared-nothing';
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
  assert(await page.locator('.learning-figure').count() === 2, 'Storage-path and maintenance diagrams');
  assert(await page.locator('.math-display math').count() === 1, 'Target RAM graphically rendered');

  const numeric = page.locator(`[data-numeric-practice="${slug}-ziel-ram"]`);
  await numeric.locator('[data-numeric-input]').fill('32');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).toLowerCase().includes('reserve'), 'Omitted reserve explained');
  await numeric.locator('[data-numeric-input]').fill('16');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Target RAM accepted');

  const sequence = page.locator(`[data-sequence="${slug}-ablauf"]`);
  await sequence.locator('[data-step="umziehen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Zuerst'), 'Wrong maintenance order rejected');
  await sequence.locator('[data-step="pruefen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard maintenance order accepted');

  const recall = page.locator(`[data-recall="${slug}-plan"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Recall model initially hidden');
  await recall.locator('[data-recall-input]').fill('Vor der geplanten Migration prüfe ich CPU-Feature-Kompatibilität, verfügbare Ressourcen und Platz am Ziel sowie das Migrationsnetz. Danach teste ich den Dienst auf Host B und beginne erst dann die Wartung von A. Für einen plötzlichen Ausfall brauche ich zusätzlich ein Failover-Konzept.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="2"]').click();
  assert(await done.isDisabled(), 'Shared-storage misconception cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="1"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="0"]`).click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator(`[data-flashcard="${slug}-karte-1"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard shared-storage card');

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
  console.log(`PASS live migration: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

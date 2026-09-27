import { chromium } from 'playwright';

const slug = 'vorteile-nachteile-virtualisierung-konsolidierung-snapshots-isolation';
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
  assert(await page.locator('.learning-figure').count() === 2, 'Two original trade-off diagrams');
  assert(await page.locator('.math-display math').count() === 1, 'RAM calculation rendered graphically');

  const numeric = page.locator(`[data-numeric-practice="${slug}-ram"]`);
  await numeric.locator('[data-numeric-input]').fill('30');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('Hostbedarf'), 'VM-only RAM error explained');
  await numeric.locator('[data-numeric-input]').fill('36');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'RAM calculation accepted');

  const sequence = page.locator(`[data-sequence="${slug}-entscheidung"]`);
  await sequence.locator('[data-step="architektur"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Beginne'), 'Wrong planning order rejected');
  await sequence.locator('[data-step="bedarf"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard planning order accepted');

  const recall = page.locator(`[data-recall="${slug}-begruendung"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Recall model hidden initially');
  await recall.locator('[data-recall-input]').fill('Die vier VMs teilen sich den einen physischen Host und dessen Ausfallrisiko. Ich brauche ein getrenntes Backup mit Restore-Test, außerdem einen Kapazitätsnachweis mit Reserven und die konkrete Lizenzprüfung für Host und Gäste.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="0"]').click();
  assert(await done.isDisabled(), 'Wrong failure-domain answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="1"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="1"]`).click();
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
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), numeric, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS virtualization trade-offs: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

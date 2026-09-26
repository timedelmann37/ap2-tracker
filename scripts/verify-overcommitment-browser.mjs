import { chromium } from 'playwright';

const slug = 'overcommitment-cpu-ram-ballooning-thin-thick';
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
  assert(await page.locator('.learning-figure').count() === 2, 'Two original capacity diagrams');
  assert(await page.locator('.math-display math').count() === 2, 'Both formulas graphically rendered');

  const cpu = page.locator(`[data-numeric-practice="${slug}-cpu-quote"]`);
  await cpu.locator('[data-numeric-input]').fill('12');
  await cpu.locator('[data-numeric-check]').click();
  assert((await cpu.locator('[data-numeric-feedback]').textContent()).includes('Summe'), 'CPU sum misconception explained');
  await cpu.locator('[data-numeric-input]').fill('2');
  await cpu.locator('[data-numeric-check]').click();
  assert((await cpu.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'CPU ratio accepted');

  const disk = page.locator(`[data-numeric-practice="${slug}-disk-frei"]`);
  await disk.locator('[data-numeric-input]').fill('-300');
  await disk.locator('[data-numeric-check]').click();
  assert((await disk.locator('[data-numeric-feedback]').textContent()).includes('logische'), 'Logical versus physical error explained');
  await disk.locator('[data-numeric-input]').fill('200');
  await disk.locator('[data-numeric-check]').click();
  assert((await disk.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Physical free space accepted');

  const sequence = page.locator(`[data-sequence="${slug}-pruefweg"]`);
  await sequence.locator('[data-step="spitzen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Beginne'), 'Wrong order rejected');
  await sequence.locator('[data-step="messen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard order accepted');

  const recall = page.locator(`[data-recall="${slug}-begruendung"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Recall model initially hidden');
  await recall.locator('[data-recall-input]').fill('CPU-Zeit wird unter gleichzeitig ausgelasteten Gästen knapp. Benötigen die Gäste zugleich ihren gesamten RAM, kann Ballooning den Bedarf nicht wegzaubern. Thin Disks belegen mit jedem Schreibvorgang mehr reale Blöcke; der Datastore kann voll werden.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="0"]').click();
  assert(await done.isDisabled(), 'Wrong answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="1"]').focus();
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
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('.math-display').first(), page.locator('.math-display').last(), disk, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS overcommitment: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

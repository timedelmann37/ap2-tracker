import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/make-or-buy-kauf-leasing-miete/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original decision diagrams');
  assert(await page.locator('math').count() === 3, 'Three semantic visual formulas');

  const diagnosis = page.locator('[data-quiz="mb-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('andere'), 'Decision-layer feedback');

  const make = page.locator('[data-numeric-practice="mb-make-drei-jahre"]');
  await make.locator('[data-numeric-input]').fill('21000');
  await make.locator('[data-numeric-check]').click();
  assert((await make.locator('[data-numeric-feedback]').textContent()).includes('ein Pflegejahr'), 'Time-horizon feedback');
  await make.locator('[data-numeric-input]').fill('27000');
  await make.locator('[data-numeric-check]').click();
  assert((await make.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Make TCO accepted');

  const lease = page.locator('[data-numeric-practice="mb-leasing-36"]');
  await lease.locator('[data-numeric-input]').fill('6600');
  await lease.locator('[data-numeric-check]').click();
  assert((await lease.locator('[data-numeric-feedback]').textContent()).includes('zwölf'), 'Contract-horizon feedback');
  await lease.locator('[data-numeric-input]').fill('19800');
  await lease.locator('[data-numeric-check]').click();
  assert((await lease.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Full lease term accepted');

  const rent = page.locator('[data-numeric-practice="mb-miete-acht"]');
  await rent.locator('[data-numeric-input]').fill('25200');
  await rent.locator('[data-numeric-check]').click();
  assert((await rent.locator('[data-numeric-feedback]').textContent()).includes('36 Monate'), 'Short-horizon feedback');
  await rent.locator('[data-numeric-input]').fill('5600');
  await rent.locator('[data-numeric-check]').click();
  assert((await rent.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Eight-month rent accepted');

  const recall = page.locator('[data-recall="mb-entscheidung"]');
  await recall.locator('[data-recall-input]').fill('Make-or-Buy entscheidet über Eigenentwicklung oder fertige Software. In den fiktiven drei Jahren kostet Make 27.000 Euro und Buy 30.000 Euro, aber auch Zeit und Integration zählen. Die Appliance ist eine zweite Entscheidung: Kauf, Leasing und Miete unterscheiden sich in Startzahlung, Laufzeit und Rückgabe. Wenn der Bedarf nur acht Monate dauert, kann die monatlich kündbare Miete passen. Vertrag und Restwert müssen geprüft werden.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Decision model revealed');

  const first = page.locator('[data-quiz="mb-make-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong gate cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="mb-vertrag-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');
  const card = page.locator('[data-flashcard="mb-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('math').first(), page.locator('math').last(), lease, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} document overflow`);
        assert(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme} element overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS Make-or-Buy: make-or-buy-kauf-leasing-miete');
} finally {
  await browser.close();
}

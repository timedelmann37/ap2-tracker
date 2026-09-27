import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/break-even-cloud-onprem-kostenvergleich/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original cost diagrams');
  assert(await page.locator('math').count() === 3, 'Three semantic visual formulas');

  const diagnosis = page.locator('[data-quiz="be-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('Kostendifferenz'), 'Start-price misconception feedback');

  const crossing = page.locator('[data-numeric-practice="be-schnittpunkt"]');
  await crossing.locator('[data-numeric-input]').fill('3');
  await crossing.locator('[data-numeric-check]').click();
  assert((await crossing.locator('[data-numeric-feedback]').textContent()).includes('3.000'), 'Annual-difference misconception feedback');
  await crossing.locator('[data-numeric-input]').fill('4');
  await crossing.locator('[data-numeric-check]').click();
  assert((await crossing.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Four-year crossing accepted');

  const three = page.locator('[data-numeric-practice="be-drei-jahre"]');
  await three.locator('[data-numeric-input]').fill('3000');
  await three.locator('[data-numeric-check]').click();
  assert((await three.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Three-year advantage accepted');

  const sensitivity = page.locator('[data-numeric-practice="be-sechs-jahre"]');
  await sensitivity.locator('[data-numeric-input]').fill('4');
  await sensitivity.locator('[data-numeric-check]').click();
  assert((await sensitivity.locator('[data-numeric-feedback]').textContent()).includes('Jahressatz'), 'Changed-rate misconception feedback');
  await sensitivity.locator('[data-numeric-input]').fill('6');
  await sensitivity.locator('[data-numeric-check]').click();
  assert((await sensitivity.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Six-year crossing accepted');

  const recall = page.locator('[data-recall="be-kranich-deutung"]');
  await recall.locator('[data-recall-input]').fill('Im fiktiven Fall sind nach vier Jahren die kumulierten Kosten gleich. Davor ist die Cloud günstiger, danach der lokale Server, sofern die jährlichen Kosten unverändert bleiben. Das ist keine Gewinnschwelle. Steigen die Cloudpreise oder ist früher Ersatzhardware nötig, ändert sich der Schnittpunkt.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Cost interpretation model revealed');

  const first = page.locator('[data-quiz="be-funktionen-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong objective answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="be-deutung-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="be-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('math').first(), page.locator('math').last(), crossing, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} document overflow`);
        assert(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme} element overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS Break-even: break-even-cloud-onprem-kostenvergleich');
} finally {
  await browser.close();
}

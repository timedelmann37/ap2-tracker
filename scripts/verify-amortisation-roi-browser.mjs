import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/amortisation-roi-kostenvergleich-it-investition/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original finance diagrams');
  assert(await page.locator('math').count() === 3, 'Three semantic visual formulas');

  const diagnosis = page.locator('[data-quiz="ar-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('Investitionsbetrag'), 'Diagnostic feedback');

  const costs = page.locator('[data-numeric-practice="ar-kosten-drei-jahre"]');
  await costs.locator('[data-numeric-input]').fill('45000');
  await costs.locator('[data-numeric-check]').click();
  assert((await costs.locator('[data-numeric-feedback]').textContent()).includes('Einführung fehlen'), 'Missing-upfront feedback');
  await costs.locator('[data-numeric-input]').fill('57000');
  await costs.locator('[data-numeric-check]').click();
  assert((await costs.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Three-year costs accepted');

  const payback = page.locator('[data-numeric-practice="ar-amortisation-monate"]');
  await payback.locator('[data-numeric-input]').fill('1.333');
  await payback.locator('[data-numeric-check]').click();
  assert((await payback.locator('[data-numeric-feedback]').textContent()).includes('Jahre'), 'Years-vs-months feedback');
  await payback.locator('[data-numeric-input]').fill('16');
  await payback.locator('[data-numeric-check]').click();
  assert((await payback.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Payback months accepted');

  const roi = page.locator('[data-numeric-practice="ar-roi-drei-jahre"]');
  await roi.locator('[data-numeric-input]').fill('225');
  await roi.locator('[data-numeric-check]').click();
  assert((await roi.locator('[data-numeric-feedback]').textContent()).includes('ohne Abzug'), 'Gross-vs-net feedback');
  await roi.locator('[data-numeric-input]').fill('125');
  await roi.locator('[data-numeric-check]').click();
  assert((await roi.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Three-year ROI accepted');

  const recall = page.locator('[data-recall="ar-entscheidung"]');
  await recall.locator('[data-recall-input]').fill('Über drei Jahre kostet der Weiterbetrieb 72.000 Euro und die neue Variante 57.000 Euro. Die Einführung ist bei gleichmäßig verteilter Ersparnis nach 16 Monaten ausgeglichen. Der vereinfachte ROI beträgt 125 Prozent über drei Jahre, nicht jährlich. Tatsächliche Preise und Zahlungszeitpunkte können abweichen, daher muss Kranich die Annahmen prüfen.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator('[data-quiz="ar-rechnung-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="ar-roi-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="ar-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('math').first(), page.locator('math').last(), costs, roi, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} document overflow`);
        assert(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme} element overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS Amortisation/ROI: amortisation-roi-kostenvergleich-it-investition');
} finally {
  await browser.close();
}

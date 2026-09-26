import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/tco-vierjahresrechnung-kostenarten/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original TCO diagrams');
  assert(await page.locator('math').count() === 4, 'Four visual semantic MathML formulas');

  const diagnosis = page.locator('[data-quiz="tco-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('Betrieb'), 'Purchase-price misconception feedback');

  const four = page.locator('[data-numeric-practice="tco-vier-jahre"]');
  await four.locator('[data-numeric-input]').fill('28000');
  await four.locator('[data-numeric-check]').click();
  assert((await four.locator('[data-numeric-feedback]').textContent()).includes('Einmalkosten fehlen'), 'Missing-upfront-cost misconception');
  await four.locator('[data-numeric-input]').fill('42000');
  await four.locator('[data-numeric-check]').click();
  assert((await four.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Four-year total accepted');

  const five = page.locator('[data-numeric-practice="tco-fuenf-jahre"]');
  await five.locator('[data-numeric-input]').fill('49000');
  await five.locator('[data-numeric-check]').click();
  assert((await five.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Five-year total accepted');

  const sensitivity = page.locator('[data-numeric-practice="tco-strom-sensitivitaet"]');
  await sensitivity.locator('[data-numeric-input]').fill('225');
  await sensitivity.locator('[data-numeric-check]').click();
  assert((await sensitivity.locator('[data-numeric-feedback]').textContent()).includes('ein Jahr'), 'Annual-only misconception');
  await sensitivity.locator('[data-numeric-input]').fill('900');
  await sensitivity.locator('[data-numeric-check]').click();
  assert((await sensitivity.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Four-year sensitivity accepted');

  const recall = page.locator('[data-recall="tco-modellgrenze"]');
  await recall.locator('[data-recall-input]').fill('Ich erfasse Hardware und Einrichtung einmalig. Lizenzen, externe Wartung, interne Arbeitszeit, IT-Strom und den getrennten Raum- und Kühlanteil rechne ich als jährliche Beträge. Für einen echten Vergleich müssen beide Varianten denselben Dienst über denselben Zeitraum bieten. Außerdem prüfe ich, ob Personal und Wartung doppelt gezählt sind und ob Restwert, Preisänderungen, Ersatzhardware oder Migration fehlen.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'TCO model revealed');

  const first = page.locator('[data-quiz="tco-arten-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong objective answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="tco-rechnung-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="tco-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('math').first(), page.locator('math').last(), four, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS TCO: tco-vierjahresrechnung-kostenarten');
} finally {
  await browser.close();
}

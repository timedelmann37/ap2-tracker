import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/angebotsvergleich-rabatt-skonto-bezugspreis/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original offer diagrams');
  assert(await page.locator('math').count() === 3, 'Three semantic visual formulas');

  const diagnosis = page.locator('[data-quiz="av-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('Nachlässe'), 'List-price misconception feedback');

  const atlas = page.locator('[data-numeric-practice="av-atlas-ziel"]');
  await atlas.locator('[data-numeric-input]').fill('200');
  await atlas.locator('[data-numeric-check]').click();
  assert((await atlas.locator('[data-numeric-feedback]').textContent()).includes('Rabattbetrag'), 'Discount-amount feedback');
  await atlas.locator('[data-numeric-input]').fill('1800');
  await atlas.locator('[data-numeric-check]').click();
  assert((await atlas.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Discounted price accepted');

  const skonto = page.locator('[data-numeric-practice="av-boreal-skonto"]');
  await skonto.locator('[data-numeric-input]').fill('57');
  await skonto.locator('[data-numeric-check]').click();
  assert((await skonto.locator('[data-numeric-feedback]').textContent()).includes('Listenpreis'), 'Wrong skonto base feedback');
  await skonto.locator('[data-numeric-input]').fill('54,15');
  await skonto.locator('[data-numeric-check]').click();
  assert((await skonto.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Skonto accepted');

  const boreal = page.locator('[data-numeric-practice="av-boreal-bezug"]');
  await boreal.locator('[data-numeric-input]').fill('1750,85');
  await boreal.locator('[data-numeric-check]').click();
  assert((await boreal.locator('[data-numeric-feedback]').textContent()).includes('Fracht'), 'Missing freight feedback');
  await boreal.locator('[data-numeric-input]').fill('1835,85');
  await boreal.locator('[data-numeric-check]').click();
  assert((await boreal.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Landed cost accepted');

  const without = page.locator('[data-numeric-practice="av-ohne-skonto"]');
  await without.locator('[data-numeric-input]').fill('1835,85');
  await without.locator('[data-numeric-check]').click();
  assert((await without.locator('[data-numeric-feedback]').textContent()).includes('genutztem Skonto'), 'Conditional discount feedback');
  await without.locator('[data-numeric-input]').fill('1890');
  await without.locator('[data-numeric-check]').click();
  assert((await without.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'No-skonto cost accepted');

  const recall = page.locator('[data-recall="av-empfehlung"]');
  await recall.locator('[data-recall-input]').fill('Wenn Kranich fristgerecht zahlen kann, ist Boreal für die zehn gleichen Geräte mit 1.835,85 Euro Bezugspreis günstiger. Ohne Skonto ist Atlas mit 1.880 Euro vor Boreal mit 1.890 Euro. Ich ziehe Rabatt und Skonto nacheinander vom jeweiligen Warenwert ab und addiere Fracht erst danach. Vor der Bestellung prüfe ich die Zahlungsfrist und die Gleichwertigkeit der Lieferung.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recommendation model revealed');

  const first = page.locator('[data-quiz="av-rechnung-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong gate cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="av-deutung-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');
  const card = page.locator('[data-flashcard="av-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('math').first(), page.locator('math').last(), boreal, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} document overflow`);
        assert(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme} element overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS Angebotsvergleich: angebotsvergleich-rabatt-skonto-bezugspreis');
} finally {
  await browser.close();
}

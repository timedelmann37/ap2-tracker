import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/nutzwertanalyse-kriterien-gewichten-entscheiden/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original decision diagrams');
  assert(await page.locator('math').count() === 2, 'Two semantic visual formulas');

  const diagnosis = page.locator('[data-quiz="nw-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('K.-o.-Kriterium'), 'KO misconception feedback');

  const weight = page.locator('[data-numeric-practice="nw-gewichtssumme"]');
  await weight.locator('[data-numeric-input]').fill('1');
  await weight.locator('[data-numeric-check]').click();
  assert((await weight.locator('[data-numeric-feedback]').textContent()).includes('Dezimalzahl'), 'Percent-vs-factor feedback');
  await weight.locator('[data-numeric-input]').fill('100');
  await weight.locator('[data-numeric-check]').click();
  assert((await weight.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Weight sum accepted');

  const boreal = page.locator('[data-numeric-practice="nw-boreal"]');
  await boreal.locator('[data-numeric-input]').fill('12');
  await boreal.locator('[data-numeric-check]').click();
  assert((await boreal.locator('[data-numeric-feedback]').textContent()).includes('ungewichtete'), 'Unweighted score feedback');
  await boreal.locator('[data-numeric-input]').fill('3,85');
  await boreal.locator('[data-numeric-check]').click();
  assert((await boreal.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Weighted score accepted');

  const sensitivity = page.locator('[data-numeric-practice="nw-sensitivitaet"]');
  await sensitivity.locator('[data-numeric-input]').fill('3,55');
  await sensitivity.locator('[data-numeric-check]').click();
  assert((await sensitivity.locator('[data-numeric-feedback]').textContent()).includes('alten Gewichten'), 'Old-weight feedback');
  await sensitivity.locator('[data-numeric-input]').fill('4');
  await sensitivity.locator('[data-numeric-check]').click();
  assert((await sensitivity.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Sensitivity accepted');

  const recall = page.locator('[data-recall="nw-entscheidung"]');
  await recall.locator('[data-recall-input]').fill('Boreal liegt im Grundfall mit 3,85 vor Atlas mit 3,55 gewichteten Punkten. Die Ticket-Schnittstelle ist für beide verpflichtend und darf nicht durch andere Punkte ausgeglichen werden. Wird Alarmqualität fachlich begründet stärker gewichtet, führt Atlas. Ich würde die Testbelege und Gewichtungen dokumentieren und Kosten gesondert vergleichen.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Decision model revealed');

  const first = page.locator('[data-quiz="nw-rechnung-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong gate answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="nw-deutung-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');
  const card = page.locator('[data-flashcard="nw-karte-0"]');
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
  console.log('PASS Nutzwertanalyse: nutzwertanalyse-kriterien-gewichten-entscheiden');
} finally {
  await browser.close();
}

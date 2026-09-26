import { chromium } from 'playwright';

const slug = 'reihen-und-parallelschaltung-verfuegbarkeit';
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
  assert(await page.locator('.learning-figure').count() === 2, 'Two original diagrams');
  assert(await page.locator('.math-display math').count() === 2, 'Two graphical formulas');

  const series = page.locator('[data-numeric-practice="reihen-verfuegbarkeit"]');
  await series.locator('[data-numeric-input]').fill('99.99');
  await series.locator('[data-numeric-check]').click();
  assert((await series.locator('[data-numeric-feedback]').textContent()).includes('alternativer Pfade'), 'Topology misconception explained');
  await series.locator('[data-numeric-input]').fill('98.01');
  await series.locator('[data-numeric-check]').click();
  assert((await series.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Series result accepted');

  const parallel = page.locator('[data-numeric-practice="parallel-verfuegbarkeit"]');
  await parallel.locator('[data-numeric-input]').fill('99.99');
  await parallel.locator('[data-numeric-check]').click();
  assert((await parallel.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Parallel result accepted');

  const sequence = page.locator('[data-sequence="reihen-parallel-pruefweg"]');
  await sequence.locator('[data-step="alternativen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Zeichne zuerst'), 'Wrong architecture order rejected');
  await sequence.locator('[data-step="funktion"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard order accepted');

  const recall = page.locator('[data-recall="reihen-parallel-begruendung"]');
  await recall.locator('[data-recall-input]').fill('Die Webserver sind nur unter unabhängigen Fehlern und voller Restkapazität parallel. Beide brauchen aber dieselbe einzelne Datenbank. Deren Ausfall stoppt die Nutzerfunktion unabhängig von den Webservern. Auch ein gemeinsamer Switch oder eine fehlgeschlagene Umschaltung widerlegt die einfache Modellrechnung.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator('[data-quiz="reihen-parallel-transfer-a"]');
  await first.locator('[data-answer="0"]').click();
  assert(await done.isDisabled(), 'Wrong probability answer does not unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="1"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="reihen-parallel-transfer-b"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="reihen-parallel-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('.math-display').first(), page.locator('.math-display').last(), series, parallel]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS series and parallel: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

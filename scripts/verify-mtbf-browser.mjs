import { chromium } from 'playwright';

const slug = 'mtbf-mttr-verfuegbarkeit';
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

  const mttr = page.locator('[data-numeric-practice="mtbf-mttr-rechnen"]');
  await mttr.locator('[data-numeric-input]').fill('6');
  await mttr.locator('[data-numeric-check]').click();
  assert((await mttr.locator('[data-numeric-feedback]').textContent()).includes('gesamte Downtime'), 'Sum misconception explained');
  await mttr.locator('[data-numeric-input]').fill('2');
  await mttr.locator('[data-numeric-check]').click();
  assert((await mttr.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Mean repair accepted');

  const availability = page.locator('[data-numeric-practice="mtbf-verfuegbarkeit"]');
  await availability.locator('[data-numeric-input]').fill('99.17');
  await availability.locator('[data-numeric-check]').click();
  assert((await availability.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Availability percent accepted');

  const sequence = page.locator('[data-sequence="mtbf-rechenweg"]');
  await sequence.locator('[data-step="teilen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Messfenster'), 'Wrong measurement order rejected');
  await sequence.locator('[data-step="abgrenzen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard order accepted');

  const recall = page.locator('[data-recall="mtbf-erklaerung"]');
  await recall.locator('[data-recall-input]').fill('MTBF beschreibt die verfügbare Betriebszeit zwischen Ausfällen, MTTR die durchschnittliche Unterbrechung bis zum wieder nutzbaren Dienst. Bei gleicher MTBF führt eine kürzere MTTR zu einem größeren Anteil verfügbarer Zeit. Die Fehlerhäufigkeit ändert sich dadurch nicht automatisch.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator('[data-quiz="mtbf-transfer-a"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong metric answer does not unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="mtbf-transfer-b"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="mtbf-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('.math-display').first(), page.locator('.math-display').last(), mttr, availability]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS MTBF and MTTR: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

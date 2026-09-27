import { chromium } from 'playwright';

const slug = 'verfuegbarkeit-ausfallzeit-jahr-monat';
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

  const month = page.locator('[data-numeric-practice="verfuegbarkeit-monat"]');
  await month.locator('[data-numeric-input]').fill('262.8');
  await month.locator('[data-numeric-check]').click();
  assert((await month.locator('[data-numeric-feedback]').textContent()).includes('365-Tage-Jahr'), 'Period misconception explained');
  await month.locator('[data-numeric-input]').fill('21.6');
  await month.locator('[data-numeric-check]').click();
  assert((await month.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), '30-day month accepted');

  const year = page.locator('[data-numeric-practice="verfuegbarkeit-jahr"]');
  await year.locator('[data-numeric-input]').fill('52.56');
  await year.locator('[data-numeric-check]').click();
  assert((await year.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), '365-day year accepted');

  const sequence = page.locator('[data-sequence="verfuegbarkeit-rechenweg"]');
  await sequence.locator('[data-step="anteil"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Zeitbasis'), 'Wrong calculation order rejected');
  await sequence.locator('[data-step="periode"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard order accepted');

  const recall = page.locator('[data-recall="verfuegbarkeit-begruendung"]');
  await recall.locator('[data-recall-input]').fill('Ich frage nach der Messperiode, der vereinbarten Servicezeit und der Definition eines Ausfalls aus Nutzersicht. Zusätzlich muss ich wissen, ob geplante Wartung berücksichtigt wird und wie Teilausfälle zählen.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator('[data-quiz="verfuegbarkeit-transfer-a"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong annual answer does not unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="verfuegbarkeit-transfer-b"] [data-answer="1"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="verfuegbarkeit-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('.math-display').first(), page.locator('.math-display').last(), month, year]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS availability percent: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

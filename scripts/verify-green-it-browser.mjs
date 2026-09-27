import { chromium } from 'playwright';

const slug = 'green-it-pue-lebenszyklus-refurbishing';
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
  assert(await page.locator('math').count() === 2, 'Two formulas rendered as MathML');

  const pue = page.locator(`[data-numeric-practice="${slug}-pue-zahl"]`);
  await pue.locator('[data-numeric-input]').fill('240');
  await pue.locator('[data-numeric-check]').click();
  assert((await pue.locator('[data-numeric-feedback]').textContent()).includes('Differenz'), 'PUE versus overhead feedback');
  await pue.locator('[data-numeric-input]').fill('1.4');
  await pue.locator('[data-numeric-check]').click();
  assert((await pue.locator('[data-numeric-feedback]').textContent()).includes('1,4'), 'Correct PUE feedback');

  const cost = page.locator(`[data-numeric-practice="${slug}-kosten-zahl"]`);
  await cost.locator('[data-numeric-input]').fill('764.8');
  await cost.locator('[data-numeric-check]').click();
  assert((await cost.locator('[data-numeric-feedback]').textContent()).includes('Kaufpreis'), 'Cost scope feedback');
  await cost.locator('[data-numeric-input]').fill('64.8');
  await cost.locator('[data-numeric-check]').click();
  assert((await cost.locator('[data-numeric-feedback]').textContent()).includes('64,80'), 'Correct running cost');
  assert(await done.isDisabled(), 'Practice cannot unlock objectives');

  const sequence = page.locator(`[data-sequence="${slug}-entscheidung"]`);
  await sequence.locator('[data-step="optionen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Starte'), 'Wrong procurement order rejected');
  await sequence.locator('[data-step="bedarf"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard procurement order accepted');

  const recall = page.locator(`[data-recall="${slug}-begruendung"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Recall model initially hidden');
  await recall.locator('[data-recall-input]').fill('Die Kauf- und Stromkosten sprechen im Modell für refurbished. Vor der Entscheidung prüfe ich Betriebssystem-Updates, Hardwarezustand, Ersatzteile und Gewährleistung. Für eine vollständige Umweltbilanz fehlen Herstellungsdaten.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="2"]').click();
  assert(await done.isDisabled(), 'Wrong answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="1"]`).click();
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
      for (const element of [page.locator('.learning-figure').first(), page.locator('math').first(), page.locator('.learning-figure').last(), page.locator('math').last(), recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS green IT: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

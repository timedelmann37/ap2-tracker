import { chromium } from 'playwright';

const slug = 'sla-servicezeiten-reaktion-wiederherstellung';
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
  assert(await page.locator('.math-display math').count() === 1, 'Graphical credit calculation');

  const numeric = page.locator('[data-numeric-practice="sla-gutschrift"]');
  await numeric.locator('[data-numeric-input]').fill('8');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('1 %'), 'Percent misconception explained');
  await numeric.locator('[data-numeric-input]').fill('80');
  await numeric.locator('[data-numeric-check]').click();
  assert((await numeric.locator('[data-numeric-feedback]').textContent()).includes('Richtig'), 'Contractual credit accepted');

  const sequence = page.locator('[data-sequence="sla-pruefweg"]');
  await sequence.locator('[data-step="zeiten"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Dienst- und Messdefinition'), 'Wrong SLA order rejected');
  await sequence.locator('[data-step="dienst"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard SLA order accepted');

  const recall = page.locator('[data-recall="sla-begruendung"]');
  await recall.locator('[data-recall-input]').fill('Ich prüfe, ob die Verfügbarkeit rund um die Uhr aus Nutzersicht gemessen wird oder nur in den Servicezeiten. Außerdem kläre ich Rufbereitschaft und Reaktions- und Wiederherstellungsfristen am Wochenende. Schließlich müssen Wartungsausnahmen, Eskalation und vertragliche Folgen konkret angegeben sein.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator('[data-quiz="sla-transfer-a"]');
  await first.locator('[data-answer="0"]').click();
  assert(await done.isDisabled(), 'Wrong response deadline does not unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="1"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="sla-transfer-b"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="sla-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), page.locator('.math-display'), numeric, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS SLA: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

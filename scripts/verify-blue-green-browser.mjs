import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/blue-green-deployment-traffic-switch/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 3, 'Two network diagrams and one release diagram');

  const diagnosis = page.locator('[data-quiz="bg-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('50:50'), 'Traffic split misconception feedback');

  const sequence = page.locator('[data-sequence="bg-releasefolge"]');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Testen'), 'Switch-before-test rejected');
  await sequence.locator('[data-step="green"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard release order accepted');

  const recall = page.locator('[data-recall="bg-taktwerk-erklaerung"]');
  await recall.locator('[data-recall-input]').fill('Vorher sendet die Kundschaft Bestellungen an den Loadbalancer, der sie zu Blue Version 1 weiterleitet. Green Version 2 steht als Testziel bereit und muss vorab den Bestellweg sowie den Health Check bestehen. Danach schaltet das Team den Produktivpfad auf Green und beobachtet Fehlerrate und Antwortzeit. Für einen Rückschwenk muss Blue gesund und mit den inzwischen geschriebenen Daten sowie dem Datenbankschema kompatibel sein.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Diagram explanation model revealed');

  const first = page.locator('[data-quiz="bg-pfad-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong objective answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="bg-rollback-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="bg-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').nth(1), sequence, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS blue-green: blue-green-deployment-traffic-switch');
} finally {
  await browser.close();
}

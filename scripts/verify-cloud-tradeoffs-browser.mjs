import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/cloud-vorteile-nachteile-entscheiden/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 3, 'Three readable tradeoff diagrams');

  const diagnosis = page.locator('[data-quiz="cloud-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('Grundlast'), 'Cost misconception feedback');

  const sequence = page.locator('[data-sequence="cloud-entscheidungsfolge"]');
  await sequence.locator('[data-step="messen"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Beginne'), 'Wrong decision order rejected');
  await sequence.locator('[data-step="bedarf"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Genau'), 'Keyboard decision order accepted');

  const recall = page.locator('[data-recall="cloud-feldmarkt-recall"]');
  await recall.locator('[data-recall-input]').fill('Für den saisonalen Shop prüfe ich die elastische Cloud anhand der Lastkurve und aller Kosten. Ein Exporttest könnte Lock-in aufdecken. Für die Steuerung prüfe ich zuerst die gemessene Zeitgrenze, WAN-Ausfall und eine lokale Variante. Bei beiden erfasse ich Datenflüsse und Verantwortlichkeiten. Wenn Messwerte oder Verträge anders ausfallen, kann die Empfehlung anders ausfallen.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Transfer model revealed');

  const first = page.locator('[data-quiz="cloud-hebel-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong objective answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="cloud-fall-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="cloud-hebel-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), sequence, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS cloud tradeoffs: cloud-vorteile-nachteile-entscheiden');
} finally {
  await browser.close();
}

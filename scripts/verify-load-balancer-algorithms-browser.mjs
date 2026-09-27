import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/load-balancer-algorithmen-auswaehlen/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 3, 'Three original algorithm diagrams');

  const diagnosis = page.locator('[data-quiz="lb-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('keine zyklische Reihenfolge'), 'Round Robin misconception feedback');

  const sequence = page.locator('[data-sequence="lb-entscheidung"]');
  await sequence.locator('[data-step="pool"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('erst nach'), 'Wrong selection order rejected');
  await sequence.locator('[data-step="bedarf"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard selection order accepted');

  const recall = page.locator('[data-recall="lb-nordtor-transfer"]');
  await recall.locator('[data-recall-input]').fill('Für den kurzen Katalog passt zunächst Round Robin, doch verschiedene Antwortzeiten können die Last verschieben. Für lange Analyseverbindungen prüfe ich Least Connections, obwohl die Zahl der Verbindungen nicht alle Rechenkosten zeigt. Für den alten Warenkorb kann IP-Hashing vorübergehend helfen. Nutzer hinter Firmen-NAT teilen eine sichtbare IP und ein Backendausfall kann lokale Sitzungen verlieren. Deshalb braucht die Anwendung einen gemeinsamen Sitzungszustand. Alle Ziele benötigen Health Checks.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Algorithm model revealed');

  const first = page.locator('[data-quiz="lb-verfahren-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong objective answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="lb-wahl-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="lb-karte-0"]');
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
  console.log('PASS load balancer algorithms: load-balancer-algorithmen-auswaehlen');
} finally {
  await browser.close();
}

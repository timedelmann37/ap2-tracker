import { chromium } from 'playwright';

const slug = 'cloud-bereitstellungsmodelle';
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
  assert(await page.locator('.learning-figure').count() === 2, 'Two original deployment diagrams');

  const diagnosis = page.locator('[data-quiz="deployment-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('exklusives Angebot'), 'Private cloud misconception feedback');

  const sequence = page.locator('[data-sequence="deployment-pruefpfad"]');
  await sequence.locator('[data-step="kreis"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Vor Hybrid'), 'Wrong classification order rejected');
  await sequence.locator('[data-step="cloud"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard classification order accepted');

  const recall = page.locator('[data-recall="deployment-hafenwerk"]');
  await recall.locator('[data-recall-input]').fill('Der klassische Server im Keller ist on-premises, aber nicht automatisch eine Cloud. Die exklusiv gehostete Plattform ist Private Cloud; ein allgemein angebotenes Konto ist Public Cloud. Zwei unterschiedliche Anbieter machen den Aufbau Multi-Cloud. Werden Private und Public Cloud für Verlagerung eines Workloads technisch verbunden, ist der Teil nach NIST hybrid. Damit können Hybrid und Multi-Cloud zugleich zutreffen, weil Anbieterzahl und Verbindung unterschiedliche Fragen sind.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Classification model revealed');

  const first = page.locator('[data-quiz="deployment-transfer-kreis"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong objective answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="deployment-transfer-kombi"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="deployment-karte-0"]');
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
  console.log(`PASS cloud deployment models: ${slug}`);
} finally {
  await browser.close();
}

import { chromium } from 'playwright';

const slug = 'iaas-paas-saas-verantwortung';
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
  assert(await page.locator('.learning-figure').count() === 2, 'Two original cloud diagrams');
  assert((await page.locator('.learning-figure').last().textContent()).includes('Lesematrix'), 'Responsibility matrix caption');

  const diagnosis = page.locator('[data-quiz="cloud-diagnose"]');
  await diagnosis.locator('[data-answer="1"]').click();
  assert((await diagnosis.textContent()).includes('verschiedenen Seiten'), 'IaaS OS feedback');

  const sequence = page.locator('[data-sequence="cloud-abstraktion-sortieren"]');
  await sequence.locator('[data-step="paas"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('IaaS verwaltet'), 'Wrong order rejected');
  await sequence.locator('[data-step="iaas"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard order accepted');

  const recall = page.locator('[data-recall="cloud-rollenfall"]');
  await recall.locator('[data-recall-input]').fill('Bei IaaS patcht das Team Gast-OS, Runtime und eigene Anwendung. Bei PaaS betreibt der Provider das OS und die Runtime, während das Team den eigenen Anwendungscode liefert. Bei SaaS betreibt der Provider die fertige Anwendung. In allen Fällen entscheidet das Team über Daten und Zugänge seiner Nutzer. Je nach Produkt muss diese Grenze geprüft werden.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Role model revealed');

  const first = page.locator('[data-quiz="cloud-transfer-schichten"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong objective answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="cloud-transfer-fall"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');

  const card = page.locator('[data-flashcard="cloud-karte-0"]');
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
  console.log(`PASS cloud service models: ${slug}`);
} finally {
  await browser.close();
}

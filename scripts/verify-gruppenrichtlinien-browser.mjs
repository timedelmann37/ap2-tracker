import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/gruppenrichtlinien-lsdou-loopback/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original diagrams');

  const sequence = page.locator('[data-sequence="gpo-lsdou-sortieren"]');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Position 1'), 'Wrong order feedback');
  for (const [target, id] of ['local', 'site', 'domain', 'ou-parent', 'ou-kind'].entries()) {
    const step = sequence.locator(`[data-step="${id}"]`);
    while (await step.evaluate(node => [...node.parentElement.children].indexOf(node)) > target) {
      await step.locator('[data-move="up"]').click();
    }
  }
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'LSDOU order accepted');

  const loopback = page.locator('[data-quiz="gpo-loopback"]');
  await loopback.locator('[data-answer="1"]').click();
  assert((await loopback.textContent()).includes('beschreibt Merge'), 'Merge/Replace misconception feedback');
  const recall = page.locator('[data-recall="gpo-konflikt-erklaeren"]');
  await recall.locator('[data-recall-input]').fill('Im Standardfall gelten lokale, Site-, Domänen- und OU-GPOs nacheinander; die direkte OU kommt zuletzt. Block Inheritance an einer OU stoppt normale geerbte Links. Ein Enforced-Link bleibt dagegen wirksam, wenn die übrigen Anwendungsbedingungen erfüllt sind. Vor einer Aussage prüfe ich Linkstatus, Filter und Zielobjekt.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model answer revealed');

  const first = page.locator('[data-quiz="gpo-lsdou-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong gate does not unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="gpo-ausnahmen-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');
  const card = page.locator('[data-flashcard="gpo-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), sequence, recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} document overflow`);
        assert(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme} element overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS Gruppenrichtlinien: gruppenrichtlinien-lsdou-loopback');
} finally {
  await browser.close();
}

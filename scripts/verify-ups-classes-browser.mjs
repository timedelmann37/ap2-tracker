import { chromium } from 'playwright';

const slug = 'usv-klassen-vfd-vi-vfi-schaltbilder';
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
  assert(await page.locator('.learning-figure').count() === 3, 'Three original circuit block diagrams');
  assert(await page.locator('.diagram-topology').count() === 3, 'Three topology SVGs');
  const diagramTitles = await page.locator('.diagram-topology title').allTextContents();
  assert(diagramTitles.some(title => title.includes('VFD')), 'VFD diagram');
  assert(diagramTitles.some(title => title.includes('VI:')), 'VI diagram');
  assert(diagramTitles.some(title => title.includes('VFI')), 'VFI diagram');

  const sequence = page.locator(`[data-sequence="${slug}-reihenfolge"]`);
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Beginne'), 'Wrong normal path rejected');
  for (const step of ['netz', 'rect']) {
    await sequence.locator(`[data-step="${step}"] [data-move="up"]`).focus();
    await page.keyboard.press('Enter');
  }
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), 'Keyboard normal path accepted');
  assert(await done.isDisabled(), 'Practice does not unlock');

  const recall = page.locator(`[data-recall="${slug}-begruendung"]`);
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Model initially hidden');
  await recall.locator('[data-recall-input]').fill('VI regelt im normalen Netzweg die Spannung, während die Frequenz dem Eingang folgt. VFI führt den Normalweg durch Gleichrichter und Wechselrichter; ein Bypass muss gesondert betrachtet werden.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');

  const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong answer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="0"]`).click();
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
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').nth(2), recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS UPS classes: ${slug}`);
  await page.close();
} finally {
  await browser.close();
}

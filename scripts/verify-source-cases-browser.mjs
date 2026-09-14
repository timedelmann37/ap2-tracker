import { chromium } from 'playwright';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const cases = [['netzwerk-messwerte', 1], ['konfiguration-beschreiben', 2], ['ga2-zeitmanagement', 0], ['backup-methods', 1], ['backup-window', 2], ['segmentierung-vorteile', 1], ['zero-trust-segmentierung', 2]];
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [slug, correct] of cases) {
    await page.goto(`${base}/lernen/${slug}/`);
    const quiz = page.locator(`[data-quiz="${slug}-quellenfall"]`);
    await quiz.locator(`[data-answer="${(correct + 1) % 3}"]`).click();
    assert(await page.locator('#mark-done').isDisabled(), `${slug}: supplementary exercise cannot unlock completion`);
    await quiz.locator('[data-quiz-reset]').click();
    await quiz.locator(`[data-answer="${correct}"]`).focus();
    await page.keyboard.press('Enter');
    assert(await page.locator('#mark-done').isDisabled(), `${slug}: correct supplemental answer is not an objective`);
    if (slug === 'backup-window') {
      const numeric = page.locator('[data-numeric-practice="backup-window-quellenzeit"]');
      await numeric.locator('[data-numeric-input]').fill('48');
      await numeric.locator('[data-numeric-check]').click();
      assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'wrong', 'Copy-only duration rejected');
      await numeric.locator('[data-numeric-input]').fill('105');
      await numeric.locator('[data-numeric-check]').click();
      assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'correct', 'Full duration accepted');
      assert(await numeric.locator('math').count() === 1, 'Graphical calculation revealed');
      assert(await page.locator('#mark-done').isDisabled(), 'Supplemental calculation cannot unlock completion');
    }
    const recall = page.locator(`[data-recall="${slug}-quellenbegruendung"]`);
    assert(!await recall.locator('[data-recall-model]').isVisible(), `${slug}: model initially hidden`);
    await recall.locator('[data-recall-input]').fill('Ich trenne den beobachteten Befund von meiner Vermutung. Der nächste Test muss eine konkrete Erwartung prüfen und andere mögliche Erklärungen berücksichtigen.');
    await recall.locator('[data-recall-reveal]').focus();
    await page.keyboard.press('Enter');
    assert(await recall.locator('[data-recall-model]').isVisible(), `${slug}: model revealed after own response`);
    await page.reload();
    assert((await recall.locator('[data-recall-input]').inputValue()).startsWith('Ich trenne'), `${slug}: response persisted`);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const theme of ['light', 'dark']) {
        await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
        await quiz.scrollIntoViewIfNeeded();
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${slug}: ${width}/${theme} no overflow`);
        if (process.env.AP2_SOURCE_CAPTURE === '1') {
          await page.evaluate(async () => { await document.fonts.ready; await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); });
          await page.screenshot({ path: `.source-${slug}-${width}-${theme}.png`, animations: 'disabled' });
        }
      }
    }
    console.log(`PASS source case: ${slug}, keyboard, persistence, objective isolation, mobile/themes`);
  }
  assert(!errors.length, errors.join('\n'));
} finally {
  await browser.close();
}

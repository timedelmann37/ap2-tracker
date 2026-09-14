import { chromium } from 'playwright';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const cases = [['netzwerk-messwerte', 1], ['konfiguration-beschreiben', 2], ['ga2-zeitmanagement', 0], ['backup-methods', 1], ['backup-window', 2], ['segmentierung-vorteile', 1], ['zero-trust-segmentierung', 2], ['qualitat-skripten-kommentare-fehlerbehandlung-logging-test-vor', 1]];
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
    if (slug === 'qualitat-skripten-kommentare-fehlerbehandlung-logging-test-vor') {
      const done = page.locator('#mark-done');
      const first = page.locator(`[data-quiz="${slug}-transfer-a"]`);
      await first.locator('[data-answer="0"]').click();
      assert(await done.isDisabled(), 'Wrong transfer answer keeps gate closed');
      await first.locator('[data-quiz-reset]').click();
      await first.locator('[data-answer="2"]').click();
      assert(await done.isDisabled(), 'One objective is insufficient');
      await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="0"]`).click();
      assert(!await done.isDisabled(), 'Both objectives unlock completion');
      await page.reload();
      assert(!await done.isDisabled(), 'Objectives persist after reload');
      await done.click();
      assert(await done.getAttribute('aria-pressed') === 'true', 'Learned state set');
      await done.click();
      assert(await done.getAttribute('aria-pressed') === 'false', 'Learned state undone');
      const sequence = page.locator(`[data-sequence="${slug}-reihenfolge"]`);
      for (const step of ['s0', 's1', 's1']) {
        await sequence.locator(`[data-step="${step}"] [data-move="up"]`).focus();
        await page.keyboard.press('Enter');
      }
      await sequence.locator('[data-sequence-check]').click();
      assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Erst Voraussetzungen'), 'Sequence solved by keyboard');
      const card = page.locator(`[data-flashcard="${slug}-karte-0"]`);
      await card.focus();
      await page.keyboard.press('Enter');
      assert(await card.getAttribute('aria-pressed') === 'true', 'Card keyboard interaction');
      assert(await page.locator('.learning-diagram').count() === 2, 'Two instructional diagrams');
      if (process.env.AP2_SOURCE_CAPTURE === '1') {
        for (const width of [390,1440]) {
          await page.setViewportSize({width,height:1000});
          for (const theme of ['light','dark']) {
            await page.evaluate(t => document.documentElement.setAttribute('data-theme',t),theme);
            await page.locator('.learning-figure').last().scrollIntoViewIfNeeded();
            await page.screenshot({path:`.auto-diagram-${width}-${theme}.png`,animations:'disabled'});
          }
        }
      }
      console.log('PASS automation unit: mandatory objectives, persistence, undo, sequence and cards');
    }
  }
  assert(!errors.length, errors.join('\n'));
} finally {
  await browser.close();
}

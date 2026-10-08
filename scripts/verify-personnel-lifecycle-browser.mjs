import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const slug = 'berechtigungsprozesse-personalwechsel-vertretung';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const captureDir = process.env.AP2_LIFECYCLE_CAPTURE_DIR;
const assert = (condition, message) => { if (!condition) throw new Error(message); };

async function answerQuiz(page, id, index) {
  const widget = page.locator(`[data-quiz="${id}"]`);
  await widget.locator(`[data-answer="${index}"]`).press('Enter');
  assert((await widget.locator('[data-selected-feedback]').textContent() || '').trim().length > 25,
    `${id}: selected answer explains its reasoning`);
  return widget;
}

const browser = await chromium.launch();
try {
  if (captureDir) await mkdir(captureDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  assert((await page.goto(`${base}/lernen/${slug}/`))?.status() === 200, 'Lifecycle lesson loads');
  assert(await page.locator('body[data-progress-id="ga1-7__6"]').count() === 1, 'Canonical tracker topic is used');
  assert(await page.locator('svg.learning-diagram[role="img"]').count() === 3, 'Three semantic technical diagrams render');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Completion requires objective checks');

  const diagnosis = await answerQuiz(page, 'personalwechsel-diagnose', 0);
  assert(await done.isDisabled(), 'Diagnosis does not unlock completion');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await answerQuiz(page, 'personalwechsel-diagnose', 2);
  for (const [id, answer] of [
    ['personalwechsel-eintritt-praxis', 0],
    ['personalwechsel-wechsel-praxis', 1],
    ['personalwechsel-austritt-praxis', 2]
  ]) {
    await answerQuiz(page, id, answer);
  }

  const matrix = page.locator('[data-permission-matrix="personalwechsel-vertretung-profil"]');
  const matrixAnswers = [['basis:handbuch', 'read'], ['basis:pruefplan', 'none'],
    ['vertretung:handbuch', 'none'], ['vertretung:pruefplan', 'read']];
  for (const [key, value] of matrixAnswers) {
    await matrix.locator(`[data-matrix-cell="${key}"]`).selectOption(value);
  }
  await matrix.locator('[data-matrix-cell="vertretung:pruefplan"]').selectOption('edit');
  await matrix.locator('[data-matrix-check]').press('Enter');
  assert(await matrix.locator('[data-matrix-feedback]').getAttribute('data-result') === 'wrong',
    'Unneeded edit access is rejected');
  await page.reload();
  assert(await matrix.locator('[data-matrix-cell="vertretung:pruefplan"]').inputValue() === 'edit',
    'Attempt persists for correction');
  await matrix.locator('[data-matrix-cell="vertretung:pruefplan"]').selectOption('read');
  await matrix.locator('[data-matrix-check]').press('Enter');
  assert(await matrix.locator('[data-matrix-feedback]').getAttribute('data-result') === 'correct',
    'Task-limited delegation profile is accepted');
  assert(await done.isDisabled(), 'Practice matrix alone does not pass the time-limit objective');

  for (const [id, correct] of [['personalwechsel-eintritt-gate', 1], ['personalwechsel-wechsel-gate', 0]]) {
    const widget = await answerQuiz(page, id, (correct + 1) % 3);
    assert(await done.isDisabled(), `${id}: incorrect answer cannot pass`);
    await widget.locator('[data-quiz-reset]').press('Enter');
    await answerQuiz(page, id, correct);
  }
  const sequence = page.locator('[data-sequence="personalwechsel-austritt-gate"]');
  await sequence.locator('[data-sequence-check]').press('Enter');
  assert(await sequence.locator('[data-sequence-feedback]').getAttribute('data-result') === 'wrong',
    'Closing a ticket before revocation checks is rejected');
  for (const [target, id] of ['vorbereitung', 'sperren', 'zugriffstest', 'nachweis'].entries()) {
    const step = sequence.locator(`[data-step="${id}"]`);
    while (await step.evaluate(node => [...node.parentElement.children].indexOf(node)) > target) {
      await step.locator('[data-move="up"]').press('Enter');
    }
  }
  await sequence.locator('[data-sequence-check]').press('Enter');
  assert(await sequence.locator('[data-sequence-feedback]').getAttribute('data-result') === 'correct',
    'Revocation evidence phases can be sorted by keyboard');
  assert(await done.isDisabled(), 'Delegation time-limit check remains required');
  const delegation = await answerQuiz(page, 'personalwechsel-vertretung-gate', 0);
  assert(await done.isDisabled(), 'Removing required base access cannot pass');
  await delegation.locator('[data-quiz-reset]').press('Enter');
  await answerQuiz(page, 'personalwechsel-vertretung-gate', 2);
  assert(!await done.isDisabled(), 'All four objective checks unlock completion');

  const recall = page.locator('[data-recall="personalwechsel-freier-abruf"]');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Own recall precedes model answer');
  await recall.locator('[data-recall-input]').fill('Beim Eintritt prüfe ich Freigabe und Start. Beim Wechsel behandle ich auch alte direkte Grants. Beim Austritt prüfe ich Konto, Sitzungen und Schlüssel. Die Vertretung endet zum vereinbarten Zeitpunkt; benötigte Basisrechte bleiben.');
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model follows own explanation');
  const card = page.locator('[data-flashcard="personalwechsel-karte-sitzung"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard opens by keyboard');
  await page.keyboard.press('Space');
  assert(await card.getAttribute('aria-pressed') === 'false', 'Flashcard closes by keyboard');
  await page.reload();
  assert(!await done.isDisabled(), 'Passed objective checks persist');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'true', 'Authenticated learner can complete the topic');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'false', 'Completion remains reversible');
  await delegation.locator('[data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Resetting one required check revokes completion eligibility');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      if (captureDir) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: path.join(captureDir, `${width}-${theme}-start.png`), animations: 'disabled' });
      }
      for (const [index, figure] of (await page.locator('.learning-figure').all()).entries()) {
        await figure.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          `${width}px ${theme}: no page overflow`);
        const scroller = figure.locator('.learning-diagram-scroll');
        if (width === 390) {
          await scroller.focus();
          await page.keyboard.press('ArrowRight');
          await page.waitForFunction(node => node.scrollLeft > 0, await scroller.elementHandle(), { timeout: 2000 });
          assert(await scroller.evaluate(node => node.scrollLeft > 0), `${theme}: diagram scrolls by keyboard`);
          await scroller.evaluate(node => { node.scrollLeft = 0; });
        }
        const textBounds = await figure.locator('svg text').evaluateAll(nodes => nodes.map(node => {
          const box = node.getBBox();
          const svg = node.ownerSVGElement;
          return { inside: box.x >= 0 && box.y >= 0 && box.x + box.width <= svg.viewBox.baseVal.width,
            height: node.getBoundingClientRect().height };
        }));
        assert(textBounds.every(box => box.inside && box.height >= 11), `${width}px ${theme}: SVG labels readable and within canvas`);
        if (captureDir) await page.screenshot({ path: path.join(captureDir, `${width}-${theme}-figure-${index}.png`), animations: 'disabled' });
      }
      await matrix.scrollIntoViewIfNeeded();
      assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        `${width}px ${theme}: profile matrix does not overflow page`);
      if (captureDir) await page.screenshot({ path: path.join(captureDir, `${width}-${theme}-matrix.png`), animations: 'disabled' });
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS personnel lifecycle: ${slug}`);
} finally {
  await browser.close();
}

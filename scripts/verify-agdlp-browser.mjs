import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const slug = 'agdlp-agudlp-gruppenverschachtelung';
const spec = JSON.parse(await readFile(new URL(`../content/learning-units/${slug}.unit.json`, import.meta.url), 'utf8'));
const blocks = spec.sections.flatMap(section => section.blocks);
const diagnostic = blocks.find(block => block.type === 'quiz' && block.diagnostic);
const interactiveTypes = new Set(['quiz', 'sequence', 'numeric']);
const applications = blocks.filter(block => interactiveTypes.has(block.type) && !block.diagnostic && !block.requiredObjective);
const recall = blocks.find(block => block.type === 'recall');
const flashcard = blocks.find(block => block.type === 'flashcards')?.cards[0];
const gates = spec.objectives.map(objective => blocks.find(block => block.requiredObjective === objective.id));
const figures = blocks.filter(block => block.type === 'figure');
const captureDir = process.env.AP2_AGDLP_CAPTURE_DIR;
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(spec.meta.slug === slug && spec.meta.itemId === 'ga1-7__3', 'AGDLP unit has the expected slug and canonical item ID');
assert(diagnostic && applications.length && recall && flashcard, 'Diagnosis, application, recall and flashcard exist');
assert(gates.length > 1 && gates.every(gate => gate && interactiveTypes.has(gate.type)), 'Each objective has an interactive gate');
assert(figures.length > 0 && figures.length === spec.diagrams.length, 'Technical diagrams are used by figures');

async function choose(quiz, correct, label) {
  const answerCount = await quiz.locator('[data-answer]').count();
  const correctIndex = Number(await quiz.getAttribute('data-correct'));
  assert(answerCount >= 2 && correctIndex >= 0 && correctIndex < answerCount, `${label}: quiz has a valid answer key`);
  const index = correct ? correctIndex : (correctIndex + 1) % answerCount;
  await quiz.locator(`[data-answer="${index}"]`).press('Enter');
  const feedback = (await quiz.locator('[data-selected-feedback]').textContent() || '').trim();
  assert(feedback.length > 20, `${label}: ${correct ? 'correct' : 'wrong'} answer has meaningful feedback`);
}

async function sortSequence(widget, expected) {
  for (const [target, id] of expected.entries()) {
    const step = widget.locator(`[data-step="${id}"]`);
    while (await step.evaluate(node => [...node.parentElement.children].indexOf(node)) > target) {
      await step.locator('[data-move="up"]').press('Enter');
    }
  }
}

async function checkSequence(widget, expected, correct, label) {
  assert(Array.isArray(expected) && expected.length >= 2, `${label}: sequence has at least two steps`);
  if (correct) {
    await sortSequence(widget, expected);
  } else {
    const current = await widget.locator('[data-step]').evaluateAll(nodes => nodes.map(node => node.dataset.step));
    if (current.join(',') === expected.join(',')) {
      await widget.locator('[data-step]').first().locator('[data-move="down"]').press('Enter');
    }
  }
  await widget.locator('[data-sequence-check]').press('Enter');
  const feedback = widget.locator('[data-sequence-feedback]');
  assert(await feedback.getAttribute('data-result') === (correct ? 'correct' : 'wrong'), `${label}: sequence judges ${correct ? 'correct' : 'wrong'} order`);
  assert((await feedback.textContent() || '').trim().length > 20, `${label}: sequence gives meaningful feedback`);
}

async function checkNumeric(widget, block, correct, label) {
  const expected = Number(block.expected);
  const tolerance = block.tolerance === undefined ? 0.001 : Number(block.tolerance);
  assert(Number.isFinite(expected) && Number.isFinite(tolerance) && tolerance >= 0, `${label}: numeric answer key is valid`);
  const value = correct ? expected : expected + Math.max(1, tolerance * 2);
  await widget.locator('[data-numeric-input]').fill(String(value));
  await widget.locator('[data-numeric-check]').press('Enter');
  const feedback = widget.locator('[data-numeric-feedback]');
  assert(await feedback.getAttribute('data-result') === (correct ? 'correct' : 'wrong'), `${label}: numeric answer is judged`);
  assert((await feedback.textContent() || '').trim().length > 20, `${label}: numeric answer has meaningful feedback`);
}

async function checkActivity(page, block, correct, label) {
  if (block.type === 'quiz') {
    const widget = page.locator(`[data-quiz="${block.id}"]`);
    await choose(widget, correct, label);
    return;
  }
  if (block.type === 'sequence') {
    await checkSequence(page.locator(`[data-sequence="${block.id}"]`), block.expected, correct, label);
    return;
  }
  if (block.type === 'numeric') {
    await checkNumeric(page.locator(`[data-numeric-practice="${block.id}"]`), block, correct, label);
    return;
  }
  throw new Error(`${label}: unsupported activity type ${block.type}`);
}

async function resetQuiz(page, block) {
  if (block.type === 'quiz') await page.locator(`[data-quiz="${block.id}"] [data-quiz-reset]`).press('Enter');
}

const browser = await chromium.launch();
try {
  if (captureDir) await mkdir(captureDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(`${base}/lernen/${slug}/`);
  assert(response?.status() === 200, 'AGDLP lesson loads');
  assert(await page.locator(`body[data-progress-id="${spec.meta.itemId}"]`).count() === 1, 'Canonical topic is linked');
  assert(await page.locator('svg.learning-diagram').count() === figures.length, 'All diagrams render inline');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Completion is initially gated');

  await checkActivity(page, diagnostic, false, 'Diagnosis');
  assert(await done.isDisabled(), 'Diagnosis cannot complete lesson');
  await resetQuiz(page, diagnostic);
  await checkActivity(page, diagnostic, true, 'Diagnosis');

  for (const [index, application] of applications.entries()) {
    const label = `Application ${index + 1} (${application.id})`;
    await checkActivity(page, application, false, label);
    await resetQuiz(page, application);
    await checkActivity(page, application, true, label);
  }
  assert(await done.isDisabled(), 'Application cannot skip objective gates');

  const recallWidget = page.locator(`[data-recall="${recall.id}"]`);
  assert(!await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall answer is initially hidden');
  assert(await recallWidget.locator('[data-recall-reveal]').isDisabled(), 'Recall requires an own answer');
  const recallText = 'Bei AGDLP ordne ich ein Benutzerkonto einer globalen Gruppe zu. Diese globale Gruppe wird Mitglied der domänenlokalen Gruppe, die das Recht auf die Ressource erhält. Bei AGUDLP liegt für eine passende domänenübergreifende Struktur zusätzlich eine universelle Gruppe zwischen globaler und domänenlokaler Gruppe. Ich prüfe die tatsächliche Mitgliedschaftskette und die Ressource.';
  await recallWidget.locator('[data-recall-input]').fill(recallText.repeat(Math.ceil(recall.minLength / recallText.length)));
  await recallWidget.locator('[data-recall-reveal]').press('Enter');
  assert(await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall answer reveals after own input');

  const card = page.locator(`[data-flashcard="${flashcard.id}"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard opens with keyboard');
  await page.keyboard.press('Space');
  assert(await card.getAttribute('aria-pressed') === 'false', 'Flashcard closes with keyboard');

  for (const [index, gate] of gates.entries()) {
    const label = `Objective ${index + 1} (${gate.id})`;
    await checkActivity(page, gate, false, label);
    assert(await done.isDisabled(), `${label}: wrong answer does not unlock completion`);
    await resetQuiz(page, gate);
    await checkActivity(page, gate, true, label);
    assert((await done.isDisabled()) === (index !== gates.length - 1), `${label}: completion gate updates`);
  }
  await page.reload();
  assert(!await done.isDisabled(), 'Objective gates persist after reload');
  await done.click();
  assert(await done.getAttribute('aria-pressed') === 'true', 'Completion can be set');
  await done.click();
  assert(await done.getAttribute('aria-pressed') === 'false', 'Completion can be undone');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme}: page fits viewport`);
      if (captureDir) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-top.png`), animations: 'disabled' });
      }
      for (const [index, figure] of (await page.locator('.learning-figure').all()).entries()) {
        await figure.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme}: figure does not overflow page`);
        assert(await figure.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme}: figure is contained`);
        const scroller = figure.locator('.learning-diagram-scroll');
        if (width === 390 && await scroller.count() && await scroller.evaluate(node => node.scrollWidth > node.clientWidth)) {
          await scroller.evaluate(node => { node.scrollLeft = node.scrollWidth; });
          assert(await scroller.evaluate(node => node.scrollLeft > 0), `${width}px ${theme}: wide diagram scrolls`);
          await scroller.evaluate(node => { node.scrollLeft = 0; });
        }
        if (captureDir) await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-figure-${index}.png`), animations: 'disabled' });
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS AGDLP/AGUDLP: ${slug}`);
} finally {
  await browser.close();
}

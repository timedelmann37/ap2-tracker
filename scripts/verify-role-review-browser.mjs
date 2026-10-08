import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const slug = 'rollenkonzept-rezertifizierung-berechtigungen';
const spec = JSON.parse(await readFile(new URL(`../content/learning-units/${slug}.unit.json`, import.meta.url), 'utf8'));
const blocks = spec.sections.flatMap(section => section.blocks);
const diagnostic = blocks.find(block => block.type === 'quiz' && block.diagnostic);
const practice = blocks.find(block => block.type === 'quiz' && !block.diagnostic && !block.requiredObjective);
const recall = blocks.find(block => block.type === 'recall');
const flashcard = blocks.find(block => block.type === 'flashcards')?.cards[0];
const figures = blocks.filter(block => block.type === 'figure');
const gates = spec.objectives.map(objective => blocks.find(block => block.requiredObjective === objective.id));
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const captureDir = process.env.AP2_ROLE_REVIEW_CAPTURE_DIR;
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(spec.meta.itemId === 'ga1-7__5' && spec.meta.contentStatus === 'CURATED_DRAFT', 'Canonical draft metadata');
assert(diagnostic && practice && recall && flashcard, 'Diagnosis, practice, recall and flashcard exist');
assert(figures.length >= 2 && figures.length === spec.diagrams.length, 'Technical figures are declared and used');
assert(gates.length >= 3 && gates.every(Boolean), 'All learning objectives have interactive gates');
assert(new Set(gates.map(gate => gate.options.findIndex(option => option.correct))).size === 3,
  'Objective answers are distributed across positions rather than exposing a first-option shortcut');

async function answerQuiz(widget, correct) {
  const index = Number(await widget.getAttribute('data-correct'));
  const count = await widget.locator('[data-answer]').count();
  assert(index >= 0 && index < count && count >= 2, 'Quiz answer key is valid');
  await widget.locator(`[data-answer="${correct ? index : (index + 1) % count}"]`).press('Enter');
  const feedback = (await widget.locator('[data-selected-feedback]').textContent() || '').trim();
  assert(feedback.length > 20, `Quiz has explanatory ${correct ? 'correct' : 'wrong'} feedback`);
}

async function sortSequence(widget, expected) {
  for (const [target, id] of expected.entries()) {
    const step = widget.locator(`[data-step="${id}"]`);
    while (await step.evaluate(node => [...node.parentElement.children].indexOf(node)) > target) {
      await step.locator('[data-move="up"]').press('Enter');
    }
  }
}

const browser = await chromium.launch();
try {
  if (captureDir) await mkdir(captureDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(`${base}/lernen/${slug}/`);
  assert(response?.status() === 200, 'Role review lesson loads');
  assert(await page.locator(`body[data-progress-id="${spec.meta.itemId}"]`).count() === 1, 'Canonical topic is connected');
  assert(await page.locator('svg.learning-diagram').count() === figures.length, 'Technical diagrams render as semantic SVG');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Completion starts locked');

  const diagnosis = page.locator(`[data-quiz="${diagnostic.id}"]`);
  await answerQuiz(diagnosis, false);
  assert(await done.isDisabled(), 'Diagnosis alone cannot complete the lesson');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await answerQuiz(diagnosis, true);
  const application = page.locator(`[data-quiz="${practice.id}"]`);
  await answerQuiz(application, false);
  await application.locator('[data-quiz-reset]').press('Enter');
  await answerQuiz(application, true);

  for (const [index, gate] of gates.entries()) {
    if (gate.type === 'quiz') {
      const widget = page.locator(`[data-quiz="${gate.id}"]`);
      await answerQuiz(widget, false);
      assert(await done.isDisabled(), `${gate.id}: wrong answer does not pass`);
      await widget.locator('[data-quiz-reset]').press('Enter');
      await answerQuiz(widget, true);
    } else if (gate.type === 'sequence') {
      const widget = page.locator(`[data-sequence="${gate.id}"]`);
      await widget.locator('[data-sequence-check]').press('Enter');
      if (await widget.locator('[data-sequence-feedback]').getAttribute('data-result') === 'correct') {
        await widget.locator('[data-step]').first().locator('[data-move="down"]').press('Enter');
        await widget.locator('[data-sequence-check]').press('Enter');
      }
      assert(await widget.locator('[data-sequence-feedback]').getAttribute('data-result') === 'wrong', `${gate.id}: wrong order is rejected`);
      await sortSequence(widget, gate.expected);
      await widget.locator('[data-sequence-check]').press('Enter');
      assert(await widget.locator('[data-sequence-feedback]').getAttribute('data-result') === 'correct', `${gate.id}: keyboard sorting works`);
    } else {
      throw new Error(`Unsupported objective gate type ${gate.type}`);
    }
    assert((await done.isDisabled()) === (index < gates.length - 1), `${gate.id}: completion tracks all gates`);
  }

  const recallWidget = page.locator(`[data-recall="${recall.id}"]`);
  assert(await recallWidget.locator('[data-recall-reveal]').isDisabled(), 'Recall requires own answer first');
  const ownAnswer = 'Ich prüfe erst, ob die Person die Rolle für ihre aktuelle Aufgabe noch braucht. Dann prüfe ich, ob die Rolle selbst nur erforderliche Rechte enthält. Entzug wird umgesetzt und der tatsächliche Zugriff wird nachgeprüft. ';
  await recallWidget.locator('[data-recall-input]').fill(ownAnswer.repeat(Math.ceil(recall.minLength / ownAnswer.length)));
  await recallWidget.locator('[data-recall-reveal]').press('Enter');
  assert(await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall model is revealed after own answer');
  const card = page.locator(`[data-flashcard="${flashcard.id}"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard opens by keyboard');
  await page.keyboard.press('Space');
  assert(await card.getAttribute('aria-pressed') === 'false', 'Flashcard closes by keyboard');

  await page.reload();
  assert(!await done.isDisabled(), 'Objective results survive reload');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'true', 'Lesson can be marked done');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'false', 'Completion can be reversed');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      const labelHeights = await page.locator('svg.diagram-topology .diagram-node-detail').evaluateAll(nodes =>
        nodes.map(node => node.getBoundingClientRect().height));
      assert(labelHeights.length > 0 && labelHeights.every(height => height >= 11),
        `${width}px ${theme}: topology detail labels remain readable`);
      for (const [index, figure] of (await page.locator('.learning-figure').all()).entries()) {
        await figure.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme}: page overflow`);
        assert(await figure.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme}: figure overflow`);
        const scroller = figure.locator('.learning-diagram-scroll');
        if (width === 390 && await scroller.count() && await scroller.evaluate(node => node.scrollWidth > node.clientWidth)) {
          await scroller.evaluate(node => { node.scrollLeft = node.scrollWidth; });
          assert(await scroller.evaluate(node => node.scrollLeft > 0), `${width}px ${theme}: wide diagram remains scrollable`);
          await scroller.evaluate(node => { node.scrollLeft = 0; });
        }
        if (captureDir) await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-figure-${index}.png`), animations: 'disabled' });
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS role review: ${slug}`);
} finally {
  await browser.close();
}

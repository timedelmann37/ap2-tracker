import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const slug = 'zugriffsmodelle-dac-mac-rbac-abac';
const spec = JSON.parse(await readFile(new URL(`../content/learning-units/${slug}.unit.json`, import.meta.url), 'utf8'));
const blocks = spec.sections.flatMap(section => section.blocks);
const diagnostic = blocks.find(block => block.type === 'quiz' && block.diagnostic);
const practice = blocks.find(block => block.type === 'quiz' && !block.diagnostic && !block.requiredObjective);
const sequences = blocks.filter(block => block.type === 'sequence' && !block.requiredObjective);
const recall = blocks.find(block => block.type === 'recall');
const flashcard = blocks.find(block => block.type === 'flashcards')?.cards[0];
const gates = spec.objectives.map(objective => blocks.find(block => block.requiredObjective === objective.id));
const figureCount = blocks.filter(block => block.type === 'figure').length;
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const captureDir = process.env.AP2_ACCESS_MODELS_CAPTURE_DIR;
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(spec.meta.slug === slug, 'Learning slug matches spec');
assert(diagnostic && practice && recall && flashcard && gates.length && gates.every(Boolean), 'Diagnostic, application, recall, flashcard and objective gates exist');
assert(gates.every(gate => ['quiz', 'sequence'].includes(gate.type)), 'Objective gates use supported interactive types');
assert(figureCount > 0 && figureCount === spec.diagrams.length, 'Every technical diagram is used by a figure');

async function choose(quiz, correct) {
  const answerCount = await quiz.locator('[data-answer]').count();
  const correctIndex = Number(await quiz.getAttribute('data-correct'));
  assert(answerCount > 1 && correctIndex >= 0 && correctIndex < answerCount, 'Quiz has a correct answer and a distractor');
  const index = correct ? correctIndex : (correctIndex + 1) % answerCount;
  await quiz.locator(`[data-answer="${index}"]`).press('Enter');
  return (await quiz.locator('[data-selected-feedback]').textContent() || '').trim();
}

async function sortSequence(widget, expected) {
  for (const [target, id] of expected.entries()) {
    const step = widget.locator(`[data-step="${id}"]`);
    while (await step.evaluate(node => [...node.parentElement.children].indexOf(node)) > target) {
      await step.locator('[data-move="up"]').press('Enter');
    }
  }
}

async function checkWrongSequence(widget, expected, label) {
  const current = await widget.locator('[data-step]').evaluateAll(nodes => nodes.map(node => node.dataset.step));
  if (current.join(',') === expected.join(',')) {
    await widget.locator('[data-step]').first().locator('[data-move="down"]').press('Enter');
  }
  await widget.locator('[data-sequence-check]').press('Enter');
  const feedback = widget.locator('[data-sequence-feedback]');
  assert(await feedback.getAttribute('data-result') === 'wrong', `${label}: wrong order is rejected`);
  assert((await feedback.textContent() || '').trim().length > 20, `${label}: wrong order receives feedback`);
}

async function checkCorrectSequence(widget, expected, label) {
  await sortSequence(widget, expected);
  await widget.locator('[data-sequence-check]').press('Enter');
  const feedback = widget.locator('[data-sequence-feedback]');
  assert(await feedback.getAttribute('data-result') === 'correct', `${label}: keyboard sorting accepts correct order`);
  assert((await feedback.textContent() || '').trim().length > 20, `${label}: correct order receives feedback`);
}

const browser = await chromium.launch();
try {
  if (captureDir) await mkdir(captureDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(`${base}/lernen/${slug}/`);
  assert(response?.status() === 200, 'Learning page loads');
  assert(await page.locator(`body[data-progress-id="${spec.meta.itemId}"]`).count() === 1, 'Canonical item ID is connected');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Objectives initially gate completion');
  assert(await page.locator('svg.learning-diagram').count() === figureCount, 'Technical diagrams render inline');

  const diagnosticWidget = page.locator(`[data-quiz="${diagnostic.id}"]`);
  assert((await choose(diagnosticWidget, false)).length > 20, 'Wrong diagnostic answer receives feedback');
  assert(await done.isDisabled(), 'Diagnostic does not grant completion');
  await diagnosticWidget.locator('[data-quiz-reset]').click();
  assert((await choose(diagnosticWidget, true)).length > 20, 'Correct diagnostic answer receives feedback');

  const practiceWidget = page.locator(`[data-quiz="${practice.id}"]`);
  assert((await choose(practiceWidget, false)).length > 20, 'Wrong application answer receives feedback');
  await practiceWidget.locator('[data-quiz-reset]').click();
  assert((await choose(practiceWidget, true)).length > 20, 'Correct application answer receives feedback');
  assert(await done.isDisabled(), 'Application does not replace objective checks');

  for (const sequence of sequences) {
    const widget = page.locator(`[data-sequence="${sequence.id}"]`);
    await checkWrongSequence(widget, sequence.expected, `Application sequence ${sequence.id}`);
    await checkCorrectSequence(widget, sequence.expected, `Application sequence ${sequence.id}`);
  }

  const recallWidget = page.locator(`[data-recall="${recall.id}"]`);
  assert(!await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall answer is initially hidden');
  assert(await recallWidget.locator('[data-recall-reveal]').isDisabled(), 'Recall requires an own explanation');
  const recallText = 'Bei DAC kann eine dazu berechtigte Person den Zugriff auf ihr Objekt vergeben. Bei MAC begrenzt eine zentrale Regel diese Entscheidung. RBAC ordnet Rechte über Rollen zu. ABAC bewertet die Eigenschaften von Person, Ressource und Aktion sowie gegebenenfalls den Kontext gegen eine Regel. Die Verfahren können kombiniert werden.';
  await recallWidget.locator('[data-recall-input]').fill(recallText.repeat(Math.ceil(recall.minLength / recallText.length)));
  await recallWidget.locator('[data-recall-reveal]').press('Enter');
  assert(await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall answer can be revealed after own explanation');

  const card = page.locator(`[data-flashcard="${flashcard.id}"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard opens by keyboard');
  await page.keyboard.press('Space');
  assert(await card.getAttribute('aria-pressed') === 'false', 'Flashcard closes by keyboard');

  const firstGate = gates[0];
  if (firstGate.type === 'quiz') {
    const widget = page.locator(`[data-quiz="${firstGate.id}"]`);
    assert((await choose(widget, false)).length > 20, 'Wrong objective answer receives feedback');
    await widget.locator('[data-quiz-reset]').click();
  } else {
    await checkWrongSequence(page.locator(`[data-sequence="${firstGate.id}"]`), firstGate.expected, 'First objective sequence');
  }
  assert(await done.isDisabled(), 'Wrong objective answer does not unlock completion');

  for (const [index, gate] of gates.entries()) {
    if (gate.type === 'quiz') {
      assert((await choose(page.locator(`[data-quiz="${gate.id}"]`), true)).length > 20, `Objective ${index + 1} receives correct feedback`);
    } else {
      await checkCorrectSequence(page.locator(`[data-sequence="${gate.id}"]`), gate.expected, `Objective ${index + 1}`);
    }
    assert((await done.isDisabled()) === (index < gates.length - 1), `Objective ${index + 1} updates completion gate`);
  }
  await page.reload();
  assert(!await done.isDisabled(), 'Objective completion persists after reload');
  await done.click();
  assert(await done.getAttribute('aria-pressed') === 'true', 'Canonical completion can be set');
  await done.click();
  assert(await done.getAttribute('aria-pressed') === 'false', 'Canonical completion can be undone');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme}: page overflow`);
      if (captureDir) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-top.png`), animations: 'disabled' });
      }
      for (const [index, figure] of (await page.locator('.learning-figure').all()).entries()) {
        await figure.scrollIntoViewIfNeeded();
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
  console.log(`PASS access models: ${slug}`);
} finally {
  await browser.close();
}

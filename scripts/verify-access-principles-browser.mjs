import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const slug = 'berechtigungsgrundprinzipien-least-privilege-need-to-know-vier-augen';
const spec = JSON.parse(await readFile(new URL(`../content/learning-units/${slug}.unit.json`, import.meta.url), 'utf8'));
const blocks = spec.sections.flatMap(section => section.blocks);
const diagnostic = blocks.find(block => block.type === 'quiz' && block.diagnostic);
const practice = blocks.find(block => block.type === 'quiz' && !block.diagnostic && !block.requiredObjective);
const sequence = blocks.find(block => block.type === 'sequence');
const recall = blocks.find(block => block.type === 'recall');
const flashcard = blocks.find(block => block.type === 'flashcards')?.cards[0];
const gates = spec.objectives.map(objective => blocks.find(block => block.requiredObjective === objective.id));
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const captureDir = process.env.AP2_ACCESS_CAPTURE_DIR;
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(diagnostic && practice && sequence && recall && flashcard && gates.every(Boolean), 'Didactic activity types exist');

async function choose(quiz, correct) {
  const index = correct
    ? Number(await quiz.getAttribute('data-correct'))
    : (Number(await quiz.getAttribute('data-correct')) + 1) % await quiz.locator('[data-answer]').count();
  await quiz.locator(`[data-answer="${index}"]`).press('Enter');
  return quiz.locator('[data-selected-feedback]').textContent();
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
  assert(response?.status() === 200, 'Learning page loads');
  assert(await page.locator(`body[data-progress-id="${spec.meta.itemId}"]`).count() === 1, 'Canonical item ID is connected');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Objectives initially gate completion');
  assert(await page.locator('svg.learning-diagram').count() === spec.diagrams.length, 'Original technical diagrams render inline');

  const diagnosticWidget = page.locator(`[data-quiz="${diagnostic.id}"]`);
  assert((await choose(diagnosticWidget, false)).trim().length > 20, 'Diagnostic explains a wrong answer');
  assert(await done.isDisabled(), 'Diagnostic does not grant completion');

  const practiceWidget = page.locator(`[data-quiz="${practice.id}"]`);
  assert((await choose(practiceWidget, false)).trim().length > 20, 'Application explains a wrong answer');
  await practiceWidget.locator('[data-quiz-reset]').click();
  assert((await choose(practiceWidget, true)).trim().length > 20, 'Application confirms reasoning');
  assert(await done.isDisabled(), 'Practice does not replace objective checks');

  const sequenceWidget = page.locator(`[data-sequence="${sequence.id}"]`);
  await sequenceWidget.locator('[data-sequence-check]').click();
  if (await sequenceWidget.locator('[data-sequence-feedback]').getAttribute('data-result') === 'correct') {
    await sequenceWidget.locator('[data-step]').first().locator('[data-move="down"]').click();
    await sequenceWidget.locator('[data-sequence-check]').click();
  }
  assert(await sequenceWidget.locator('[data-sequence-feedback]').getAttribute('data-result') === 'wrong', 'Misordered application rejected');
  await sortSequence(sequenceWidget, sequence.expected);
  await sequenceWidget.locator('[data-sequence-check]').click();
  assert(await sequenceWidget.locator('[data-sequence-feedback]').getAttribute('data-result') === 'correct', 'Keyboard sorting accepts correct sequence');

  const recallWidget = page.locator(`[data-recall="${recall.id}"]`);
  assert(!await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall answer is initially hidden');
  const recallText = 'Ich begrenze die Fähigkeit auf Lesen und die Information auf die tatsächlich betroffene Akte. Beantragen und Genehmigen desselben Vorgangs liegen bei verschiedenen Personen. Ein Vier-Augen-Schritt prüft die konkrete Freigabe mit einer zweiten, unabhängigen Person. Danach teste ich erlaubte und verbotene Zugriffe und dokumentiere das Ergebnis.';
  await recallWidget.locator('[data-recall-input]').fill(recallText.repeat(Math.ceil(recall.minLength / recallText.length)));
  await recallWidget.locator('[data-recall-reveal]').click();
  assert(await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall answer can be revealed after own explanation');

  const card = page.locator(`[data-flashcard="${flashcard.id}"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard is keyboard operable');

  const firstGate = page.locator(`[data-quiz="${gates[0].id}"]`);
  assert((await choose(firstGate, false)).trim().length > 20, 'Wrong objective answer receives feedback');
  assert(await done.isDisabled(), 'Wrong gate answer does not unlock');
  await firstGate.locator('[data-quiz-reset]').click();
  for (const [index, gate] of gates.entries()) {
    if (gate.type === 'quiz') {
      assert((await choose(page.locator(`[data-quiz="${gate.id}"]`), true)).trim().length > 20, `Objective ${index + 1} feedback appears`);
    } else if (gate.type === 'sequence') {
      const widget = page.locator(`[data-sequence="${gate.id}"]`);
      await sortSequence(widget, gate.expected);
      await widget.locator('[data-sequence-check]').click();
      assert(await widget.locator('[data-sequence-feedback]').getAttribute('data-result') === 'correct', `Objective ${index + 1} sequence accepted`);
    } else {
      throw new Error(`Unexpected objective activity: ${gate.type}`);
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
  console.log(`PASS access principles: ${slug}`);
} finally {
  await browser.close();
}

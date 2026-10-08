import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const slug = 'ntfs-freigabeberechtigungen-effektive-rechte';
const spec = JSON.parse(await readFile(new URL(`../content/learning-units/${slug}.unit.json`, import.meta.url), 'utf8'));
const blocks = spec.sections.flatMap(section => section.blocks);
const diagnostic = blocks.find(block => block.type === 'quiz' && block.diagnostic);
const applications = blocks.filter(block => block.type === 'quiz' && !block.diagnostic && !block.requiredObjective);
const recall = blocks.find(block => block.type === 'recall');
const flashcard = blocks.find(block => block.type === 'flashcards')?.cards[0];
const gates = spec.objectives.map(objective => blocks.find(block => block.requiredObjective === objective.id));
const figures = blocks.filter(block => block.type === 'figure');
const captureDir = process.env.AP2_NTFS_CAPTURE_DIR;
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(diagnostic && applications.length >= 3 && recall && flashcard, 'Diagnosis, three applications, recall and flashcard exist');
for (const [id, answerCue] of [
  ['ntfs-share-reparaturfall', 'G_West_Editoren'],
  ['ntfs-vererbung-anwendung', 'geerbte'],
  ['ntfs-besitz-anwendung', 'Dateiberechtigungen']
]) {
  const exercise = applications.find(block => block.id === id);
  assert(exercise, `Application ${id} exists`);
  assert(exercise.options.find(option => option.correct)?.text.includes(answerCue), `Application ${id} has the intended case-specific answer`);
}
assert(gates.length > 1 && gates.every(Boolean), 'Every objective has a gate');
assert(gates.every(gate => ['quiz', 'sequence'].includes(gate.type)), 'All objective gates are interactive');
assert(figures.length >= 2 && figures.length === spec.diagrams.length, 'Technical diagrams are used by figures');

async function choose(quiz, correct) {
  const correctIndex = Number(await quiz.getAttribute('data-correct'));
  const answerCount = await quiz.locator('[data-answer]').count();
  assert(answerCount >= 2 && correctIndex >= 0 && correctIndex < answerCount, 'Quiz has a valid answer key');
  const index = correct ? correctIndex : (correctIndex + 1) % answerCount;
  await quiz.locator(`[data-answer="${index}"]`).press('Enter');
  const feedback = (await quiz.locator('[data-selected-feedback]').textContent() || '').trim();
  assert(feedback.length > 20, 'Chosen answer explains the result');
}

async function sortSequence(widget, expected) {
  for (const [target, id] of expected.entries()) {
    const step = widget.locator(`[data-step="${id}"]`);
    while (await step.evaluate(node => [...node.parentElement.children].indexOf(node)) > target) {
      await step.locator('[data-move="up"]').press('Enter');
    }
  }
}

async function checkSequence(widget, expected, correct) {
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
  assert(await feedback.getAttribute('data-result') === (correct ? 'correct' : 'wrong'), 'Sequence judges order');
  assert((await feedback.textContent() || '').trim().length > 20, 'Sequence explains the result');
}

const browser = await chromium.launch();
try {
  if (captureDir) await mkdir(captureDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(`${base}/lernen/${slug}/`);
  assert(response?.status() === 200, 'Lesson loads');
  assert(await page.locator(`body[data-progress-id="${spec.meta.itemId}"]`).count() === 1, 'Canonical topic is linked');
  assert(await page.locator('svg.learning-diagram').count() === figures.length, 'All diagrams render');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Completion is initially gated');

  const diagnosis = page.locator(`[data-quiz="${diagnostic.id}"]`);
  await choose(diagnosis, false);
  assert(await done.isDisabled(), 'Diagnosis cannot complete lesson');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await choose(diagnosis, true);

  for (const application of applications) {
    const exercise = page.locator(`[data-quiz="${application.id}"]`);
    await choose(exercise, false);
    await exercise.locator('[data-quiz-reset]').press('Enter');
    await choose(exercise, true);
  }
  assert(await done.isDisabled(), 'Application cannot skip objective gates');

  for (const sequence of blocks.filter(block => block.type === 'sequence' && !block.requiredObjective)) {
    const widget = page.locator(`[data-sequence="${sequence.id}"]`);
    await checkSequence(widget, sequence.expected, false);
    await checkSequence(widget, sequence.expected, true);
  }

  const recallWidget = page.locator(`[data-recall="${recall.id}"]`);
  assert(await recallWidget.locator('[data-recall-reveal]').isDisabled(), 'Recall requires an own answer');
  await recallWidget.locator('[data-recall-input]').fill('Bei einem SMB-Zugriff sind die Freigaberechte und die NTFS-Rechte am Ziel zu prüfen. Lokal gilt nur die NTFS-Ebene. Vererbung und Eigentum sind getrennt zu prüfen.'.repeat(3));
  await recallWidget.locator('[data-recall-reveal]').press('Enter');
  assert(await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall answer reveals after input');

  const card = page.locator(`[data-flashcard="${flashcard.id}"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard flips with keyboard');
  await page.keyboard.press('Space');
  assert(await card.getAttribute('aria-pressed') === 'false', 'Flashcard flips back with keyboard');

  const first = gates[0];
  if (first.type === 'quiz') {
    const widget = page.locator(`[data-quiz="${first.id}"]`);
    await choose(widget, false);
    await widget.locator('[data-quiz-reset]').press('Enter');
  } else {
    await checkSequence(page.locator(`[data-sequence="${first.id}"]`), first.expected, false);
  }
  assert(await done.isDisabled(), 'Wrong objective attempt does not unlock completion');
  for (const [index, gate] of gates.entries()) {
    if (gate.type === 'quiz') await choose(page.locator(`[data-quiz="${gate.id}"]`), true);
    else await checkSequence(page.locator(`[data-sequence="${gate.id}"]`), gate.expected, true);
    assert((await done.isDisabled()) === (index !== gates.length - 1), `Gate ${index + 1} updates completion`);
  }
  await page.reload();
  assert(!await done.isDisabled(), 'Gates persist across reload');
  await done.click();
  assert(await done.getAttribute('aria-pressed') === 'true', 'Completion can be set');
  await done.click();
  assert(await done.getAttribute('aria-pressed') === 'false', 'Completion can be undone');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme}: no page overflow`);
      if (captureDir) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-top.png`), animations: 'disabled' });
      }
      for (const [index, figure] of (await page.locator('.learning-figure').all()).entries()) {
        await figure.scrollIntoViewIfNeeded();
        assert(await figure.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme}: figure contained`);
        const scroller = figure.locator('.learning-diagram-scroll');
        if (width === 390 && await scroller.count() && await scroller.evaluate(node => node.scrollWidth > node.clientWidth)) {
          await scroller.evaluate(node => { node.scrollLeft = node.scrollWidth; });
          assert(await scroller.evaluate(node => node.scrollLeft > 0), `${width}px ${theme}: wide figure scrolls`);
          await scroller.evaluate(node => { node.scrollLeft = 0; });
        }
        if (captureDir) await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-figure-${index}.png`), animations: 'disabled' });
      }
    }
  }
  assert(errors.length === 0, `No browser errors: ${errors.join('; ')}`);
  console.log(`PASS NTFS/share permissions: ${slug}`);
} finally {
  await browser.close();
}

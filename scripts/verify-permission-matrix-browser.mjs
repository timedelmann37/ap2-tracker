import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const slug = 'berechtigungsmatrix-rollen-ressourcen-rechte';
const spec = JSON.parse(await readFile(new URL(`../content/learning-units/${slug}.unit.json`, import.meta.url), 'utf8'));
const blocks = spec.sections.flatMap(section => section.blocks);
const matrices = blocks.filter(block => block.type === 'permission-matrix');
const diagnostic = blocks.find(block => block.type === 'quiz' && block.diagnostic);
const recall = blocks.find(block => block.type === 'recall');
const flashcard = blocks.find(block => block.type === 'flashcards')?.cards[0];
const figures = blocks.filter(block => block.type === 'figure');
const captureDir = process.env.AP2_MATRIX_CAPTURE_DIR;
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(spec.meta.slug === slug && spec.meta.itemId === 'ga1-7__4', 'Matrix has canonical slug and topic ID');
assert(diagnostic && recall && flashcard, 'Diagnosis, recall and flashcard exist');
assert(matrices.length >= 3, 'At least three complete matrix exercises exist');
assert(matrices.every(block => block.requiredObjective), 'Each matrix exercise is an objective gate');
assert(figures.length >= 2 && figures.length === spec.diagrams.length, 'Technical figures explain the concept');

async function answerQuiz(widget, correct) {
  const index = Number(await widget.getAttribute('data-correct'));
  const count = await widget.locator('[data-answer]').count();
  assert(index >= 0 && index < count && count >= 2, 'Quiz key is valid');
  await widget.locator(`[data-answer="${correct ? index : (index + 1) % count}"]`).press('Enter');
  assert((await widget.locator('[data-selected-feedback]').textContent() || '').trim().length > 20,
    `Diagnosis ${correct ? 'correct' : 'wrong'} answer has explanatory feedback`);
}

function matrixCell(widget, cell) {
  return widget.locator(`[data-matrix-cell="${cell.roleId}:${cell.resourceId}"]`);
}

async function fillMatrix(widget, block, wrongFirst = false) {
  for (const [index, cell] of block.cells.entries()) {
    const choice = wrongFirst && index === 0
      ? block.choices.find(item => item.id !== cell.expected)?.id
      : cell.expected;
    assert(choice, `${block.id}: cell ${index + 1} has an alternative choice`);
    await matrixCell(widget, cell).selectOption(choice);
  }
}

const browser = await chromium.launch();
try {
  if (captureDir) await mkdir(captureDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(`${base}/lernen/${slug}/`);
  assert(response?.status() === 200, 'Matrix lesson loads');
  assert(await page.locator(`body[data-progress-id="${spec.meta.itemId}"]`).count() === 1, 'Matrix maps to canonical topic');
  assert(await page.locator('svg.learning-diagram').count() === figures.length, 'Technical SVGs render inline');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Completion starts locked');

  const diagnosis = page.locator(`[data-quiz="${diagnostic.id}"]`);
  await answerQuiz(diagnosis, false);
  assert(await done.isDisabled(), 'Diagnosis alone never unlocks completion');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await answerQuiz(diagnosis, true);

  for (const [index, block] of matrices.entries()) {
    const widget = page.locator(`[data-permission-matrix="${block.id}"]`);
    assert(await widget.count() === 1, `${block.id}: widget exists`);
    const cells = widget.locator('[data-matrix-cell]');
    assert(await cells.count() === block.roles.length * block.resources.length,
      `${block.id}: every role-resource intersection is editable`);
    assert(await widget.locator('table th[scope="row"]').count() === block.roles.length,
      `${block.id}: table has semantic role headers`);
    assert(await widget.locator('table th[scope="col"]').count() >= block.resources.length,
      `${block.id}: table has semantic resource headers`);
    assert(await cells.evaluateAll(nodes => nodes.every(node => node.getAttribute('aria-label') || node.labels?.length)),
      `${block.id}: every cell is labeled for assistive technology`);
    const check = widget.locator('[data-matrix-check]');
    if (!(await check.isDisabled())) {
      await check.press('Enter');
      assert(await widget.locator('[data-matrix-feedback]').getAttribute('data-result') === 'incomplete',
        `${block.id}: empty matrix is not graded`);
      if (index === 0) {
        await page.reload();
        assert(await widget.locator('[data-matrix-feedback]').getAttribute('data-result') === 'incomplete',
          `${block.id}: incomplete feedback persists`);
      }
    }
    await fillMatrix(widget, block, true);
    assert(!await check.isDisabled(), `${block.id}: filled matrix can be checked`);
    await check.press('Enter');
    const feedback = widget.locator('[data-matrix-feedback]');
    assert(await feedback.getAttribute('data-result') === 'wrong', `${block.id}: wrong cell is rejected`);
    assert((await feedback.textContent() || '').trim().length > 25, `${block.id}: wrong cell has explanatory feedback`);
    assert(await done.isDisabled(), `${block.id}: wrong matrix cannot pass objectives`);
    if (index === 0) {
      await page.reload();
      assert(await feedback.getAttribute('data-result') === 'wrong', `${block.id}: wrong feedback persists`);
      assert(await matrixCell(widget, block.cells[0]).inputValue() !== block.cells[0].expected,
        `${block.id}: wrong answer persists for later correction`);
    }

    await matrixCell(widget, block.cells[0]).selectOption(block.cells[0].expected);
    assert(await done.isDisabled(), `${block.id}: editing without rechecking does not pass`);
    await check.press('Enter');
    assert(await feedback.getAttribute('data-result') === 'correct', `${block.id}: complete matrix is accepted`);
    assert((await feedback.textContent() || '').trim().length > 20, `${block.id}: correct matrix has feedback`);
    assert((await done.isDisabled()) === (index !== matrices.length - 1), `${block.id}: gate updates only when all objectives pass`);

  }

  const firstMatrix = matrices[0];
  const firstWidget = page.locator(`[data-permission-matrix="${firstMatrix.id}"]`);
  const altered = firstMatrix.choices.find(choice => choice.id !== firstMatrix.cells[0].expected)?.id;
  await matrixCell(firstWidget, firstMatrix.cells[0]).selectOption(altered);
  assert(await done.isDisabled(), 'Changing a passed matrix revokes its objective');
  await matrixCell(firstWidget, firstMatrix.cells[0]).selectOption(firstMatrix.cells[0].expected);
  await firstWidget.locator('[data-matrix-check]').press('Enter');
  assert(!await done.isDisabled(), 'Rechecking the corrected matrix restores the objective');
  await firstWidget.locator('[data-matrix-reset]').press('Enter');
  assert(await done.isDisabled(), 'Resetting a passed matrix revokes its objective');
  assert(await firstWidget.locator('[data-matrix-cell]').evaluateAll(nodes => nodes.every(node => !node.value)),
    'Reset clears all matrix selections');
  await page.reload();
  assert(await done.isDisabled(), 'Reset state persists after reload');
  assert(await firstWidget.locator('[data-matrix-cell]').evaluateAll(nodes => nodes.every(node => !node.value)),
    'Reset selections remain empty after reload');
  await fillMatrix(firstWidget, firstMatrix);
  await firstWidget.locator('[data-matrix-check]').press('Enter');
  assert(!await done.isDisabled(), 'Rechecking a reset matrix restores the objective');

  const recallWidget = page.locator(`[data-recall="${recall.id}"]`);
  assert(await recallWidget.locator('[data-recall-reveal]').isDisabled(), 'Recall answer requires own explanation');
  await recallWidget.locator('[data-recall-input]').fill('Ich erfasse die Rollen als Zeilen und die Ressourcen als Spalten. Jede Zelle enthält genau die freigegebenen Aktionen. Nicht zugewiesen ist kein explizites Verbot. Ich prüfe die fachliche Aufgabe, vermeide pauschale Vollrechte und vergleiche die Matrix danach mit den tatsächlichen Gruppen und ACLs. '.repeat(2));
  await recallWidget.locator('[data-recall-reveal]').press('Enter');
  assert(await recallWidget.locator('[data-recall-model]').isVisible(), 'Recall model reveals after answer');
  const card = page.locator(`[data-flashcard="${flashcard.id}"]`);
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard opens by keyboard');
  await page.keyboard.press('Space');
  assert(await card.getAttribute('aria-pressed') === 'false', 'Flashcard closes by keyboard');

  await page.reload();
  assert(!await done.isDisabled(), 'Matrix objectives persist after reload');
  for (const block of matrices) {
    const widget = page.locator(`[data-permission-matrix="${block.id}"]`);
    for (const cell of block.cells) {
      assert(await matrixCell(widget, cell).inputValue() === cell.expected, `${block.id}: cell selection persists`);
    }
  }
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'true', 'Completion can be marked');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'false', 'Completion can be reversed');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      const pageOverflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
        offenders: [...document.querySelectorAll('body *')]
          .map(element => ({ element, rect: element.getBoundingClientRect() }))
          .filter(({ rect }) => rect.right > innerWidth + 1 || rect.left < -1)
          .slice(0, 80)
          .map(({ element, rect }) => `${element.tagName.toLowerCase()}${element.className && typeof element.className === 'string' ? `.${element.className.trim().replaceAll(' ', '.')}` : ''} [${Math.round(rect.left)},${Math.round(rect.right)}]`),
        figureTrail: (() => {
          const trail = [];
          let element = document.querySelector('svg.learning-diagram');
          while (element && trail.length < 8) {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            trail.push(`${element.tagName.toLowerCase()}.${element.className?.baseVal || element.className || ''} [${Math.round(rect.left)},${Math.round(rect.right)}] width=${Math.round(rect.width)} minWidth=${style.minWidth} overflowX=${style.overflowX}`);
            element = element.parentElement;
          }
          return trail;
        })()
      }));
      assert(pageOverflow.scrollWidth <= pageOverflow.viewportWidth,
        `${width}px ${theme}: page has no horizontal overflow (${pageOverflow.scrollWidth}/${pageOverflow.viewportWidth}; ${pageOverflow.offenders.join(', ')}; trail=${pageOverflow.figureTrail.join(' > ')})`);
      if (width === 390) {
        assert(await page.locator('.bottomnav').evaluate(nav => {
          const links = [...nav.querySelectorAll('.bottomnav-link')];
          return getComputedStyle(nav).display === 'grid'
            && links.length === 5
            && links.every((link, index) => index === 0 || links[index - 1].getBoundingClientRect().right <= link.getBoundingClientRect().left + 1);
        }), '390px: five mobile navigation links retain separate columns');
      }
      if (captureDir) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-top.png`), animations: 'disabled' });
      }
      for (const [index, figure] of (await page.locator('.learning-figure').all()).entries()) {
        await figure.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          `${width}px ${theme}: figure ${index + 1} is contained`);
        if (captureDir) await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-figure-${index}.png`), animations: 'disabled' });
      }
      for (const [index, matrix] of (await page.locator('[data-permission-matrix]').all()).entries()) {
        await matrix.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          `${width}px ${theme}: matrix ${index + 1} is contained`);
        if (captureDir) await page.screenshot({ path: path.join(captureDir, `${slug}-${width}-${theme}-matrix-${index}.png`), animations: 'disabled' });
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log(`PASS Berechtigungsmatrix: ${slug}`);
} finally {
  await browser.close();
}

import { chromium } from 'playwright';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const slug = 'schreibtischtest-trace-table-variablenbelegung-algorithmus-schritt-schri';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/lernen/' + slug + '/');
  const done = page.locator('#mark-done');
  for (const id of ['diagnose', 'fehler']) {
    const quiz = page.locator('[data-quiz="' + slug + '-' + id + '"]');
    const wrong = quiz.locator('[data-answer="0"]');
    await wrong.click();
    assert(await wrong.evaluate(el => el.classList.contains('wrong')), id + ': wrong answer identified');
    await quiz.locator('[data-quiz-reset]').click();
    const right = quiz.locator('[data-answer="1"]');
    await right.focus(); await page.keyboard.press('Enter');
    assert(await right.evaluate(el => el.classList.contains('right')), id + ': correct answer identified');
    assert(await done.isDisabled(), id + ': no objective credit');
  }
  const numeric = page.locator('[data-numeric-practice="' + slug + '-summe"]');
  for (const [value, result] of [['8','wrong'],['3','wrong'],['2','wrong'],['7','correct']]) {
    await numeric.locator('[data-numeric-input]').fill(value);
    await numeric.locator('[data-numeric-check]').click();
    assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === result, 'Numeric feedback ' + value);
  }
  assert(await done.isDisabled(), 'Practice does not unlock completion');
  const recall = page.locator('[data-recall="' + slug + '-begruendung"]');
  assert(!await recall.locator('[data-recall-model]').isVisible(), 'Hidden model');
  await recall.locator('[data-recall-input]').fill('Bei drei müssen ein Gerät und drei Fehlversuche ausgegeben werden. Die falsche Bedingung lässt beide Variablen bei null. Fünf unterscheidet beide Bedingungen nicht.');
  await recall.locator('[data-recall-reveal]').focus();
  await page.keyboard.press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model revealed');
  await page.reload();
  assert((await recall.locator('[data-recall-input]').inputValue()).startsWith('Bei drei'), 'Recall persisted');
  const first = page.locator('[data-quiz="' + slug + '-transfer-a"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong answer keeps gate closed');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="' + slug + '-transfer-b"] [data-answer="2"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock completion');
  await page.reload();
  assert(!await done.isDisabled(), 'Objectives persisted');
  await done.click();
  assert(await done.getAttribute('aria-pressed') === 'true', 'Mark done');
  await done.click();
  assert(await done.getAttribute('aria-pressed') === 'false', 'Undo done');
  const card = page.locator('[data-flashcard="' + slug + '-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard card');
  assert(await page.locator('math').count() === 1, 'Graphical formula');
  assert(await page.locator('.learning-diagram').count() === 1, 'Instructional diagram');
  for (const width of [390,1440]) {
    await page.setViewportSize({width,height:1000});
    for (const theme of ['dark','light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme',t),theme);
      for (const [name, target] of [['diagram',page.locator('.learning-figure')],['table',page.locator('table').first()],['practice',numeric]]) {
        await target.scrollIntoViewIfNeeded();
        if (name === 'table' && width === 390) {
          assert(await target.evaluate(el => { const wrap = el.closest('.twrap'); wrap.scrollLeft = wrap.scrollWidth; return wrap.scrollLeft > 0; }), 'Mobile table can scroll to result columns');
        }
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No page overflow: ' + JSON.stringify(await page.locator('main *').evaluateAll(nodes => nodes.filter(n => n.getBoundingClientRect().right > innerWidth).map(n => ({tag:n.tagName,cls:n.className,text:n.textContent.slice(0,90)})).slice(0,12))));
        if(process.env.AP2_TRACE_CAPTURE === '1') {
          await page.evaluate(async () => { await document.fonts.ready; await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); });
          await page.screenshot({path:'.trace-' + name + '-' + width + '-' + theme + '.png',animations:'disabled'});
        }
      }
    }
  }
  assert(!errors.length,errors.join('\n'));
  console.log('PASS trace unit: numeric feedback, recall, keyboard, objective gates, persistence, undo, mobile/themes');
} finally { await browser.close(); }

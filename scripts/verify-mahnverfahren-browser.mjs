import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, msg) => { if (!ok) throw new Error(msg); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_MAHN_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/mahnung-verzugszinsen-mahnverfahren-verjaehrung/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="wiso-7__10"]').count() === 1, 'Tracker key');
  const text = await page.locator('body').innerText();
  for (const term of ['Mahnung', 'Verzugszinsen', 'Mahnbescheid', 'Vollstreckungsbescheid', 'Verjährung', 'Hemmung', 'Verbraucher', 'Einspruch']) assert(text.includes(term), 'Concept ' + term);
  assert(await page.locator('.learning-figure svg').count() === 3, 'Three technical diagrams');
  assert(await page.locator('math[aria-label]').count() === 3, 'Three semantic formulas');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Gate initially locked');
  const diagnosis = page.locator('[data-quiz="mahn-diagnose"]');
  await diagnosis.locator('[data-answer="0"]').press('Enter');
  assert(await done.isDisabled(), 'Wrong diagnosis does not unlock');
  assert((await diagnosis.locator('[data-selected-feedback]').textContent()).length > 25, 'Diagnosis feedback');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await diagnosis.locator('[data-answer="1"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not required gate');
  for (const [id, correct] of [['mahn-verzug', 0], ['mahn-zinsen', 1], ['mahn-gericht', 2], ['mahn-frist', 1]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Specific feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(!await done.isDisabled(), 'All four checks unlock');
  const numeric = page.locator('[data-numeric-practice="mahn-zinsbetrag"]');
  await numeric.locator('[data-numeric-input]').fill('4,44');
  await numeric.locator('[data-numeric-check]').press('Enter');
  assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'wrong', 'Wrong rate rejected');
  assert((await numeric.locator('[data-numeric-feedback]').innerText()).includes('Basiszins'), 'Specific numeric misconception feedback');
  await numeric.locator('[data-numeric-input]').fill('4,93');
  await numeric.locator('[data-numeric-check]').press('Enter');
  assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'correct', 'Comma decimal accepted');
  const recall = page.locator('[data-recall="mahn-abruf"]');
  await recall.locator('[data-recall-input]').fill('Kurz.');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Short recall locked');
  await recall.locator('[data-recall-input]').fill("Im gesetzten Fall begründet die Mahnung nach Fälligkeit bei Nichtleistung und Vertretenmüssen Verzug. Drei Briefe sind nicht erforderlich. Weil die Entgeltforderung aus einem Rechtsgeschäft ohne Verbraucher stammt, kommen neun Prozentpunkte zum fiktiven Basiszins von einem Prozent hinzu: zehn Prozent jährlich. Bei 1.200 Euro und 30 vorgegebenen Tagen mit 365 als Jahresnenner ergeben sich 9,86 Euro Zinsen. Eine mögliche 40-Euro-Pauschale ist gesondert, weil der Schuldner kein Verbraucher ist; Rechtsverfolgungsschäden nicht doppelt zählen. Der Mahnbescheid ist keine inhaltliche Bestätigung der Forderung. Nela prüft Widerspruch beim Gericht und beachtet die Zwei-Wochen-Reaktionsfrist ab Zustellung. § 694 erlaubt Widerspruch solange der Vollstreckungsbescheid nicht verfügt ist; darauf sollte sie nicht warten. Ein Vollstreckungsbescheid verlangt einen weiteren Antrag; dagegen heißt der Rechtsbehelf Einspruch, regulär zwei Wochen im inländischen Grundfall. Streitige Ansprüche werden im anschließenden Streitverfahren geprüft. Regelverjährung beginnt mit Schluss 2026 und läuft im Fall ohne Friständerung bis 31.12.2029. Ein weiterer Mahnbrief allein ändert dies nicht. Zustellung eines Mahnbescheids kann hemmen, und § 167 setzt für die Rückwirkung demnächstige Zustellung voraus. Hemmung hält den Fristlauf an; Anerkenntnis kann einen Neubeginn bewirken. Verjährung ist ein Leistungsverweigerungsrecht, kein automatisches Löschen der Forderung.");
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');
  for (const id of ['verzug', 'zinsen', 'gericht', 'transfer']) {
    const card = page.locator('[data-flashcard="' + id + '"]');
    await card.press('Enter');
    assert(await card.getAttribute('aria-pressed') === 'true', 'Card opens');
    await card.press('Space');
    assert(await card.getAttribute('aria-pressed') === 'false', 'Card closes');
  }
  await page.reload();
  assert(!await done.isDisabled(), 'Gate persists on reload');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'true', 'Completion');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'false', 'Undo completion');
  await page.locator('[data-quiz="mahn-frist"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Reset locks gate');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
      for (const [name, target] of [['numeric', numeric], ['quiz', page.locator('[data-quiz="mahn-gericht"]')], ['case', page.locator('p').filter({ hasText: 'Eigener Praxisfall Nela:' }).first()], ['recall', recall]]) {
        await target.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No page overflow');
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-' + name + '.png') });
      }
      for (const [i, formula] of (await page.locator('math').all()).entries()) {
        await formula.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'Formula does not overflow page');
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-formula-' + i + '.png') });
      }
      for (const card of await page.locator('[data-flashcard]').all()) {
        await card.scrollIntoViewIfNeeded();
        assert(await card.locator('.front').evaluate(n => { const t=n.querySelector('strong').getBoundingClientRect(); return t.top >= n.querySelector('.k').getBoundingClientRect().bottom && t.bottom <= n.querySelector('small').getBoundingClientRect().top; }), 'Card front fits');
        await card.press('Enter');
        assert(await card.locator('.back').evaluate(n => { const t=n.querySelector('span:not(.k)').getBoundingClientRect(); return t.top >= n.querySelector('.k').getBoundingClientRect().bottom && t.bottom <= n.getBoundingClientRect().bottom-8; }), 'Card reverse fits');
        if (captures && await card.getAttribute('data-flashcard') === 'transfer') await page.screenshot({ path: path.join(captures, width + '-' + theme + '-card.png') });
        await card.press('Space');
      }
      for (const [i, fig] of (await page.locator('.learning-figure').all()).entries()) {
        await fig.scrollIntoViewIfNeeded();
        assert(await fig.locator('svg text').evaluateAll(nodes => nodes.every(n => { const b=n.getBBox(), v=n.ownerSVGElement.viewBox.baseVal; return b.x>=v.x && b.x+b.width<=v.width && b.y>=v.y && b.y+b.height<=v.height; })), 'SVG text inside canvas');
        const fits = await fig.locator('svg g').evaluateAll(groups => groups.every(g => { const rect=g.querySelector('rect'); if (!rect) return true; const r=rect.getBBox(); return [...g.querySelectorAll('text')].every(t => {const b=t.getBBox(); return b.x>=r.x+8 && b.x+b.width<=r.x+r.width-8 && b.y>=r.y && b.y+b.height<=r.y+r.height; }); }));
        if (!fits) console.log(JSON.stringify(await fig.locator('svg g').evaluateAll(groups => groups.map(g => { const rect=g.querySelector('rect'); if (!rect) return { flow:g.textContent }; const r=rect.getBBox(); return { rect:{x:r.x,y:r.y,w:r.width,h:r.height}, text:[...g.querySelectorAll('text')].map(t=>{const b=t.getBBox(); return {text:t.textContent,x:b.x,y:b.y,w:b.width,h:b.height};}) }; }))));
        assert(fits, 'Labels inside own boxes: figure ' + i);
        if (width === 390) { const scroll=fig.locator('.learning-diagram-scroll'); await scroll.focus(); await page.keyboard.press('ArrowRight'); await page.waitForFunction(n => n.scrollLeft>0, await scroll.elementHandle()); await scroll.evaluate(n=>{n.scrollLeft=0;}); }
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-figure-' + i + '.png') });
      }
    }
  }
  assert(errors.length === 0, errors.join('; '));
  console.log('PASS Mahnverfahren: learning gates, feedback, recall, keyboard cards, persistence, completion and responsive diagram containment');
} finally { await browser.close(); }

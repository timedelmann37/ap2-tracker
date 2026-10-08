import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_RECHTSFORMEN_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/rechtsformen-haftung-kapital-leitung-gewinn/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="wiso-6__5"]').count() === 1, 'Tracker key');
  const lessonText = await page.locator('body').innerText();
  for (const term of ['Einzelunternehmen', 'GbR', 'OHG', 'KG', 'GmbH', 'UG', 'AG', 'eG', 'Haftsumme', 'Verlustvortrag', '25.000', '50.000', 'Gewinnverteilung']) assert(lessonText.includes(term), 'Rendered concepts: ' + term);
  assert(await page.locator('math').count() === 2, 'Two semantic formulas');
  const formulas = await page.locator('math').allTextContents();
  assert(formulas[0].includes('8000') && formulas[1].includes('2000'), 'Calculated formula values');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Required checks lock completion');
  const diagnosis = page.locator('[data-quiz="rechtsformen-diagnose"]');
  await diagnosis.locator('[data-answer="0"]').press('Enter');
  assert(await done.isDisabled(), 'Wrong diagnosis does not unlock completion');
  assert((await diagnosis.locator('[data-selected-feedback]').textContent()).length > 25, 'Diagnosis explains learning-site boundary');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await page.locator('[data-quiz="rechtsformen-diagnose"] [data-answer="2"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not a gate');
  for (const [id, correct] of [['rechtsformen-begriffe', 0], ['rechtsformen-personen', 1], ['rechtsformen-kg', 2], ['rechtsformen-kapital', 0], ['rechtsformen-organe', 1], ['rechtsformen-gewinn', 2]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Explanatory feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(!await done.isDisabled(), 'All checks unlock');
  const recall = page.locator('[data-recall="rechtsformen-transfer"]');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Own recall first');
  await recall.locator('[data-recall-input]').fill('Nur Datum.');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Short recall remains locked');
  await recall.locator('[data-recall-input]').fill("Ein Einzelunternehmen hat eine Inhaberperson, kann aber Beschäftigte haben. Bei der GbR begrenzt eine interne Halbteilung die persönliche gesamtschuldnerische Außenhaftung nicht. In der KG führt im Grundmodell der Komplementär; der Kommanditist ist als solcher von der Geschäftsführung ausgeschlossen. Seine Haftsumme, vereinbarte Einlage und tatsächliche Leistung werden getrennt geprüft. Bei GmbH und UG haftet grundsätzlich das ganze Gesellschaftsvermögen, nicht nur der Kapitalnennbetrag; persönliche Sicherheiten und andere Haftungsgründe bleiben gesondert relevant. GmbH-Mindeststammkapital sind 25.000 Euro, nicht 12.500 Euro. Die UG bildet ein Viertel des um Verlustvortrag geminderten Jahresüberschusses als Rücklage; im eigenen Fall 2.000 Euro. Ansparen allein macht sie nicht automatisch zur GmbH. Die AG wird vom Vorstand geleitet und vom Aufsichtsrat überwacht; Aktionäre üben gesetzliche Beschlussrechte in der Hauptversammlung aus. Die eG fördert Mitglieder; grundsätzlich gleiche Stimme bedeutet nicht gleiche Gewinnverteilung. Bei Gewinnaufgaben prüfe ich Vertrag, geeigneten Verteilungsbetrag und Schlüssel, dann rechne ich und trenne Gewinnanteil von Auszahlung.");
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model appears');
  for (const id of ['begriffe', 'personen', 'kg', 'kapital', 'organe', 'gewinn']) {
    const card = page.locator('[data-flashcard="' + id + '"]');
    await card.press('Enter');
    assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard card opens: ' + id);
    await card.press('Space');
    assert(await card.getAttribute('aria-pressed') === 'false', 'Keyboard card closes: ' + id);
  }
  await page.reload();
  assert(!await done.isDisabled(), 'Checks persist');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'true', 'Completion works');
  await done.press('Enter');
  assert(await done.getAttribute('aria-pressed') === 'false', 'Completion can be undone');
  await page.locator('[data-quiz="rechtsformen-gewinn"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Gate reset locks again');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
      for (const [name, target] of [['quiz', page.locator('[data-quiz="rechtsformen-kapital"]')], ['case', page.locator('p').filter({ hasText: 'Praxisfall A:' }).first()], ['cards', page.locator('[data-flashcard="begriffe"]')], ['transfer', recall], ['comparison', page.locator('p').filter({ hasText: 'Vergleichshilfe – Personen und Haftung zuerst:' }).first()]]) {
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No content overflow');
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-' + name + '.png') });
      }
      for (const card of await page.locator('[data-flashcard]').all()) {
        await card.scrollIntoViewIfNeeded();
        assert(await card.locator('.front').evaluate(n => {
          const t = n.querySelector('strong').getBoundingClientRect();
          return t.top >= n.querySelector('.k').getBoundingClientRect().bottom && t.bottom <= n.querySelector('small').getBoundingClientRect().top;
        }), 'Card front fits');
        await card.press('Enter');
        assert(await card.locator('.back').evaluate(n => {
          const t = n.querySelector('span:not(.k)').getBoundingClientRect();
          return t.top >= n.querySelector('.k').getBoundingClientRect().bottom && t.bottom <= n.getBoundingClientRect().bottom - 8;
        }), 'Card reverse fits');
        if (captures && await card.getAttribute('data-flashcard') === 'kapital') {
          await card.evaluate(n => n.scrollIntoView({ block: 'center' }));
          await page.screenshot({ path: path.join(captures, width + '-' + theme + '-card-reverse.png') });
        }
        await card.press('Space');
      }
      for (const [i, formula] of (await page.locator('math').all()).entries()) {
        await formula.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No formula page overflow');
        assert(await formula.getAttribute('aria-label'), 'Formula accessible name');
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-formula-' + i + '.png') });
      }
      for (const [i, fig] of (await page.locator('.learning-figure').all()).entries()) {
        await fig.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No page overflow');
        const boxes = await fig.locator('svg text').evaluateAll(nodes => nodes.map(n => { const b = n.getBBox(); const v = n.ownerSVGElement.viewBox.baseVal; return b.x >= 0 && b.y >= 0 && b.x + b.width <= v.width && b.y + b.height <= v.height; }));
        assert(boxes.every(Boolean), 'Diagram labels inside canvas');
        const columns = await fig.locator('.diagram-comparison g, .diagram-flow g, .diagram-layers g').evaluateAll(groups => groups.every(g => {
          const r = g.querySelector('rect').getBBox();
          return [...g.querySelectorAll('text')].every(t => {
            const b = t.getBBox();
            return b.x >= r.x + 8 && b.x + b.width <= r.x + r.width - 8 && b.y >= r.y && b.y + b.height <= r.y + r.height;
          });
        }));
        if (!columns) console.log(JSON.stringify(await fig.locator('.diagram-comparison g').evaluateAll(groups => groups.map(g => { const r=g.querySelector('rect').getBBox(); return {x:r.x,width:r.width,texts:[...g.querySelectorAll('text')].map(t=>{ const b=t.getBBox(); return {text:t.textContent,x:b.x,width:b.width}; })}; }))));
        assert(columns, 'Board text stays inside its own column');
        assert(await fig.locator('.diagram-layers g').evaluateAll(groups => groups.every(g => {
          const key = g.querySelector('.diagram-key').getBBox();
          const texts = [...g.querySelectorAll('text')];
          const label = texts[0].getBBox();
          return label.x >= key.x + 8 && label.x + label.width <= key.x + key.width - 8 && texts.slice(1).every(t => t.getBBox().x >= key.x + key.width + 8);
        })), 'Parallel branch labels fit and do not overlap details');
        if (width === 390) {
          const scroll = fig.locator('.learning-diagram-scroll');
          await scroll.focus(); await page.keyboard.press('ArrowRight');
          await page.waitForFunction(n => n.scrollLeft > 0, await scroll.elementHandle());
          await scroll.evaluate(n => { n.scrollLeft = 0; });
        }
        if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-figure-' + i + '.png') });
      }
    }
  }
  assert(errors.length === 0, errors.join('; '));
  console.log('PASS Ausführliche Rechtsformen: quizzes, recall, keyboard cards, persistence, completion, responsive diagrams and label containment');
} finally { await browser.close(); }

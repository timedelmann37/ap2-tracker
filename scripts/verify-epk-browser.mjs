import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_EPK_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/ablauforganisation-prozessdenken-epk/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="wiso-6__10"]').count() === 1, 'Tracker key');
  const lessonText = await page.locator('body').innerText();
  for (const term of ['Ablauforganisation', 'Ereignis', 'Funktion', 'XOR', 'UND', 'ODER', 'Kontrollfluss']) assert(lessonText.includes(term), 'Rendered concepts: ' + term);
  assert(await page.locator('.diagram-epk').count() === 3, 'Three EPC diagrams');
  assert(await page.locator('.epk-event').count() === 11, 'Events are hexagons');
  assert(await page.locator('.epk-function').count() === 7, 'Seven activity nodes');
  assert(await page.locator('.epk-xor').count() === 1 && await page.locator('.epk-and').count() === 2, 'Split and join symbols');
  assert(await page.locator('math').count() === 0, 'No artificial formulas');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Required checks lock completion');
  const diagnosis = page.locator('[data-quiz="epk-diagnose"]');
  await diagnosis.locator('[data-answer="0"]').press('Enter');
  assert(await done.isDisabled(), 'Wrong diagnosis does not unlock completion');
  assert((await diagnosis.locator('[data-selected-feedback]').textContent()).length > 25, 'Diagnosis explains learning-site boundary');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await page.locator('[data-quiz="epk-diagnose"] [data-answer="1"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not a gate');
  for (const [id, correct] of [['epk-prozess', 0], ['epk-symbole', 0], ['epk-logik', 2], ['epk-transfer', 1]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Explanatory feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(!await done.isDisabled(), 'All checks unlock');
  const recall = page.locator('[data-recall="epk-abruf"]');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Own recall first');
  await recall.locator('[data-recall-input]').fill('Nur Datum.');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Short recall remains locked');
  await recall.locator('[data-recall-input]').fill("Ablauforganisation beschreibt die Durchführung und Übergaben, Aufbauorganisation die Zuständigkeiten. Ein Prozess hat einen Auslöser, benötigte Informationen und ein prüfbares Ergebnis. In der klassischen EPK sind Ereignisse Zustände im Sechseck, Funktionen Tätigkeiten im abgerundeten Rechteck. Start und Ende sind Ereignisse; dazwischen wechseln sie mit nötigen Konnektoren. XOR wählt genau einen Weg, UND aktiviert alle, ODER mindestens einen auch mehrere. Ein UND-Join wartet auf beide notwendigen Ergebnisse; ein XOR-Join wartet nicht auf einen alternativen, nie aktivierten Zweig. Eine Entscheidung wird in einer Funktion getroffen. Im Lernfall werden vollständige Freigabe und Ablehnung modelliert; Zuständigkeiten und Systeme können die EPK erweitern, sind aber nicht der Kontrollfluss. Muster zur Softwarebestellung: Bestellung ist eingegangen; Bedarf prüfen; XOR. Genehmigter Zweig: Bestellung ist genehmigt; Lizenz bestellen; Lizenz ist bestellt. Alternativer Zweig: Bestellung ist abgelehnt; Antragsteller informieren; Ablehnung ist mitgeteilt.");
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model appears');
  for (const id of ['prozess', 'symbole', 'logik', 'transfer']) {
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
  await page.locator('[data-quiz="epk-transfer"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Gate reset locks again');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      assert(await page.locator('.epk-node').evaluateAll(nodes => {
        const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        ctx.canvas.width = ctx.canvas.height = 1;
        const luminance = color => {
          ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1);
          const c = [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3).map(v => {
            v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
          });
          return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
        };
        return nodes.every(g => {
          const a = luminance(getComputedStyle(g.querySelector('text')).fill);
          const b = luminance(getComputedStyle(g.querySelector('polygon, rect, circle')).fill);
          return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5;
        });
      }), 'EPK node text contrast at least 4.5:1');
      await page.evaluate(() => window.scrollTo(0, 0));
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
      for (const [name, target] of [['quiz', page.locator('[data-quiz="epk-logik"]')], ['case', page.locator('p').filter({ hasText: 'Praxisfall:' }).first()], ['cards', page.locator('[data-flashcard="prozess"]')], ['transfer', recall], ['orientation', page.locator('p').filter({ hasText: 'Fehlerfall:' }).first()]]) {
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
        if (captures && await card.getAttribute('data-flashcard') === 'transfer') {
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
        const boxes = await fig.locator('svg text').evaluateAll(nodes => nodes.map(n => { const b = n.getBBox(); const p = n.closest('.epk-node'); if (p) { const m = p.transform.baseVal.consolidate().matrix; b.x += m.e; b.y += m.f; } const v = n.ownerSVGElement.viewBox.baseVal; return b.x >= 0 && b.y >= 0 && b.x + b.width <= v.width && b.y + b.height <= v.height; }));
        assert(boxes.every(Boolean), 'Diagram labels inside canvas');
        assert(await fig.locator('.epk-node').evaluateAll(nodes => nodes.every(g => {
          const shape = g.querySelector('polygon, rect, circle').getBBox();
          const b = g.querySelector('text').getBBox();
          return b.x >= shape.x + 6 && b.x + b.width <= shape.x + shape.width - 6 && b.y >= shape.y + 5 && b.y + b.height <= shape.y + shape.height - 5;
        })), 'EPK labels contained in their own shapes');
        assert(await fig.locator('.epk-edge').evaluateAll(edges => edges.every(e => e.getAttribute('marker-end')?.startsWith('url(#epk-'))), 'Directed control-flow edges');
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
  console.log('PASS EPK: quizzes, recall, keyboard cards, persistence, completion, responsive diagrams and label containment');
} finally { await browser.close(); }

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_ZEIT_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/arbeitszeitgesetz-pausen-ruhezeit-sonntag/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="wiso-2__4"]').count() === 1, 'Tracker key');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Required checks lock completion');
  const diagnosis = page.locator('[data-quiz="zeit-diagnose"]');
  await diagnosis.locator('[data-answer="0"]').press('Enter');
  assert(await done.isDisabled(), 'Wrong diagnosis does not unlock completion');
  assert((await diagnosis.locator('[data-selected-feedback]').textContent()).length > 25, 'Diagnosis explains learning-site boundary');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await page.locator('[data-quiz="zeit-diagnose"] [data-answer="2"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not a gate');
  const numeric = page.locator('[data-numeric-practice="zeit-netto"]');
  await numeric.locator('[data-numeric-input]').fill('630');
  await numeric.locator('[data-numeric-check]').press('Enter');
  assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'wrong', 'Presence is not working time');
  await numeric.locator('[data-numeric-input]').fill('585,0');
  await numeric.locator('[data-numeric-check]').press('Enter');
  assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result') === 'correct', 'Net minutes accepted');
  assert(await done.isDisabled(), 'Numeric practice alone cannot unlock completion');
  for (const [id, correct] of [['zeit-zeit', 0], ['zeit-ruhe', 1], ['zeit-sonntag', 2]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Explanatory feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(!await done.isDisabled(), 'All checks unlock');
  const recall = page.locator('[data-recall="zeit-transfer"]');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Own recall first');
  await recall.locator('[data-recall-input]').fill('Nur Uhr.');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Short recall remains locked');
  await recall.locator('[data-recall-input]').fill("Taren ist im eigenen Fall volljähriger Arbeitnehmer bei Olvian ohne besondere Abweichungsregel. Von 07:30 bis 18:00 liegen 630 Minuten. Die vorab feststehenden echten Ruhepausen von 12:00 bis 12:30 und 15:00 bis 15:15 ergeben 45 Minuten. Die Nettoarbeitszeit beträgt 585 Minuten, also 9 Stunden 45 Minuten oder 9,75 Dezimalstunden. Die Arbeitsabschnitte sind 4 Stunden 30 Minuten, 2 Stunden 30 Minuten und 2 Stunden 45 Minuten; keiner überschreitet sechs Stunden. Für mehr als neun Stunden Arbeit sind insgesamt mindestens 45 Minuten Pause nötig. Genau neun Stunden erfordern nach § 4 mindestens 30 Minuten, genau sechs Stunden noch keine Mindestpause nach dieser Norm. Der Tag liegt unter zehn, aber über acht Stunden: Der Durchschnittsausgleich nach § 3 muss innerhalb von sechs Kalendermonaten oder 24 Wochen belegt werden. In einem getrennten Fall enden die Arbeiten um 20:00. Ein Neustart um 06:30 lässt nur 10 Stunden 30 Minuten Ruhe; die Grundregel verlangt elf Stunden. Ab 07:00 wäre nur diese Ruhezeitvorgabe erfüllt, nicht der gesamte Dienstplan geprüft. Sonntagsarbeit ist grundsätzlich verboten. Die IT-Branche allein ist keine Ausnahme: § 10 Abs. 1 Nr. 14 verlangt eine passende Aufgabe und dass sie nicht werktags erledigt werden kann. Bei zulässiger Arbeit sind weitere Grenzen und Ersatzruhe nach § 11 zu beachten: Sonntag zwei Wochen, werktäglicher Feiertag acht Wochen, jeweils einschließlich des Beschäftigungstags.");
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model appears');
  for (const id of ['zeit', 'ruhe', 'sonntag']) {
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
  await page.locator('[data-quiz="zeit-sonntag"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Gate reset locks again');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
      for (const [name, target] of [['quiz', page.locator('[data-quiz="zeit-ruhe"]')], ['case', page.locator('p').filter({ hasText: 'Praxisfall:' }).first()], ['cards', page.locator('[data-flashcard="zeit"]')], ['transfer', recall]]) {
        await target.scrollIntoViewIfNeeded();
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
        if (captures && await card.getAttribute('data-flashcard') === 'ruhe') {
          await card.evaluate(n => n.scrollIntoView({ block: 'center' }));
          await page.screenshot({ path: path.join(captures, width + '-' + theme + '-card-reverse.png') });
        }
        await card.press('Space');
      }
      for (const [i, formula] of (await page.locator('math').all()).entries()) {
        await formula.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No formula page overflow');
        assert(await formula.getAttribute('aria-label'), 'Formula accessible name');
        if (captures && (i === 0 || i === 1)) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-formula-' + i + '.png') });
      }
      for (const [i, fig] of (await page.locator('.learning-figure').all()).entries()) {
        await fig.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), 'No page overflow');
        const boxes = await fig.locator('svg text').evaluateAll(nodes => nodes.map(n => { const b = n.getBBox(); const v = n.ownerSVGElement.viewBox.baseVal; return b.x >= 0 && b.y >= 0 && b.x + b.width <= v.width && b.y + b.height <= v.height; }));
        assert(boxes.every(Boolean), 'Diagram labels inside canvas');
        const columns = await fig.locator('.diagram-comparison g, .diagram-flow g').evaluateAll(groups => groups.every(g => {
          const r = g.querySelector('rect').getBBox();
          return [...g.querySelectorAll('text')].every(t => {
            const b = t.getBBox();
            return b.x >= r.x + 8 && b.x + b.width <= r.x + r.width - 8 && b.y >= r.y && b.y + b.height <= r.y + r.height;
          });
        }));
        if (!columns) console.log(JSON.stringify(await fig.locator('.diagram-comparison g').evaluateAll(groups => groups.map(g => { const r=g.querySelector('rect').getBBox(); return {x:r.x,width:r.width,texts:[...g.querySelectorAll('text')].map(t=>{ const b=t.getBBox(); return {text:t.textContent,x:b.x,width:b.width}; })}; }))));
        assert(columns, 'Board text stays inside its own column');
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
  console.log('PASS Arbeitszeitgesetz: quizzes, recall, keyboard cards, persistence, completion, responsive diagrams and label containment');
} finally { await browser.close(); }

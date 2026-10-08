import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const assert = (ok, msg) => { if (!ok) throw new Error(msg); };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const captures = process.env.AP2_BSD_CAPTURE_DIR;
  if (captures) await mkdir(captures, { recursive: true });
  assert((await page.goto((process.env.AP2_BASE_URL || 'http://127.0.0.1:4321') + '/lernen/beschaeftigtendatenschutz-mitarbeiterdaten-it-systeme/'))?.status() === 200, 'Lesson loads');
  assert(await page.locator('body[data-progress-id="wiso-8__3"]').count() === 1, 'Tracker key');
  const text = await page.locator('body').innerText();
  for (const term of ['Beschäftigtendatenschutz', 'Adminrechte', 'Einwilligung', 'Gesundheitsdaten', 'Betriebsrat', 'synthetische', 'unangewendet', '08.05.2025']) assert(text.includes(term), 'Concept ' + term);
  assert(await page.locator('.learning-figure svg').count() === 3, 'Three technical diagrams');
  assert(await page.locator('math[aria-label]').count() === 0, 'No arithmetic formula needed');
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Gate initially locked');
  const diagnosis = page.locator('[data-quiz="bsd-diagnose"]');
  await diagnosis.locator('[data-answer="0"]').press('Enter');
  assert(await done.isDisabled(), 'Wrong diagnosis does not unlock');
  assert((await diagnosis.locator('[data-selected-feedback]').textContent()).length > 25, 'Diagnosis feedback');
  await diagnosis.locator('[data-quiz-reset]').press('Enter');
  await diagnosis.locator('[data-answer="1"]').press('Enter');
  assert(await done.isDisabled(), 'Diagnosis is not required gate');
  for (const [id, correct] of [['bsd-zweck', 0], ['bsd-einwilligung', 1], ['bsd-kontrolle', 2], ['bsd-zugriff', 1]]) {
    const q = page.locator('[data-quiz="' + id + '"]');
    await q.locator('[data-answer="' + ((correct + 1) % 3) + '"]').press('Enter');
    assert(await done.isDisabled(), 'Wrong answer cannot unlock');
    assert((await q.locator('[data-selected-feedback]').textContent()).length > 25, 'Specific feedback');
    await q.locator('[data-quiz-reset]').press('Enter');
    await q.locator('[data-answer="' + correct + '"]').press('Enter');
  }
  assert(!await done.isDisabled(), 'All four checks unlock');
  const recall = page.locator('[data-recall="bsd-abruf"]');
  await recall.locator('[data-recall-input]').fill('Kurz.');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Short recall locked');
  await recall.locator('[data-recall-input]').fill("Jonas trennt jeden Verarbeitungszweck. Ein Passwortreset braucht keine Diagnosen und keinen pauschalen Vollzugriff auf Personalfachdaten. Technische Adminrechte ersetzen nicht die rechtliche Erlaubnis. Die Rechtsgrundlage muss konkret und DSGVO-konform geprüft werden; § 26 Abs. 1 Satz 1 ist nach aktueller Rechtsprechung keine pauschale Freigabe. Für den HR-Test reichen im Fall synthetische Daten, deshalb fehlt ein notwendiger Echtdatenimport. Gesundheitsdaten verlangen zudem eine Art.-9-Ausnahme und besondere Schutzmaßnahmen. Die fortlaufenden Bildschirmaufnahmen werden nicht allein mit Gerätebesitz, Information oder Betriebsratsbeteiligung gerechtfertigt. Grundlage, Anlass, Verhältnismäßigkeit und mildere Mittel sind vor Aktivierung zu klären. Für die Strafaufklärung nennt der Normtext dokumentierte tatsächliche Anhaltspunkte und begrenzte erforderliche Verarbeitung; diese sind hier nicht gesetzt. Mitbestimmung ist gesondert zu beachten und ersetzt keinen Datenschutz. Bonusdruck spricht gegen freiwillige Fotoeinwilligung; echte Ablehnung ohne Nachteil und ein einfacher Widerruf sind erforderlich. Beim Ausscheiden werden Zugänge gesperrt und Berechtigungen angepasst. Personalunterlagen werden nach Datenart, Zweck und Pflichten behandelt; nicht pauschal sofort alles löschen oder unbegrenzt aufbewahren. Rollen, Information, Fristen und Entscheidungen sind nachvollziehbar festzuhalten.");
  await recall.locator('[data-recall-reveal]').press('Enter');
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model revealed');
  for (const id of ['zweck', 'einwilligung', 'kontrolle', 'transfer']) {
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
  await page.locator('[data-quiz="bsd-zugriff"] [data-quiz-reset]').press('Enter');
  assert(await done.isDisabled(), 'Reset locks gate');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      assert(await page.locator('h1').evaluate(n => { const b=n.getBoundingClientRect(); const r=document.createRange(); r.selectNodeContents(n); return [...r.getClientRects()].every(x => x.left >= b.left-1 && x.right <= b.right+1); }), 'Title text fits without clipping');
      if (captures) await page.screenshot({ path: path.join(captures, width + '-' + theme + '-start.png') });
      for (const [name, target] of [['quiz', page.locator('[data-quiz="bsd-kontrolle"]')], ['case', page.locator('p').filter({ hasText: 'Eigener Praxisfall Mila:' }).first()], ['recall', recall]]) {
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
  console.log('PASS Beschäftigtendatenschutz: learning gates, feedback, recall, keyboard cards, persistence, completion and responsive diagram containment');
} finally { await browser.close(); }

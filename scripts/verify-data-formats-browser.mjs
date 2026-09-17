import { chromium } from 'playwright';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const slug = 'yaml-json-lesen-syntaxfehler-finden';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
 const page = await browser.newPage();
 const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 await page.goto(base+'/lernen/'+slug+'/');
 const done=page.locator('#mark-done');
 for(const id of ['diagnose','uebung']) {
  const q=page.locator('[data-quiz="'+slug+'-'+id+'"]');
  await q.locator('[data-answer="0"]').click();
  assert(await q.locator('[data-answer="0"]').evaluate(el=>el.classList.contains('wrong')), 'Wrong feedback');
  await q.locator('[data-quiz-reset]').click();
  await q.locator('[data-answer="1"]').focus(); await page.keyboard.press('Enter');
  assert(await q.locator('[data-answer="1"]').evaluate(el=>el.classList.contains('right')), 'Correct feedback');
  assert(await done.isDisabled(),'Supplementary quiz cannot unlock');
 }
 const n=page.locator('[data-numeric-practice="'+slug+'-anzahl"]');
 for(const [value,result] of [['2','wrong'],['3','correct']]) {
  await n.locator('[data-numeric-input]').fill(value); await n.locator('[data-numeric-check]').click();
  assert(await n.locator('[data-numeric-feedback]').getAttribute('data-result')===result,'Numeric '+value);
 }
 const seq=page.locator('[data-sequence="'+slug+'-reihenfolge"]');
 await seq.locator('[data-sequence-check]').click();
 assert((await seq.locator('[data-sequence-feedback]').textContent()).includes('Ohne verlässlich'),'Wrong order');
 for(const step of ['syntax','vertrag']) {
  await seq.locator('[data-step="'+step+'"] [data-move="up"]').focus(); await page.keyboard.press('Enter');
 }
 await seq.locator('[data-sequence-check]').click();
 assert((await seq.locator('[data-sequence-feedback]').textContent()).includes('Erst lesbar'),'Correct order');
 const recall=page.locator('[data-recall="'+slug+'-begruendung"]');
 assert(!await recall.locator('[data-recall-model]').isVisible(),'Model hidden');
 const answer='{"name":"test","aktiv":false,"ports":[]} Der Wert false ist ein Wahrheitswert, mit Anführungszeichen wäre es Text.';
 await recall.locator('[data-recall-input]').fill(answer);
 await recall.locator('[data-recall-reveal]').click();
 assert(await recall.locator('[data-recall-model]').isVisible(),'Model shown');
 assert(await done.isDisabled(),'Supplementary activities cannot unlock');
 await page.reload();
 assert(await recall.locator('[data-recall-input]').inputValue()===answer,'Recall persisted');
 const first=page.locator('[data-quiz="'+slug+'-transfer-a"]');
 await first.locator('[data-answer="0"]').click();
 assert(await done.isDisabled(),'Wrong transfer blocked');
 await first.locator('[data-quiz-reset]').click();
 await first.locator('[data-answer="2"]').click();
 assert(await done.isDisabled(),'One objective blocked');
 await page.locator('[data-quiz="'+slug+'-transfer-b"] [data-answer="0"]').click();
 assert(!await done.isDisabled(),'Two objectives unlock');
 await page.reload(); assert(!await done.isDisabled(),'Objectives persist');
 await done.click(); assert(await done.getAttribute('aria-pressed')==='true','Completion');
 await done.click(); assert(await done.getAttribute('aria-pressed')==='false','Undo');
 const card=page.locator('[data-flashcard="'+slug+'-karte-0"]');
 await card.focus(); await page.keyboard.press('Enter');
 assert(await card.getAttribute('aria-pressed')==='true','Keyboard flashcard');
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:1000});
  for(const theme of ['dark','light']) {
   await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
   for(const [i,target] of [page.locator('pre').first(),page.locator('.learning-figure').first(),seq].entries()) {
    await target.scrollIntoViewIfNeeded();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No overflow');
    if(process.env.AP2_FORMAT_CAPTURE==='1') await page.screenshot({path:'.format-'+width+'-'+theme+'-'+i+'.png',animations:'disabled'});
   }
  }
 }
 assert(!errors.length,errors.join('\n'));
 console.log('PASS data formats: feedback, keyboard, ordering, recall, gates, persistence, themes');
} finally { await browser.close(); }

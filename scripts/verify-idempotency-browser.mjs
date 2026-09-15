import { chromium } from 'playwright';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const slug = 'idempotenz-deklarativ-vs-imperativ-erklaren';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
 const page = await browser.newPage();
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/lernen/'+slug+'/');
 const done=page.locator('#mark-done');
 for(const [id,correct] of [['diagnose',1],['uebung',1]]) {
  const quiz=page.locator('[data-quiz="'+slug+'-'+id+'"]');
  const wrong=quiz.locator('[data-answer="'+((correct+1)%3)+'"]');
  await wrong.click();
  assert(await wrong.evaluate(el=>el.classList.contains('wrong')),id+': wrong answer identified');
  await quiz.locator('[data-quiz-reset]').click();
  const right=quiz.locator('[data-answer="'+correct+'"]');
  await right.focus(); await page.keyboard.press('Enter');
  assert(await right.evaluate(el=>el.classList.contains('right')),id+': correct answer identified');
  assert(await done.isDisabled(),id+': no objective credit');
 }
 const numeric=page.locator('[data-numeric-practice="'+slug+'-zahl"]');
 for(const [value,result] of [['9','wrong'],['8','wrong'],['13','correct']]) {
  await numeric.locator('[data-numeric-input]').fill(value);
  await numeric.locator('[data-numeric-check]').click();
  assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result')===result,'Numeric '+value);
 }
 assert(await done.isDisabled(),'Numeric practice cannot unlock');
 const seq=page.locator('[data-sequence="'+slug+'-reihenfolge"]');
 await seq.locator('[data-sequence-check]').click();
 assert((await seq.locator('[data-sequence-feedback]').textContent()).includes('Ohne definierten'),'Wrong ordering explained');
 for(const step of ['start','schleife']) {
  await seq.locator('[data-step="'+step+'"] [data-move="up"]').focus();
  await page.keyboard.press('Enter');
 }
 await seq.locator('[data-sequence-check]').click();
 assert((await seq.locator('[data-sequence-feedback]').textContent()).includes('Erst den Vergleich'),'Keyboard ordering solved');
 assert(await done.isDisabled(),'Supplemental sequence does not unlock completion');
 const recall=page.locator('[data-recall="'+slug+'-begruendung"]');
 assert(!await recall.locator('[data-recall-model]').isVisible(),'Hidden model');
 await recall.locator('[data-recall-input]').fill('Ich lege den Startwert zehn fest. Nach beiden identischen Aufrufen soll der verwaltete Wert dreißig sein. Andere Prozesse und Eingaben dürfen den Zustand dazwischen nicht ändern.');
 await recall.locator('[data-recall-reveal]').click();
 assert(await recall.locator('[data-recall-model]').isVisible(),'Model revealed');
 await page.reload();
 assert((await recall.locator('[data-recall-input]').inputValue()).startsWith('Ich lege'),'Recall persisted');
 const first=page.locator('[data-quiz="'+slug+'-transfer-a"]');
 await first.locator('[data-answer="0"]').click();
 assert(await done.isDisabled(),'Wrong answer blocked');
 await first.locator('[data-quiz-reset]').click();
 await first.locator('[data-answer="2"]').click();
 assert(await done.isDisabled(),'One objective blocked');
 await page.locator('[data-quiz="'+slug+'-transfer-b"] [data-answer="0"]').click();
 assert(!await done.isDisabled(),'Two objectives unlock');
 await page.reload();
 assert(!await done.isDisabled(),'Objectives persist');
 await done.click(); assert(await done.getAttribute('aria-pressed')==='true','Marked');
 await done.click(); assert(await done.getAttribute('aria-pressed')==='false','Undone');
 const card=page.locator('[data-flashcard="'+slug+'-karte-0"]');
 await card.focus(); await page.keyboard.press('Enter');
 assert(await card.getAttribute('aria-pressed')==='true','Keyboard card');
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:1000});
  for(const theme of ['dark','light']) {
   await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
   for(const [name,target] of [['diagram',page.locator('.learning-figure')],['formula',page.locator('math')],['sequence',seq]]) {
    await target.scrollIntoViewIfNeeded();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No overflow '+width+'/'+theme);
    if(process.env.AP2_IDEM_CAPTURE==='1') {
     await page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
     await page.screenshot({path:'.idem-'+name+'-'+width+'-'+theme+'.png',animations:'disabled'});
    }
   }
  }
 }
 assert(!errors.length,errors.join('\n'));
 console.log('PASS idempotency: ordering, recall, keyboard, gates, persistence, undo, responsive themes');
} finally {await browser.close();}



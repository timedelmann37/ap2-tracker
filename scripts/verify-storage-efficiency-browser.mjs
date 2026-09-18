import { chromium } from 'playwright';
const cases = [
  {
    "slug": "deduplizierung-komprimierung-thin-provisioning-nutzen-risiken",
    "expected": 40,
    "wrong": 80
  }
];
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const browser = await chromium.launch();
try {
 for (const {slug,expected,wrong} of cases) {
  const page = await browser.newPage();
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/lernen/'+slug+'/');
  const done=page.locator('#mark-done');
  assert(await done.isDisabled(),slug+': initial gate');
  for(const id of ['diagnose','uebung']) {
   const quiz=page.locator('[data-quiz="'+slug+'-'+id+'"]');
   await quiz.locator('[data-answer="0"]').click();
   assert(await quiz.locator('[data-answer="0"]').evaluate(el=>el.classList.contains('wrong')),id+': error feedback');
   await quiz.locator('[data-quiz-reset]').click();
   await quiz.locator('[data-answer="1"]').focus(); await page.keyboard.press('Enter');
   assert(await quiz.locator('[data-answer="1"]').evaluate(el=>el.classList.contains('right')),id+': keyboard solution');
   assert(await done.isDisabled(),id+': no objective credit');
  }
  const numeric=page.locator('[data-numeric-practice="'+slug+'-zahl"]');
  for(const [value,result] of [[wrong,'wrong'],[expected,'correct']]) {
   await numeric.locator('[data-numeric-input]').fill(String(value));
   await numeric.locator('[data-numeric-check]').click();
   assert(await numeric.locator('[data-numeric-feedback]').getAttribute('data-result')===result,slug+': numeric '+value);
  }
  const seq=page.locator('[data-sequence="'+slug+'-reihenfolge"]');
  await seq.locator('[data-sequence-check]').click();
  assert((await seq.locator('[data-sequence-feedback]').textContent()).includes('Prüfe die Voraussetzungen'),'Initial wrong sequence');
  for(const step of ['start','pruefen']) {
   await seq.locator('[data-step="'+step+'"] [data-move="up"]').focus(); await page.keyboard.press('Enter');
  }
  await seq.locator('[data-sequence-check]').click();
  assert((await seq.locator('[data-sequence-feedback]').textContent()).includes('Richtig:'),'Correct sequence');
  const recall=page.locator('[data-recall="'+slug+'-begruendung"]');
  assert(!await recall.locator('[data-recall-model]').isVisible(),'Hidden model');
  await recall.locator('[data-recall-input]').fill('Ich unterscheide den ausgewählten Stand beziehungsweise die Ziele vom Ergebnis und prüfe die tatsächliche Wirkung, bevor ich den vorgesehenen Abschluss freigebe.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(),'Model revealed');
  assert(await done.isDisabled(),'Supplementary practice cannot unlock');
  await page.reload();
  assert((await recall.locator('[data-recall-input]').inputValue()).startsWith('Ich unterscheide'),'Recall persistence');
  const first=page.locator('[data-quiz="'+slug+'-transfer-a"]');
  await first.locator('[data-answer="0"]').click();
  assert(await done.isDisabled(),'Wrong transfer cannot unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="2"]').click();
  assert(await done.isDisabled(),'One objective insufficient');
  await page.locator('[data-quiz="'+slug+'-transfer-b"] [data-answer="0"]').click();
  assert(!await done.isDisabled(),'Both objectives unlock');
  await page.reload(); assert(!await done.isDisabled(),'Objectives persist');
  await done.click(); assert(await done.getAttribute('aria-pressed')==='true','Mark complete');
  await done.click(); assert(await done.getAttribute('aria-pressed')==='false','Undo');
  const card=page.locator('[data-flashcard="'+slug+'-karte-0"]');
  await card.focus(); await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed')==='true','Keyboard flashcard');
  for(const width of [390,1440]) {
   await page.setViewportSize({width,height:1000});
   for(const theme of ['dark','light']) {
    await page.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
    const targets=[page.locator('.learning-figure').first(),page.locator('.learning-figure').last(),numeric,seq,page.locator('pre').first(),...await page.locator('math').all(),...await page.locator('table').all()];
    for(const [i,target] of targets.entries()) {
     await target.scrollIntoViewIfNeeded();
     if (width === 390 && await target.evaluate(el => el.tagName === 'TABLE')) {
      const scrollable = await target.evaluate(el => {
       const wrap = el.closest('.twrap');
       if (!wrap) return false;
       if (wrap.scrollWidth <= wrap.clientWidth) return true;
       wrap.scrollLeft = wrap.scrollWidth;
       const reached = wrap.scrollLeft > 0;
       wrap.scrollLeft = 0;
       return reached;
      });
      assert(scrollable, 'Mobile comparison table remains horizontally readable');
     }
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
     if(overflow) console.log(await page.locator('pre, code').evaluateAll(els=>els.filter(el=>el.getBoundingClientRect().right>innerWidth).map(el=>({tag:el.tagName,text:el.textContent.slice(0,200),right:el.getBoundingClientRect().right}))));
     assert(!overflow,slug+': no page overflow');
     if(process.env.AP2_EFFICIENCY_CAPTURE==='1') await page.screenshot({path:'.efficiency-'+cases.findIndex(c=>c.slug===slug)+'-'+width+'-'+theme+'-'+i+'.png',animations:'disabled'});
    }
   }
  }
  assert(!errors.length,errors.join('\n'));
  console.log('PASS storage efficiency: '+slug);
  await page.close();
 }
} finally { await browser.close(); }








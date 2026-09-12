import { chromium } from 'playwright';
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (value, message) => { if (!value) throw Error(message); };
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.route(/supabase-js/, route => route.fulfill({
    contentType: 'text/javascript',
    body: `window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:'space-test-user',email:'space@example.invalid'}}}}),onAuthStateChange:()=>{}},from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:null,error:null})})}),upsert:async()=>({error:null})})})};`
  }));
  await page.goto(base + '/netzwerke/');
  const atmosphere = page.locator('.space-atmosphere');
  const ambientState = () => atmosphere.locator('> div').evaluateAll(layers => layers.map(el => ({
    name: getComputedStyle(el).animationName,
    transform: getComputedStyle(el).transform,
    playState: getComputedStyle(el).animationPlayState
  })));
  const ambientBefore = await ambientState();
  assert(ambientBefore.length === 2, 'The atmosphere must contain both ambient layers');
  await page.waitForTimeout(450);
  const ambientAfter = await ambientState();
  assert(ambientAfter.every((layer, index) => layer.transform !== ambientBefore[index].transform), 'Aurora and light trails must both move');
  const card = page.locator('details.card').first();
  if ((await card.getAttribute('open')) === null) await card.locator('summary').click();
  const fill = card.locator('.track > .fill');
  const checkbox = card.locator('input[type="checkbox"]').first();
  const initial = parseFloat(await fill.evaluate(el => el.style.width)) || 0;
  await checkbox.check();
  await page.waitForTimeout(950);
  const after = await fill.evaluate(el => ({
    width: parseFloat(el.style.width), actual: el.getBoundingClientRect().width,
    sweep: getComputedStyle(el, '::before').animationName,
    iterations: getComputedStyle(el, '::before').animationIterationCount
  }));
  assert(after.width > initial && after.actual > 0, 'Checking a real topic must advance the beam');
  assert(after.sweep === 'progress-beam' && after.iterations === 'infinite', 'Completed progress must carry the repeating beam');
  const firstPosition = await fill.evaluate(el => getComputedStyle(el, '::before').transform);
  await page.waitForTimeout(450);
  assert(firstPosition !== await fill.evaluate(el => getComputedStyle(el, '::before').transform), 'Beam must visibly move');
  await page.locator('.motion-control').click();
  assert(await fill.evaluate(el => getComputedStyle(el, '::before').animationPlayState) === 'paused', 'Pause must stop the beam');
  assert((await ambientState()).every(layer => layer.playState === 'paused'), 'Pause must stop both ambient layers');
  await checkbox.uncheck();
  assert((parseFloat(await fill.evaluate(el => el.style.width)) || 0) === initial, 'Undo must restore exact real progress');
  await page.reload();
  assert(await page.locator('html').getAttribute('data-motion') === 'paused', 'Motion preference must persist');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.motion-control').waitFor({ state: 'hidden' });
  assert(await page.locator('.motion-control').isHidden(), 'Reduced motion must hide the unnecessary control');
  assert((await ambientState()).every(layer => layer.name === 'none'), 'Reduced motion must remove both ambient animations');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('.motion-control').waitFor({ state: 'visible' });
  await page.locator('.motion-control').click();
  for (const route of ['/', '/uebersicht/', '/konzeption-administration/', '/sowi/', '/lernpfad/', '/lernen/osi-model/', '/simulation/', '/tracker/']) {
    await page.goto(base + route);
    const layers = await ambientState();
    assert(layers.map(layer => layer.name).join(',') === 'space-aurora,space-trails', `Shared atmosphere missing on ${route}`);
    assert(layers.every(layer => layer.playState === 'running'), `Atmosphere not running on ${route}`);
  }
  console.log('PASS atmosphere: global coverage, both layers moving, real progress, beam, pause, undo, persistence, reduced motion');
  await context.close();
} finally { await browser.close(); }

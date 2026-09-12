import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const file = `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`;
    const body = await readFile(file);
    response.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ? 'text/javascript' : 'text/html');
    response.end(body);
  } catch {
    response.statusCode = 404;
    response.end();
  }
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  await page.route(/supabase-js/, route => route.fulfill({
    contentType: 'text/javascript',
    body: `window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:null}}),onAuthStateChange:()=>{},signInWithOtp:async()=>({error:null})},from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:null,error:null})})}),upsert:async()=>({error:null})})})};`
  }));

  for (const route of ['/netzwerke/', '/konzeption-administration/', '/sowi/']) {
    await page.goto(`http://127.0.0.1:${server.address().port}${route}`);
    const cards = page.locator('details.card');
    const index = await cards.evaluateAll(elements => elements.findIndex(element => !element.open));
    assert(index >= 0, `${route} needs a closed Themengruppe for the accordion check`);

    const card = cards.nth(index);
    const peer = cards.nth(index % 2 === 0 ? index + 1 : index - 1);
    assert.equal(await card.getAttribute('open'), null, `${route} test card must still be closed before interaction`);
    const before = await card.boundingBox();
    const peerBefore = await peer.boundingBox();
    await card.locator('summary').click();
    assert.notEqual(await card.getAttribute('open'), null, `${route} click must target the opening path`);
    await card.evaluate(element => {
      if (!element._ap2AccordionAnimation) throw new Error('Accordion height animation did not start');
      element._ap2AccordionAnimation.currentTime = 80;
    });
    const during = await card.boundingBox();
    const peerDuring = await peer.boundingBox();
    await card.evaluate(element => element._ap2AccordionAnimation.finish());
    await page.waitForFunction(element => element.open && !element._ap2AccordionAnimation, await card.elementHandle());
    const after = await card.boundingBox();

    assert(Math.abs(during.width - before.width) < 2, `${route} must keep the card width stable while opening`);
    assert(Math.abs(peerDuring.x - peerBefore.x) < 2, `${route} must not jump the neighboring card into another column`);
    assert(during.height > before.height + 1, `${route} must start expanding within 50ms (${before.height} -> ${during.height} -> ${after.height})`);
    assert(during.height < after.height - 1, `${route} must not jump immediately to the final height (${before.height} -> ${during.height} -> ${after.height})`);

    await card.locator('summary').click();
    await card.evaluate(element => {
      if (!element._ap2AccordionAnimation) throw new Error('Accordion closing animation did not start');
      element._ap2AccordionAnimation.currentTime = 80;
    });
    const closing = await card.boundingBox();
    assert(closing.height < after.height - 1, `${route} must start collapsing smoothly`);
    assert(closing.height > before.height + 1, `${route} must not jump immediately to the closed height`);
    await card.evaluate(element => element._ap2AccordionAnimation.finish());
    await page.waitForFunction(element => !element.open && !element._ap2AccordionAnimation, await card.elementHandle());
    console.log('PASS', route, 'Themengruppe expands smoothly without horizontal layout jump');
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:${server.address().port}/netzwerke/`);
  const mobileCards = page.locator('details.card');
  const mobileIndex = await mobileCards.evaluateAll(elements => elements.findIndex(element => !element.open));
  const mobileCard = mobileCards.nth(mobileIndex);
  const mobileBefore = await mobileCard.boundingBox();
  await mobileCard.locator('summary').click();
  await mobileCard.evaluate(element => { element._ap2AccordionAnimation.currentTime = 80; });
  const mobileDuring = await mobileCard.boundingBox();
  await mobileCard.evaluate(element => element._ap2AccordionAnimation.finish());
  await page.waitForFunction(element => element.open && !element._ap2AccordionAnimation, await mobileCard.elementHandle());
  const mobileAfter = await mobileCard.boundingBox();
  assert(Math.abs(mobileDuring.width - mobileBefore.width) < 2, 'mobile card width must remain stable');
  assert(mobileDuring.height > mobileBefore.height + 1 && mobileDuring.height < mobileAfter.height - 1, 'mobile Themengruppe must expand progressively');
  console.log('PASS /netzwerke/ mobile Themengruppe expands progressively');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`http://127.0.0.1:${server.address().port}/netzwerke/`);
  const reducedCards = page.locator('details.card');
  const reducedIndex = await reducedCards.evaluateAll(elements => elements.findIndex(element => !element.open));
  const reducedCard = reducedCards.nth(reducedIndex);
  await reducedCard.locator('summary').click();
  assert.notEqual(await reducedCard.getAttribute('open'), null, 'reduced motion must still open the Themengruppe');
  assert.equal(await reducedCard.evaluate(element => element._ap2AccordionAnimation || null), null, 'reduced motion must skip the height animation');
  console.log('PASS reduced motion opens immediately without animation');
} finally {
  await browser.close();
  server.close();
}

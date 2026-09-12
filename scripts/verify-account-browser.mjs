import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const server=createServer(async(req,res)=>{try {const p=new URL(req.url,'http://localhost').pathname;const f='.'+(p.endsWith('/')?p+'index.html':p);const b=await readFile(f);res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'text/javascript':f.endsWith('.svg')?'image/svg+xml':f.endsWith('.png')?'image/png':'text/html');res.end(b);}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({headless:true});
try {
const page=await browser.newPage();
await page.route(/supabase-js/,route=>route.fulfill({contentType:'text/javascript',body:`window.testFailure=false;window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:'fixture-user',email:'test@example.invalid'}}}}),onAuthStateChange:cb=>{window.authChanged=cb;},signOut:async()=>window.authChanged('SIGNED_OUT',null)},from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:null,error:null})})}),upsert:async()=>{await new Promise(r=>setTimeout(r,40));return {error:window.testFailure?{message:'test failure'}:null};}})})};`}));
for(const route of ['/','/uebersicht/','/netzwerke/','/konzeption-administration/','/sowi/']){
 await page.goto('http://127.0.0.1:'+server.address().port+route);
 await page.waitForFunction(()=>document.querySelector('#accountBtnLabel').textContent==='Angemeldet');
 await page.locator('.brand-mark img').evaluate(img => { if (!img.complete || !img.naturalWidth) throw new Error('Logo failed to load'); });
 await page.waitForFunction(()=>document.querySelector('#accountSyncStatus').textContent==='Fortschritt gespeichert');
 for(const width of [390,940,941,1024,1440]) {
  await page.setViewportSize({width,height:900});
  for(const theme of ['dark','light']) {
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   assert(await page.locator('#accountBtnLabel').isVisible());
   const box=await page.locator('#accountBtn').boundingBox();assert(box.x>=0 && box.x+box.width<=width,route+' button overflow '+width);
  }
 }
 await page.locator('#accountBtn').click();
 assert.match(await page.locator('#accountUserRow').textContent(),/Angemeldet als test@example.invalid/);

 await page.evaluate(async()=>{window.testFailure=true;await pushStateToCloud();});
 assert.match(await page.locator('#accountSyncStatus').textContent(),/Synchronisierung fehlgeschlagen/);
 assert.equal(await page.locator('#accountBtnLabel').textContent(),'Angemeldet');
 await page.evaluate(async()=>{window.testFailure=false;await pushStateToCloud();});
 assert.equal(await page.locator('#accountSyncStatus').textContent(),'Fortschritt gespeichert');
 await page.locator('#accountSignOut').click();
 assert.equal(await page.locator('#accountBtnLabel').textContent(),'Anmelden');
 console.log('PASS',route,'session, responsive/themes, save failure/recovery, sign-out');
}
} finally {await browser.close();server.close();}

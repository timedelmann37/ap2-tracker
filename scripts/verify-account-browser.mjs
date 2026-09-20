import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const server=createServer(async(req,res)=>{try {const p=new URL(req.url,'http://localhost').pathname;const f='.'+(p.endsWith('/')?p+'index.html':p);const b=await readFile(f);res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'text/javascript':f.endsWith('.svg')?'image/svg+xml':f.endsWith('.png')?'image/png':'text/html');res.end(b);}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({headless:true});
try {
const page=await browser.newPage();
await page.route(/supabase-js/,route=>route.fulfill({contentType:'text/javascript',body:`window.testFailure=false;window.upserts=[];window.profileRow=null;window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:'fixture-user',email:'test@example.invalid'}}}}),onAuthStateChange:cb=>{window.authChanged=cb;},signOut:async()=>window.authChanged('SIGNED_OUT',null)},from:(table)=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:table==='profiles'?window.profileRow:null,error:null})})}),upsert:async(row)=>{await new Promise(r=>setTimeout(r,40));window.upserts.push({table,row});return {error:window.testFailure?{message:'test failure'}:null};}})})};`}));
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

 if(route==='/') {
  // Profil-Block: nur im Hub, vorbelegt aus dem E-Mail-Localpart, Opt-out standardmäßig aus
  await page.waitForSelector('#accountProfile:not([hidden])');
  assert.equal(await page.locator('#accountDisplayName').inputValue(),'test','Anzeigename aus E-Mail vorbelegt');
  assert(await page.locator('#accountShowOnLeaderboard').isChecked(),'Lerngruppe standardmäßig an');
  assert.equal(await page.locator('.account-profile-link').count(),0,'Hub hat keinen Verweis auf sich selbst');

  await page.locator('#accountDisplayName').fill('Tim');
  await page.locator('#accountDisplayName').press('Enter');
  await page.waitForFunction(()=>document.querySelector('#accountStatus').textContent==='Profil gespeichert.');
  let saved=await page.evaluate(()=>window.upserts.filter(u=>u.table==='profiles').at(-1).row);
  assert.equal(saved.display_name,'Tim');assert.equal(saved.show_on_leaderboard,true);assert.equal(saved.user_id,'fixture-user');

  await page.locator('#accountDisplayName').fill('   ');
  await page.locator('#accountDisplayName').press('Enter');
  assert.match(await page.locator('#accountStatus').textContent(),/darf nicht leer sein/);
  assert.equal(await page.locator('#accountDisplayName').inputValue(),'Tim','leerer Name fällt auf den alten zurück');
  assert.equal(await page.evaluate(()=>window.upserts.filter(u=>u.table==='profiles').length),1,'leerer Name wird nicht gespeichert');

  await page.locator('#accountShowOnLeaderboard').uncheck();
  await page.waitForFunction(()=>/nicht sichtbar/.test(document.querySelector('#accountStatus').textContent));
  saved=await page.evaluate(()=>window.upserts.filter(u=>u.table==='profiles').at(-1).row);
  assert.equal(saved.show_on_leaderboard,false,'Opt-out landet in der DB');
  assert.equal(saved.display_name,'Tim');

  await page.evaluate(()=>{window.testFailure=true;});
  await page.locator('#accountDisplayName').fill('Tim E');
  await page.locator('#accountDisplayName').press('Enter');
  await page.waitForFunction(()=>/konnte nicht gespeichert/.test(document.querySelector('#accountStatus').textContent));
  assert.equal(await page.locator('#accountDisplayName').inputValue(),'Tim E','nach Fehler bleibt die Eingabe für einen neuen Versuch stehen');
  await page.evaluate(()=>{window.testFailure=false;});
  await page.locator('#accountDisplayName').press('Enter');
  await page.waitForFunction(()=>/^Profil gespeichert/.test(document.querySelector('#accountStatus').textContent));
  saved=await page.evaluate(()=>window.upserts.filter(u=>u.table==='profiles').at(-1).row);
  assert.equal(saved.display_name,'Tim E','erneuter Versuch speichert');

  const progressUpserts=await page.evaluate(()=>window.upserts.filter(u=>u.table==='progress').length);
  assert(progressUpserts>=1,'Fortschritt-Sync läuft weiterhin');
  console.log('PASS / Profil: Vorbelegung, Anzeigename, leerer Name, Opt-out, Fehlerfall');
 } else {
  assert.equal(await page.locator('#accountProfile').count(),0,route+' hat kein Profil-Formular');
  assert.match(await page.locator('.account-profile-link a').getAttribute('href'),/konto=anmelden/,route+' verlinkt zum Hub');
 }

 await page.evaluate(async()=>{window.testFailure=true;await pushStateToCloud();});
 assert.match(await page.locator('#accountSyncStatus').textContent(),/Synchronisierung fehlgeschlagen/);
 assert.equal(await page.locator('#accountBtnLabel').textContent(),'Angemeldet');
 await page.evaluate(async()=>{window.testFailure=false;await pushStateToCloud();});
 assert.equal(await page.locator('#accountSyncStatus').textContent(),'Fortschritt gespeichert');
 await page.locator('#accountSignOut').click();
 assert.equal(await page.locator('#accountBtnLabel').textContent(),'Anmelden');
 if(route==='/') assert(await page.locator('#accountProfile').isHidden(),'Profil-Block nach Abmelden ausgeblendet');
 if(route!=='/') {
  assert.equal(await page.locator('#exportProgress').count(),0,route+' export control removed');
  assert.equal(await page.locator('#importProgressBtn').count(),0,route+' import control removed');
  assert.equal(await page.locator('#footerNote').count(),0,route+' local-storage notice removed');
  const checkbox=page.locator('ul.items input[type=checkbox]').first();
  if(await checkbox.count()) {
   const before=await page.evaluate(()=>localStorage.getItem('ap2-tracker-state-v1'));
   await checkbox.evaluate(el=>el.click());
   assert(await page.locator('#accountOverlay').isVisible(),route+' signed-out progress action opens login');
   assert.match(await page.locator('#accountStatus').textContent(),/Melde dich an/);
   assert.equal(await page.evaluate(()=>localStorage.getItem('ap2-tracker-state-v1')),before,route+' signed-out action must not save');
  }
 }
 console.log('PASS',route,'session, responsive/themes, save failure/recovery, sign-out');
}

await page.goto('http://127.0.0.1:'+server.address().port+'/lernen/raid/');
await page.waitForFunction(()=>!document.querySelector('#mark-rep').disabled);
await page.evaluate(()=>window.authChanged('SIGNED_OUT',null));
await page.waitForFunction(()=>document.querySelector('#mark-rep').disabled);
assert(await page.locator('#mark-done').isDisabled());
assert.match(await page.locator('#learning-save').textContent(),/Anmelden, um Fortschritt zu speichern/);
console.log('PASS /lernen/raid/ signed-out progress controls disabled');
} finally {await browser.close();server.close();}

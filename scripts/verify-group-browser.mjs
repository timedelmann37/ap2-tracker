// Prüft den Abschnitt „Lerngruppe" auf der Übersicht gegen einen Supabase-Mock:
// ausgeloggt nur Hinweis, eingeloggt Liste mit Umschalter, Leerzustand, Fehlerfall.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const server=createServer(async(req,res)=>{try {const p=new URL(req.url,'http://localhost').pathname;const f='.'+(p.endsWith('/')?p+'index.html':p);const b=await readFile(f);res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'text/javascript':f.endsWith('.svg')?'image/svg+xml':f.endsWith('.png')?'image/png':'text/html');res.end(b);}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true});

const mock=`
const cfg=JSON.parse(localStorage.getItem('__mock')||'{}');
window.sessionUser=cfg.sessionUser||null;window.boardRows=cfg.boardRows||[];window.boardError=cfg.boardError||null;window.boardRequests=0;
window.supabase={createClient:()=>({
  auth:{
    getSession:async()=>({data:{session:window.sessionUser?{user:window.sessionUser}:null}}),
    onAuthStateChange:cb=>{window.authChanged=cb;},
    signOut:async()=>window.authChanged('SIGNED_OUT',null)
  },
  from:(table)=>({
    select:()=>{
      if(table==='leaderboard'){window.boardRequests++;return Promise.resolve({data:window.boardError?null:window.boardRows,error:window.boardError});}
      return {eq:()=>({maybeSingle:async()=>({data:null,error:null})})};
    },
    upsert:async()=>({error:null})
  })
})};`;

try {
 const page=await browser.newPage({viewport:{width:1200,height:900}});
 await page.route(/supabase-js/,route=>route.fulfill({contentType:'text/javascript',body:mock}));

 // 1) ausgeloggt: nur Hinweis, kein Request
 await page.goto(base+'/uebersicht/');
 await page.waitForSelector('#groupPanel');
 assert.match(await page.locator('#groupBody').textContent(),/Melde dich an/);
 assert.match(await page.locator('#groupBody a').getAttribute('href'),/konto=anmelden/);
 assert(await page.locator('#groupMode').isHidden(),'Umschalter ausgeloggt verborgen');
 assert.equal(await page.evaluate(()=>window.boardRequests),0,'ausgeloggt kein Request an leaderboard');
 console.log('PASS ausgeloggt: Hinweis mit Anmelden-Link, kein Request');

 // 2) eingeloggt: Liste, Sortierung, eigene Zeile, Umschalter
 const day=86400000;
 await page.evaluate(({day})=>{
  const now=Date.now();
  localStorage.setItem('__mock',JSON.stringify({sessionUser:{id:'u-me',email:'me@example.invalid'},boardRows:[
   {user_id:'u-a',display_name:'anna',done_count:203,week_count:5,last_active_at:new Date(now-2*day).toISOString()},
   {user_id:'u-me',display_name:'ich',done_count:12,week_count:5,last_active_at:new Date(now).toISOString()},
   {user_id:'u-b',display_name:'ben',done_count:40,week_count:0,last_active_at:new Date(now-20*day).toISOString()},
   {user_id:'u-c',display_name:'chris',done_count:0,week_count:0,last_active_at:null},
  ]}));
 },{day});
 await page.goto(base+'/uebersicht/');
 await page.waitForSelector('.group-row');
 assert(await page.locator('#groupMode').isVisible(),'Umschalter eingeloggt sichtbar');
 assert.equal(await page.locator('.seg-btn.is-active').textContent(),'Diese Woche','Standardmodus ist Diese Woche');
 let names=await page.locator('.group-name').allTextContents();
 assert.deepEqual(names,['ich','anna','ben','chris'],'Woche: Gleichstand nach letzter Aktivität, dann Rest');
 assert.equal(await page.locator('.group-row.is-me .group-name').textContent(),'ich','eigene Zeile markiert');
 assert.equal(await page.locator('.group-row.is-me .group-rank').textContent(),'1.');
 let actives=await page.locator('.group-active').allTextContents();
 assert.deepEqual(actives,['heute aktiv','vor 2 Tagen aktiv',actives[2],'noch nichts abgehakt']);
 assert.match(actives[2],/^zuletzt am \d{2}\.\d{2}\.$/,'ältere Aktivität als Datum');
 assert.match(await page.locator('.group-row').first().locator('.group-value').textContent(),/^5Kernthemen$/);

 await page.locator('.seg-btn[data-mode="total"]').click();
 names=await page.locator('.group-name').allTextContents();
 assert.deepEqual(names,['anna','ben','ich','chris'],'Gesamt sortiert nach done_count');
 const total=await page.evaluate(()=>GROUP_TOTAL_ITEMS);
 assert(total>100,'Gesamtzahl der Kernthemen aus DATA');
 const annaValue=await page.locator('.group-row').first().locator('.group-value').textContent();
 assert.equal(annaValue,Math.round(203/total*100)+' %203 / '+total,'Gesamt zeigt Prozent und Zahl');
 assert.equal(await page.locator('.group-note').count(),0,'kein Leerzustand bei mehreren Einträgen');
 assert.equal(await page.evaluate(()=>window.boardRequests),1,'ein einziger Request, Umschalten sortiert nur um');
 console.log('PASS eingeloggt: Liste, Sortierung Woche/Gesamt, eigene Zeile, Aktivität, ein Request');

 // 3) Abmelden → zurück zum Hinweis
 await page.evaluate(()=>window.authChanged('SIGNED_OUT',null));
 await page.waitForFunction(()=>/Melde dich an/.test(document.querySelector('#groupBody').textContent));
 assert(await page.locator('#groupMode').isHidden());
 console.log('PASS Abmelden blendet die Liste aus');

 // 4) Leerzustand: nur ich
 await page.evaluate(()=>{const c=JSON.parse(localStorage.getItem('__mock'));c.boardRows=[{user_id:'u-me',display_name:'ich',done_count:1,week_count:1,last_active_at:new Date().toISOString()}];localStorage.setItem('__mock',JSON.stringify(c));});
 await page.goto(base+'/uebersicht/');
 await page.waitForSelector('.group-note');
 assert.equal(await page.locator('.group-row').count(),1,'eigene Zeile bleibt sichtbar');
 assert.match(await page.locator('.group-note').textContent(),/allein hier/);
 assert.match(await page.locator('.group-value').textContent(),/^1Kernthema$/,'Singular');
 console.log('PASS Leerzustand mit eigener Zeile');

 // 5) View fehlt (PGRST205) → ruhiger Hinweis
 await page.evaluate(()=>{const c=JSON.parse(localStorage.getItem('__mock'));c.boardError={code:'PGRST205',message:'Could not find the table public.leaderboard'};localStorage.setItem('__mock',JSON.stringify(c));});
 await page.goto(base+'/uebersicht/');
 await page.waitForFunction(()=>/noch nicht eingerichtet/.test(document.querySelector('#groupBody').textContent));
 assert(await page.locator('#groupMode').isHidden());
 console.log('PASS fehlende View: Hinweis statt kaputtem Abschnitt');

 // 6) Schmal: kein horizontaler Überlauf
 await page.evaluate(()=>{const c=JSON.parse(localStorage.getItem('__mock'));delete c.boardError;localStorage.setItem('__mock',JSON.stringify(c));});
 await page.setViewportSize({width:360,height:800});
 await page.goto(base+'/uebersicht/');
 await page.waitForSelector('.group-row');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'kein horizontaler Überlauf bei 360px');
 const row=await page.locator('.group-row').first();
 const nameBox=await row.locator('.group-name').boundingBox();
 const valueBox=await row.locator('.group-value').boundingBox();
 assert(Math.abs(nameBox.y-valueBox.y)<6,'Wert steht auf Mobil neben dem Namen');
 console.log('PASS 360px: kein Überlauf, Wert neben Name');
} finally {await browser.close();server.close();}

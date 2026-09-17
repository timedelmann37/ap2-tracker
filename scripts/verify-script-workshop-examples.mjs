import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
const read = async slug => JSON.parse(await readFile(new URL('../content/learning-units/'+slug+'.unit.json',import.meta.url),'utf8'));
const blocks = s => s.sections.flatMap(x=>x.blocks).filter(x=>x.markdown).flatMap(x=>[...x.markdown.matchAll(/\x60\x60\x60powershell\n([\s\S]*?)\n\x60\x60\x60/g)].map(m=>m[1]));
const run = code => {
 assert(!/Remove-Item|New-ADUser|Get-Service|Copy-Item|Start-Service/i.test(code),'No system operations in runtime examples');
 const result=spawnSync(process.env.AP2_PWSH || 'pwsh',['-NoLogo','-NoProfile','-NonInteractive','-EncodedCommand',Buffer.from(code,'utf16le').toString('base64')],{encoding:'utf8'});
 if(result.error) throw result.error;
 assert.equal(result.status,0,result.stderr);
 assert.equal(result.stderr.trim(),'');
 return result.stdout.replace(/\r/g,'').trim();
};
const admin=blocks(await read('typische-aufgabenstellungen-selbst-schreiben-logdateien-loschen-backup-s'));
assert.equal(admin.length,2);
assert.equal(run(admin[0]),'Kandidat: a.log');
assert.equal(run(admin[0].replace("Tage=31","Tage=30")),'');
assert.equal(run(admin[0].replace("Tage=30","Tage=31")),'Kandidat: a.log\nKandidat: b.log');
assert.equal(run(admin[0].replace("Tage=31\n    Aktiv=$false","Tage=31\n    Aktiv=$true")),'');
assert.equal(run(admin[1]),'backup-20260917-1405.zip');
const analysis=blocks(await read('gegebenes-skript-analysieren-tut-ausgabe-entsteht-welcher'));
assert.equal(analysis.length,2);
const fixtures=[
 {values:["Stopped","Running","Stopped"],bad:'Treffer: 1\nTreffer: 1\nGesamt: 1',good:'Treffer: 1\nTreffer: 2\nGesamt: 2'},
 {values:["Stopped","Stopped","Running"],bad:'Treffer: 1\nTreffer: 1\nGesamt: 0',good:'Treffer: 1\nTreffer: 2\nGesamt: 2'},
 {values:[],bad:'Gesamt: 0',good:'Gesamt: 0'},
 {values:["Running"],bad:'Gesamt: 0',good:'Gesamt: 0'},
 {values:["Stopped"],bad:'Treffer: 1\nGesamt: 1',good:'Treffer: 1\nGesamt: 1'},
 {values:["Paused","Stopped"],bad:'Treffer: 1\nGesamt: 1',good:'Treffer: 1\nGesamt: 1'}
];
for(const f of fixtures) for(const [i,key] of ['bad','good'].entries()){
 const code=analysis[i].replace(/\$statusListe = @\([\s\S]*?\)/,'$statusListe = @('+f.values.map(x=>"'"+x+"'").join(', ')+')');
 assert.equal(run(code),f[key],key+': '+JSON.stringify(f.values));
}
console.log('PASS script workshop runtime: log boundaries/active exclusion, timestamp, faulty and corrected traces, zero/one/many entries; no system changes');

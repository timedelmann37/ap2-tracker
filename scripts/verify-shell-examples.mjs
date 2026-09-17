import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const unit = slug => JSON.parse(readFileSync(new URL('../content/learning-units/'+slug+'.unit.json',import.meta.url),'utf8'));
const blocks = spec => spec.sections.flatMap(s=>s.blocks).filter(b=>b.type==='markdown').map(b=>b.markdown);
const bashUnit=unit('bash-shebang-variablen-parameter-bedingungen-schleifen-exit-codes');
const psUnit=unit('powershell-verb-noun-cmdlets-pipeline-import-csv-foreach-ad-cmdlets-mass');
const bashCode=blocks(bashUnit).join('\n').match(/\x60{3}bash\n([\s\S]*?)\n\x60{3}/)[1];
const psCode=[...blocks(psUnit).join('\n').matchAll(/\x60{3}powershell\n([\s\S]*?)\n\x60{3}/g)].map(m=>m[1]).find(s=>s.startsWith('$csv ='));
const bash=process.env.AP2_BASH || (existsSync('C:/Program Files/Git/bin/bash.exe')?'C:/Program Files/Git/bin/bash.exe':'bash');
const powershell=process.env.AP2_PWSH || 'pwsh';
const normalize=s=>s.replace(/\r\n/g,'\n').trim();
function runBash(code,args=[]) {
 // Set literal fixture arguments inside Bash: Git Bash's Windows startup can
 // expand wildcard argv before the tested script receives them.
 const quote=value=>"'"+value.replaceAll("'", "'\\''")+"'";
 const input='set -- '+args.map(quote).join(' ')+'\n'+code;
 const result=spawnSync(bash,['--noprofile','--norc','-s'],{input,encoding:'utf8',timeout:15000,env:{...process.env,BASH_ENV:''}});
 if(result.error) throw result.error;
 return result;
}
for(const [args,out,err,status] of [
 [['Nord West','','Sued'],'Nord West\nSued\nAnzahl: 2','',0],
 [[], '', 'Keine Namen',2],
 [[''],'Anzahl: 0','',0],
 [['Ost Mitte','','West','Nord'],'Ost Mitte\nWest\nNord\nAnzahl: 3','',0],
 [['*'],'*\nAnzahl: 1','',0]
]) {
 const result=runBash(bashCode,args);
 assert.equal(result.status,status); assert.equal(normalize(result.stdout),out); assert.equal(normalize(result.stderr),err);
}
assert.equal(runBash('set +o pipefail\nfalse | true\n').status,0);
assert.equal(runBash('set -o pipefail\nfalse | true\n').status,1);
function runPs(code) {
 // Execute only the authored in-memory CSV example, never the AD illustration.
 assert(!code.includes('New-ADUser')); assert(!code.includes('Import-Csv'));
 const result=spawnSync(powershell,['-NoLogo','-NoProfile','-NonInteractive','-EncodedCommand',Buffer.from(code,'utf16le').toString('base64')],{encoding:'utf8',timeout:15000});
 if(result.error) throw result.error;
 assert.equal(result.status,0,result.stderr);
 return normalize(result.stdout);
}
assert.equal(runPs(psCode),'Ada\nCem\nAnzahl: 2');
assert.equal(runPs(psCode.replaceAll(';IT',';Vertrieb')),'Anzahl: 0');
assert.equal(runPs(psCode.replace('Cem;IT','Cem;Vertrieb')),'Ada\nAnzahl: 1');
assert.equal(runPs(psCode.replace('Cem;IT','Cem;IT\nDora;IT')),'Ada\nCem\nDora\nAnzahl: 3');
console.log('PASS shell examples: real Bash/PowerShell, quotes, blank/no arguments, streams, pipeline status, zero/one/many CSV matches; no AD calls');

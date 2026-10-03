import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
let useSignedInFixture = false;
const signedInFixture = '<script>window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:{user:{id:"browser-test-user"}}}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},from:()=>({select(){return this},eq(){return this},maybeSingle:async()=>({data:null,error:null}),upsert:async()=>({error:null})})})};</script>';
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
};

const server = createServer(async (request, response) => {
  try {
    let relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+/, '');
    if (!relative || relative.endsWith('/')) relative += 'index.html';
    const target = path.resolve(distRoot, relative);
    if (target !== distRoot && !target.startsWith(`${distRoot}${path.sep}`)) throw new Error('ungueltiger Pfad');
    const info = await stat(target);
    if (!info.isFile()) throw new Error('keine Datei');
    if (useSignedInFixture && relative.startsWith('lernen/') && relative.endsWith('/index.html')) {
      const html = await readFile(target, 'utf8');
      const needle = '<script src="/assets/ap2-learning.js';
      if (!html.includes(needle)) throw new Error('Lernseite ohne Runtime');
      response.writeHead(200, { 'content-type': contentTypes['.html'] });
      response.end(html.replace(needle, signedInFixture + needle));
      return;
    }
    response.writeHead(200, { 'content-type': contentTypes[path.extname(target).toLowerCase()] || 'application/octet-stream' });
    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
process.env.AP2_BASE_URL = `http://127.0.0.1:${address.port}`;

async function runFullSuite() {
  await import('./verify-navigation.mjs');
  await import('./verify-theme-persistence.mjs');
  await import('./verify-learning-browser.mjs');
  // Legacy lesson checks exercise progress as a signed-in learner. The dedicated
  // learning/account checks above cover anonymous and real auth transitions.
  useSignedInFixture = true;
  await import('./verify-n8-browser.mjs');
  await import('./verify-n9-browser.mjs');
  await import('./verify-source-cases-browser.mjs');
  await import('./verify-trace-browser.mjs');
  await import('./verify-pseudocode-browser.mjs');
  await import('./verify-idempotency-browser.mjs');
  await import('./verify-control-structures-browser.mjs');
  await import('./verify-variables-browser.mjs');
  await import('./verify-data-formats-browser.mjs');
  await import('./verify-automation-batch-browser.mjs');
  await import('./verify-shell-batch-browser.mjs');
  await import('./verify-script-workshop-browser.mjs');
  await import('./verify-notation-browser.mjs');
  await import('./verify-nas-decision-browser.mjs');
  await import('./verify-object-storage-browser.mjs');
  await import('./verify-write-penalty-browser.mjs');
  await import('./verify-filesystems-browser.mjs');
  await import('./verify-lvm-browser.mjs');
  await import('./verify-storage-efficiency-browser.mjs');
  await import('./verify-sds-browser.mjs');
  await import('./verify-capacity-browser.mjs');
  await import('./verify-archive-browser.mjs');
  await import('./verify-rto-browser.mjs');
  await import('./verify-backup-choice-browser.mjs');
  await import('./verify-gfs-browser.mjs');
  await import('./verify-server-indicators-browser.mjs');
  await import('./verify-server-sizing-browser.mjs');
  await import('./verify-server-form-factors-browser.mjs');
  await import('./verify-hardware-redundancy-browser.mjs');
  await import('./verify-client-models-browser.mjs');
  await import('./verify-appliances-browser.mjs');
  await import('./verify-datacenter-operations-browser.mjs');
  await import('./verify-ups-sizing-browser.mjs');
  await import('./verify-ups-classes-browser.mjs');
  await import('./verify-redundancy-levels-browser.mjs');
  await import('./verify-green-it-browser.mjs');
  await import('./verify-licensing-browser.mjs');
  await import('./verify-hypervisor-types-browser.mjs');
  await import('./verify-container-vs-vm-browser.mjs');
  await import('./verify-virtualization-tradeoffs-browser.mjs');
  await import('./verify-overcommitment-browser.mjs');
  await import('./verify-live-migration-browser.mjs');
  await import('./verify-cluster-types-browser.mjs');
  await import('./verify-quorum-browser.mjs');
  await import('./verify-snapshot-browser.mjs');
  await import('./verify-availability-percent-browser.mjs');
  await import('./verify-mtbf-browser.mjs');
  await import('./verify-series-parallel-browser.mjs');
  await import('./verify-sla-browser.mjs');
  await import('./verify-kubernetes-browser.mjs');
  await import('./verify-backup-321-browser.mjs');
  await import('./verify-backup-targets-browser.mjs');
  await import('./verify-restore-plan-browser.mjs');
  await import('./verify-backup-boundaries-browser.mjs');
  await import('./verify-backup-concept-browser.mjs');
  await import('./verify-cloud-models-browser.mjs');
  await import('./verify-cloud-deployment-browser.mjs');
  await import('./verify-cloud-tradeoffs-browser.mjs');
  await import('./verify-scaling-browser.mjs');
  await import('./verify-load-balancer-algorithms-browser.mjs');
  await import('./verify-cloud-dsgvo-browser.mjs');
  await import('./verify-cloud-migration-browser.mjs');
  await import('./verify-blue-green-browser.mjs');
  await import('./verify-tco-browser.mjs');
  await import('./verify-break-even-browser.mjs');
  await import('./verify-amortisation-roi-browser.mjs');
  await import('./verify-nutzwertanalyse-browser.mjs');
  await import('./verify-angebotsvergleich-browser.mjs');
  await import('./verify-make-or-buy-browser.mjs');
  await import('./verify-active-directory-browser.mjs');
  await import('./verify-gruppenrichtlinien-browser.mjs');
  await import('./verify-patch-browser.mjs');
  await import('./verify-client-deployment-browser.mjs');
  await import('./verify-linux-admin-browser.mjs');
  await import('./verify-access-principles-browser.mjs');
  await import('./verify-access-models-browser.mjs');
  await import('./verify-ntfs-share-browser.mjs');
  await import('./verify-agdlp-browser.mjs');
  await import('./verify-permission-matrix-browser.mjs');
  await import('./verify-role-review-browser.mjs');
  await import('./verify-personnel-lifecycle-browser.mjs');
  await import('./verify-privileged-access-browser.mjs');
  await import('./verify-access-logging-browser.mjs');
  await import('./verify-security-goals-browser.mjs');
  await import('./verify-protection-needs-browser.mjs');
  await import('./verify-threat-patterns-browser.mjs');
  await import('./verify-tom-browser.mjs');
  await import('./verify-system-network-browser.mjs');
  await import('./verify-zero-trust-browser.mjs');
  await import('./verify-cryptography-browser.mjs');
  await import('./verify-pki-browser.mjs');
  await import('./verify-tls13-browser.mjs');
  await import('./verify-storage-encryption-browser.mjs');
  await import('./verify-authentication-browser.mjs');
  await import('./verify-gdpr-browser.mjs');
  await import('./verify-incident-response-browser.mjs');
  await import('./verify-compromise-symptoms-browser.mjs');
  await import('./verify-bcm-browser.mjs');
  await import('./verify-ki-browser.mjs');
  await import('./verify-monitoring-browser.mjs');
  await import('./verify-capacity-trends-browser.mjs');
  await import('./verify-central-logging-browser.mjs');
  await import('./verify-itil-basics-browser.mjs');
  await import('./verify-change-process-browser.mjs');
  await import('./verify-ticket-priority-browser.mjs');
  await import('./verify-operations-docs-browser.mjs');
  await import('./verify-rollout-planning-browser.mjs');
  await import('./verify-handover-training-browser.mjs');
  await import('./verify-workplace-access-browser.mjs');
  await import('./verify-storage-units-browser.mjs');
  await import('./verify-transfer-duration-browser.mjs');
  await import('./verify-raid-calculation-browser.mjs');
  await import('./verify-backup-calculation-browser.mjs');
  await import('./verify-availability-calculation-browser.mjs');
  await import('./verify-mtbf-mttr-browser.mjs');
  await import('./verify-ups-calculation-browser.mjs');
  await import('./verify-heat-calculation-browser.mjs');
  await import('./verify-economics-calculation-browser.mjs');
  await import('./verify-licensing-calculation-browser.mjs');
  await import('./verify-ip-calculation-browser.mjs');
  await import('./verify-number-bases-browser.mjs');
  await import('./verify-proportion-percent-browser.mjs');
  await import('./verify-examination-operators-browser.mjs');
  await import('./verify-answer-scope-browser.mjs');
  await import('./verify-partial-answer-browser.mjs');
  await import('./verify-answer-structure-browser.mjs');
  await import('./verify-exam-rehearsal-browser.mjs');
  await import('./verify-error-analysis-browser.mjs');
  await import('./verify-error-notes-browser.mjs');
  await import('./verify-retrieval-cards-browser.mjs');
  await import('./verify-oral-practice-browser.mjs');
  await import('./verify-final-week-browser.mjs');
  await import('./verify-project-basics-browser.mjs');
  await import('./verify-requirements-risk-browser.mjs');
  await import('./verify-netzplan-browser.mjs');
  await import('./verify-gantt-browser.mjs');
  await import('./verify-models-browser.mjs');
  await import('./verify-quality-management-browser.mjs');
  await import('./verify-testing-browser.mjs');
  await import('./verify-industry-ai-browser.mjs');
  await import('./verify-training-contract-browser.mjs');
  await import('./verify-invalid-clauses-browser.mjs');
  await import('./verify-training-duties-browser.mjs');
  await import('./verify-trainer-qualification-browser.mjs');
  await import('./verify-interview-questions-browser.mjs');
  await import('./verify-dual-system-browser.mjs');
  await import('./verify-youth-protection-browser.mjs');
  await import('./verify-answer-pattern-browser.mjs');
  await import('./verify-scenario-link-browser.mjs');
  await import('./verify-working-units-browser.mjs');
  await import('./verify-time-budget-browser.mjs');
  await import('./verify-task-overview-browser.mjs');
  useSignedInFixture = false;
  await import('./verify-space-browser.mjs');
}

try {
  if (process.env.AP2_BROWSER_ONLY === 'linux-admin') {
    useSignedInFixture = true;
    await import('./verify-linux-admin-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'access-principles') {
    useSignedInFixture = true;
    await import('./verify-access-principles-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'access-models') {
    useSignedInFixture = true;
    await import('./verify-access-models-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'ntfs-share') {
    useSignedInFixture = true;
    await import('./verify-ntfs-share-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'agdlp') {
    useSignedInFixture = true;
    await import('./verify-agdlp-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'permission-matrix') {
    useSignedInFixture = true;
    await import('./verify-permission-matrix-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'role-review') {
    useSignedInFixture = true;
    await import('./verify-role-review-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'personnel-lifecycle') {
    useSignedInFixture = true;
    await import('./verify-personnel-lifecycle-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'privileged-access') {
    useSignedInFixture = true;
    await import('./verify-privileged-access-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'access-logging') {
    useSignedInFixture = true;
    await import('./verify-access-logging-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'security-goals') {
    useSignedInFixture = true;
    await import('./verify-security-goals-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'protection-needs') {
    useSignedInFixture = true;
    await import('./verify-protection-needs-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'threat-patterns') {
    useSignedInFixture = true;
    await import('./verify-threat-patterns-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'tom') {
    useSignedInFixture = true;
    await import('./verify-tom-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'system-network') {
    useSignedInFixture = true;
    await import('./verify-system-network-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'zero-trust') {
    useSignedInFixture = true;
    await import('./verify-zero-trust-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'storage-units') {
    useSignedInFixture = true;
    await import('./verify-storage-units-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'transfer-duration') {
    useSignedInFixture = true;
    await import('./verify-transfer-duration-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'raid-calculation') {
    useSignedInFixture = true;
    await import('./verify-raid-calculation-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'youth-protection') {
    useSignedInFixture = true;
    await import('./verify-youth-protection-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'dual-system') {
    useSignedInFixture = true;
    await import('./verify-dual-system-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'interview-questions') {
    useSignedInFixture = true;
    await import('./verify-interview-questions-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'trainer-qualification') {
    useSignedInFixture = true;
    await import('./verify-trainer-qualification-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'training-duties') {
    useSignedInFixture = true;
    await import('./verify-training-duties-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'invalid-clauses') {
    useSignedInFixture = true;
    await import('./verify-invalid-clauses-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'training-contract') {
    useSignedInFixture = true;
    await import('./verify-training-contract-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'industry-ai') {
    useSignedInFixture = true;
    await import('./verify-industry-ai-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'testing') {
    useSignedInFixture = true;
    await import('./verify-testing-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'quality-management') {
    useSignedInFixture = true;
    await import('./verify-quality-management-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'models') {
    useSignedInFixture = true;
    await import('./verify-models-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'gantt') {
    useSignedInFixture = true;
    await import('./verify-gantt-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'netzplan') {
    useSignedInFixture = true;
    await import('./verify-netzplan-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'requirements-risk') {
    useSignedInFixture = true;
    await import('./verify-requirements-risk-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'project-basics') {
    useSignedInFixture = true;
    await import('./verify-project-basics-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'final-week') {
    useSignedInFixture = true;
    await import('./verify-final-week-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'oral-practice') {
    useSignedInFixture = true;
    await import('./verify-oral-practice-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'retrieval-cards') {
    useSignedInFixture = true;
    await import('./verify-retrieval-cards-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'error-notes') {
    useSignedInFixture = true;
    await import('./verify-error-notes-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'error-analysis') {
    useSignedInFixture = true;
    await import('./verify-error-analysis-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'exam-rehearsal') {
    useSignedInFixture = true;
    await import('./verify-exam-rehearsal-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'answer-structure') {
    useSignedInFixture = true;
    await import('./verify-answer-structure-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'partial-answer') {
    useSignedInFixture = true;
    await import('./verify-partial-answer-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'task-overview') {
    useSignedInFixture = true;
    await import('./verify-task-overview-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'time-budget') {
    useSignedInFixture = true;
    await import('./verify-time-budget-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'working-units') {
    useSignedInFixture = true;
    await import('./verify-working-units-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'scenario-link') {
    useSignedInFixture = true;
    await import('./verify-scenario-link-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'answer-pattern') {
    useSignedInFixture = true;
    await import('./verify-answer-pattern-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'answer-scope') {
    useSignedInFixture = true;
    await import('./verify-answer-scope-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'examination-operators') {
    useSignedInFixture = true;
    await import('./verify-examination-operators-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'proportion-percent') {
    useSignedInFixture = true;
    await import('./verify-proportion-percent-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'number-bases') {
    useSignedInFixture = true;
    await import('./verify-number-bases-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'ip-calculation') {
    useSignedInFixture = true;
    await import('./verify-ip-calculation-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'licensing-calculation') {
    useSignedInFixture = true;
    await import('./verify-licensing-calculation-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'economics-calculation') {
    useSignedInFixture = true;
    await import('./verify-economics-calculation-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'heat-calculation') {
    useSignedInFixture = true;
    await import('./verify-heat-calculation-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'ups-calculation') {
    useSignedInFixture = true;
    await import('./verify-ups-calculation-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'mtbf-mttr') {
    useSignedInFixture = true;
    await import('./verify-mtbf-mttr-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'availability-calculation') {
    useSignedInFixture = true;
    await import('./verify-availability-calculation-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'backup-calculation') {
    useSignedInFixture = true;
    await import('./verify-backup-calculation-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'workplace-access') {
    useSignedInFixture = true;
    await import('./verify-workplace-access-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'handover-training') {
    useSignedInFixture = true;
    await import('./verify-handover-training-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'rollout-planning') {
    useSignedInFixture = true;
    await import('./verify-rollout-planning-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'operations-docs') {
    useSignedInFixture = true;
    await import('./verify-operations-docs-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'ticket-priority') {
    useSignedInFixture = true;
    await import('./verify-ticket-priority-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'change-process') {
    useSignedInFixture = true;
    await import('./verify-change-process-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'itil-basics') {
    useSignedInFixture = true;
    await import('./verify-itil-basics-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'central-logging') {
    useSignedInFixture = true;
    await import('./verify-central-logging-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'capacity-trends') {
    useSignedInFixture = true;
    await import('./verify-capacity-trends-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'monitoring') {
    useSignedInFixture = true;
    await import('./verify-monitoring-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'ki') {
    useSignedInFixture = true;
    await import('./verify-ki-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'bcm') {
    useSignedInFixture = true;
    await import('./verify-bcm-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'compromise-symptoms') {
    useSignedInFixture = true;
    await import('./verify-compromise-symptoms-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'incident-response') {
    useSignedInFixture = true;
    await import('./verify-incident-response-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'gdpr') {
    useSignedInFixture = true;
    await import('./verify-gdpr-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'authentication') {
    useSignedInFixture = true;
    await import('./verify-authentication-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'storage-encryption') {
    useSignedInFixture = true;
    await import('./verify-storage-encryption-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'tls13') {
    useSignedInFixture = true;
    await import('./verify-tls13-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'pki') {
    useSignedInFixture = true;
    await import('./verify-pki-browser.mjs');
  } else if (process.env.AP2_BROWSER_ONLY === 'cryptography') {
    useSignedInFixture = true;
    await import('./verify-cryptography-browser.mjs');
  } else {
    await runFullSuite();
  }
} finally {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}

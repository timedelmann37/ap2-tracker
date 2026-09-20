// Prüft supabase/leaderboard.sql gegen ein eingebettetes Postgres (PGlite).
// Supabase-spezifisches (auth.users, auth.uid(), Rollen, Default-Privileges)
// wird vorher als Stub angelegt, damit die Datei unverändert laufen kann.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PGlite } from '@electric-sql/pglite';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const progressSql = await readFile(path.join(repoRoot, 'supabase', 'progress.sql'), 'utf8');
const leaderboardSql = await readFile(path.join(repoRoot, 'supabase', 'leaderboard.sql'), 'utf8');

function assert(value, message) {
  if (!value) throw new Error(message);
  console.log(`PASS ${message}`);
}

const db = new PGlite();
await db.exec(`
  create role anon nologin;
  create role authenticated nologin;
  create schema auth;
  create table auth.users (id uuid primary key, email text);
  create function auth.uid() returns uuid language sql stable as $$
    select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  grant usage on schema auth to anon, authenticated;
  grant execute on function auth.uid() to anon, authenticated;
  grant usage on schema public to anon, authenticated;
  -- Supabase vergibt neue Objekte standardmäßig an anon und authenticated.
  alter default privileges in schema public grant all on tables to anon, authenticated;
`);

const tim = '11111111-1111-1111-1111-111111111111';
const anna = '22222222-2222-2222-2222-222222222222';
const chris = '33333333-3333-3333-3333-333333333333';
await db.exec(`insert into auth.users values ('${tim}', 'tim.edelmann@example.de'), ('${anna}', 'anna@example.de');`);
await db.exec(progressSql);

await db.exec(leaderboardSql);
await db.exec(leaderboardSql);
assert(true, 'leaderboard.sql läuft zweimal hintereinander ohne Fehler (idempotent)');

const profiles = await db.query('select user_id, display_name, show_on_leaderboard from public.profiles');
assert(profiles.rows.length === 2, 'Backfill legt für jedes bestehende Konto ein Profil an');
assert(profiles.rows.find((row) => row.user_id === tim)?.display_name === 'tim.edelmann', 'Anzeigename wird aus dem E-Mail-Teil vor dem @ vorbelegt');
assert(profiles.rows.every((row) => row.show_on_leaderboard === true), 'Opt-out-Schalter steht standardmäßig auf „anzeigen“');

await db.exec(`insert into auth.users values ('${chris}', 'chris@example.de');`);
const created = await db.query('select display_name from public.profiles where user_id = $1', [chris]);
assert(created.rows[0]?.display_name === 'chris', 'Trigger legt bei Registrierung automatisch ein Profil an');

const now = Date.now();
const lastWeek = now - 2 * 86400000;
const longAgo = now - 10 * 86400000;
const timState = {
  'ga1-1__0': true, 'ts__ga1-1__0': lastWeek,
  'ga1-1__1': true, 'ts__ga1-1__1': longAgo,
  'ga2-3__2': true, 'ts__ga2-3__2': lastWeek, 'mark__ga2-3__2': true,
  'wiso-2__0': false, 'ts__wiso-2__0': lastWeek,
  'mark__ga1-5__0': true, 'ts__ga1-5__0': lastWeek,
  __activity: { '2026-09-18': 3 }
};
const annaState = { 'ga2-1__0': true, 'ts__ga2-1__0': longAgo };
await db.query('insert into public.progress (user_id, state) values ($1, $2), ($3, $4)', [tim, timState, anna, annaState]);

async function asRole(role, fn) {
  await db.exec(`set role ${role};`);
  try { return await fn(); } finally { await db.exec('reset role;'); }
}

const board = await asRole('authenticated', () => db.query('select * from public.leaderboard'));
const timRow = board.rows.find((row) => row.user_id === tim);
const annaRow = board.rows.find((row) => row.user_id === anna);
const chrisRow = board.rows.find((row) => row.user_id === chris);
assert(board.rows.length === 3, 'angemeldete Nutzer sehen alle Opt-in-Profile');
assert(Object.keys(board.rows[0]).sort().join(',') === 'display_name,done_count,last_active_at,user_id,week_count', 'View gibt weder E-Mail noch rohen Fortschritt heraus');
assert(timRow?.done_count === 3, 'done_count zählt nur Kernthemen-Schlüssel mit Wert true');
assert(timRow?.week_count === 1, 'week_count ignoriert alte Zeitstempel, abgewählte und zur Wiederholung markierte Kernthemen');
assert(Math.abs(new Date(timRow?.last_active_at).getTime() - lastWeek) < 1000, 'last_active_at ist der jüngste ts__-Zeitstempel');
assert(annaRow?.done_count === 1 && annaRow?.week_count === 0, 'nur alte Haken: Gesamt zählt, Woche nicht');
assert(chrisRow?.done_count === 0 && chrisRow?.week_count === 0 && chrisRow?.last_active_at === null, 'Profil ohne Fortschrittszeile erscheint mit 0/0 und ohne Aktivität');

await db.query('update public.profiles set show_on_leaderboard = false where user_id = $1', [anna]);
const afterOptOut = await asRole('authenticated', () => db.query('select user_id from public.leaderboard'));
assert(!afterOptOut.rows.some((row) => row.user_id === anna), 'Opt-out entfernt das Profil aus der Rangliste');

let anonError = '';
await asRole('anon', async () => {
  try { await db.query('select * from public.leaderboard'); } catch (error) { anonError = error.message; }
});
assert(/permission denied/i.test(anonError), 'anon hat trotz Supabase-Default-Privileges keinen Zugriff auf die Rangliste');

await asRole('authenticated', async () => {
  await db.query('select set_config($1, $2, false)', ['request.jwt.claim.sub', tim]);
  const visible = await db.query('select user_id from public.profiles');
  assert(visible.rows.length === 1 && visible.rows[0].user_id === tim, 'RLS: nur die eigene Profilzeile ist lesbar');
  const foreign = await db.query('update public.profiles set display_name = $1 where user_id = $2 returning user_id', ['x', anna]);
  assert(foreign.rows.length === 0, 'RLS: fremde Profilzeilen sind nicht änderbar');
  await db.query('update public.profiles set display_name = $1 where user_id = $2', ['Tim', tim]);
  let blankError = '';
  try { await db.query('update public.profiles set display_name = $1 where user_id = $2', ['   ', tim]); } catch (error) { blankError = error.message; }
  assert(/profiles_display_name_length/.test(blankError), 'leerer Anzeigename wird von der Datenbank abgelehnt');
});
const renamed = await db.query('select display_name from public.profiles where user_id = $1', [tim]);
assert(renamed.rows[0].display_name === 'Tim', 'eigener Anzeigename ist änderbar');

await db.close();
console.log('leaderboard.sql: alle Prüfungen bestanden');

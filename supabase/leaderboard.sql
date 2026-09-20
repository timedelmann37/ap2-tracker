-- Lerngruppe: Anzeigenamen (public.profiles) und Rangliste (public.leaderboard).
-- Run in the Supabase SQL Editor after supabase/progress.sql. Safe to run more
-- than once. No progress records are read, removed or overwritten.
--
-- What other users can see: display_name plus three counters, nothing else.
-- The raw progress.state and the e-mail address never leave the database.
-- Only signed-in users (role "authenticated") may read the leaderboard; anon
-- gets nothing.
begin;

-- 1. Profiles -----------------------------------------------------------------
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  show_on_leaderboard boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_length
    check (char_length(btrim(display_name)) between 1 and 32)
);
alter table public.profiles enable row level security;
grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
revoke all on public.profiles from anon;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'select own profile') then
    create policy "select own profile" on public.profiles for select to authenticated using ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'insert own profile') then
    create policy "insert own profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'update own profile') then
    create policy "update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
  end if;
end $$;

-- 2. Profile on sign-up: display name defaults to the part before the "@" ----
create or replace function public.default_display_name(email text)
returns text
language sql
immutable
as $$
  select left(coalesce(nullif(btrim(split_part(coalesce(email, ''), '@', 1)), ''), 'Lernende:r'), 32);
$$;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, public.default_display_name(new.email))
  on conflict (user_id) do nothing;
  return new;
end;
$$;


drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

-- Backfill for accounts that signed up before this trigger existed.
insert into public.profiles (user_id, display_name)
select u.id, public.default_display_name(u.email)
from auth.users u
on conflict (user_id) do nothing;

-- 3. Leaderboard view ---------------------------------------------------------
-- Runs with the owner's rights (security_invoker = false), so it may read every
-- progress row; it only exposes aggregates, and only for opted-in profiles.
--   done_count     abhakte Kernthemen: Schlüssel "<ga1|ga2|wiso>-N__M" mit Wert true
--   week_count     davon in den letzten 7 Tagen abgehakt (ts__<id>) und nicht
--                  zur Wiederholung markiert (mark__<id>)
--   last_active_at jüngster ts__-Zeitstempel (Millisekunden seit Epoche)
create or replace view public.leaderboard
with (security_invoker = false)
as
select
  pr.user_id,
  pr.display_name,
  coalesce(done.done_count, 0)::integer as done_count,
  coalesce(done.week_count, 0)::integer as week_count,
  act.last_active_at
from public.profiles pr
left join public.progress p on p.user_id = pr.user_id
left join lateral (
  select
    count(*) as done_count,
    count(*) filter (
      where (p.state -> ('mark__' || e.key)) is distinct from 'true'::jsonb
        and jsonb_typeof(p.state -> ('ts__' || e.key)) = 'number'
        and to_timestamp((p.state ->> ('ts__' || e.key))::numeric / 1000.0) >= now() - interval '7 days'
    ) as week_count
  from jsonb_each(p.state) e
  where e.key ~ '^(ga1|ga2|wiso)-\d+__\d+$'
    and e.value = 'true'::jsonb
) done on true
left join lateral (
  select to_timestamp(max((t.value #>> '{}')::numeric) / 1000.0) as last_active_at
  from jsonb_each(p.state) t
  where left(t.key, 4) = 'ts__'
    and jsonb_typeof(t.value) = 'number'
) act on true
where pr.show_on_leaderboard;

-- Supabase grants new objects to anon by default; take that back explicitly.
revoke all on public.leaderboard from anon, public;
grant select on public.leaderboard to authenticated;

notify pgrst, 'reload schema';
commit;

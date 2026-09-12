-- Run in the Supabase SQL Editor if public.progress has not been set up.
-- No progress records are removed or overwritten.
begin;
create table if not exists public.progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;
grant usage on schema public to authenticated;
grant select, insert, update on public.progress to authenticated;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'progress' and policyname = 'select own progress') then
    create policy "select own progress" on public.progress for select to authenticated using ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'progress' and policyname = 'insert own progress') then
    create policy "insert own progress" on public.progress for insert to authenticated with check ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'progress' and policyname = 'update own progress') then
    create policy "update own progress" on public.progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
  end if;
end $$;
notify pgrst, 'reload schema';
commit;

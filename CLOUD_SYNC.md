# Cloud-Sync einrichten (Supabase)

Der Tracker speichert den Fortschritt weiterhin sofort lokal (`localStorage`),
kann ihn zusätzlich aber geräteübergreifend über ein kostenloses
[Supabase](https://supabase.com)-Projekt sichern. Anmeldung läuft passwortlos
per Magic Link (Link per E-Mail).

Ohne die Schritte unten läuft die Seite unverändert weiter — der neue
„Anmelden"-Button in der Navigationsleiste zeigt dann nur den Hinweis
„Cloud-Sync ist auf dieser Seite noch nicht eingerichtet." an.

## 1. Supabase-Projekt anlegen

1. Auf [supabase.com](https://supabase.com) kostenlos registrieren.
2. „New Project" → Name frei wählbar (z. B. `ap2-tracker`), Datenbank-Passwort
   notieren (wird für das Setup selbst nicht mehr gebraucht), Region z. B.
   `Central EU (Frankfurt)`.
3. Warten, bis das Projekt fertig eingerichtet ist (ca. 1–2 Minuten).

## 2. Datenbank-Tabelle anlegen

Im Dashboard links auf **SQL Editor** → **New query**, folgendes einfügen und
mit **Run** ausführen:

```sql
-- AP2 Tracker — Cloud-Sync Schema
-- Im Supabase Dashboard unter "SQL Editor" ausführen (einmalig).

create table if not exists public.progress (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  state      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

create policy "select own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "update own progress"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- kein delete-Policy nötig: Löschen des auth.users-Eintrags löscht die Zeile automatisch (on delete cascade)
```

Das legt eine Tabelle `progress` an, in der pro Nutzer genau eine Zeile mit
dem kompletten Fortschritt (als JSON) liegt. **Row Level Security** sorgt
dafür, dass jeder Nutzer ausschließlich seine eigene Zeile lesen und
schreiben kann — das ist die einzige Sicherheitsschranke, da der Client
direkt mit der Datenbank spricht (kein eigenes Backend).

## 3. Magic-Link-Login aktivieren

1. Im Dashboard: **Authentication** → **Providers** → **Email** ist bei
   neuen Projekten standardmäßig aktiv (nichts zu tun), stellt aber sicher,
   dass „Confirm email" **nicht** zusätzliche Hürden aufbaut, die den
   Magic-Link-Flow stören — Standardeinstellung passt.
2. **Authentication** → **URL Configuration**:
   - **Site URL**: die Live-Domain der Seite eintragen, z. B.
     `https://<eure-netlify-domain>.netlify.app`
   - **Redirect URLs**: dieselbe Domain (und ggf. `http://localhost:*` für
     lokales Testen) hinzufügen, z. B.
     `https://<eure-netlify-domain>.netlify.app/**`

   Ohne diesen Schritt landet der Magic-Link-Klick aus der E-Mail auf einer
   Supabase-eigenen Fehlerseite statt zurück auf dem Tracker.

## 4. Zugangsdaten eintragen

Im Dashboard: **Project Settings** → **API**. Dort stehen:

- **Project URL** (z. B. `https://xxxxxxxxxxxx.supabase.co`)
- **anon public** Key (langer String unter „Project API keys")

Diese beiden Werte müssen in **allen fünf** Bereichsseiten eingetragen
werden, jeweils im `<script>`-Block bei folgenden zwei Zeilen:

```js
const SUPABASE_URL = 'DEINE-SUPABASE-PROJEKT-URL';
const SUPABASE_ANON_KEY = 'DEIN-SUPABASE-ANON-KEY';
```

Betroffene Dateien:
- `index.html`
- `uebersicht/index.html`
- `konzeption-administration/index.html`
- `netzwerke/index.html`
- `sowi/index.html`

Der **anon public**-Key ist bewusst dazu gedacht, öffentlich im
Client-Code zu stehen (er erlaubt für sich genommen nichts — die
RLS-Policies aus Schritt 2 sind die eigentliche Absicherung). Der
**service_role**-Key darf dagegen niemals in den Code — der wird hier
nicht gebraucht.

## 5. Testen

Nach dem Eintragen der Zugangsdaten und dem Deployen:

1. Seite öffnen, auf „Anmelden" klicken, E-Mail-Adresse eingeben, „Link
   senden" klicken.
2. E-Mail-Postfach prüfen (auch Spam-Ordner), auf den Link klicken.
3. Man landet zurück auf dem Tracker und ist angemeldet — der Button zeigt
   jetzt „Konto" statt „Anmelden".
4. Ein paar Häkchen setzen, Seite neu laden (oder auf einem anderen Gerät
   mit derselben E-Mail anmelden) — der Fortschritt sollte übernommen
   werden. Beim ersten Login mit vorhandenem lokalem *und* Cloud-Fortschritt
   fragt der Tracker per Dialog, ob der Cloud-Stand übernehmen oder
   zusammengeführt werden soll.

## Hinweis zur geplanten Website-weiten Passwortsperre

Diese Registrierung ist bewusst offen (jeder kann sich mit einer beliebigen
E-Mail-Adresse anmelden) — das per-Nutzer-Konto dient nur der Zuordnung des
eigenen Fortschritts. Eine zusätzliche, website-weite Zugangssperre (da auf
der Seite sensible Prüfungsinhalte liegen) ist als separater, späterer
Schritt geplant und **nicht** Teil dieses Setups.

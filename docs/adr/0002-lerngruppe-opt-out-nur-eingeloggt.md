# 0002 – Lerngruppe: Rangliste aus Cloud-Fortschritt, Opt-out, nur für Angemeldete

- **Status:** akzeptiert
- **Datum:** 2026-09-20
- **Betrifft:** Übersicht (`/uebersicht/`), Konto-Dialog im Hub (`/`),
  Supabase (`supabase/leaderboard.sql`)
- **Version:** v3.11.0 (Lerngruppe)

## Kontext

Seit v3.10 liegt der Fortschritt je Konto in Supabase (`public.progress`,
eine JSON-Zeile je Nutzer, Row Level Security auf die eigene Zeile). Die
Lerngruppe, die den Tracker gemeinsam nutzt, sah davon nichts voneinander:
kein Bild, wer wie weit ist oder wer gerade dranbleibt – obwohl die Daten
längst in der Datenbank lagen.

Gewünscht war eine Rangliste. Die Daten dafür existieren, aber das
Datenmodell verhindert den Zugriff absichtlich, und die Frage, *was* die
anderen sehen dürfen, wer standardmäßig drin ist und wie ehrlich die Zahlen
sind, musste entschieden werden.

## Entscheidung

1. **Opt-out statt Opt-in.** Jedes Konto ist standardmäßig in der Lerngruppe
   sichtbar (`profiles.show_on_leaderboard default true`) und kann sich im
   Konto-Dialog austragen. Begründung: kleine, bekannte Gruppe; der Nutzen
   der Liste hängt an ihrer Vollständigkeit, und ein Opt-in hätte sie beim
   Start leer gelassen.
2. **Sichtbar nur für Angemeldete.** Die View `public.leaderboard` ist
   ausschließlich der Rolle `authenticated` freigegeben; `anon` wird der
   Zugriff explizit entzogen (Supabase vergibt neue Objekte sonst per
   Default-Privileges auch an `anon`). Ausgeloggt zeigt die Übersicht nur
   einen Hinweis und stellt keine Anfrage.
3. **„Diese Woche" ist die Standardansicht, Gesamt sekundär.** Die
   Wochenwertung (Kernthemen, die in den letzten 7 Tagen abgehakt wurden)
   setzt jede Woche neu an und belohnt Dranbleiben. Eine All-Time-Liste
   demotiviert genau die, die hinten liegen – bei Prüfungsvorbereitung die
   Falschen. Gesamt bleibt als zweiter Modus erreichbar.
4. **Die View liefert nur Aggregate.** `display_name`, `done_count`,
   `week_count`, `last_active_at` – nie `state`, nie `email`. Sie läuft mit
   Owner-Rechten (`security_invoker = false`), damit sie alle
   `progress`-Zeilen lesen darf; die RLS-Policies auf `progress` und
   `profiles` bleiben unverändert.
5. **Kein Manipulationsschutz.** `progress.state` wird vom Client als
   beliebiges JSON geschrieben; wer will, setzt sich per Browser-Konsole auf
   100 %. Serverseitige Validierung hieße ein echtes Backend. Für eine
   Lerngruppe unter Kolleg:innen bewusst akzeptiert; die Liste ist Ansporn,
   kein Wettbewerb mit Einsatz.
6. **Die Gesamtzahl der Kernthemen kommt aus dem Client-Katalog.** Die
   Datenbank kennt `DATA` nicht. Prozentwerte im Modus „Gesamt" werden auf
   der Übersicht aus `DATA` (über `countTopic`) gebildet, die View liefert
   nur die absolute Zahl.

Weitere Festlegungen: Der Anzeigename wird bei der Registrierung per
Trigger aus dem E-Mail-Teil vor dem `@` vorbelegt (sonst müsste jede:r erst
etwas einrichten, bevor Opt-out überhaupt Sinn ergibt). Die Wochenwertung
ignoriert Kernthemen mit Wiederholungsmarkierung, weil eine
Inhaltsüberarbeitung Zeitstempel und Markierung gemeinsam neu setzt und
die Woche sonst verfälschen würde. Profil-Einstellungen gibt es nur im
Hub-Dialog; die vier Dialog-Kopien verlinken dorthin.

## Trade-off

**Dagegen:** Opt-out zeigt Aktivitätsmuster („zuletzt am …") von Personen,
die nie aktiv zugestimmt haben. Die Zahlen sind fälschbar. Die Owner-View
ist ein bewusstes Loch in der sonst strikten RLS-Logik und muss bei jeder
Änderung an `progress` mitgedacht werden.

**Dafür:** Die Liste ist vom ersten Tag an vollständig und damit nützlich.
Es bleibt beim statischen Deployment ohne eigenes Backend – die einzige
neue Infrastruktur ist eine SQL-Datei. Was andere sehen, ist auf drei
Zählwerte und einen frei wählbaren Namen begrenzt; E-Mail und Themen
bleiben privat.

## Konsequenzen

- Einrichtung ist ein einmaliger, manueller SQL-Lauf im Supabase-Dashboard
  (`CLOUD_SYNC.md`, Abschnitt 2b). Fehlt er, blendet der Hub den Profil-Block
  aus und die Übersicht zeigt eine Hinweiszeile; der Fortschritt-Sync läuft
  davon unberührt.
- `supabase/leaderboard.sql` ist idempotent und wird lokal gegen PGlite
  geprüft (`npm run test:leaderboard-sql`), inklusive `anon`-Sperre und
  RLS. Eine Schema-Änderung an `progress.state` (Schlüsselform
  `<bereich>-N__M`, `ts__`, `mark__`) muss in der View nachgezogen werden.
- Alle Konten sind eine Gruppe. Gruppen-Trennung, Historie vergangener
  Wochen, Benachrichtigungen und öffentliche Sichtbarkeit sind ausdrücklich
  nicht Teil dieser Entscheidung.
- Begriffe „Lerngruppe", „Anzeigename" und „Wochenwertung" stehen in
  `CONTEXT.md`.

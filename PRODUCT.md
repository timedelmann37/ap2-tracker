# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primär: Menschen, die sich auf den schriftlichen Teil der IHK-Abschlussprüfung
AP2 im Ausbildungsberuf Fachinformatiker für Systemintegration vorbereiten
(Prüfungsbereiche GA1 – Konzeption und Administration von IT-Systemen, GA2 –
Analyse und Entwicklung von Netzwerken, WiSo). Die Seite ist öffentlich und für
jede:n AP2-Kandidat:in nutzbar, nicht auf eine einzelne Person zugeschnitten.

Typische Situation: in der Vorbereitungsphase vor einem festen Prüfungstermin
(aktuell Winterprüfung 2026/27), meist am Desktop in längeren Lernblöcken, mit
einem wochenweisen Lernplan im Rücken. Die Person kommt über einen Link oder
ein Lesezeichen. Die Seite funktioniert ohne Anmeldung (Fortschritt lokal);
wer geräteübergreifend sichern will, legt sich per passwortlosem Magic Link
(E-Mail) ein Konto an. Die Registrierung ist offen — jede E-Mail-Adresse
genügt, das Konto dient nur der Zuordnung des eigenen Fortschritts.

## Product Purpose

Festhalten, welche Lerninhalte für die AP2 schon sitzen und welche noch offen
sind — gemessen an einem terminierten Lernplan bis zum Prüfungstag. Die Seite
beantwortet zwei Fragen: „Was ist laut Plan gerade dran?" und „Wie weit bin ich
insgesamt und pro Bereich?". Erfolg heißt: die Person weiß jederzeit ohne
Nachdenken, wo sie im Stoff steht und was als Nächstes zu tun ist, und verliert
den Fortschritt nicht — abgesichert über Export/Import als JSON und optional
über geräteübergreifenden Cloud-Sync (Supabase).

Der Stoffkatalog selbst ist Teil des Produkts: die Kernthemen je Bereich wurden
gegen echte, veröffentlichte IHK-Prüfungen abgeglichen (Lückencheck); ergänzte
Punkte tragen die Quellprüfung als Marker.

## Positioning

Ein terminierter, gegen reale IHK-Prüfungen abgeglichener Stoff-Tracker
speziell für AP2 FISI — nicht ein generisches Lern-/Karteikarten-Tool und kein
Fragenkatalog. Die verbindliche Reihenfolge und Wochen-Terminierung aller
Themengruppen („der Plan") plus der feste Wochenrhythmus sind fest eingebaut;
ein neutrales To-do- oder Flashcard-Produkt hat weder den kuratierten
AP2-Stoffbaum noch die Plan-Logik (aktuell geplant / Rückstand).

Bewusst backendlos: eine Sammlung in sich geschlossener HTML-Seiten, kein
Build, kein eigener Server. Fortschritt liegt zuerst lokal im Browser; der
optionale Cloud-Sync spricht direkt (ohne eigenes Backend) mit Supabase,
abgesichert allein über Row Level Security. Anmeldung ist optional und
passwortlos. Das ist eine Haltung (Einfachheit, sofort lokal lauffähig,
minimale Infrastruktur), kein Übergangszustand.

## Operating Context

- **Gliederung** (siehe `CONTEXT.md`): Bereich › Themengruppe › Kernthema.
  Fortschritt wird am einzelnen abhakbaren Kernthema gemessen und nach oben
  aggregiert.
- **Der Plan** lebt auf der Übersicht-Seite (`/uebersicht/`), nicht als
  Dokument: chronologischer Gesamtplan aller Themengruppen bis zur Prüfung plus
  Wochenrhythmus (welcher Bereich an welchem Wochentag).
- **Zustände einer Themengruppe**: „aktuell geplant" (Kalenderwoche läuft oder
  steht als Nächstes an) und „Rückstand" (Kalenderwoche vorbei, noch nicht zu
  100 % abgehakt) — getrennt ausgewiesen.
- **Seitenstruktur**: Hub (`/`) mit „Diese Woche"-Hero und Gesamt-Dashboard;
  `/uebersicht/`; drei Themenbereichs-Seiten
  (`/konzeption-administration/`, `/netzwerke/`, `/sowi/`);
  `/simulation/` (Prüfungssimulation, im Aufbau).
- **Wiederkehrende Handlungen**: Kernthema abhaken, zur Wiederholung markieren,
  bereichsübergreifend suchen, aus einem Suchtreffer / Plan-Eintrag per
  Deep-Link direkt in den passenden Block springen, Fortschritt als JSON
  exportieren/importieren, sich per Magic Link an-/abmelden (Button in der
  Navigationsleiste: „Anmelden" ↔ „Konto"). Beim ersten Login mit lokalem und
  Cloud-Stand fragt ein Dialog, ob übernehmen oder zusammenführen.
- **Nebenbei**: vier kleine Lern-Minispiele hinter dem 🕹️-Button
  (Paket-Fang, Port-Sprint, Subnetting-Blitz, Fachbegriff-Rush).
- **Mitarbeit** am Repo läuft zu zweit über Feature-Branches und Pull Requests
  (`CONTRIBUTING.md`); Deploy-Previews auf Netlify ersetzen automatisierte
  Tests.

## Capabilities and Constraints

- Kein Build-Schritt, keine Abhängigkeiten: jede Seite ist in sich
  geschlossenes HTML/CSS/JS und lässt sich direkt im Browser öffnen. Deployment
  über Netlify (`publish = "."`, kein Build-Command), jeder Push auf `main`
  ergibt eine erreichbare Seite.
- Stoffdaten stecken in der `DATA`-Konstante am Anfang des jeweiligen
  `<script>`-Blocks der Themenseite.
- Fortschritt: `localStorage`, Schlüssel `ap2-tracker-state-v1` — **derselbe
  Schlüssel** auf allen drei Themenbereichs-Seiten und im Hub-Dashboard, damit
  Haken überall konsistent zusammenzählen. Kein Server, kein Sync zwischen
  Geräten/Browsern; Export/Import-JSON umfasst alle drei Bereiche.
- Optionaler Cloud-Sync (`CLOUD_SYNC.md`): Supabase-Projekt, Tabelle
  `public.progress` (eine Zeile pro Nutzer, kompletter Zustand als `jsonb`),
  RLS als einzige Sicherheitsschranke, passwortloser Magic-Link-Login. Client
  spricht direkt mit Supabase, kein eigenes Backend. `SUPABASE_URL` /
  `SUPABASE_ANON_KEY` stehen im `<script>`-Block **aller fünf** Seiten
  (Hub, Übersicht, drei Themenbereiche); ohne Konfiguration zeigt der
  „Anmelden"-Button nur einen Hinweis und die Seite läuft unverändert lokal.
- Geplant, nicht umgesetzt: website-weite Zugangssperre (Passwortschutz der
  ganzen Seite, da Prüfungsinhalte). Separat vom Cloud-Sync-Setup.
- Suche: Themenseiten tragen ein kopiertes `SEARCH_DATA`-Literal (aus `DATA`
  generiert); Hub/Übersicht leiten `SEARCH_DATA` live aus ihrem `DATA` ab.
- Deep-Link-Schema `/<bereich>/#<id>&first` öffnet Block und scrollt zum ersten
  offenen Kernthema.
- Gemeinsame Shell wird zwischen Seiten **kopiert**, nicht als geteiltes Asset
  eingebunden (bewusste Entscheidung, siehe `ui-hierarchie-kur`).
- Changelog wird ausschließlich im Hub gepflegt (`APP_VERSION` + `CHANGELOG`
  in `index.html`, plus `CHANGELOG.md`); die anderen Seiten haben keinen
  Versions-Button.
- UI-Sprache: Deutsch. Versionierung nach SemVer, Changelog nach „Keep a
  Changelog".
- Light- und Dark-Theme werden unterstützt (`prefers-color-scheme` +
  expliziter `data-theme`-Toggle).
- Externe Laufzeit-Abhängigkeiten: Google Fonts (Inter, Manrope, IBM Plex
  Mono) und — nur wenn Cloud-Sync konfiguriert ist — der Supabase-JS-Client.

## Brand Commitments

- Name: **AP2-Tracker** (Seitentitel/Marketing: „AP2 Vorbereitung").
- Vokabular ist verbindlich und in `CONTEXT.md` fixiert, inklusive der
  _Avoid_-Listen: „Bereich", „Themengruppe", „Kernthema", „der Plan",
  „aktuell geplant", „Rückstand", „Wiederholungsmarkierung". Nicht: Kategorie,
  Block, Item, überfällig, Flag usw.
- Aktuelle Bildsprache (seit v3.5.0, in der UI-Hierarchie-Kur bewusst
  beibehalten): flach, Haarlinien statt Schatten, warmes Charcoal mit
  Grünstich, ein Grün-Akzent, an supabase.com angelehnt. Das ist der
  Ist-Zustand und Ausgangspunkt, nicht per se für alle Zukunft festgeschrieben.
- Ton: sachlich, knapp, deutschsprachig; kein Gamification-Overkill, aber die
  Minispiele und eine 100-%-Feier sind erwünschte kleine Auflockerungen.

## Evidence on Hand

- Realer, kuratierter Stoffkatalog je Bereich in den `DATA`-Konstanten,
  abgeglichen gegen veröffentlichte IHK-Prüfungen (ergänzte Kernthemen mit
  Quellprüfungs-Marker).
- `CONTEXT.md` (Domänen-Vokabular), `docs/adr/0001-hub-fuehrt-mit-diese-woche.md`
  (Entscheidung, dass der Hub mit „Diese Woche" führt), `CHANGELOG.md`,
  `CLOUD_SYNC.md` (Setup-Anleitung Supabase-Cloud-Sync).
- Kein Nutzer-Feedback, keine Nutzungszahlen, keine Testimonials oder
  Fallstudien — nichts davon erfinden.
- Prüfungstermin als Fixpunkt für „der Plan": Winterprüfung 2026/27.

## Product Principles

1. **Der Plan ist der Maßstab.** Fortschritt ist immer relativ zur
   Wochen-Terminierung zu lesen — „gerade dran" und „Rückstand" sind
   Erstklasse-Zustände, nicht nur Prozentzahlen.
2. **Eine Kernthema-Wahrheit, überall konsistent.** Derselbe
   `localStorage`-Zustand zählt im Hub-Dashboard und auf jeder Themenseite
   identisch zusammen; keine widersprüchlichen Fortschrittsanzeigen.
3. **Lokal zuerst, Konto optional.** Die Seite muss ohne Anmeldung voll
   funktionieren; Fortschritt landet sofort in `localStorage`. Cloud-Sync und
   Konto sind ein zusätzliches Angebot (passwortlos, offen), kein Zwang und
   kein eigenes Backend. Kein Build.
4. **Kuratierter Stoff schlägt Vollständigkeitsgefühl.** Kernthemen bilden ab,
   was real geprüft wurde; neue Punkte kommen mit Quellenbeleg, nicht auf
   Verdacht.
5. **Vokabulardisziplin.** Die Begriffe aus `CONTEXT.md` gelten in UI-Text,
   Code und Doku — auch wenn Alltagssynonyme näherliegen.

## Accessibility & Inclusion

Kein formal zugesicherter Standard. Faktisch vorhanden und zu erhalten:
`prefers-reduced-motion`-Behandlung (100-%-Feier, Balken-Fill), Dark-Mode,
Tastatur-/Fokus-Bedienbarkeit der abhakbaren Kernthemen. Deutschsprachige
Zielgruppe, `lang="de"`.

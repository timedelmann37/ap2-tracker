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
ein Lesezeichen. Inhalte können ohne Anmeldung gelesen werden; zum Ändern und
Speichern des Fortschritts ist ein Konto per passwortlosem Magic Link (E-Mail)
erforderlich. Die Registrierung ist offen — jede E-Mail-Adresse genügt, das
Konto dient nur der Zuordnung des eigenen Fortschritts.

## Product Purpose

Festhalten, welche Lerninhalte für die AP2 schon sitzen und welche noch offen
sind — gemessen an einem terminierten Lernplan bis zum Prüfungstag. Die Seite
beantwortet zwei Fragen: „Was ist laut Plan gerade dran?" und „Wie weit bin ich
insgesamt und pro Bereich?". Erfolg heißt: die Person weiß jederzeit ohne
Nachdenken, wo sie im Stoff steht und was als Nächstes zu tun ist, und verliert
den Fortschritt nicht — er wird geräteübergreifend über Supabase gespeichert.

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

Bewusst ohne eigenen Server: Der Client spricht direkt mit Supabase,
abgesichert über Row Level Security. Die Anmeldung ist für Änderungen am
Fortschritt erforderlich und bleibt passwortlos. `localStorage` dient nur als
technischer Cache für die Darstellung und Synchronisierung.

Der Bestand nutzt statisches HTML/CSS/JS mit gemeinsamen Assets und einem Build
für die Markdown-Lernseiten sowie das Publish-Verzeichnis. Framework, TypeScript,
Tailwind oder eine Komponentenbibliothek dürfen eingesetzt werden, wo sie sich
lohnen; Build und Netlify-Konfiguration werden entsprechend gepflegt.

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
  Deep-Link direkt in den passenden Block springen und sich per Magic Link
  an-/abmelden (Button in der Navigationsleiste: „Anmelden" ↔ „Angemeldet").
  Fortschritt kann nur mit aktiver Sitzung geändert werden.
- **Nebenbei**: vier kleine Lern-Minispiele hinter dem 🕹️-Button
  (Paket-Fang, Port-Sprint, Subnetting-Blitz, Fachbegriff-Rush).
- **Mitarbeit** am Repo läuft zu zweit über Feature-Branches und Pull Requests
  (`CONTRIBUTING.md`); Deploy-Previews auf Netlify ergänzen die lokalen
  Build- und Browserprüfungen.

## Capabilities and Constraints

- Deployment: statische Ausgabe über Netlify. Die aktuellen Build-Befehle und
  das Publish-Verzeichnis stehen in `package.json` und `netlify.toml`.
  Bestehende Seiten bleiben bei technischen Umstellungen lauffähig, bis sie
  migriert sind.
- Stoffdaten stecken in der `DATA`-Konstante am Anfang des jeweiligen
  `<script>`-Blocks der Themenseite.
- Fortschritt: Supabase ist die verbindliche Ablage. Der `localStorage`-Schlüssel
  `ap2-tracker-state-v1` dient auf den Haupt- und Lernseiten als gemeinsamer
  technischer Cache, damit die Oberfläche während des Abgleichs konsistent ist.
  Ohne aktive Sitzung sind Fortschrittsänderungen gesperrt.
- Cloud-Sync (`CLOUD_SYNC.md`): Supabase-Projekt, Tabelle
  `public.progress` (eine Zeile pro Nutzer, kompletter Zustand als `jsonb`),
  RLS als einzige Sicherheitsschranke, passwortloser Magic-Link-Login. Client
  spricht direkt mit Supabase, kein eigenes Backend. `SUPABASE_URL` /
  `SUPABASE_ANON_KEY` stehen im `<script>`-Block **aller fünf** Seiten
  (Hub, Übersicht, drei Themenbereiche). Ohne Konfiguration können Inhalte
  gelesen, aber keine Fortschrittsänderungen gespeichert werden.
- Geplant, nicht umgesetzt: website-weite Zugangssperre (Passwortschutz der
  ganzen Seite, da Prüfungsinhalte). Separat vom Cloud-Sync-Setup.
- Suche: Themenseiten tragen ein kopiertes `SEARCH_DATA`-Literal (aus `DATA`
  generiert); Hub/Übersicht leiten `SEARCH_DATA` live aus ihrem `DATA` ab.
- Deep-Link-Schema `/<bereich>/#<id>&first` öffnet Block und scrollt zum ersten
  offenen Kernthema.
- HTML und Verhalten der gemeinsamen Shell bleiben derzeit zwischen den Seiten
  kopiert. Die Gestaltung wird über gemeinsame Assets geteilt. Zuständigkeiten
  und Einbindung für neue Seiten stehen in `DESIGN.md`.
- Changelog wird ausschließlich im Hub gepflegt (`APP_VERSION` + `CHANGELOG`
  in `index.html`, plus `CHANGELOG.md`); die anderen Seiten haben keinen
  Versions-Button.
- UI-Sprache: Deutsch. Versionierung nach SemVer, Changelog nach „Keep a
  Changelog".
- Light- und Dark-Theme werden unterstützt (`prefers-color-scheme` +
  expliziter `data-theme`-Toggle). Eine explizite Wahl wird unter
  `ap2-theme-v1` gespeichert und gilt auf allen fünf Hauptseiten. Jeder Klick
  invertiert direkt den sichtbaren Modus; ohne Wahl gilt jetzt Dark. Ein alter
  expliziter Systemwert folgt weiterhin dem Betriebssystem. Lernseiten und
  Einzeltools nutzen dieselbe Theme-Steuerung.
- Die Hauptseiten laden Inter Display und Inter lokal, einschließlich aller
  Status- und Planangaben. Herkunft und OFL-Lizenz stehen in
  `assets/fonts/SOURCES.md`. Externe Laufzeit-Abhängigkeit bleibt — nur wenn
  Cloud-Sync konfiguriert ist — der Supabase-JS-Client.

## Brand Commitments

- Name: **AP2-Tracker** (Seitentitel/Marketing: „AP2 Vorbereitung").
- Vokabular ist verbindlich und in `CONTEXT.md` fixiert, inklusive der
  _Avoid_-Listen: „Bereich", „Themengruppe", „Kernthema", „der Plan",
  „aktuell geplant", „Rückstand", „Wiederholungsmarkierung". Nicht: Kategorie,
  Block, Item, überfällig, Flag usw.
- Verbindliche Gestaltung: Deep Space nach Doppler, Astro und n8n. Neue Inhalte
  und Oberflächen führen diese Gestaltung fort. Farben, Glas, Laser-Akzente,
  Bewegung, Komponenten und die Prüfroutine stehen zentral in `DESIGN.md`.
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
2. **Eine Kernthema-Wahrheit, überall konsistent.** Der Supabase-Stand zählt im
   Hub-Dashboard und auf jeder Themenseite identisch zusammen; keine
   widersprüchlichen Fortschrittsanzeigen.
3. **Fortschritt gehört zum Konto.** Inhalte bleiben ohne Anmeldung lesbar.
   Abhaken, Wiederholungsmarkierungen und Zurücksetzen setzen eine aktive,
   passwortlose Sitzung voraus. Es gibt keinen Datei-Import oder -Export.
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

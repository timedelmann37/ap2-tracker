# AP2 Vorbereitung

Tools zur Vorbereitung auf den schriftlichen Teil der Abschlussprüfung
(Fachinformatiker Systemintegration, AP2 – GA1, GA2, WiSo), verlinkt über
ein gemeinsames Hauptmenü.

Die bestehenden Tracker-Seiten bleiben statisches HTML/CSS/JS. Lerninhalte
werden dagegen aus kuratierten Markdown-Dateien als statische Seiten gebaut.
So bleibt der Bestand ohne Framework lauffähig, während neue Lerneinheiten
nicht als kopierte HTML-Einzelseiten gepflegt werden müssen.

## Struktur

```
/                              Hub — Hauptmenü + Gesamtfortschritt aller Bereiche
/uebersicht/                   Wochenplan + Gesamtplan bis zur Prüfung
/konzeption-administration/    GA1: Konzeption und Administration von IT-Systemen
/netzwerke/                    GA2: Analyse und Entwicklung von Netzwerken
/sowi/                         Wirtschafts- und Sozialkunde
/lernpfad/                     Einstieg in die verfügbaren Lerninhalte
/lernen/<slug>/                Generierte Lerneinheiten
/simulation/                   Prüfungssimulation (im Aufbau)
assets/ap2-reference-ui.css    Gemeinsame visuelle Ebene der fünf Hauptseiten
assets/ap2-learning.css        Gemeinsame Darstellung aller Lerneinheiten
assets/ap2-learning.js         Karteikarten, Quiz und synchroner Fortschritt
assets/ap2-theme.js            Gemeinsame persistente Hell-/Dunkel-Steuerung
assets/ap2-navigation.js       Gemeinsames Themenmenü mit Tastaturbedienung und kurzer Animation
assets/fonts/                  Lokale Referenz-Schriften; Herkunft/Lizenzen in SOURCES.md
content/learning/              Kuratierte Lerninhalte als Markdown
content/sources.json           Quellenkatalog mit Rolle und Aktualität
knowledge-base/                Dokumentation der lokalen, privaten Buchdatenbank
scripts/build-learning.mjs     Markdown-zu-HTML-Build
scripts/knowledge/             Import und Volltextsuche der privaten Buchdaten
docs/UI_REDESIGN_REFERENCE_LOCK.md  Referenzen, Quellenrollen und Designgrenzen
netlify.toml                   Deployment-Konfiguration
CONTRIBUTING.md                Anforderungen für alle, die an /simulation/ arbeiten
scripts/verify-theme-persistence.mjs  Browser-Test für sofortigen Theme-Wechsel und Persistenz
scripts/verify-navigation.mjs  Browser-Test für Menü, Tastatur und Reduced Motion
```

Jeder Ordner hat seine eigene `index.html` und wird von Netlify automatisch
unter dem passenden Pfad ausgeliefert (`meineseite.netlify.app/netzwerke/`,
`.../sowi/`, …) — keine Server-Konfiguration nötig.

## Hub (`/`)

Einstieg mit „Was ist jetzt dran?" und dem Wochenfokus. Die aktuell relevante
Themengruppe führt als direkte „weitermachen"-Aktion; die beiden übrigen
Bereiche sowie Rückstand und Gesamtfortschritt bleiben im selben gerahmten
Arbeitsfenster sichtbar. Die Navigation führt zu Übersicht, Bereichen und
Simulation.

## Übersicht (`/uebersicht/`)

Der Plan: bereichsübergreifende "Was ist dran?"-Ansicht, der bestehende
Wochenrhythmus (welcher Bereich an welchem Wochentag) und ein chronologischer
Gesamtplan aller Themenblöcke bis zur Prüfung. Ein Klick auf einen Eintrag
springt in den passenden Themenbereich zum richtigen Block.

## Themenbereiche (`/konzeption-administration/`, `/netzwerke/`, `/sowi/`)

Je Bereich eine eigenständige Seite mit:

- Themenübersicht mit einzeln abhakbaren Lerninhalten ("Items"),
  Fortschrittsbalken je Thema und Bereich sowie einer
  "Zur Wiederholung markieren"-Funktion.
- Live-Suche über Themen und Einzelinhalte inklusive Hervorhebung der
  Treffer.
- **Fortschritt exportieren/importieren**: Sicherung als JSON-Datei
  herunterladen bzw. wieder einspielen – falls der Browser-Cache mal
  verloren geht (neues Gerät, anderer Browser, Cache geleert). Die
  Sicherungsdatei enthält den Fortschritt aller drei Bereiche, nicht nur des
  aktuellen.
- Vier kleine Lern-Minispiele hinter dem 🕹️-Button in der Ecke: Paket-Fang,
  Port-Sprint, Subnetting-Blitz, Fachbegriff-Rush.
- "Fortschritt zurücksetzen" löscht nur Haken/Markierungen des eigenen
  Bereichs, die anderen beiden bleiben unberührt.

Alle Inhalte wurden gegen echte IHK-Prüfungen abgeglichen (Lückencheck);
ergänzte Punkte sind mit der jeweiligen Quellprüfung markiert. Die Themen
stecken direkt in der `DATA`-Konstante am Anfang des jeweiligen
`<script>`-Blocks.

Fortschritt wird lokal im Browser gespeichert (`localStorage`, Schlüssel
`ap2-tracker-state-v1`) — **derselbe Schlüssel auf allen drei
Themenbereichs-Seiten und im Hub-Dashboard**, damit Haken sich überall
konsistent zusammenzählen.

## Lerninhalte und Wissensbasis

Die Lernseite ist die Vertiefung eines vorhandenen Kernthemas, keine zweite
Stoffstruktur. Ein Link am Kernthema öffnet Erklärungen, Tabellen,
Rechenaufgaben, Karteikarten und Selbsttests. „Gelernt" und „Zur Wiederholung"
schreiben denselben Fortschritts-Schlüssel wie die Checkbox im Themenbereich.

Die vollständig importierten Fachbücher und Grafiken liegen ausschließlich in
`knowledge-base/local/`. Dieser Ordner ist von Git ausgeschlossen. Details zum
Import, zur lokalen Volltextsuche und zur Trennung zwischen Rohquelle und
veröffentlichbarem Lerninhalt stehen in [`knowledge-base/README.md`](./knowledge-base/README.md).

## Prüfungssimulation (`/simulation/`)

Im Aufbau. Anforderungen und Spielregeln für die Mitarbeit stehen in
[`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Lokal öffnen

Nach dem Checkout einmal `npm install` ausführen. `npm run build` erzeugt die
Lernseiten gemeinsam aus den bisherigen `content/learning/*.md` und den
kompakten `content/learning-units/*.unit.json`. Kurations-Sidecars und
deklarative SVGs der kompakten Spezifikationen entstehen automatisch. Ein
kleines privates Quellenpaket wird mit
`npm run knowledge:export-batch -- --group ga2-1 --start 1 --limit 8`
erstellt. `npm test` prüft Compiler, Batch-Paket, Build, Deploy-
Allowlist und Lernstruktur. `npm run test:browser` startet selbst einen lokalen
Server gegen `dist/` und prüft Navigation, Theme, Links, Karten, Quiz und
Fortschritt; falls Chromium lokal noch fehlt, einmal `npx playwright install
chromium` ausführen.

## Deployment (Netlify)

Das Repo ist so eingerichtet, dass jeder Push auf `main` automatisch eine
erreichbare Seite ergibt:

- `index.html` liegt im Repo-Root (Netlify liefert standardmäßig
  `index.html` von der "Publish directory" aus), `uebersicht/`,
  `konzeption-administration/`, `netzwerke/`, `sowi/` und `simulation/`
  liegen als eigene Ordner daneben.
- `netlify.toml` führt `npm run build` aus und pinnt `publish = "dist"`. Es gibt bewusst **keinen**
  Catch-all-Rewrite mehr — mit mehreren echten Seiten würde der jede Anfrage
  auf die Startseite umbiegen. Nur echte 404s fallen auf die Startseite
  zurück (`status = 404`, damit der Statuscode korrekt bleibt).
- `/tracker/` (die frühere Adresse des zusammengefassten Trackers) leitet
  per 301 auf `/` weiter, für alte Lesezeichen/Links.

Auf Netlify reicht es, das Repo als Site zu verbinden – Build-Command und
Publish-Verzeichnis stecken in `netlify.toml`. Für Pull Requests baut
Netlify automatisch Deploy-Previews, darüber lässt sich ein neuer Bereich
vor dem Merge live testen.

## Mitarbeit zu zweit

Siehe [`CONTRIBUTING.md`](./CONTRIBUTING.md) für die Spielregeln: wer in
welchem Ordner arbeitet, Pfad- und `localStorage`-Konventionen, Git-Workflow
über Feature-Branches und Pull Requests.

## Version & Changelog

Aktuelle Version: siehe [`CHANGELOG.md`](./CHANGELOG.md) (Format: [Keep a
Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach
[SemVer](https://semver.org/lang/de/)). Dieselbe Liste ist auch direkt auf
der Seite sichtbar: ein Klick auf die Versionsnummer im Hub (Fußzeile)
öffnet das Änderungsprotokoll. Das Changelog wird ausschließlich im Hub
gepflegt — die drei Themenbereiche und die Übersicht haben keinen eigenen
Versions-Button, `/simulation/` sowieso nicht. Bei einer neuen Version
müssen `APP_VERSION` und das `CHANGELOG`-Array im `<script>`-Block von
`index.html` sowie `CHANGELOG.md` aktualisiert werden.

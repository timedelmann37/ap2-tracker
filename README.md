# AP2 Vorbereitung

Tools zur Vorbereitung auf den schriftlichen Teil der Abschlussprüfung
(Fachinformatiker Systemintegration, AP2 – GA1, GA2, WiSo), verlinkt über
ein gemeinsames Hauptmenü.

Der aktuelle Bestand ist buildlos: kein Server, jede Seite ein in sich
geschlossenes HTML/CSS/JS. Das ist der Ist-Zustand, keine Vorgabe — ein
Build-Schritt, ein Framework (React o. Ä.), TypeScript oder Tailwind sind
für neue Arbeit erlaubt (siehe [`CLAUDE.md`](./CLAUDE.md)).

## Struktur

```
/                              Hub — Hauptmenü + Gesamtfortschritt aller Bereiche
/uebersicht/                   Wochenplan + Gesamtplan bis zur Prüfung
/konzeption-administration/    GA1: Konzeption und Administration von IT-Systemen
/netzwerke/                    GA2: Analyse und Entwicklung von Netzwerken
/sowi/                         Wirtschafts- und Sozialkunde
/simulation/                   Prüfungssimulation (im Aufbau)
netlify.toml                   Deployment-Konfiguration
CONTRIBUTING.md                Anforderungen für alle, die an /simulation/ arbeiten
```

Jeder Ordner hat seine eigene `index.html` und wird von Netlify automatisch
unter dem passenden Pfad ausgeliefert (`meineseite.netlify.app/netzwerke/`,
`.../sowi/`, …) — keine Server-Konfiguration nötig.

## Hub (`/`)

Hauptmenü mit fünf Kacheln (Übersicht, die drei Themenbereiche,
Simulation) sowie einem Dashboard, das denselben gespeicherten Fortschritt
wie die Themenbereiche zusammenfasst: Gesamtfortschritt, ein Balken je
Bereich, überfällige Themen und zuletzt bearbeitete Themen — jeweils mit
Link direkt zum passenden Block.

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

## Prüfungssimulation (`/simulation/`)

Im Aufbau. Anforderungen und Spielregeln für die Mitarbeit stehen in
[`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Lokal öffnen

Jede `index.html` lässt sich direkt im Browser öffnen – kein Server, kein
Build, keine Abhängigkeiten. Für Links zwischen den Bereichen (root-relative
Pfade wie `/netzwerke/`) empfiehlt sich testweise ein lokaler Server, z. B.
`npx serve` oder `python3 -m http.server` im Repo-Root.

## Deployment (Netlify)

Das Repo ist so eingerichtet, dass jeder Push auf `main` automatisch eine
erreichbare Seite ergibt:

- `index.html` liegt im Repo-Root (Netlify liefert standardmäßig
  `index.html` von der "Publish directory" aus), `uebersicht/`,
  `konzeption-administration/`, `netzwerke/`, `sowi/` und `simulation/`
  liegen als eigene Ordner daneben.
- `netlify.toml` pinnt `publish = "."`. Es gibt bewusst **keinen**
  Catch-all-Rewrite mehr — mit mehreren echten Seiten würde der jede Anfrage
  auf die Startseite umbiegen. Nur echte 404s fallen auf die Startseite
  zurück (`status = 404`, damit der Statuscode korrekt bleibt).
- `/tracker/` (die frühere Adresse des zusammengefassten Trackers) leitet
  per 301 auf `/` weiter, für alte Lesezeichen/Links.

Auf Netlify reicht es, das Repo als Site zu verbinden – Build-Command ist
leer, Publish-Verzeichnis ist das Repo-Root. Kein manuelles Konfigurieren im
Dashboard nötig, alles steckt in `netlify.toml`. Für Pull Requests baut
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

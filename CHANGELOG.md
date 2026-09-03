# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier festgehalten.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
Versionierung nach [SemVer](https://semver.org/lang/de/). Die Version ist auch
direkt auf der Seite sichtbar — ein Klick auf die Versionsnummer (Tracker:
oben rechts neben "Darstellung"; Hub: in der Fußzeile) zeigt dieselbe Liste
als Änderungsprotokoll.

## [2.0.1] – 2026-09-03

### Entfernt
- Animierter Farbverlauf im Hintergrund (WebGL, Domain-Warped-Noise) wieder
  entfernt — Hub und Tracker sind vorerst einheitlich tiefschwarz.

## [2.0.0] – 2026-09-03

### Geändert
- Projekt in Hub und Module aufgeteilt: `/` zeigt jetzt eine Startseite mit
  Verweisen auf `/tracker/` und `/simulation/`, statt direkt den Tracker
  auszuliefern. Bestehende Lesezeichen auf die Root-URL landen ab jetzt im
  Hub, nicht mehr direkt im Tracker.

### Hinzugefügt
- `/simulation/`-Modul (Platzhalter) für die geplante Prüfungssimulation.
- `CONTRIBUTING.md` mit Regeln für die Zusammenarbeit zu zweit: Ordnerhoheit,
  Pfadkonventionen, `localStorage`-Namensraum, Git-Workflow über
  Feature-Branches.
- `netlify.toml` liefert alle drei Bereiche als eigenständige Seiten aus statt
  über einen Catch-all-Rewrite.

## [1.2.0] – 2026-09-03

### Geändert
- Komplettes visuelles Redesign: dunkles, an JetBrains Rider angelehntes
  Farbschema (IntelliJ-New-UI-Grautöne, Syntaxfarben als Akzente), IBM Plex
  Sans/Mono statt Systemschrift, tiefschwarzer Grund.

## [1.1.0] – 2026-09-03

### Hinzugefügt
- Fortschritt als JSON-Datei exportieren und wieder importieren — Absicherung
  gegen Datenverlust bei Browserwechsel, geleertem Cache oder neuem Gerät.

## [1.0.0] – 2026-09-03

### Hinzugefügt
- Erste Version des AP2-Trackers: Themenplan für GA1, GA2 und WiSo mit
  Fortschrittsanzeige, Live-Suche über Themen und Einzelinhalte, vier
  Lern-Minispiele (Paket-Fang, Port-Sprint, Subnetting-Blitz,
  Fachbegriff-Rush).
- Git-Repository und Netlify-Deployment eingerichtet.

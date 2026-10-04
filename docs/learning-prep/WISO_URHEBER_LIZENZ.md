# WiSo – Urheberrecht und Softwarelizenzen

Stand: 04.10.2026. Kernthema `wiso-8__4`; Status **CURATED_DRAFT**, menschliche Fach-/Rechtefreigabe ausstehend.

## Fertig umgesetzt

- Kanonische Einheit `content/learning-units/urheberrecht-softwarelizenzen-nutzungsrechte.unit.json`, 70 Minuten, acht Abschnitte.
- Diagnose zu Dateibesitz versus Erlaubnis; vier lernzielgebundene Pflichtfragen mit spezifischem Fehlfeedback; eigener geführter Fall Leon und neuer Transfer Sara; Abrufantwort vor Musterlösung, vier Tastaturkarten und Wiederholungshinweise.
- UrhG-Schutz, einfacher/ausschließlicher Nutzungsumfang, gesetzliche Softwareausnahmen und enge Interoperabilitätsabgrenzung; proprietäre Fallverträge ausdrücklich hypothetisch.
- Open Source versus Preis/Quelltextzugang; MIT-Hinweise, GPLv3-Weitergabe samt konkretem Downloadweg und AGPLv3 bei geänderter Netzwerkversion. Keine universelle Linking-/Kompatibilitätsfreigabe.
- Drei eigene technische SVGs: Kopie/Rechte, MIT/GPL, Release-Prüfweg. Keine Rastergrafiken oder ASCII-Ersatz. Keine Rechenformel erforderlich.
- Bestehenden Refero-Deep-Space-Lock und gemeinsame Lernkomponenten beibehalten; keine neuen globalen Styles oder Bewegungsregeln.
- Quelle/Behauptung/Grenze und tatsächlich gelesener privater Themenanker in `WISO_URHEBER_LIZENZ_QUELLEN.md`; öffentliche Lizenztexte bei OSI als geprüfter Ersatz für fehlgeschlagene GNU-Abrufe.

## Tatsächlich ausgeführte Prüfung

- Vor Umsetzung: Zielbranch `codex/ga1-linux-admin`, sauberer Status, AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage geprüft. Vorheriger Light-Desktop-Lernfall als visueller Baseline angesehen.
- `npm run build`: erfolgreich, 1137 Dateien. Danach `npm test`: Exit 0 einschließlich erneuten Builds, Site-, Compiler-, Batch-, Lern-, Netzplan-/Gantt-, Fortschrittsmerge- und SQL-Prüfungen. Log: `C:/Users/timed/AppData/Local/Temp/ap2-urheber-test-20261004.log`.
- Vor Site-Test ausschließlich neue SVG-Dateien in den Index aufgenommen, weil die Asset-Prüfung den Git-Bestand verwendet. Leerer Index-Lock ohne laufenden Git-Prozess wiederherstellbar nach `index.lock.stale-urheber-stage-20261004` im Git-Worktree-Verwaltungsverzeichnis verschoben; keine Löschung.
- Neue Browserprüfung in Gesamtrunner und als `AP2_BROWSER_ONLY=urheber-lizenz` registriert; zweimal erfolgreich, zuletzt nach der Copyleft-Präzisierung und dem erneuten Build.
- Lokal gestartete Vorschau mit angemeldeter Test-Fiktion, kein produktiver Auth-/Cloud-Dienst: Route 200, Trackerbindung, Diagnose/Fehlfeedback/Reset, alle vier Pflichtziele, Abschluss erst nach Bestehen, Abruf-Mindestlänge, Musterlösung, Enter/Space-Karten, Reloadpersistenz, Abschluss/Undo und erneute Gatesperre geprüft. Keine JS-Seitenfehler.
- 390 und 1440 px bei jeweils Dark/Light: Titel passt, kein Seitenoverflow, Kartenfront/-rückseite passt, SVG-Texte innerhalb Canvas und eigener Boxen; mobile Diagramme per Tastatur horizontal verschiebbar.
- 32 Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-urheber-20261004`. Visuell angesehen: `390-dark-start.png`, `390-light-figure-2.png`, `1440-dark-figure-1.png`, `1440-light-case.png`: lesbar und in bestehender Richtung, ohne festgestellte materielle Layoutprobleme.
- Browser läuft mit Reduced Motion; keine gesonderte Prüfung laufender Animationen, da globale Bewegungslogik unverändert. Nicht die komplette globale Browser-Suite ausgeführt.
- Bestehende Test-Skips zu lokal nicht importierten privaten Buchdaten/Queue bleiben bestehen; kein Volltest der privaten Wissensbasis behauptet.

## Stand und nächste Arbeit

Coverage: **361/380**, noch **19** offen; WiSo **90/109**. Nächster offener Abschnitt: `wiso-8__5`, Staatsprinzipien des Grundgesetzes. Keine Veröffentlichung, kein Push, keine automatische fachliche Freigabe.

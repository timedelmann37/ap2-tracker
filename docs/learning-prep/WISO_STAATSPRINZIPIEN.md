# WiSo – Staatsprinzipien des Grundgesetzes

Stand: 04.10.2026. Kernthema `wiso-8__5`; **CURATED_DRAFT**, menschliche fachliche Freigabe ausstehend.

## Fertig umgesetzt

- Kanonische Einheit `staatsprinzipien-grundgesetz-beispiele-zuordnen`, 60 Minuten, acht Abschnitte. Diagnose, vier Pflichtziele mit spezifischem Fehlfeedback, geführter eigener Fall Noor, neuer Transfer Elias, Abruf vor Musterlösung und vier Tastaturkarten.
- Demokratie versus Republik; Gesetzesbindung, gerichtliche Kontrolle und richterliche Unabhängigkeit; Sozialstaatszweck mit verbindlichem menschenwürdigem Existenzminimum; föderale Zuständigkeiten versus horizontale Gewaltenteilung; Grenzen von Mehrheiten und Art. 79 Abs. 3.
- Keine aktuellen Leistungsbeträge, Reformbehauptungen oder konkrete Verfahrensberatung. Quellenprüfung und eng begrenzter privater Themenanker stehen in `WISO_STAATSPRINZIPIEN_QUELLEN.md`. Fehlgeschlagene Direktabrufe sind dort ausgewiesen.
- Drei präzise eigene SVGs; Prinzipien als parallele Perspektiven statt irreführender Ablaufpfeile. Keine Rasterbilder/ASCII und keine Rechenformel erforderlich. Bestehender Deep-Space-Reference-Lock und gemeinsame Komponenten unverändert.

## Tatsächlich ausgeführte Prüfung

- Vor Arbeit Zielbranch und sauberer Status sowie AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage gelesen; vorherige Light-Desktop-Lernseite als Baseline angesehen.
- `npm run build`: Exit 0, 1141 Dateien. `npm test`: Exit 0 einschließlich Build, Site-, Compiler-, Batch-, Lern-, Netzplan-/Gantt-, Fortschrittsmerge- und SQL-Prüfungen. Log: `C:/Users/timed/AppData/Local/Temp/ap2-gg-test-20261004.log`.
- Nur drei neue SVGs vor Site-Test in den Index aufgenommen, weil die Asset-Prüfung den Git-Bestand verwendet. Leerer Index-Lock ohne laufenden Git-Prozess recoverable nach `index.lock.stale-gg-stage-20261004` im Git-Worktree-Verwaltungsverzeichnis verschoben; keine Löschung.
- Neue Browserprüfung im Runner und unter `AP2_BROWSER_ONLY=staatsprinzipien`. Zunächst zu lange SVG-Beschriftungen erkannt und korrigiert; letzter Lauf erfolgreich.
- Lokale Vorschau mit angemeldeter Test-Fiktion: Route 200, Trackerbindung, Diagnose/Reset/Feedback, vier Pflichtziele, Abschlussgates, Abruf-Mindestlänge, Musterlösung, Enter/Space-Karten, Reloadpersistenz, Abschluss/Undo und erneute Gatesperre geprüft. Keine JS-Seitenfehler.
- 390/1440 px jeweils Dark/Light: Titel, Seitenoverflow, Kartenfront/-rückseite, SVG-Canvas-/Boxgrenzen und mobile horizontale Tastaturverschiebung geprüft. 32 Screenshots in `C:/Users/timed/AppData/Local/Temp/ap2-gg-20261004`.
- Tatsächlich visuell angesehen: `390-dark-start.png`, `390-light-figure-0.png`, `1440-dark-figure-1.png`, `1440-light-case.png`. Lesbare bestehende Gestaltung; mobile Diagramme haben ausdrücklich gekennzeichneten horizontalen Scrollbereich.
- Reduced Motion emuliert; keine gesonderte Prüfung laufender Animationen und nicht die gesamte globale Browser-Suite ausgeführt. Bestehende Skips lokal nicht importierter privater Buch-/Queuedaten bleiben bestehen; kein Volltest dieser Wissensbasis behauptet.

## Stand

Coverage **362/380**, noch **18** offen; WiSo **91/109**. Nächstes offenes Kernthema: `wiso-8__6`, Charta der Vielfalt und Diversity Management. Kein Push, keine Veröffentlichung, keine automatische Fachfreigabe.

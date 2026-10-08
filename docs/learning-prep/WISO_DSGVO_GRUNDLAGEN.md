# WiSo DSGVO-Grundlagen – abgeschlossener lokaler Abschnitt

Stand: 04.10.2026. Kernthema `wiso-8__0`. Branch `codex/ga1-linux-admin`; Ausgangsstatus sauber, anschließend ausschließlich eigener Rechercheauftrag und Abschnittsdateien.

## Inhalt und Grenzen

- Neue kanonische Einheit: Personenbezug und Verarbeitung, Pseudonymisierung/Anonymisierung, Art.-5-Grundsätze und Rechenschaftspflicht, sechs Art.-6-Grundlagen, Einwilligung/Widerruf und zusätzliche Art.-9-Prüfung.
- Eigener Supportfall Mira; Diagnose, vier Lernziel-Checks mit begründetem Feedback, Abruftraining und vier Tastatur-Lernkarten.
- Drei präzise generierte SVG-Vergleiche im bestehenden Deep-Space-Lernrahmen. Keine Rasterbilder, keine ASCII-Grafik. Kein rechnerischer Sachverhalt, daher keine Formel.
- CURATED_DRAFT, keine menschliche Freigabe behauptet. Allgemeines Prüfungstraining, keine individuelle Rechtsberatung.
- Keine universelle Speicherfrist, keine pauschale Erlaubnis für Werbung/Logs, öffentliche Zugänglichkeit nicht als eigene Rechtsgrundlage dargestellt.
- Private Buchanker und tatsächlich gelesene Primärquellen sowie Abrufgrenzen stehen in WISO_DSGVO_GRUNDLAGEN_QUELLEN.md. Keine private Aufgabe kopiert.
- Refero-Workflow: reference-direct-build nach bestehendem Reference Lock; gemeinsame Komponenten unverändert übernommen, kein Redesign.

## Tatsächlich abgeschlossene Prüfungen

1. `npm run build`: Exit 0, 1121 Site-Dateien.
2. `npm test`: Exit 0; Site, Learning-Compiler, Learning-Batch, Lerninhalte/Netzplan/Gantt, Progress-Merge und Leaderboard-SQL. Der lokale private Buchimport ist im Worktree nicht vorhanden; entsprechende bestehende Skip-Grenze ist kein Buch-Volltest.
3. `AP2_BROWSER_ONLY=wiso-dsgvo node scripts/run-browser-tests.mjs`: Exit 0.
4. Browser: falsche/richtige Diagnose, vier falsche/richtige Lernzielantworten, Reset-Sperren, konkrete Rückmeldungen, Abruf-Mindestlänge und Modell, Enter/Space-Lernkarten, Reload-Persistenz, Abschluss und Rücknahme.
5. Bei 390 und 1440 Pixeln jeweils Dark/Light: kein Seitenoverflow, Kartenflächen passend, SVG-Texte innerhalb Canvas und eigener Boxen, mobiler Diagramm-Scroll per Tastatur.
6. 32 Screenshots in `C:/Users/timed/AppData/Local/Temp/ap2-wiso-dsgvo-20261004`. Tatsächlich visuell geöffnet: 390-dark-start.png, 390-light-figure-0.png, 1440-dark-figure-1.png, 1440-light-case.png. Mobile Diagramme bewusst seitlich scrollbar mit sichtbarem Hinweis. Keine visuelle Freigabe aller 32 Einzelbilder behauptet.
7. Keine Browser-pageerrors. Test verwendet lokale signierte Auth-Fixture, keinen produktiven Kontoservice.

Eine vorhandene leere Git-index.lock ohne laufenden git.exe-Prozess wurde nach read-only Prüfung recoverbar zu index.lock.stale-wiso-dsgvo-stage-20261004 umbenannt; keine Daten gelöscht.

## Fortschritt und nächster Abschnitt

357/380 Kernthemen implementiert, 23 offen. WiSo: 86/109. „Implementiert“ bedeutet nicht menschlich freigegeben. Nächstes offenes Kernthema: `wiso-8__1` (Betroffenenrechte).

Nur beabsichtigte lokale Dateien für diesen Abschnitt committen. Kein Push, keine Veröffentlichung, keine Branch-Löschung.

# WiSo – Charta der Vielfalt und Diversity Management

Stand: 04.10.2026. Kernthema `wiso-8__6`; **CURATED_DRAFT**, menschliche fachliche Freigabe ausstehend.

## Fertig umgesetzt

- Kanonische Einheit `content/learning-units/charta-vielfalt-diversity-management-arbeitsumfeld.unit.json`, 60 Minuten, acht Abschnitte: Diagnose, vier Pflichtziele mit spezifischem Fehlfeedback, geführter eigener Fall Mira, neuer Transfer Ben, Abruf vor Musterlösung und vier Tastaturkarten.
- Ziel und freiwillige Selbstverpflichtung versus Personalersparnis/Logo; aktuelle sieben Dimensionen einschließlich Migrationsgeschichte/Nationalität und sozialer Herkunft; individuelle Fähigkeiten statt Stereotype; AGG als separate verbindliche Ebene; konkrete Zugangsbarrieren, Maßnahmen und Wirkungskontrolle.
- Vollständige Siebenerliste im Pflichtcheck; keine Erfolgsquoten, Rechtsberatung, Pflicht zum Offenlegen persönlicher Merkmale oder aktuellen wirtschaftlichen Kennzahlen erfunden.
- Drei eigene SVGs: Zielabgrenzung, parallele Dimensionsliste, Arbeitsablauf Barriere → Abstimmung → Umsetzung → Prüfung. Keine Rastergrafik/ASCII; keine Rechenformel nötig.
- Behauptung/Quelle/Grenze und enge private Themenverortung in `WISO_DIVERSITY_QUELLEN.md`. Aktuelle Dimensionsseite direkt geprüft; historischer Leitfaden 2017 nur Konzeptquelle. Kein exakter aktueller Urkundenwortlaut behauptet.

## Gestaltungsentscheidungen

Bestehender Refero-Deep-Space-Lock ist direkter Build-Target, nicht eine neue Richtung. Vorherige Lernseite `1440-light-case.png` aus `ap2-gg-20261004` als Baseline angesehen.

| Entscheidung | Quelle / Rolle | Umsetzung |
|---|---|---|
| Lesefläche, Inter, Glaskanten und Theme | DESIGN.md / Doppler-dominanter Referenz-Lock | Vorhandene gemeinsame Lernkomponenten unverändert |
| Starke Aktion und Fortschritt | Bestehende Produktsemantik | Vier Pflichtziele; Abschluss erst nach Bestehen |
| Technische Grafik statt Dekoration | Nutzerauftrag / Lernvertrag | Native SVGs, Textalternative und mobiler Scrollbereich |

Keine globalen Styles, Navigation oder Bewegungsregeln geändert.

## Tatsächlich ausgeführte Prüfung

- Vor Abschnitt Zielbranch `codex/ga1-linux-admin` und sauberer Status; AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage geprüft.
- `npm run build`: Exit 0, 1145 Dateien. `npm test` zweimal Exit 0, letzter Lauf nach Präzisierung des Siebenerlisten-Checks. Umfasst erneuten Build, Site-, Compiler-, Batch-, Lern-, Netzplan-/Gantt-, Fortschrittsmerge- und SQL-Prüfungen. Log: `C:/Users/timed/AppData/Local/Temp/ap2-diversity-test-20261004.log`.
- Vor Site-Test nur drei neue SVGs in den Index aufgenommen, da die Asset-Prüfung den Git-Bestand nutzt. Leerer Index-Lock bei fehlendem Git-Prozess wiederherstellbar nach `index.lock.stale-diversity-stage-20261004` im Git-Worktree-Verwaltungsverzeichnis verschoben; keine Löschung.
- Browserprüfung im Runner sowie `AP2_BROWSER_ONLY=diversity` registriert. Letzter Lauf nach Ergänzung des langen Dimensions-Checks erfolgreich.
- Lokale Vorschau mit angemeldeter Test-Fiktion, kein produktiver Auth-/Cloud-Dienst: Route 200, Trackerbindung, Diagnose/Reset/Fehlfeedback, alle vier Pflichtziele, Abschlussgates, Abruf-Mindestlänge/Musterlösung, Enter/Space-Karten, Reloadpersistenz, Abschluss/Undo und erneute Gatesperre geprüft. Keine JS-Seitenfehler.
- 390/1440 px jeweils Dark/Light: Titel passt, kein Seitenoverflow einschließlich langer Antwortliste, Kartenfront/-rückseite passt, SVG-Texte im Canvas und ihren Boxen. Mobile Diagramme per Tastatur horizontal verschiebbar.
- 36 Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-diversity-20261004`. Tatsächlich visuell angesehen: `390-dark-start.png`, `390-light-figure-1.png`, `1440-dark-figure-2.png`, `1440-light-case.png` und `390-light-dimensions-check.png`. Keine festgestellten materiellen Layoutprobleme.
- Reduced Motion emuliert. Keine separate Prüfung laufender globaler Animationen und nicht die komplette globale Browser-Suite ausgeführt. Bestehende Skips lokal nicht importierter Wissensbasis-/Buchdaten bleiben bestehen; kein Volltest dieser privaten Daten behauptet.

## Stand

Coverage **363/380**, noch **17** offen; WiSo **92/109**. Nächstes offenes Kernthema: `wiso-8__7`, Umweltschutz im Betrieb. Kein Push, keine Veröffentlichung, keine automatische fachliche Freigabe.

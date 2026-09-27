# Backup-Auswahl im Szenario

Stand: 18.09.2026. `ga1-4__1`, CURATED_DRAFT, menschliche Freigabe offen.

## Quellen

Batch `ga1-4-001-001` gesichtet. Schutzbedarfs-Ausschnitt als Themenanschluss erkannt; Nextcloud-/VPN-/Outsourcing-Treffer und Grafik ausgeschlossen. Offene Textreferenzen nicht als erledigt markiert.

[IBM: Backup and restore](https://www.ibm.com/think/topics/backup-and-restore): Planung sowie Full-image only, Incremental und Differential gelesen. Nur klassische Abhängigkeiten verwendet. Pauschale Aussagen zu Tape-Eignung, Restore-Geschwindigkeit und Null-RTO/RPO nicht übernommen. Eigene Messwerte entscheiden den Fall, keine Produktüberlegenheit behauptet.

## Eigene Fälle und Rechnung

400 GB Vollbestand, täglich 30 GB andere geänderte Bereiche ohne Wachstum oder Überschneidung. Effektiver Durchsatz 100 GB/h. Voll: vier Stunden, Inkrement: 18 Minuten, Freitag-Differenzialstand: 150 GB und 90 Minuten. Donnerstag-Aufgabe: 120 GB und 72 Minuten. Metadaten, Kompression und Deduplizierung ausgeschlossen.

Restore-Probe: Voll 100 Minuten, je Inkrement zwölf, letzter Differenzialstand 25, übrige Schritte 20. Inkrementell 180 Minuten, differenziell 145. Bei 120 Minuten Tagesfenster/RTO150 passt nur differenziell; bei 60/RTO150 keiner der beiden Kandidaten; bei 60/RTO200 inkrementell. Keine allgemeine Aussage zur relativen Restore-Leistung.

Zwei eigene Grafiken, drei MathML-Blöcke, Zahlenübung mit Fehlerrückmeldung, Szenarioentscheidungen, Reihenfolge, eigene Begründung und Karten. Grundlagenlink auf bestehende Backup-Verfahren. Nicht als vollständiges Backup-Konzept ausgewiesen.

## Nachweise

- `npm test` bestanden: Build, Site, Compiler, Batches, Lerninhalte, Fortschrittsmerge.
- `scripts/verify-backup-choice-browser.mjs` bestanden: Fehler-/Erfolgsfeedback, Wiederholung, Tastatur, Zahlenübung, Reihenfolge, Erklärung/Persistenz, Karten, Pflichtziel-Sperre und Abschluss/Rücknahme.
- 390/1440 px, Dark/Light: kein Seitenüberlauf, repräsentative Screenshots von Rechenwegen, Vergleich und Grafiken gesichtet. Gemeinsame Gestaltung unverändert.
- Keine vollständige Browserregression aller Einheiten behauptet.

Stand: 141/380 Lernentwürfe, GA1 33/164, Backup/Recovery 4/10. Nur lokale Sicherung, kein Push oder Deployment. Nächster Abschnitt: Generationenprinzip und Medienrotation (`ga1-4__2`).

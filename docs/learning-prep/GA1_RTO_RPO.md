# RTO und RPO – Lernentwurf

Stand: 18.09.2026. `ga1-4__4`, `CURATED_DRAFT`, menschliche Freigabe offen.

## Evidenz und Grenzen

- Batch `ga1-4-004-004` gesichtet: Netzwerk-/Organisationsauszüge überwiegend unpassend. SLA-Soll-Ist-Aufgabe nur didaktischer Anschluss; MTTR nicht mit RTO gleichgesetzt. WLAN-Grafik ausgeschlossen, offene Bildreferenz bleibt offen.
- [NIST RPO](https://csrc.nist.gov/glossary/term/recovery_point_objective) und [NIST RTO](https://csrc.nist.gov/glossary/term/recovery_time_objective): Definitionen aus SP 800-34 Rev. 1 am 18.09.2026 gelesen. Keine Volllektüre der Publikation behauptet.
- Eigene Szenarien, zwei Grafiken und zwei MathML-Beziehungen. Messfenster ausdrücklich vom Dienstausfall bis bestätigter Nutzbarkeit; Datenstand konsistent und nachweislich wiederherstellbar. Alle Uhrzeiten am selben Tag.

## Didaktische Kontrolle

Ausfall 10:00, Datenstand 09:45, nutzbar 11:10: 15 Minuten Datenlücke, 70 Minuten Wiederanlauf. Bei RPO 30/RTO 60 ist nur RPO erfüllt. Übung 14:20 minus 13:35 = 45 Minuten; 85 als Dezimal-Uhrzeitfehler erklärt. Fehlgeschlagener 09:45-Lauf: 09:30 bis 09:58 ergibt 28 Minuten trotz 15-Minuten-Zeitplan. Transfer: RPO 20/RTO 90, Datenlücke 30, Wiederanlauf 60: nur RTO erfüllt.

Zielwerte nicht als Ist-Messung bezeichnet. Backup-Abschluss nicht automatisch Datenzeitpunkt; häufigeres Sichern nicht automatisch schnellerer Restore. Szenariofragen, Reihenfolge, eigene Erklärung, Karten und zwei Pflichtziele integriert.

## Prüfungen und Stand

- `npm test` erfolgreich: Build, Site, Compiler, Batches, Lerninhalte und Fortschrittsmerge.
- `scripts/verify-rto-browser.mjs` erfolgreich: Fehlerfeedback, Tastatur, Wiederholung, Zahlenübung, Reihenfolge, Erklärung/Persistenz, Karten, Pflichtziel-Sperre, Abschluss und Rücknahme.
- 390/1440 px in Dark/Light ohne Seitenüberlauf; repräsentative Screenshots von Formeln, Grafiken und Protokoll gesichtet. Bestehende horizontale Grafiknavigation beibehalten.
- Gemeinsamer Renderer unverändert, keine vollständige Browserregression aller Einheiten behauptet.

Abdeckung nach Build: 140/380 Lernentwürfe, GA1 32/164; Backup/Recovery 3/10. Nur lokal gesichert, kein Push/Deployment.

Nächster sinnvoller Abschnitt: passende Backup-Kombination im Szenario begründen (`ga1-4__1`) und anschließend Medienrotation (`ga1-4__2`).

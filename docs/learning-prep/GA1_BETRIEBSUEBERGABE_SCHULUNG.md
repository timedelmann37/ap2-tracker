# GA1: Betriebsübergabe, Einweisung und Anwenderschulung

Abgeschlossen am 2026-10-03: ga1-10__8, Einheit `betriebsuebergabe-einweisung-anwenderschulung`, Status CURATED_DRAFT. Menschliche Fachfreigabe steht aus; keine Veröffentlichung.

## Inhalt und Grenzen

Eigenständiger fiktiver Fall Lindrain / WE-17: Installation ist noch kein Nachweis der Betriebsbereitschaft. Die Einheit behandelt Prüfnachweise, bestätigte Verantwortung, dokumentierte Restpunkte, rollenbezogene Schulungsziele, selbstständige Übungsausführung und Nachbetreuung. Diagnose, vier Lernziel-Checks mit differenziertem Feedback, eine Transferaufgabe und sieben Abrufkarten sind umgesetzt. Zwei editierbare SVG-Ablaufdiagramme stellen Übergabe und Lernnachweis dar. Kennungen, Prüfkriterien und Beispiele sind eigene Fallannahmen. Die Einheit bestätigt keine reale oder rechtliche Abnahme.

## Geprüfte Quellen

- Private Wissensbasis: `europa-integratoren-2026:00038`, Zeilen 443–468, nur Themenanker für Testdokumentation und Systemübergabe; keine übernommenen Buchaufgaben.
- AWS Well-Architected, Operational Readiness Reviews: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ready_to_support_const_orr.html — organisatorische Bereitschaft, Checklisten, Beteiligte und Umgang mit offenen Befunden. Kein verpflichtendes AWS-Verfahren für den eigenen Fall.
- CDC Quality Training Standards: https://www.cdc.gov/training-development/php/qts/index.html — Standards 1, 2, 4, 5, 7 und 8 für Bedarf, Ziele, Übung, Feedback, Evaluation und Unterstützung. Übertragene didaktische Prinzipien, keine IT-Norm oder CDC-Zertifizierung.

Primärseiten am 2026-10-03 gelesen. Quelleneinträge und Evidenzzuordnung sind in der Einheit und `content/sources.json` hinterlegt.

## Gestaltung und Prüfung

Bestehende Refero-Designbindung und gemeinsame Deep-Space-Komponenten fortgeführt; keine neue globale Gestaltung. `npm run build` und `npm test` bestanden. Isolierter Browserlauf `AP2_BROWSER_ONLY=handover-training` bestanden: falsche/richtige Antworten, Zurücksetzen, Lernziel-Sperre, Transfer vor Musterlösung, Tastaturkarten, Persistenz, Markieren/Rücknahme, Diagrammgrenzen und mobiles Tastatur-Scrolling. Keine Browserfehler oder Seitenüberläufe.

Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-handover-20261003` erzeugt; 1440-dark-figure-0, 1440-light-figure-1, 390-dark-start und 390-light-figure-1 tatsächlich visuell geprüft. Mobile Diagramme nutzen den vorhandenen beschrifteten horizontalen Scrollbereich; Desktopbeschriftungen sind vollständig lesbar.

Coverage nach Build: 235/380 insgesamt, GA1 127/164; 37 GA1-Kernthemen bleiben offen. Diese Zahlen kennzeichnen vorhandene Entwürfe, keine menschliche Freigabe.

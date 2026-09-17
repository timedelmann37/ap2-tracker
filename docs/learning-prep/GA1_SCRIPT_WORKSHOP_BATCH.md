# Redaktions- und Prüfnotiz: Skriptwerkstatt und Skriptanalyse

Stand: 17.09.2026. `ga1-9__8` und `ga1-9__9`, beide `CURATED_DRAFT`.
Die bestehende Hierarchie und die kanonischen Abschluss-Schlüssel bleiben gleich.

## Quellenentscheidungen

Privater Batch `ga1-9-008-009` mit begrenzten Ausschnitten ausgewertet.
Outsourcing, Service-Tickets und E-Business sind keine Belege für die
Skriptwerkstatt. IoT, Berufsbild und TCP sind keine Belege für die konkrete
Skriptsemantik. Die vorgeschlagenen Buchgrafiken wurden nicht übernommen.
Keine pauschale Buch- oder Website-Volllektüre behauptet.

Stattdessen Microsoft Learn für PowerShell 7.5: Vergleichsoperatoren
(skalare Vergleiche, strenge Grenzen), foreach (Syntax und einfache Beispiele),
Get-Date (Beschreibung und Formatbeispiel) und Get-Service (Beschreibung und
Statusfilter). Drei neue Quellen separat registriert, foreach wiederverwendet.
Szenarien, Fehlercode, Gegenproben und vier SVG-Abläufe selbst erstellt.

## Didaktik

- Werkstatt: Logregel mit strenger 30-Tage-Grenze, aktive Dateien ausgeschlossen;
  reine Datenverarbeitung, keine Dateizugriffe. Schreibaufträge für Logbereinigung,
  Backup, CSV-Anlage und Dienststatus mit verdeckten Musterantworten.
- Datumsbeispiel: fester Zeitpunkt ergibt `backup-20260917-1405.zip`.
  Namenskollision, Teilerfolg und Wiederherstellungsprüfung ausdrücklich behandelt.
- Analyse: Zähler-Reset in der Schleife als absichtlicher logischer Fehler.
  Trace trennt Ist und Soll; korrigierte Variante, Gegenproben und Ergänzung
  um weitere Statuswerte. Keine echten Dienste abgefragt oder verändert.
- Je Einheit Diagnose, Zahleneingabe, Sortierung, freier Abruf, drei Karten
  und zwei Pflichtnachweise. Freitext bleibt Selbstvergleich, keine automatische
  Fachbewertung. Die Beispiele sind keine produktionsfertigen Verwaltungsskripte.

## Prüfungen

`npm test` erfolgreich. `scripts/verify-script-workshop-examples.mjs`
prüft direkt die veröffentlichten Quellbeispiele in echtem PowerShell:
Altersgrenze, aktive Dateien, Datumsname, fehlerhafte und korrigierte Ausgabe,
leere Liste sowie null/ein/mehrere Treffer. Laufzeitpfad über `AP2_PWSH`.
Kein Lösch-, Backup-, AD- oder Dienständerungsbefehl wird ausgeführt.

Gezielter Browserlauf erfolgreich: Fehlfeedback, Tastatur, Zahlen, Sortierung,
Schreibaufgaben, verdeckte Musterantworten, Speicherung, Abschluss-Gates und
Rücknahme. Neue Einheiten bei 390/1440px in Dark/Light geprüft.
Codezeilen für mobile Lesbarkeit umgebrochen; breite Grafiken nutzen die
bestehende beschriftete Scrollfläche. Tabellen zusätzlich im Screenshot-Lauf.
Der vollständige gemeinsame Browserrunner bestand ebenfalls: Navigation,
Theme-Persistenz, bisherige Lernmodule, Bewegung, Pause und Reduced Motion.
Seitliches Verschieben breiter Tabellen und Grafiken zusätzlich geprüft.

Abdeckung: 128/380, GA1 20/164, Automatisierungsgruppe 14/16.
Menschliche Fach- und Verständlichkeitsfreigabe offen. Kein Push oder Deployment.

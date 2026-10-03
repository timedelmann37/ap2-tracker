# GA1 – Symptome einer Systemkompromittierung

## Abgeschlossener Abschnitt
ga1-8__13, Einheit `systemkompromittierung-symptome-befunde`, CURATED_DRAFT. Eigener Talbogen-/CAD-07-Fall; fünf Symptomgruppen: unbekannte Programme, CPU-/Netzlast, Dateien, Konten und deaktivierter Schutz. Diagnose, vier Pflichtziel-Checks mit Feedback, Transferabruf und sieben Karten. Zwei technische SVG-Abläufe, keine dekorativen Rasterbilder oder ASCII-Darstellungen. Keine Formel erforderlich.

## Direkt geprüfte Quellen am 03.10.2026
- Microsoft Security 4688: Prozessstart, Pfad/Erzeuger, Befehlszeilen-Richtlinie; ältere Ereignisreferenz, nicht als vollständiger aktueller Windows-Betriebsleitfaden verwendet.
- Microsoft Security 4720: Erstellung eines Benutzerobjekts; Audit User Account Management.
- Microsoft Defender Antivirus: 5001 (Echtzeitschutz deaktiviert) versus 5007 (Konfiguration geändert).
- Microsoft Sysinternals Sysmon: Ereignisse 1, 3, 11; UTC-Zeitbasis; Netzwerkereignisse standardmäßig deaktiviert.
- NIST SP 800-61r3: DE.AE-02/03/04/08; Anomalien, Quellenkorrelation, Umfang und Incident-Kriterien.
- Links und Passagen in Quellenregister und Curation.
- Privater Buchanker europa-integratoren-2026:00038, Zeilen 443–468 vollständig gelesen: Systemauslastung und Systemverhalten bewerten. Nur Themenanker, keine übernommenen Aufgaben oder Grafiken.
- docs/AUSBILDUNG_IT_SOURCE_REVIEW.md: Messdaten sind keine Diagnose; eigene Fallentscheidung mit Beobachtung, Gegenhypothese und nächster Prüfung.

## Fachliche Grenzen
Kein einzelnes Symptom oder Ereignis beweist Schadsoftware, Datenabfluss oder Attribution. Fehlende Logs und ein einzelner unauffälliger Scan beweisen keinen sauberen Host. Sysmon und Windows-Security-Ereignisnummern bleiben getrennt. Dateiänderung und Hashabweichung sind keine Ursachenzuschreibung. Zeitnähe ist keine Kausalität. Kein Ausführen verdächtiger Dateien, keine spontanen Bereinigungsbefehle. Eskalation nach Vorfallplan darf parallel zur Untersuchung erfolgen. Der Prüfungshinweis stammt aus dem vorhandenen Kernthemenkatalog; keine alte Prüfungsaufgabe kopiert.

## Referenzbindung
AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Refero-Design-Routine gelesen. Existierende Incident-Response-Seite anhand ihres tatsächlichen Desktop-Dark-Screenshots als Vergleichsfläche angesehen. Doppler-Leseflächen dominant, Astro nur Hintergrund, n8n-Verbindungslinien. Gemeinsame Komponenten und Palette unverändert übernommen; technische Abläufe dienen der Befundlogik.

## Tatsächlich ausgeführte Prüfung
- npm run build und npm test bestanden.
- AP2_BROWSER_ONLY=compromise-symptoms npm run test:browser bestanden.
- Diagnose ohne Gate; Fehl-/Richtigantworten, Feedback, Reset, vier Pflichtziele, Recall-Freigabe, sieben Karten per Enter/Space, Persistenz und Abschluss/Rücknahme/erneute Sperre geprüft.
- 390/1440 px, Dark/Light, Reduced Motion: kein Seitenüberlauf; SVG-Labels innerhalb der Zeichenfläche; mobile Diagramme per Tastatur scrollbar.
- Tatsächlich angesehen: Desktop Dark Kontextdiagramm, Mobile Light Fallspur, Desktop Light und Mobile Dark Seitenbeginn. Mobile Diagramme zeigen beschriftete seitlich verschiebbare Ausschnitte, keine unlesbare Gesamtverkleinerung.
- Screenshots lokal: C:/Users/timed/AppData/Local/Temp/ap2-sym-20261003/.
- Gezielter betroffener Browsertest; kein Gesamtlauf behauptet.
- Abdeckung nach Build 224/380; GA1 116/164, 48 offen. Status bleibt Entwurf bis zur menschlichen Freigabe.

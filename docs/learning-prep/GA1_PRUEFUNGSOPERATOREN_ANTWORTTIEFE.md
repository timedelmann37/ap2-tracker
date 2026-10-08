# GA1: Prüfungsoperatoren und Antworttiefe

Abgeschlossen 03.10.2026: ga1-11__15, `pruefungsoperatoren-antworttiefe-unterscheiden`, CURATED_DRAFT bis menschliche Fachfreigabe.

## Inhalt und Quellenprüfung

Eigener technischer Fall Labor Nord: zwei erfundene USV-Angebote, gleiche Last von 300 W, zehn Minuten und automatische Shutdown-Kommunikation als Anforderungen. Die fünf Operatoren werden mit jeweils eigenem Arbeitsauftrag, passender Musterantwort und typischen Fehlantworten erarbeitet. Vergleichen wird ausdrücklich von Bewerten getrennt; Muss-Anforderungen werden nicht beliebig mit Preisvorteilen verrechnet. Grenzen der Aufgabendaten und praktische Konfigurations-/Abnahmetests bleiben sichtbar.

Primärquelle: IHK/NUiF-Workbook zur Prüfungsvorbereitung, PDF-Seite 5 (Druckseiten 08–09), Signalwörter, Textzeilen 181–246 direkt gelesen. Das Workbook ist eine allgemeine Lernhilfe, keine verbindliche FISI-Bewertungsmatrix. Der PDF-Screenshotabruf scheiterte mit Cache miss; die inhaltliche Prüfung erfolgte anhand des direkt verfügbaren PDF-Textes. Keine Quellgrafik übernommen. Quelle in content/sources.json verzeichnet.

Privater Themenanker europa-integratoren-2026:00031, Zeilen 395–398 direkt gelesen: betriebliche Handlungssituationen. Keine Buchaufgaben oder Formulierungen übernommen. Sämtliche USV-Zahlen, Fragen und Musterantworten sind eigene didaktische Beispiele. Keine Punktgarantie und keine pauschale Ein-Punkt-ein-Stichwort-Regel.

Diagnose, fünf verpflichtende Quiz-Checks mit erklärendem Feedback, eigene Transferantwort vor Musterlösung, fünf Tastatur-Lernkarten und ein technisches SVG-Ablaufdiagramm. Keine mathematische Formel für das qualitative Kernthema erforderlich. Refero-Skill und bestehender Doppler-dominanter Deep-Space-Lock bestimmen die unverändert wiederverwendeten Leseflächen und Widgets; keine neue Gestaltung eingeführt.

## Ausgeführte Prüfungen

- npm run build erfolgreich: 793 Dateien.
- npm test erfolgreich.
- AP2_BROWSER_ONLY=examination-operators npm run test:browser erfolgreich.
- Alle fünf Quiz-Checks mit falscher und richtiger Antwort, erklärendem Feedback und Reset getestet; Diagnose allein entsperrt nicht. Abschluss nach allen Checks, Rücknahme, Persistenz nach Reload und erneute Sperre nach Reset geprüft.
- Transfer-Musterlösung erst nach eigener Eingabe; Karten per Enter und Leertaste geprüft.
- 390/1440 Pixel in Dark/Light, Reduced Motion: keine Seitenüberläufe, Diagrammbeschriftungen innerhalb SVG-Canvas, mobile Grafik horizontal per Tastatur erreichbar, keine Browser-Laufzeitfehler.
- Screenshots C:/Users/timed/AppData/Local/Temp/ap2-operator-20261003: Einstieg mobil und Diagramm/Lesetext in beiden Themes auf Desktop sowie Light mobil tatsächlich angesehen. Bestehende mobile Scrollgrafik mit Hinweis bleibt erhalten.

Abdeckung nach Build: GA1 142/164, insgesamt 250/380. Nur lokale Sicherung, kein Push und keine Veröffentlichung.

# Unternehmensverbindungen – abgeschlossener Lernabschnitt

Stand: 04.10.2026. Branch: codex/ga1-linux-admin. Kernthema: wiso-6__7.
Status: CURATED_DRAFT, keine menschliche Freigabe, kein Push und keine Veröffentlichung.

## Inhalt

Die neue Einheit „Fusion, Konzern und Kooperation“ umfasst acht Abschnitte und etwa 40 Minuten:
Diagnose, Begriffsorientierung, Fusion/Konzern, Kartell, ARGE/Interessengemeinschaft,
begründete Prüfungsroute, sechs eigene Zuordnungsfälle sowie Transfer/Wiederholung.
Vier verpflichtende Lernziel-Checks mit antwortbezogenem Feedback, eine unbewertete Diagnose,
eine Abrufübung mit Mindestlänge und vier Tastatur-Karteikarten sind integriert.
Zwei semantisch beschriftete technische SVG-Diagramme zeigen Merkmale und Prüfungsroute.
Das Thema benötigt keine künstlichen Rechenformeln.

Die Abgrenzung erfolgt über Rechtsträger, einheitliche Leitung und Kooperationszweck.
Strukturelle Einordnung und wettbewerbsrechtliche Zulässigkeit bleiben getrennte Prüfungen.
Bloßer Anteilserwerb und gemeinsamer Markenname beweisen keine Verschmelzung.
ARGE/Interessengemeinschaft sind keine eigenen Haftungsprivilegien; Begriffe können sich
überschneiden und dürfen nicht allein anhand der Dauer zugeordnet werden.

## Quellenprüfung

Private EUROPA-Themenliste: Zeile 4181 in der lokalen Markdown-Buchquelle im Hauptcheckout.
Nur die Themenanker wurden verwendet; alle Beispiele und Aufgaben sind eigenständig.
Aktuelle Primärtexte: UmwG § 2, AktG § 18, GWB §§ 1, 2 und 36.
Ergänzend: IHK Darmstadt zur Kooperation und BMWi GründerZeiten 25, Ausgabe 10/2021,
als historische Begriffshilfe. Letztere ist im Quellenregister als historical markiert.
Die BundesKartellAmt-Seite war nicht direkt abrufbar (403); sie wird nicht als
geprüfte Inhaltsquelle ausgegeben. Quellenabruf: 04.10.2026.

## Tatsächlich ausgeführte Prüfungen

- npm test: bestanden, einschließlich Build, Site, Compiler, Lerninhalte, Fortschrittsmerge und SQL.
- Zwei bestehende private-Wissensbasis-Prüfungen wurden übersprungen, da die lokalen
  Buch-/Queue-Daten im Worktree nicht importiert sind; Buchanker im Hauptcheckout gelesen.
- AP2_BROWSER_ONLY=unternehmensverbindungen npm run test:browser: bestanden.
  Die vollständige Browser-Gesamtsuite wurde nicht ausgeführt.
- Browser: 390 und 1440 Pixel, jeweils Dark/Light, Reduced Motion.
  Falschantworten und Feedback, Reset, vier Pflichtnachweise, Diagnose ohne Freigabewirkung,
  Recall-Sperre/Muster, Karteikarten per Enter/Space, Reload-Persistenz,
  Abschluss/Undo und erneute Sperre nach Check-Reset geprüft.
- Kein Seitenüberlauf; Diagrammtexte innerhalb ihrer Flächen; mobile Diagramme
  per Tastatur horizontal verschiebbar. Kein pageerror.
- Sichtprüfung der Screenshots: 390 Dark Merkmalsdiagramm, 390 Light Praxisfall,
  1440 Dark Prüfungsroute, 1440 Light Kartenrückseite.
- Zwei zunächst gefundene Layoutfehler behoben: zu langer untrennbarer Seitentitel
  und zu breite Diagramm-Key-Beschriftung. Anschließend Browserprüfung vollständig erneut bestanden.
- Gestaltung und Komponenten nach bestehendem Deep-Space Reference Lock wiederverwendet;
  keine neue Designrichtung und keine dekorativen Rasterbilder.

Screenshots und Testlogs liegen außerhalb des Repositorys unter dem temporären
Präfix ap2-unternehmensverbindungen-20261004 bzw. ap2-unternehmensverbindungen-*.

## Abdeckung und Fortsetzung

Coverage: 338 von 380 Kernthemen umgesetzt, 42 offen.
GA1: 164/164. GA2: 107/107. WiSo: 67/109.
Umgesetzt bedeutet Inhaltsabdeckung, nicht fachliche menschliche Freigabe.
Nächster offener Abschnitt: wiso-6__8 (Handelsregister, Firma und Kaufmann).

Zeitprüfung vor/nach Abschnitt: 07:10:56 / 07:19:24 UTC.
Codex-Nutzung vor/nach: 72 % / 73 % im Wochenfenster; ordinaryUsageAllowed=true.

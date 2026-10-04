# Handelsregister, Firma und Kaufmann – geprüfter Abschnitt

Stand: 04.10.2026. Branch codex/ga1-linux-admin. Kernthema wiso-6__8.
CURATED_DRAFT: menschliche Freigabe ausstehend. Kein Push, keine Veröffentlichung.

## Abgeschlossen

Acht Abschnitte, etwa 40 Minuten: Diagnose, Kaufmannsarten, Firmenbegriff,
Registerabteilungen und Auszug, deklaratorische/konstitutive Wirkung,
Registerpublizität, eigene Praxisfälle sowie Abruf/Wiederholung.
Vier verpflichtende Checks mit antwortbezogenem Feedback, eine unbewertete Diagnose,
Recall mit Mindestlänge und vier Tastatur-Karteikarten.
Ein technisches SVG vergleicht Istkaufmann, Kannkaufmann und GmbH.
Keine Rechenformeln, weil dieser Abschnitt keine Berechnung verlangt.

Die Einheit trennt Unternehmer/Kaufmann, Firma/Betrieb/Marke und
Eintragungswirkung/Bonität. GmbH & Co. KG wird als KG in HRA eingeordnet.
Publizität nennt Eintragungspflicht, Bekanntmachung, Kenntnis und die
15-Tage-Ausnahme, statt eine pauschale Registerwahrheit zu behaupten.
Sonderfälle und individuelle Gründungsberatung bleiben ausdrücklich außerhalb.

## Quellen und Gestaltung

Private Buchquelle im Hauptcheckout: EUROPA Integratoren, Markdown Zeile 9117.
Nur Themenanker übernommen; pauschales „alle Kaufleute sind eingetragen“ korrigiert.
Alle Fälle, Personen und Registerdaten sind eigene, sichtbar fiktive Beispiele.

Aktuelle Primärnormen HGB, GmbHG, HRV, BGB und GenG im Quellenregister.
Ergänzende Recherche des nach Research-Skill eingesetzten Hintergrundagenten
steht in HANDELSREGISTER_QUELLEN.md. Dessen Datei wurde vollständig gelesen;
HRV § 3 zusätzlich direkt geprüft. Einige amtliche Einzelseiten schlugen im
Webtool fehl und wurden anschließend lesend direkt per Invoke-WebRequest geprüft.

Refero Direct Build: bestehender Deep-Space Reference Lock, gemeinsame Komponenten
und technische SVG-Renderer, kein Redesign oder dekorativer Rasterersatz.
Vergleichsbasis: vorherige Unternehmensverbindungen-Seite, Desktop Dark.

## Tatsächliche Prüfung

- npm test: Exit 0; Build, Site, Lerncompiler, Lerninhalte, Fortschrittsmerge und SQL.
- AP2_BROWSER_ONLY=register npm run test:browser: Exit 0.
  Gesamte Browser-Gesamtsuite nicht ausgeführt.
- 390/1440 Pixel jeweils Dark/Light, Reduced Motion.
- Richtige/falsche Antworten, erklärendes Feedback, Reset, Abschluss-Sperre,
  Diagnose ohne Freigabewirkung, Recall-Muster, Enter/Space-Karten, Persistenz
  nach Reload, Abschluss/Undo und erneute Sperre nach Reset bestanden.
- Kein horizontaler Seitenüberlauf oder pageerror; Kartentexte passen.
  SVG-Beschriftungen passen in Canvas und Zeilen; mobil per Tastatur verschiebbar.
- Sichtprüfung: 390 Dark Einstieg, 390 Light Diagramm, 1440 Dark Registertext,
  1440 Light Kartenrückseite. Keine offenen Layoutbefunde.
- Screenshots: temporärer Ordner ap2-register-20261004;
  Logs: ap2-register-browser.log und ap2-register-tests.log, außerhalb Git.

Coverage nach Build: 339/380, noch 41. GA1 164/164, GA2 107/107, WiSo 68/109.
Inhaltsabdeckung bedeutet keine menschliche Freigabe.
Nächstes offenes Kernthema: wiso-6__9 (Aufbauorganisation).

Zeit vor/nach Abschnitt: 07:26:07 / 07:33:22 UTC.
Nutzung vor/nach: 74 % im Wochenfenster, ordinaryUsageAllowed=true.

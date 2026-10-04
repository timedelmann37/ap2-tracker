# WiSo: Ablauforganisation und EPK

Abgeschlossen am 04.10.2026 im Branch `codex/ga1-linux-admin`.

## Umfang und Freigabe

- Kernthema `wiso-6__10`, Einheit `ablauforganisation-prozessdenken-epk`.
- Acht Abschnitte, Diagnose, vier verpflichtende Lernziel-Checks mit Feedback, eigene Zeichenaufgabe, Abrufübung und vier interaktive Wiederholungskarten.
- Drei eigenständige technische SVG-Diagramme: Grundfolge, XOR-Freigabe und UND-Synchronisation. Keine dekorativen Rasterbilder oder ASCII-Diagramme.
- Status bleibt `CURATED_DRAFT`; keine menschliche Fachfreigabe, Veröffentlichung oder Push.
- Abdeckung nach Build: 341/380 Kernthemen, 39 offen; WiSo 70/109. Dies bezeichnet implementierte Inhalte, nicht fachliche Freigaben.

## Fachliche Grenzen und Quellen

Private Europa-Buchquelle: lokaler Markdown-Export, Zeilen 3970–3980, Arbeits- und Geschäftsprozesse. Nur als Themenanker gelesen; keine Buchaufgaben, Abbildungen oder behaupteten PDF-Seiten übernommen.

Primärgrundlage ist das ARIS Method Manual, Ausgabe April 2025, Abschnitt 3.4.1.2, gedruckte Seiten 66–75. Ergänzend wurde die aktuelle ARIS-Dokumentation zur Prozesshierarchie gelesen. Quellen und Abrufdatum 04.10.2026 stehen im Quellenregister; Recherchegrenzen sind in `EPK_QUELLEN.md` dokumentiert.

Die Einheit verwendet ausdrücklich klassische Basis-EPK mit beibehaltenen Zwischenereignissen. Die Einschränkung für ein XOR-/OR-Split unmittelbar nach einem Ereignis ist eine Modellierungskonvention dieser Grundlage, kein universeller Satz über sämtliche EPK-Varianten. OR-Verknüpfungen werden nur für klar strukturierte aktivierte Zweige erläutert. Wiederkehrender Prozess, Projekt, Zuständigkeit und Ablauf werden getrennt behandelt. Alle Veluno-IT-Fälle und Musterlösungen sind selbst erfunden.

Der neue Renderer prüft begrenzte Layout- und Strukturbedingungen für vorwärts gerichtete Diagramme. Er ist kein formaler EPK-Soundness-Checker und bildet keine Schleifen ab. Diese Lieferung behauptet keine automatische vollständige Semantikprüfung.

## Gestaltung und tatsächliche Prüfung

Bestehender Deep-Space-Reference-Lock und gemeinsame Diagramm-Tokens beibehalten; kein neues Seitendesign. Sichtprüfung korrigierte einen nicht vorhandenen Hintergrund-Token und vergrößerte die Konnektoren für sichere Beschriftung.

- `npm run build`: bestanden.
- `node scripts/verify-learning-compiler.mjs`: bestanden, einschließlich EPK-Rendering, Escaping und ungültiger Knoten/Kanten/Koordinaten.
- `npm test`: vollständig bestanden; private Wissensbasis im Worktree nicht vorhanden und deren optionale Prüfung entsprechend übersprungen.
- `AP2_BROWSER_ONLY=epk npm run test:browser`: bestanden. Dies ist der gezielte EPK-Browserlauf, nicht die gesamte Browser-Suite.
- 390 und 1440 Pixel, jeweils Dark/Light: falsche/richtige Antworten, Gate-Reset, Abruf-Mindestlänge, Musterlösung, Karten per Enter/Leertaste, Speicherung über Reload, Abschluss und Zurücksetzen geprüft.
- Diagramm-Beschriftungen innerhalb eigener Formen und SVG-Flächen, gerichtete Pfeile, Textkontrast mindestens 4,5:1 und mobile horizontale Tastaturverschiebung geprüft; kein Seitenüberlauf.
- Korrigierte Screenshots tatsächlich gesichtet: Desktop-XOR Light, Desktop-UND Dark, mobile Grundfolge Dark und mobiler Einstieg Light. Mobile Diagramme verwenden den vorhandenen seitlich verschiebbaren Diagrammbereich.

Screenshots und Testlogs liegen lokal unter `%TEMP%/ap2-epk-20261004` beziehungsweise `%TEMP%/ap2-epk-browser.log` und werden nicht als Produktdateien eingecheckt.

Leere verwaiste Git-Indexsperre nach Prüfung auf aktive Git-Prozesse recoverabel umbenannt, nicht gelöscht. Fremde Inhalte wurden nicht entfernt. Codex-Nutzung bei abschließender Prüfung: 79 Prozent genutzt, normale Nutzung erlaubt.

Nächster offener Abschnitt: `wiso-6__11` Führungsstile, Motivation, Konfliktarten und Konfliktlösung.

# Führung, Motivation und Konfliktlösung

Abgeschlossen am 04.10.2026, Branch `codex/ga1-linux-admin`.

## Inhalt und Grenzen

- `wiso-6__11`, Einheit `fuehrungsstile-motivation-konflikte`, acht Abschnitte, etwa 45 Minuten.
- Unbewertete Diagnose, vier verpflichtende Lernziel-Checks mit Fehlfeedback, Abrufübung, vier Tastatur-Karten und eigener prüfungsnaher Transferfall.
- Drei technische SVGs: Führungsstilvergleich, Konfliktursachen und Gesprächsroute. Bestehende Renderer und Diagramm-Tokens, keine Rasterbilder oder ASCII-Ersatz.
- Klassische Stile als vereinfachte Lehrmodelle, nicht als historisch exakte Lewin-Klassifikation aus der gemischten DGUV-Liste. Delegation braucht Rahmen und Unterstützung, keine pauschale Übertragung rechtlicher Verantwortung.
- Intrinsisch/extrinsisch am Handlungsgrund unterscheiden; SDT als Theorie, nicht als Erfolgsgarantie. Keine Maslow-Naturgesetz-Pyramide oder pauschale Belohnungswirkung.
- Konfliktarten können sich überlagern. Verteilung, Rolle und Abwertung im eigenen Testserver-Fall getrennt erklärt. Vereinbarung prüft Priorität, Zeitpuffer, Befugnisse, Nachweis und Nachhalten.
- Mediation freiwillig und allparteilich; keine Gleichsetzung mit Gerichtsurteil. Schutzbedarf und Grenzen bei Gefahr, Machtungleichgewicht oder rein rechtlichen Fragen ausdrücklich benannt.
- Status bleibt `CURATED_DRAFT`; menschliche Freigabe ausstehend. Kein Push oder Veröffentlichung.

## Quellen und Gestaltung

Privater EUROPA-Integrator-Markdown im Hauptcheckout, Zeilen 5647–5652, als schwacher Mitarbeiterführungs-/Fortbildungsanker gelesen. Keine Buchaufgaben oder Originalgrafiken übernommen; kein PDF-Seitenbezug behauptet.

Primärbelege: DGUV-Projekt 0416, PDF S. 61 direkt geprüft; DGUV Erfahrungsschatz zu Konflikten; DGUV top eins zu Gesprächsführung (2025) und Mediation (2026); Ryan/Deci 2000, ausgewählte Original-PDF-Absätze. Register und Kurations-Sidecar führen genaue Verwendungsgrenzen. Zusätzliche Hintergrundrecherche steht in `FUEHRUNG_QUELLEN.md`. Fehlgeschlagene BAuA-/IHK-Direktabrufe sind keine tragenden Inhaltsbelege.

Refero Direct Build: bestehender Doppler/Astro/n8n-Reference-Lock; vorherige reale EPK-Lernseite als Build-Target gesichtet. Leseflächen, Tokens und Interaktionsmuster fortgeführt, kein neues UI-System. Die Grafik dient jeweils einer konkreten Unterscheidung oder Handlungsfolge.

## Tatsächlich ausgeführte Prüfung

- Build und vollständiges `npm test` bestanden. Optionale Wissensbasis-/Buchdatenprüfungen wurden übersprungen, weil lokale Daten im Worktree nicht importiert sind; der Themenanker wurde im Hauptcheckout gelesen.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=fuehrung npm run test:browser` bestanden, nicht die gesamte Browser-Suite.
- Bei 390/1440 Pixeln in Dark/Light: falsche/richtige Quizantworten, Feedback, Gate-Reset, Abruf-Mindestlänge und Lösung, Karten Enter/Leertaste, Speicherung über Reload, Abschluss/Rücknahme sowie mobile Tastaturverschiebung der Diagramme.
- SVG-Text innerhalb von Canvas und eigener Box, Kartenbeschriftung und Seitenüberlauf geprüft. Eine zu breite Label-Beschriftung wurde im Inhalt gekürzt; keine Prüfung abgeschwächt.
- Sichtprüfung tatsächlicher Screenshots: Desktop-Stilvergleich Dark, Konfliktübersicht Light, mobile Gesprächsroute Light und Kartenrückseite Dark. Keine wesentliche Designabweichung festgestellt. Diagramme bleiben auf kleinen Displays seitlich verschiebbar.
- Screenshots lokal: `%TEMP%/ap2-fuehrung-20261004`; Testlogs `%TEMP%/ap2-fuehrung-tests.log` und `%TEMP%/ap2-fuehrung-browser.log`, nicht eingecheckt.

Git-Dateiliste wird explizit begrenzt; keine fremden Inhalte gelöscht. Eine leere verwaiste Indexsperre wurde nur nach Prüfung auf aktive Git-Prozesse recoverabel umbenannt.

Abdeckung: 342/380 implementiert, 38 offen; WiSo 71/109. Implementiert bedeutet nicht fachlich freigegeben. Nutzung nach Prüfung: 80 Prozent verbraucht, normale Nutzung weiter erlaubt. Nächster offener Abschnitt: `wiso-6__12`, betriebliche Kennzahlen im Grundverständnis.

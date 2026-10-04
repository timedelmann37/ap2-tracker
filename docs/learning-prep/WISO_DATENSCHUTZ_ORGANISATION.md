# WiSo Datenschutzorganisation – abgeschlossener lokaler Abschnitt

Stand 04.10.2026. Kernthema `wiso-8__2`, Branch `codex/ga1-linux-admin`. Ausgangsstatus sauber; AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor dem Abschnitt geprüft. Alte abweichende Deploymentangaben im Worktree bleiben unverändert; Deployment ist nicht Bestandteil des Auftrags.

## Inhalt und Quellen

Neue kanonische Einheit zu Verantwortlichem/Auftragsverarbeiter, AV-Vertrag und Unterauftragsverarbeitung, Verzeichnis von Verarbeitungstätigkeiten, Datenschutzbeauftragtem und Datenpannen. Eigener geführter Fall Finn und neuer Transferfall Nora. Diagnose, vier Pflicht-Lernziel-Checks mit Fehlfeedback, Abruftext mit bewusst freizuschaltendem Modell und vier Lernkarten. Drei selbst erzeugte technische SVG-Vergleiche; keine Rasterbilder oder ASCII-Grafik. Keine Rechenformel erforderlich.

Zentrale Abgrenzungen: Outsourcing überträgt nicht die Verantwortung; unter 250 Beschäftigten entfällt das Verzeichnis nicht pauschal. DSB-Pflichten folgen sowohl qualitativen DSGVO-Kriterien als auch ergänzend § 38 BDSG. Die 72-Stunden-Frist betrifft die Behördenmeldung ab Bekanntwerden beim Verantwortlichen; Dienstleisterinformation und Betroffenenbenachrichtigung haben andere Voraussetzungen. Risiken betreffen die Rechte und Freiheiten natürlicher Personen; auch Integritäts- und Verfügbarkeitsverletzungen können Datenpannen sein.

Normprüfung, tatsächliche private Themenanker und Abrufgrenzen: WISO_DATENSCHUTZ_ORGANISATION_QUELLEN.md. Direkt gelesene Behörden-Normausgabe Dezember 2025 und § 38 BDSG registriert. EUR-Lex war Anti-Bot-blockiert; kein erfolgreicher Abruf behauptet. Private Bücher nur als eng geprüfte Themenanker, keine übernommenen Fälle oder Lösungen. Keine vollständige nationale Sonderrechts- oder Rechtsprechungsprüfung.

CURATED_DRAFT; menschliche fachliche Freigabe steht aus. Implementiert ist nicht freigegeben.

## Referenz und tatsächlich abgeschlossene QA

Refero reference-direct-build: bestehender Deep-Space-Reference-Lock und gemeinsame Lernkomponenten, keine neuen Tokens oder Rahmenänderungen. Vor Umsetzung tatsächlich angesehen: Screenshot der vorigen Betroffenenrechte-Einheit 1440-light-case.png.

- `npm run build`: Exit 0, 1129 Dateien. Log: `C:/Users/timed/AppData/Local/Temp/ap2-dsorg-build-20261004.log`.
- `npm test`: Exit 0. Site/Compiler/Batch/Lerninhalte, Netzplan/Gantt, Progress-Merge und Leaderboard-SQL. Bestehende lokale Wissensbasis/Lernqueue und Buchdaten mangels Import im Worktree übersprungen; kein Vollbuch-Test behauptet. Log: `C:/Users/timed/AppData/Local/Temp/ap2-dsorg-test-20261004.log`.
- `AP2_BROWSER_ONLY=datenschutz-organisation node scripts/run-browser-tests.mjs`: Exit 0.
- Browserinteraktionen: Diagnose falsch/richtig und Reset, vier Pflichtziele falsch/richtig mit Rückmeldungen, Abschlussfreigabe, Reset sperrt wieder, Abruf-Mindestlänge/Modell, Karten Enter/Space, Reload-Persistenz, Abschluss/Rücknahme.
- Bei 390/1440 Pixeln jeweils Dark/Light: keine Seitenüberläufe, Kartenfront/-rückseite passend, SVG-Texte innerhalb Canvas und eigener Boxen, mobile Diagramme per Tastatur seitlich scrollbar. Keine pageerrors. Tastatur und Reduced Motion im Browserprüflauf berücksichtigt.
- Lokale signierte Test-Fixture, kein produktiver Auth-Dienst geprüft.
- 32 Screenshots: `C:/Users/timed/AppData/Local/Temp/ap2-dsorg-20261004`. Tatsächlich visuell geöffnet: 390-dark-start.png, 390-light-figure-0.png, 1440-dark-figure-2.png, 1440-light-case.png. Bewusster mobiler Diagramm-Scroll mit sichtbarem Hinweis. Keine Sichtprüfung aller 32 Einzelbilder behauptet.

Leere vorhandene Git-index.lock-Dateien wurden jeweils nur nach Prüfung ohne laufenden git.exe-Prozess recoverbar nach index.lock.stale-dsorg-stage-20261004 beziehungsweise index.lock.stale-dsorg-final-20261004 umbenannt. Keine Daten gelöscht.

## Stand

359/380 Kernthemen implementiert, 21 offen; WiSo 88/109. Nächstes offenes Kernthema `wiso-8__3`: Beschäftigtendatenschutz.

Nur Abschnittsdateien lokal committen. Kein Push, keine Veröffentlichung und keine Branch-Löschung.

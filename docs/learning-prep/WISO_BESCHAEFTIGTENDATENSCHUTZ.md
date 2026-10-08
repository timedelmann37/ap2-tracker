# WiSo Beschäftigtendatenschutz – abgeschlossener lokaler Abschnitt

Stand 04.10.2026. Kernthema `wiso-8__3`, Branch `codex/ga1-linux-admin`. Ausgangsstatus sauber; AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor dem Abschnitt gelesen. Abweichende historische Deploymentangaben im Worktree nicht geändert; kein Deployment Bestandteil dieses Auftrags.

## Inhalt und Quellen

Neue kanonische Einheit zu Zwecken/Rechtsgrundlagen, Einwilligung, besonderen Datenkategorien, Rollenrechten, Personalsoftware-Tests, Kontrollgrenzen, Mitbestimmung und Datenlebenszyklus. Eigener geführter Fall Mila und neuer Transferfall Jonas. Diagnose, vier Pflicht-Lernziel-Checks mit spezifischem Fehlfeedback, Abruftext mit bewusst freizuschaltendem Modell und vier Lernkarten. Drei eigenständige technische SVGs: Zweckvergleich, Rollenvergleich und Prüfweg. Keine Rasterbilder oder ASCII-Grafiken; keine Rechenformel erforderlich.

Research-Skill: Hintergrundrecherche in der zugehörigen Quellenmatrix, anschließend vom Hauptagenten vollständig gelesen und um eigene direkte Abrufe ergänzt. Aktuelles BAG-Urteil 08.05.2025, 8 AZR 209/21, korrigiert die pauschale Berufung auf § 26 Abs. 1 Satz 1. Keine Aussage, das gesamte § 26 sei aufgehoben. Keylogger-Urteil 2017 ausdrücklich historisch zum damaligen § 32 eingeordnet. Keine pauschale Freigabe durch Einwilligung, Adminrechte oder Betriebsvereinbarung; keine universelle Personalakten-/Bewerber-Löschfrist.

Tatsächliche private Themenanker, Primärstellen und technische Abrufgrenzen: WISO_BESCHAEFTIGTENDATENSCHUTZ_QUELLEN.md. Kein enger Beschäftigtendatenschutz-Buchabschnitt gefunden; allgemeine Begriffe, Logging/IAM und Bewerbungsbezüge nur als Themenanker. Eigene Fälle und Aufgaben. EuGH-Volltexte nicht erfolgreich direkt abgerufen; keine direkte Prüfung behauptet. Normen direkt, aktuelle gerichtliche Aussagen über BAG geprüft.

CURATED_DRAFT: menschliche fachliche Freigabe steht aus. Implementiert ist nicht freigegeben.

## Referenz und tatsächlich abgeschlossene QA

Refero reference-direct-build: vorhandener Deep-Space-Reference-Lock und gemeinsame Lernkomponenten. Vor Umsetzung tatsächlich geöffnet: Screenshot der vorigen Einheit `ap2-dsorg-20261004/1440-light-case.png`. Kein Redesign und keine gemeinsamen Token-/Stylingänderungen. Bei der Sichtprüfung war der ursprüngliche lange Titel mobil abgeschnitten; Titel gekürzt und ein Browsercheck gegen tatsächliche Text-Clipping-Rechtecke ergänzt. Danach erneut Build, volle Tests und Browserprüfung bestanden.

- `npm run build`: Exit 0, 1133 Site-Dateien. Log: `C:/Users/timed/AppData/Local/Temp/ap2-bsd-build-20261004.log`.
- `npm test`: Exit 0 nach Titelkorrektur. Site/Compiler/Batch/Lerninhalte, Netzplan/Gantt, Progress-Merge und Leaderboard-SQL. Lokale Wissensbasis/Lernqueue und Buchdaten mangels Import im Worktree übersprungen; kein vollständiger Buch-Test behauptet. Log: `C:/Users/timed/AppData/Local/Temp/ap2-bsd-test-20261004.log`.
- `AP2_BROWSER_ONLY=beschaeftigtendatenschutz node scripts/run-browser-tests.mjs`: Exit 0 nach Titelkorrektur und zusätzlichem Titelcheck.
- Interaktionen: falsche/richtige Diagnose, vier falsche/richtige Pflichtfragen mit Fehlfeedback und Reset, Abschlussfreigabe, Abruf-Mindestlänge und Modellfreigabe, Karten Enter/Space, Reload-Persistenz, Abschluss/Rücknahme, erneute Sperre nach Reset.
- 390/1440 Pixel jeweils Dark/Light: kein Seitenüberlauf, Titel ohne Clipping, Kartenfront/-rückseite passen, SVG-Texte innerhalb Canvas und eigener Boxen. Mobile Diagramme per Tastatur seitlich scrollbar mit sichtbarem Hinweis. Keine pageerrors. Reduced Motion im Prüflauf gesetzt.
- Lokale signierte Test-Fixture; kein produktiver Auth-/Cloud-Dienst geprüft.
- 32 Captures unter `C:/Users/timed/AppData/Local/Temp/ap2-bsd-20261004`. Tatsächlich visuell geöffnet: 390-dark-start.png (nach Korrektur erneut), 390-light-figure-2.png, 1440-dark-figure-0.png und 1440-light-case.png. Keine Sichtprüfung aller 32 Bilder behauptet.

Leere vorhandene Git-index.lock-Dateien wurden jeweils nach Prozessprüfung ohne laufenden git.exe-Prozess recoverbar nach index.lock.stale-bsd-stage-20261004 beziehungsweise index.lock.stale-bsd-final-20261004 umbenannt. Keine Daten gelöscht.

## Stand

360/380 Kernthemen implementiert, 20 offen; WiSo 89/109. Nächstes offenes Kernthema `wiso-8__4`: Urheberrecht und Lizenzrecht.

Nur beabsichtigte Abschnittsdateien lokal committen. Kein Push, keine Veröffentlichung und keine Branch-Löschung.

# WiSo: Sofortmaßnahmen im Brandfall

Stand: 2026-10-04. Kernthema `wiso-8__14`; Einheit `sofortmassnahmen-brandfall-alarm-evakuierung`.

## Abgeschlossener Umfang

Die Einheit bleibt **CURATED_DRAFT** bis zur menschlichen Freigabe. Acht Abschnitte erklären Alarmierung, sichere Flucht versus Rauchgefahr, Grenzen eines Löschversuchs sowie Sammelstelle und Informationsübergabe. Sie enthalten eine Diagnose, eigene geführte Fälle und Transferaufgaben, vier verpflichtende Lernziel-Checks mit Antwortfeedback und Wiederholung, einen freien Abruf mit Muster und vier Lernkarten.

Drei eigene technische SVG-Diagramme zeigen Prioritäten, Fluchtwegentscheidungen und das Verhalten nach sicherem Verlassen. Keine dekorativen Rasterbilder, keine übernommenen Buchaufgaben oder Abbildungen; keine Formeln erforderlich.

## Quellen und Gestaltung

Die aktuelle ASR A2.2 (Änderung Mai 2025) und direkt geprüfte Informationen von VBG, Feuerwehr Berlin, Esslingen und Kassel sowie DGUV begründen die Aussagen. Ältere DGUV-Publikationen von 2019 sind als ältere Quellen für stabile organisatorische Grundlagen eingeordnet. Nicht erfolgreich abrufbare BBK-/DGUV-Seiten wurden nicht als geprüfte Belege verwendet. Einzelheiten stehen in der Quellenmatrix und den Quellen-/Kurationsdaten.

Der private Buchbestand wurde nur als Themenanker in den tatsächlich gelesenen Markdown-Zeilen 485–489 genutzt. Fälle, Übungen und Diagramme sind eigenständig.

Der Research-Skill steuerte die Primärquellenprüfung und die Quellenmatrix. Refero-Skill und bestehender Deep-Space-Reference-Lock steuerten die Wiederverwendung der vorhandenen Lernseiten-Gestaltung; keine neue globale Gestaltung oder Hostingänderung.

## Tatsächlich ausgeführte Prüfung

- Vor dem Abschnitt: Branch `codex/ga1-linux-admin`, sauberer Status und AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md sowie Coverage geprüft.
- `npm run build`: erfolgreich, statischer Build mit 1177 Dateien.
- `npm test`: erfolgreich. Zwei bekannte Tests zur nicht importierten lokalen Wissensbasis/Buchdaten bleiben SKIP; keine Behauptung einer vollständigen privaten Quellenprüfung.
- Gezielter Browserlauf: `AP2_BROWSER_ONLY=brandfall node scripts/run-browser-tests.mjs`, lokale Auth-Fixture; erfolgreich. Nicht die gesamte Browser-Suite und kein Produktions-Sync.
- 390 px und 1440 px, jeweils Dark/Light und Reduced Motion: Diagnose falsch/richtig und Retry; vier Pflichtchecks falsch/richtig mit Feedback und Gate; Abruf-Mindestlänge und Muster; vier Karten per Enter/Leertaste; Neuladen mit Zustandserhalt; Abschluss setzen/zurücknehmen; Reset mit erneut gesperrtem Abschluss.
- Browser prüft Überschrift, Seitenüberlauf, Kartengrenzen und SVG-Textgrenzen; mobile Diagramme sind bewusst horizontal scrollbar und per Tastatur geprüft. Keine JavaScript-Fehler im Lauf.
- 36 Screenshots erzeugt in `C:/Users/timed/AppData/Local/Temp/ap2-brandfall-20261004`. Acht direkt visuell gesichtet: `390-dark-start.png`, `390-light-figure-0.png`, `1440-dark-figure-1.png`, `1440-light-figure-2.png`, `390-dark-case.png`, `390-light-recall.png`, `1440-dark-figure-0.png`, `1440-light-card.png`. Keine neuen Darstellungsprobleme festgestellt.
- Build-/Testlogs: `C:/Users/timed/AppData/Local/Temp/ap2-brandfall-build-20261004.log` und `ap2-brandfall-test-20261004.log`.
- Diff-Prüfung ohne Whitespacefehler; ausschließlich die beabsichtigten Abschnittsdateien und generierten Katalog-/Coverage-Änderungen für einen lokalen Commit vorgesehen.

## Stand und Grenzen

Coverage: **371/380**, davon WiSo **100/109**, noch neun Kernthemen offen. Als Nächstes: `wiso-8__15` Sicherheits-/Rettungskennzeichen.

Kein Push, keine Veröffentlichung, keine Branch-Löschung. Die Einheit ersetzt keine betriebliche Brandschutzordnung, Unterweisung oder Einsatzanweisung.

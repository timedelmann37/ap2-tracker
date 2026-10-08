# Ausbildungsordnung, Rahmenplan und betrieblicher Plan

Abgeschlossen am 03.10.2026 für `wiso-1__8`. Status **CURATED_DRAFT** bis zur menschlichen Fachfreigabe. Kein Push und keine Veröffentlichung.

## Inhalt

Eigene Selvo/Kira/Joren/Elin-Fälle erklären Ausbildungsordnung, ihren enthaltenen Ausbildungsrahmenplan und individuelle betriebliche Planung. Abgrenzung zu Dienstplan, schulischem Rahmenlehrplan und Ausbildungsnachweis. Diagnose, drei Pflicht-Lernzielchecks mit Feedback, Transferaufgabe mit Musterlösung und drei Tastatur-Lernkarten. Zwei native SVG-Diagramme: Ebenenvergleich und Umplanung ohne gestrichenes Lernziel. Fünf untereinander lesbare Planfelder übersetzen einen FISI-Kompetenzbezug in einen sicheren Laborauftrag.

Die Planfelder und Lernfenster sind didaktische Beispiele, keine wörtliche gesetzliche Pflichtfeldliste oder amtliche Terminvorgabe. Der Rahmenplan ist Teil der Ausbildungsordnung, kein gleichrangiges drittes Gesetz. Organisatorische Abweichungen bei den in § 3 FIAusbV genannten Gründen nicht mit ersatzloser Streichung von Mindestkompetenzen verwechselt. Ein Laborauftrag allein deckt nicht das gesamte Berufsbild ab. Keine dekorative Formel ohne fachlichen Rechenzusammenhang.

## Quellen und Grenzen

Am 03.10.2026 direkt gelesen: BBiG § 5 Abs. 1, § 14 Abs. 1 Nr. 1/Abs. 2–3; FIAusbV § 3 Abs. 1–2, § 6 und Anlage (Tabellenkopf/Abschnitte C und F). Quellen und konkrete Lektürebereiche stehen in `content/sources.json` und der Einheit. BBiG § 27 und FIAusbV § 2 scheiterten im Einzelabruf; sie sind nicht als direkt gelesene Belege registriert. Keine abschließende Bewertung von Ausbildungsstätteneignung, Verkürzung oder Prüfungsfristen.

Private Quelle `europa-integratoren-2026`, Rohtext Zeilen 471–480 im Hauptrepository, als Themenanker für den Vergleich Ausbildungsplan/Ausbildungsordnung gelesen. Keine Buchaufgabe, Tabelle, Lösung oder Grafik übernommen. Portalrolle aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` berücksichtigt: ergänzende Orientierung, nicht amtlicher Prüfungskatalog.

## Gestaltung und tatsächliche Prüfung

Refero-Routine führt den vorhandenen Deep-Space-Referenz-Lock fort: Doppler-Flächen, Astro-Atmosphäre, n8n-Verbindungen behalten ihre Rollen. Vergleichsbasis ist die vorhandene Ausbildungs-Lernseite; keine neue visuelle Richtung oder gemeinsame CSS-Änderung.

- `npm run build`: bestanden, 874 Dateien.
- `npm test`: bestanden. Lokaler Buchimport-Test meldet SKIP, weil die privaten Buchdaten nicht im Worktree importiert sind.
- Browser-Selektor `training-plan`: bestanden. Diagnose nicht als Abschluss-Gate, falsche/richtige Antworten, Reset, Pflichtziel-Sperren, Transfer-Mindestlänge/Musterlösung, Enter/Space-Karten, Reload-Persistenz, Abschluss/Rücknahme und erneute Sperre geprüft.
- 390/1440 Pixel in Dark/Light mit Reduced Motion: kein Seitenüberlauf, Kartentext und SVG-Textcontainment, mobiles Diagramm-Tastaturscrollen und gestapelte Planfelder geprüft; keine Seitenfehler.
- Sichtprüfungen: Desktop-Dark-Ebenendiagramm, Mobile-Light-Praxisfall, Desktop-Light-Umplanung, Mobile-Dark-Kartenrückseite. Zusätzlich die zunächst horizontale Plan-Tabelle visuell beurteilt und durch lesbare Planfeld-Absätze ersetzt; die endgültigen Mobile-Light-Planfelder erneut visuell geprüft. Gesamttests und Browserprüfung nach dieser Änderung erneut bestanden.
- Bei der Testskript-Anpassung fehlende Schlussklammer und versehentlich geänderter Praxisfall-Selektor korrigiert; anschließend erfolgreiche Browserprüfung. Keine fehlerhafte Prüfung als bestanden gezählt.
- Lokale Aufnahmen unter `C:/Users/timed/AppData/Local/Temp/ap2-plan-20261003/`, nicht im Commit.

Abdeckung: 281/380 insgesamt, WiSo 10/109, wiso-1 9/14. Nächstes offenes Kernthema: `wiso-1__9` (Prüfungen, Verkürzung, vorzeitige Zulassung, Wiederholung).

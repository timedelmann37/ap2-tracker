# WiSo: Kaufvertragsstörungen – geprüfter lokaler Entwurf

Stand: 04.10.2026; `wiso-7__8`. Status **CURATED_DRAFT**, menschliche Freigabe ausstehend, keine Veröffentlichung.

## Abgeschlossene Arbeit

Sieben Abschnitte zu Sachmangel, Liefer-, Zahlungs- und Annahmeverzug: Diagnose, vier verpflichtende Lernziel-Checks, eigene Lena-/Arvo-Fälle, erklärendes Fehlfeedback, geführte Gegenchecks, Transfer-Abruf mit Mindestlänge und vier Tastaturkarten. Drei eigenständige SVGs zeigen Prüfpfad, Schuldnerrollen und Annahmeprüfung; keine künstliche Formel für qualitative Regeln.

Aktuelle Primärnormen und tatsächliche Abrufwege in `KAUFSTOERUNGEN_QUELLEN.md`. Subjektive/objektive/Montageanforderungen bei Gefahrübergang gemeinsam prüfen; Fälligkeit ist nicht Verzug. Verbraucherhinweis bei 30 Tagen und ordnungsgemäßes Angebot bei Annahmeverzug ausdrücklich abgegrenzt. Kein pauschales Rücktritts- oder Schadensersatzversprechen. Gewährleistungsrechte, Fristen und Zinsrechnung bleiben folgenden Kernthemen vorbehalten.

EUROPA-Rohtextstellen 4028 und 9029–9033 tatsächlich gelesen: nur benachbarte AGB-/Gewährleistungsbezüge, keine direkte private Deckung der neuen Grundlagen behauptet. Keine privaten Aufgaben, Lösungen, Abbildungen oder Druckseiten übernommen. Refero Direct Build führt den bestehenden Deep-Space-Lock und die gemeinsame Runtime unverändert fort.

## Tatsächliche Prüfung

- `npm run build`: bestanden, 1.101 lokale Build-Dateien.
- `npm test`: bestanden; Build, Site, Compiler, Batch, Learning, Progress-Merge und Leaderboard-SQL.
- `AP2_BROWSER_ONLY=kaufstoerungen node scripts/run-browser-tests.mjs`: bestanden; gezielter neuer Browserlauf, nicht die gesamte historische Browser-Suite.
- Richtige/falsche Antworten, spezifisches Feedback, vier Lernziel-Sperren, Reset, Abruf-Mindestlänge und Lösungsanzeige, Enter/Leertaste-Karten, Reload-Persistenz, Abschluss und Rücknahme tatsächlich geprüft.
- 390 × 900 und 1.440 × 900 in Dark/Light mit Reduced Motion: keine Seitenüberläufe, SVG-Beschriftungen innerhalb Canvas/Boxen, mobile Diagramme per Tastatur scrollbar, Karteninhalt enthalten; keine JavaScript-Seitenfehler.
- 32 Screenshots: `C:/Users/timed/AppData/Local/Temp/ap2-stoer-20261004`. Tatsächlich visuell betrachtet: Mobile-Dark-Einstieg, Mobile-Light-Annahme-Diagramm, Desktop-Dark-Schuldnervergleich und Desktop-Light-Praxisfall. Lesbare Hierarchie, Kontrast und klare Feedbackflächen; breite mobile Diagramme ausdrücklich seitlich scrollbar.
- `git diff --check`: bestanden. Ausschließlich beabsichtigte lokale Inhalte und generierte Artefakte; kein Push oder Deployment.

Abdeckung: **352/380 umgesetzt**, **28 offen**, WiSo **81/109**. Technische Abdeckung ist keine menschliche fachliche Freigabe.

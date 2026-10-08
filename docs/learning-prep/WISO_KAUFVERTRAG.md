# WiSo: Kaufvertrag – geprüfter lokaler Entwurf

Stand: 04.10.2026. Kernthema `wiso-7__7`; Status **CURATED_DRAFT**, keine menschliche Freigabe oder Veröffentlichung.

## Fertiggestellt

Kanonische Einheit `kaufvertrag-angebot-annahme-agb-eigentumsvorbehalt` mit sieben Abschnitten, Diagnose, vier verpflichtenden Lernziel-Checks, eigenen Nivo-/Tera-Fällen, begründetem Fehlfeedback, Transfer-Abrufübung und vier Tastaturkarten. Drei eigenständige deklarative SVGs trennen Vertragsschluss/Erfüllung, AGB-Einbeziehung/Kontrolle sowie Besitz/Eigentum. Qualitative Regeln brauchen keine künstliche Formel.

Quellenprüfung und tatsächliche Abrufwege: `KAUFVERTRAG_QUELLEN.md`. Amtliche BGB-Einzelstellen; private EUROPA-Rohtextanker 960–977 und 4018–4028 tatsächlich gelesen, nur Themenwahl. Keine privaten Aufgaben oder Abbildungen übernommen; kein Buchanker für Eigentumsvorbehalt behauptet. Rechtsgrenzen: B2B-Ausnahme, individuelle Abrede, AGB-Teilunwirksamkeit, reine Eingangsbestätigung sowie Rücktritt vor Herausverlangen. Keine vollständige Verbraucher-, Handels-, Insolvenz- oder Rücktrittsberatung.

## Tatsächlich ausgeführte Prüfung

- `npm run build`: bestanden, 1.097 Dateien im lokalen Build.
- `npm test`: bestanden; Build, Site, Compiler, Batch, Learning, Progress-Merge und Leaderboard-SQL.
- `AP2_BROWSER_ONLY=kaufvertrag node scripts/run-browser-tests.mjs`: bestanden. Gezielter Browserlauf dieser Einheit, nicht erneut die gesamte historische Browser-Suite.
- Falsche/richtige Antworten, spezifisches Feedback, vier Lernziel-Sperren, Rücksetzen, Abruf-Mindestlänge und bewusste Lösungsanzeige, Enter/Leertaste bei Karten, Reload-Persistenz, Abschluss und Rücknahme tatsächlich getestet.
- Mobile 390 × 900 und Desktop 1.440 × 900, jeweils Dark/Light und Reduced Motion: kein Seitenoverflow, SVG-Text in Canvas/Boxen, horizontaler Diagramm-Scroll per Tastatur und Karteninhalt enthalten. Keine JavaScript-Seitenfehler.
- 32 Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-kauf-20261004`. Vier tatsächlich visuell betrachtet: Mobile-Dark-Einstieg, Mobile-Light-AGB-Diagramm, Desktop-Dark-Eigentum-Diagramm und Desktop-Light-Praxisfall. Lesbare Hierarchie, Beschriftungen und Feedbackflächen im bestehenden Deep-Space-System; auf Mobile sind breite Diagramme ausdrücklich seitlich scrollbar.
- `git diff --check`: bestanden. Nur beauftragte lokale Inhalte und generierte Artefakte vorgesehen; kein Push oder Deployment.

Abdeckung nach Build: **351/380 umgesetzt**, **29 offen**, WiSo **80/109**. Dies ist technische Abdeckung, keine fachliche menschliche Freigabe.

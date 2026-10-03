# Industrie 4.0, CPS und KI-Grundlagen
Stand: 03.10.2026. Kernthema `ga1-13__7`; Status `CURATED_DRAFT`.

## Abgeschlossener Abschnitt
Eigener fiktiver Merin-Lüfterfall: lokale Temperaturregelung mit physischer Rückkopplung, vernetzte Produktionsdaten und getrennter KI-Wartungshinweis. KI, maschinelles Lernen und neuronale Netze sowie Training/Inferenz unterschieden. Ein Neuronenbaustein mit gesetzten, nicht trainierten Gewichten: 0,5·0,8 + 0,25·0,4 − 0,2 = 0,3; ReLU = 0,3. Gegenprobe mit Bias −0,7: Summe −0,2, Aktivierung 0. Keine Interpretation als Ausfallwahrscheinlichkeit.

Eigene Pilotdaten: 8 tatsächliche Wartungsfälle, 6 erkannt, 2 übersehen, zusätzlich 3 Fehlalarme. Ohne Gesamtfallzahl keine Gesamtgenauigkeit behauptet. Ereignisgetrennte Prüfungen, Datenqualität, neuer Einsatzbereich, Verantwortung und Rückfallweg erläutert. Kein direkter KI-Aktorzugriff; keine industrielle Sicherheitsfreigabe oder Rechtsberatung.

Diagnose ohne Pflichtgate, drei Pflichtchecks mit Feedback, freier Transfer mit Mindestlänge/Muster und drei Tastaturkarten. Drei native technische SVGs: Regelkreis als Ablauf mit expliziter Rückkopplungsbeschreibung, Neuronenbaustein und Hinweisweg. Semantisch benannte zweizeilige MathML-Formel. Keine dekorativen Rasterbilder oder ASCII-Grafiken.

## Quellen und Design
- [IBM: What is Industry 4.0?](https://www.ibm.com/think/topics/industry-4-0): Industry 4.0 und Vernetzung direkt gelesen. Eigenständige Erläuterung und Fälle; keine Quellgrafiken oder Aufgaben kopiert.
- [NIST CSRC: Cyber-physical systems](https://csrc.nist.gov/glossary/term/cyber_physical_systems): Definitionen, digitaler und physischer Anteil direkt gelesen. Eigenständige Erläuterung und Fälle; keine Quellgrafiken oder Aufgaben kopiert.
- [Google ML Crash Course: Nodes and hidden layers](https://developers.google.com/machine-learning/crash-course/neural-networks/nodes-hidden-layers): Gewichte, Bias und verborgene Schichten direkt gelesen. Eigenständige Erläuterung und Fälle; keine Quellgrafiken oder Aufgaben kopiert.
- [Google ML Crash Course: Activation functions](https://developers.google.com/machine-learning/crash-course/neural-networks/activation-functions): Nichtlinearität und ReLU direkt gelesen. Eigenständige Erläuterung und Fälle; keine Quellgrafiken oder Aufgaben kopiert.
- [NIST AIRC: AI Risks and Trustworthiness](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/): AI RMF 1.0, Abschnitt 3 und 3.1 direkt gelesen. Eigenständige Erläuterung und Fälle; keine Quellgrafiken oder Aufgaben kopiert.
- NIST-Risiken: AI RMF 1.0 (2023); angekündigte Überarbeitung ausdrücklich berücksichtigt.
- Private Themenanker `europa-integratoren-2026:00179`, Zeilen 1855–1856 (nur Überschrift), `:00208`, 2090–2126, und `:00806`, 7953–7958, direkt im Hauptrepository gelesen. Keine Kreditwürdigkeitsaufgabe, Buchdaten, Grafik oder Lösung übernommen. Quellenrollen aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` beachtet.
- Refero-Routine mit bestehendem Deep-Space-Lock; gemeinsamer Rahmen, Tokens und native Diagrammtypen unverändert. Keine neue globale Gestaltung.

## Tatsächliche Prüfung
- Build: Exit 0, 847 Dateien.
- `npm test`: Exit 0; Build, Site, Compiler, Batch, Lerninhalte, Fortschrittsmerge und Leaderboard-SQL bestanden. Private Buchimport-Prüfung im Worktree ohne lokale Wissensbasis übersprungen; Anker im Hauptrepository gelesen.
- `AP2_BROWSER_ONLY=industry-ai node scripts/run-browser-tests.mjs`: Exit 0, lokale Test-Anmeldung. Diagnose, falsche/richtige Antworten, Feedback, Reset, Pflichtgate, Abschluss/Rücknahme, Persistenz, Transfer-Mindestlänge/Muster sowie Enter-/Space-Karten geprüft.
- 390/1440 Pixel, Dark/Light: kein Seitenoverflow, MathML zugänglich benannt, SVG-Texte im Canvas, mobiles Diagrammscrollen per Tastatur, Karten ohne Textkollision, keine Laufzeitfehler.
- Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-industry-20261003/`: Desktop-Dark-Neuronenbaustein, Mobile-Light-Regelkreis, Desktop-Light-Formel und Mobile-Dark-Kartenrückseite angesehen. Mobil bleibt die technische Grafik im erklärten horizontalen Scrollbereich.
- Beide Neuronenrechnungen und Pilotzählung fachlich von Hand gegengeprüft. Freier Transfer wird nicht automatisch fachlich benotet; keine formale WCAG-Zertifizierung behauptet.

Abdeckung: 272/380 insgesamt; GA1 164/164, GA2 107/107, WiSo 1/109. Abdeckung ist keine menschliche Fachfreigabe. Als Nächstes offene WiSo-Kernthemen anhand Coverage und Quellen wählen. Ausschließlich lokale Sicherung; kein Push oder Veröffentlichung.

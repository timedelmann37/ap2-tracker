# GA1: Letzte Woche – Wiederholung und Rechenpraxis

Stand: 03.10.2026. Kernthema `ga1-12__5`. Status **CURATED_DRAFT**, keine menschliche Fachfreigabe oder Veröffentlichung.

## Abgeschlossener Abschnitt

Neue eigenständige Einheit `letzte-woche-wiederholung-und-rechenpraxis`: Diagnose, fehlerbasierte Priorisierung, flexibler Wiederholungsrahmen, eigene Übertragungsrechnung mit MathML, Gegenprobe, neuer Nachtest, Feedback, drei Pflicht-Lernzielchecks und drei Abrufkarten. Technisches SVG zeigt den Ablauf vom Fehlerbeleg zum späteren Nachweis. Bestehende Refero-/Deep-Space-Bausteine unverändert wiederverwendet, keine neue Bildwelt oder globalen Styles.

Die Fokusregel „keine neuen Themen“ ist ausdrücklich keine amtliche Vorgabe. Notwendige Grundlagenklärung bleibt möglich; das Beispiel behauptet keinen optimalen Siebentageplan oder Prüfungserfolg. Keine automatische Kalenderplanung oder fachliche Bewertung freier Antworten.

## Tatsächlich geprüfte Quellen

- [IES: Organizing Instruction and Study](https://ies.ed.gov/ncee/wwc/PracticeGuide/1), Leitfaden 2007, Empfehlungen 1, 2, 5b und 6: direkt gelesen; Methodenanker, kein AP2-spezifischer Wochenplan.
- [NIST SP 811, Kapitel 7](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values), 7.1/7.2: direkt gelesen, Zahlenwert und Einheit.
- Private lokale Buchquelle `europa-integratoren-2026:00031`, Zeilen 395–398, direkt gelesen als Anker für betriebliche Anwendung. Keine fremden Aufgaben oder Textpassagen übernommen. Importdateien fehlen in diesem Worktree; der Anker wurde im Hauptrepository gelesen.
- `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md`: Quellenrollen und Übernahmegrenzen berücksichtigt.

Eigene Zahlen kontrolliert: 24.000/80 = 300 Sekunden = 5 Minuten; 300×80 = 24.000. Neuer Fall 18.000/60 = 300 Sekunden = 5 Minuten; 300×60 = 18.000. Dezimalbasis und konstante Nutzdatenrate ohne Zusatzzeiten ausdrücklich gegeben.

## Prüfung

- `npm run build`: erfolgreich, 821 Dateien.
- `npm test`: final Exit 0, einschließlich Site, Compiler, Batch, Lerninhalte, Fortschrittsmerge und Leaderboard-SQL. Lokaler Wissensbasis-Importtest überspringt mangels Importdaten im Worktree.
- `AP2_BROWSER_ONLY=final-week node scripts/run-browser-tests.mjs`: final Exit 0. Echte Chromium-Prüfung mit lokaler Anmeldefixture; keine externen Nutzerdaten geändert.
- Falsche/richtige Antworten und erklärendes Feedback, Diagnose ohne Pflichtgate, Freischaltung/Reset, kurzer/langer Abruf, Tastaturkarten, Reload-Persistenz und rücknehmbare Abschlussmarkierung geprüft.
- 390/1440 Pixel, Dark/Light, Seitenoverflow und SVG-Textgrenzen geprüft. Mobile Diagrammverschiebung per Tastatur geprüft. Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-week-20261003/`; MathML mobile Light, Kartenrückseite mobile Dark, Transfer mobile Light und Diagramm Desktop Dark visuell gelesen.
- Erster Testlauf scheiterte am falsch angegebenen SVG-Stagingpfad; exakter Pfad vorgemerkt, gesamte Testsuite erneut erfolgreich. Erster Browserlauf scheiterte am übernommenen alten Kartenselektor; korrigiert, Browserprüfung erneut erfolgreich.

Abdeckung nach Build: insgesamt 264/380; GA1 156/164. `ga1-12` nun 6/6 Entwürfe; nächste offene Gruppe `ga1-13`. Abdeckung bedeutet implementierten Lernentwurf, nicht menschliche Inhaltsfreigabe.

Nur beabsichtigte Dateien lokal gesichert. Kein Push, keine Veröffentlichung, keine Branch-Löschung.

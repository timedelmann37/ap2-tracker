# GA1: Prüfungszeit, Budget und Puffer

Stand 03.10.2026. Kernthema ga1-11__20, Website: /lernen/pruefungszeit-budget-puffer-und-wechsel/. CURATED_DRAFT bis menschliche Fachfreigabe.

## Fachliche Grundlage und Grenzen

Private Buchquelle europa-integratoren-2026:00031, Zeilen 395–398 direkt gelesen: konkrete betriebliche Handlungssituationen. Nur Themenanker, kein fremder Fall übernommen. docs/AUSBILDUNG_IT_SOURCE_REVIEW.md berücksichtigt: keine Zeitrezepte eines Lernportals als allgemeingültige Prüfungsregel behandeln.

Primärquellen direkt gelesen:
- IHK-AkA, Teil-2-Tabelle: https://www.ihk-aka.de/pruefungen/ap/berufe/detail/b1202 . 90 Minuten für Konzeption und Administration von IT-Systemen; daraus folgt keine feste Zahl von Aufgaben.
- IHK Braunschweig, Tipps für schriftliche Prüfungen, Nummern 1–3 und 8: https://www.ihk.de/braunschweig/aus-und-weiterbildung/weiterbildung/infos-zu-pruefungen-5477428 . Überblick, Wechsel bei Festbeißen und Aufmerksamkeit für Punkteverteilung. Allgemeiner Fortbildungsratgeber, keine AP2-Bewertungsmatrix.

Der angefragte Einzelabruf von FIAusbV § 21 schlug fehl und wurde nicht als aktuell direkt gelesener Beleg verwendet. Ein Suchtreffer-PDF mit Vorbereitungstipps war nicht erreichbar; auch dieses wurde nicht als Beleg verwendet. Die benötigte Prüfungszeit wurde auf der AkA-Seite direkt verifiziert.

Eigener Trainingsfall: vier unabhängige bzw. im Verzögerungsfall ausdrücklich getrennt bearbeitbare Aufträge A bis D, 4 min Überblick, 76 min Bearbeitung und 10 min Kontrolle. Ursprüngliche Zeitfenster: 0–4, 4–22, 22–40, 40–60, 60–80, 80–90. Bei Minute 47 verbleiben 33 Bearbeitungsminuten; möglicher Wechsel zu D für 20 min, danach 13 min Rückkehr zu C. Keine feste Aufgabenanzahl, kein allgemeines Zeitrezept und keine Erfolgsgarantie. Die Seite ist weder echter Prüfungstimer noch vollständige Prüfungssimulation.

## Gestaltung und Umsetzung

Refero-Skill und Visual-Workflow gelesen; bestehenden Deep-Space-Referenz-Lock und geprüfte vorherige Lernseite als Build-Target fortgeführt. Doppler-Leseflächen, lokale Inter, Astro-Hintergrund und zurückhaltende n8n-Verbindungsbahnen behalten ihre Rollen. Keine gemeinsame UI verändert. Eine präzise technische Ablauf-SVG statt Rasterdekoration; auf Mobile beschriftet horizontal verschiebbar.

Drei semantische MathML-Formeln mit zugänglichen Beschriftungen. Die erste Formel nach Sichtprüfung zweizeilig gesetzt, damit sie mobil vollständig passt. Diagnose ohne Pflichtzielwirkung, zwei numerische Pflichtübungen, ein Pflicht-Quiz, freie Transferantwort vor Musterfreigabe sowie drei tastaturbedienbare Lernkarten. Freitext wird nicht automatisch fachlich benotet.

## Tatsächlich geprüfter Abschluss

- npm run build: bestanden, 803 Dateien.
- npm test: vollständig bestanden; nach Formelanpassung erneut bestanden. Der vorhandene Test meldet lokale Buchimportdaten im Worktree als nicht vorhanden und überspringt deren Prüfung; die private Ankerquelle wurde separat im Hauptrepo direkt gelesen.
- AP2_BROWSER_ONLY=time-budget mit vorhandenem Browser-Testfixture: bestanden; nach Korrektur eines falschen übernommenen Selektorpräfixes und nach Formelanpassung erfolgreich erneut ausgeführt.
- Falsche/richtige numerische Antworten einschließlich Dezimalkomma, Quizfeedback/Reset, Diagnose ohne Freigabe, Pflichtziel-Sperre, Recall vor Muster, Enter/Space auf Karten, Reload-Persistenz, Abschluss und Rücknahme geprüft.
- Zeitbudgets unabhängig nachgerechnet; drei beschriftete Formeln geprüft. Formelgrenzen bleiben innerhalb ihrer Panels. SVG-Texte innerhalb des Canvas; horizontale Grafikbedienung geprüft.
- 390 und 1440 Pixel jeweils Dark/Light: Screenshots für Einstieg, Formeln, Zahlenübung, Transfer und Grafik erzeugt. Einstieg mobil, alle Formeln in mobilen Ansichten, Zahlenfeedback, Transfer Desktop und Grafik in beiden Themes visuell kontrolliert. Kein seitlicher Seitenüberlauf oder JavaScript-Seitenfehler. Evidenz: C:/Users/timed/AppData/Local/Temp/ap2-time-20261003/.
- Lokaler Signed-in-Testfixture, keine echten Kontoschreibvorgänge. Unveränderte gemeinsame Navigation und Bewegung nicht als erneut vollständig geprüft ausgegeben.

Abdeckung nach Build: insgesamt 255/380, GA1 147/164. Keine Veröffentlichung, kein Push, keine menschliche Fachfreigabe.

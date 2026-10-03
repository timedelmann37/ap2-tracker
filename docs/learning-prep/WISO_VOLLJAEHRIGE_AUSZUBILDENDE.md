# Volljährige Auszubildende: Schutz und Pflichten

Abgeschlossen am 03.10.2026 für `wiso-1__7`. Die Einheit bleibt **CURATED_DRAFT** bis zur menschlichen Fachfreigabe; kein Push und keine Veröffentlichung.

## Inhalt und fachliche Korrektur

Eigenständiger Fall Tavin/Roan/Dax/Fara: Erwachsenenarbeitsschutz von fortbestehenden Ausbildungspflichten unterscheiden. Diagnose, drei Pflicht-Lernzielchecks mit begründetem Feedback, Transferaufgabe und drei tastaturbedienbare Lernkarten. Zwei native technische SVG-Diagramme und eine semantische MathML-Nettozeitrechnung.

Die bisherige Katalogaussage „längere Probezeit möglich“ wurde in den sechs vorhandenen HTML-Katalogkopien und den Abdeckungsdaten gezielt korrigiert. § 20 BBiG bestimmt mindestens einen und höchstens vier Monate; Volljährigkeit allein verlängert oder erneuert die Ausbildungsprobezeit nicht. Der zugehörige Quellenprüfblocker wurde entfernt; menschliche Freigabe bleibt erforderlich.

Abgrenzungen: Vertragszeiten nicht automatisch verlängert; gesetzliche Ausgleichszeiträume nicht als beliebige Zehnstundenerlaubnis; Urlaub nach Alter am Jahresanfang statt Kürzung am Geburtstag; Berufsschulfreistellung von landesrechtlicher Schulpflicht getrennt. Sonderfälle einer Ausbildungsunterbrechung werden nicht entschieden.

## Quellenprüfung

Am 03.10.2026 direkt gelesen: amtliche Normtexte BBiG §§ 13, 14, 15, 20 sowie ArbZG §§ 2–5 und JArbSchG § 19. Die Einzelstellen und geprüften Absätze sind in der Einheit und `content/sources.json` dokumentiert. § 1 JArbSchG wurde im amtlichen Suchabruf gelesen, der Einzelabruf scheiterte mit Timeout. Der ebenfalls fehlgeschlagene Einzelabruf § 25 BBiG wird nicht als direkt geprüfte Quelle geführt.

Private Buchquelle `europa-integratoren-2026`, Rohtext Zeilen 471–480 im Hauptrepository, nur als allgemeiner Berufsbildungs-/Arbeitsrechts-Themenanker. Keine Buchaufgabe übernommen und kein Beleg daraus für die fehlerhafte Probezeitaussage abgeleitet. Allgemeines Lernmaterial, keine individuelle Rechtsberatung.

## Tatsächliche Prüfungen

- `npm run build`: bestanden, 871 Dateien.
- `npm test`: bestanden; lokaler Buchimport-Test meldet SKIP, weil die Buchdaten im Worktree nicht importiert sind.
- Browser-Selektor `adult-trainees`: bestanden. Falsche/richtige Antworten, Reset, Abschluss-Sperren, Transfer-Mindestlänge, Musterlösung, Lernkarten per Enter/Space, Speicherung nach Reload, Abschluss und Rücknahme geprüft; keine Seitenfehler.
- 390 und 1440 Pixel, Dark/Light, Reduced Motion: Seitenüberlauf, Formelname und Rechnung, Kartenflächen, SVG-Textcontainment und mobiles Tastaturscrollen geprüft.
- Fünf Aufnahmen tatsächlich visuell geprüft: Desktop-Dark-Vergleich, Mobile-Light-Formel, Desktop-Light-Fall, Mobile-Dark-Kartenrückseite, Desktop-Light-Nachweisablauf. Eine zu lange Diagrammbeschriftung gekürzt und Browserprüfung danach erfolgreich wiederholt.
- Aufnahmen privat lokal unter `C:/Users/timed/AppData/Local/Temp/ap2-adult-20261003/`; nicht Teil des Commits.

Abdeckung nach diesem Abschnitt: 280/380 insgesamt, WiSo 9/109, wiso-1 8/14. Nächstes offenes Thema: `wiso-1__8` (Ausbildungsordnung, Ausbildungsrahmenplan, betrieblicher Ausbildungsplan).

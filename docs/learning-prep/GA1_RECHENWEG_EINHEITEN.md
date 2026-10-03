# GA1: Rechenwege und Einheiten

Stand 03.10.2026. Kernthema ga1-11__19, Website: /lernen/rechenweg-einheiten-und-plausibilitaet/. CURATED_DRAFT bis menschliche Fachfreigabe.

## Quellen und fachliche Grenzen

Private Buchquelle europa-integratoren-2026:00031, Zeilen 395–398 direkt gelesen: komplexe betriebliche Handlungssituationen. Nur Themenanker; kein Buchfall übernommen.

Direkt gelesene Primärquellen:
- IHK/NUiF-Arbeitsbuch, PDF-Seiten 5 und 8: Berechnen und nachvollziehbare Rechenwege bei entsprechendem Auftrag. https://www.ihk.de/blueprint/servlet/resource/blob/4884370/44aa896e3fe6548cb29d9da466115485/untersuetzung-fuer-auszubildende-data.pdf
- NIST SP 811, Kapitel 7.1/7.2: Größenwerte als Zahlenwert mal Einheit und Abstand zwischen Zahlenwert und Einheit. https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values

Das allgemeine Arbeitsbuch ist keine verbindliche AP2-Bewertungsmatrix. Teilpunkte und die Behandlung von Folgefehlern hängen vom konkreten Bewertungsschema ab und werden nicht garantiert.

Eigener Fall Archiv Nord: 480 GB bei konstant 80 MB/s, ausdrücklich dezimal mit 1 GB = 1000 MB und 1 min = 60 s. Start-, Prüf- und Wartezeiten bleiben im Modell unberücksichtigt; keine Zusage einer realen Übertragungsdauer. Ergebnis: 480000 MB / (80 MB/s) = 6000 s = 100 min. Die Gegenprobe zu 600 s ergibt nur 48000 MB = 48 GB und macht den Faktor-zehn-Fehler sichtbar. Eine formal richtige Einheit allein beweist keinen richtigen Zahlenwert.

## Gestaltung und Umsetzung

Refero-Skill, Visual-Workflow und bestehender Deep-Space-Referenz-Lock gelesen und fortgeführt. Vorhandene Leseflächen und lokale Inter; keine neue gemeinsame UI. Präzise technische SVG mit vier Rechenschritten, auf Mobile beschriftet horizontal verschiebbar. Drei semantische MathML-Formeln mit zugänglichen Beschriftungen.

Diagnose ohne Pflichtzielwirkung, zwei numerische Pflichtübungen (6000 s und 100 min), Pflicht-Quiz zur Fehleranalyse, freie Transferantwort mit Mindestlänge vor Musterfreigabe sowie drei Lernkarten. Erklärendes Feedback, Lernziel-Sperre und Wiederholung. Freitext wird nicht automatisch fachlich benotet.

## Tatsächlich geprüfter Abschluss

- npm run build: bestanden, 801 Dateien.
- npm test: vollständig bestanden.
- AP2_BROWSER_ONLY=working-units npm run test:browser: bestanden, nach Erweiterung der Prüfungen erneut bestanden.
- Falsche/richtige Quizantworten, Feedback, Reset, numerische Fehlwerte und richtige Werte einschließlich Dezimalkomma geprüft.
- Diagnose ohne Freigabe, Abschluss erst nach allen Pflichtchecks, Recall vor Muster, Enter/Space auf Karten, Reload-Persistenz, Abschluss und Rücknahme geprüft.
- Drei semantische Formeln, Zahlen-Gegenprobe, SVG-Beschriftungen innerhalb des Canvas und horizontale Grafikbedienung geprüft.
- 390/1440 Pixel jeweils Dark/Light: Screenshots für Einstieg, Zahlenübungen, Transfer, Formeln und Grafik erzeugt; ausgewählte Formel-, Übungs-, Transfer- und Grafikansichten visuell kontrolliert, Grafik in beiden Themes. Kein seitlicher Seitenüberlauf oder JavaScript-Seitenfehler. Evidenz: C:/Users/timed/AppData/Local/Temp/ap2-working-20261003/.
- Lokaler Signed-in-Testfixture, keine echten Kontoschreibvorgänge. Unveränderte gemeinsame Navigation und Bewegung nicht als erneut vollständig geprüft ausgegeben.

Abdeckung: insgesamt 254/380, GA1 146/164. Keine Veröffentlichung, kein Push und keine menschliche Fachfreigabe.

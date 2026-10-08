# ga1-11__12 – Zahlensysteme binär/hexadezimal/dezimal

Stand 03.10.2026: CURATED_DRAFT bis menschliche Fachfreigabe.

## Abgeschlossener Abschnitt

Eigener unsigned-Byte-Fall Kiesel: 0xB6 = 10110110 binär = 182 dezimal; Stellengewichtssumme und zwei Nibbles erklärt. 0x3A = 58. Rückrichtung 205: Division durch 16 mit Quotient 12/Rest 13, danach 0/12; rückwärts CD hex = 11001101 binär. Gegenfälle 6B/DC und falsche Restreihenfolge. Führende Nullen, ungültige Ziffern, Basispräfix, Bitbreite und Interpretationsgrenze erklärt; unsigned acht Bit mit 256 Mustern und Maximum 255.

Diagnose, vier numerische Pflichtchecks, ein Darstellungs-Pflichtcheck, Transfer vor Musterlösung und fünf Lernkarten. Drei semantische MathML-Formeln und zwei technische SVG-Abläufe. Bestehende Deep-Space-Komponenten gemäß Refero-Skill/Referenz-Lock wiederverwendet; keine Shell-/Stiländerung oder dekorative Rasterbilder.

## Quellen

Python-Primärdokumentation direkt gelesen am 03.10.2026: int(string, base), bin, bytearray und Integer literals. Dient als überprüfbare Basis-/Ziffernreferenz und Gegenprobe, keine Dokumentationszahlen übernommen. Privater Themenanker europa-integratoren-2026:00065, Zeilen 784–791 direkt gelesen: Gleichwertigkeit verschiedener Zahlensysteme. Fremde Zahl/Optionen nicht übernommen. Formel, Registerfall und Feedback eigenständig.

## Tatsächlich ausgeführte Prüfung

- npm run build bestanden.
- npm test bestanden.
- AP2_BROWSER_ONLY=number-bases npm run test:browser bestanden: gezielter Browsercheck, keine vollständige Regression behauptet.
- Falsche/richtige numerische Ergebnisse einschließlich Komma, Diagnose ohne Gate, Quizfeedback/Reset, Lernziel-Sperre, Persistenz, Erledigt/Undo, eigene Transferantwort und Enter/Space-Karten geprüft.
- Unabhängige numerische Gegenprobe mit Number.parseInt/toString für B6/10110110 und 205/CD/11001101 sowie Rest 13 bestanden.
- 390/1440 Pixel in Dark/Light mit Reduced Motion: keine Dokumentüberbreite, SVG-Texte im Canvas, mobile Grafiknavigation per Tastatur geprüft.
- Screenshots C:/Users/timed/AppData/Local/Temp/ap2-basecalc-20261003: Desktop-Dark-Nibblegrafik, Mobile-Light-Stellenwertformel, Desktop-Light-Divisionsgrafik und Mobile-Dark-Divisionsgrafik tatsächlich visuell geöffnet. Mobile Diagramme absichtlich horizontal verschiebbar mit Hinweis.

Abdeckung GA1 140/164, gesamt 248/380. Nur eigene lokale Änderungen gesichert; kein Push oder Veröffentlichung.

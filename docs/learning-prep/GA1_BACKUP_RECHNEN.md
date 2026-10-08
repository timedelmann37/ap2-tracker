# GA1: Backup-Speicherbedarf und Backup-Fenster
03.10.2026; ga1-11__4; CURATED_DRAFT bis menschliche Fachfreigabe.

## Fertiger Umfang
Neue Einheit backup-speicherbedarf-fenster-rechnen: Diagnose, vier Pflichtziele, vier Zahlenübungen (eine ergänzend), freie Transferantwort, fünf Tastaturkarten, zwei technische SVGs und drei semantisch beschriftete MathML-Blöcke.
Eigener Uferplan-Fall: zwei Ketten mit jeweils 800 GB Vollsicherung und sechs 40-GB-Inkrementen = 2080 GB. 20 % Zuschlag = 2496 GB; dagegen 20 % freie Zielkapazität = 2600 GB.
Voll-Lauf: 800000 MB / 100 MB/s + 300 s + 600 s = 8900 s, 1700 s über dem 7200-s-Fenster. Inkrement: 400 + 900 = 1300 s.
Erforderliche Nutzrate ohne zeitliche Reserve: 800000 / 6300 ≈ 126,984 MB/s. Kein Leistungsnachweis.
Dateimengen sind ausdrücklich bereits verarbeitete Backup-Dateigrößen; keine erneute Kompression oder Overhead-Minderung. Speicher-Peaks und RTO-Nachweis getrennt.

## Quellenprüfung
- Private Buchbasis europa-integratoren-2026:00465, Zeilen 4666–4671 direkt gelesen: Sicherungsstrategien als Themenanker, keine Rechenformel. Keine Originalaufgabe übernommen. Unpassenden Berufsbildtreffer :00034 nicht als Fachbeleg verwendet.
- [Veeam Forward Incremental Retention](https://helpcenter.veeam.com/docs/vbr/userguide/retention_incremental_hv.html): einleitende Kettenabhängigkeit und zusätzliche Aufbewahrung direkt gelesen. Eigener Fall zählt explizit Dateien, keine Veeam-Retentionregel simuliert.
- [AWS Restore testing](https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html): Overview direkt gelesen; Jobdauer und Ergebnisvalidierung unterschieden.
- [RFC 6349](https://www.rfc-editor.org/rfc/rfc6349.html): 4.1/4.1.2 direkt gelesen; passende Transfermenge und Rate, keine Beispielzahlen kopiert.
Vorhandene backup-window-Seite und Quellenredaktion gelesen, bestehende Backup-/Transferseiten verlinkt statt verändert.

## Designentscheidungen
Refero-Designroutine mit bestehendem Deep-Space-Lock: Doppler-Flächen/Inter, Astro nur Atmosphäre, n8n technische Linien. Gemeinsame Widgets ohne Shell-/CSS-Änderung. Native SVG und MathML, keine dekorative Rastergrafik oder ASCII.
Bei der mobilen Sichtprüfung lange Formellegende gekürzt: gleiche Datenbasis und Einheit bleibt verständlich ohne Wortüberlauf. Neu gebaut und erneut browsergeprüft.

## Tatsächliche Prüfung
npm run build, npm test und AP2_BROWSER_ONLY=backup-calculation npm run test:browser bestanden.
Browser: Fehlfeedback, richtige/falsche Zahlen, Dezimalkomma, Pflichtziel-Sperre/Reset, Persistenz, Abschluss/Undo, freie Antwort, Karten Enter/Space, drei Formelbeschriftungen, Diagramm-Textgrenzen, mobile Tastaturverschiebung, kein Seitenüberlauf und keine Browserfehler.
390/1440 px Dark/Light-Screens erstellt. Sichtprüfung: 1440-dark-figure-0, 1440-light-math-1, 390-dark-math-2, 390-light-figure-1; gekürzte mobile Legende nach erneuter Browserprüfung angesehen.
Screens: C:/Users/timed/AppData/Local/Temp/ap2-backupcalc-20261003.
Prüfung in vollständiger Browser-Suite registriert; nur gezielte Browserprüfung ausgeführt, keine vollständige Regression behauptet.
Kein Push oder Veröffentlichung.

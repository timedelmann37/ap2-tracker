# GA1: RAID-Kapazität, Plattenanzahl und IOPS
Stand: 03.10.2026; Kernthema `ga1-11__3`; CURATED_DRAFT bis menschliche Fachfreigabe.

## Abgeschlossener Abschnitt
Neue eigenständige Einheit `raid-kapazitaet-plattenanzahl-iops-rechnen`.
Diagnose, vier verbindliche Lernziel-Checks, vier numerische Übungen (eine ergänzend), freie Transferantwort und fünf Tastatur-Lernkarten.
Zwei technische SVG-Prüfwege, drei beschriftete MathML-Formeln. Bestehende RAID-/Write-Penalty-Seiten verlinkt, nicht verändert.
Eigener Talwerk-Fall: 19 TB bei 4 TB je Laufwerk erfordert RAID 6 mit sieben aktiven Laufwerken (20 TB). 600 Host-IOPS mit 75 % Reads/25 % Writes erzeugen bei P=6 insgesamt 1350 Backend-IOPS. 160 IOPS je Laufwerk erfordern neun aktive; mit separatem Spare zehn physische, 28 TB Modellkapazität.
Zusatzübung: 25 TB bei 6 TB je Laufwerk erfordert sieben aktive im RAID 6.
Keine Leistungs-/Beschaffungszusage; Kapazität, I/O-Budget, Spare und reale Betriebsreserve getrennt.

## Quellenprüfung
- Private Buchbasis europa-integratoren-2026:00200, Zeilen 2001–2015 direkt gelesen: Kapazität und RAID/Backup-Abgrenzung als Themenanker. Keine Originalzahlen, Frage oder Grafik übernommen.
- [Red Hat RHEL 10, Managing RAID](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/managing_storage_devices/managing-raid), Abschnitt 16.3 direkt gelesen. Klassisches RAID 10 aus Zweifach-Spiegelpaaren im Fall ausdrücklich begrenzt; Linux-md-Sonderlayouts nicht pauschal ausgeschlossen.
- [IBM DS8900F Performance Best Practices](https://www.redbooks.ibm.com/redbooks/pdfs/sg248501.pdf), Abschnitt 4.7, gedruckte Seiten 78–79, Tabelle 4-3 direkt gelesen. Nur Backend-Arbeitsmodell für kleine zufällige Updates; keine historischen DS8900F-Produktzahlen oder Zusagen übernommen.
- Vorhandene Quellenredaktion zu ga1-3__4 in docs/AUSBILDUNG_IT_SOURCE_REVIEW.md und GA1_WRITE_PENALTY.md gelesen.

## Modell und Design
Gesunder Verbund; gleich große Laufwerke; vorgegebenes konstantes Einzelbudget; gleichmäßige Last; keine Cache-Hits, Full-Stripe-Writes, Hintergrund-/Rebuildlast. Klassische Zweifach-Spiegelpaare.
Refero-Designroutine am bestehenden Lock: Doppler-Flächen/Inter, Astro nur Atmosphäre, n8n zurückhaltende technische Verbindungen. Gemeinsame Lernwidgets unverändert. Native SVG statt dekorativer Rastergrafik/ASCII; MathML mit semantischer Beschriftung.

## Tatsächlich ausgeführte Prüfungen
- npm run build: bestanden (761 Dateien).
- npm test: bestanden.
- AP2_BROWSER_ONLY=raid-calculation npm run test:browser: bestanden.
- Prüft Diagnose, Fehlfeedback, richtige/falsche Zahlen inklusive Dezimalkomma, Lernziel-Sperren/Reset, Persistenz, Abschluss/Undo, freie Antwort, Karten Enter/Space, drei beschriftete Formeln, SVG-Textgrenzen, mobile Tastaturverschiebung, Seitenüberlauf und Browserfehler.
- Screens 390/1440 jeweils Dark/Light erzeugt. Visuell geprüft: 1440-dark-figure-0, 1440-light-math-2, 390-dark-math-1, 390-light-figure-1. Keine neue Layoutabweichung; mobile SVGs bleiben gekennzeichnet seitlich verschiebbar.
- Screens unter C:/Users/timed/AppData/Local/Temp/ap2-raidcalc-20261003.
- Prüfung in vollständiger Browser-Suite registriert; nur gezielte Browserprüfung in diesem Lauf, keine vollständige Browserregression behauptet.
Kein Push, keine Veröffentlichung.

# ga1-8__1 – Schutzbedarf und Risikoanalyse

Stand 02.10.2026. Einheit `schutzbedarf-grundschutz-risikoanalyse`, CURATED_DRAFT.

## Abgeschlossener Abschnitt

- Eigenständiger Werkstattfall mit getrennten Schutzzielen, institutionsbezogenen Übungskriterien, Maximumprinzip, Kumulation und begrenztem Verteilungseffekt.
- Diagnose, vier Pflichtchecks mit Begründungen, numerische Erwartungswert-Übung, sechs Abrufkarten und Transferantwort vor Musterlösung.
- Zwei technische SVGs und semantisch gesetztes MathML. Bestehende Deep-Space-Leseflächen und Widgets nach Refero-Referenz-Lock wiederverwendet. Keine neuen gemeinsamen Styles, keine Rasterdekoration.
- Erwartungswert ausdrücklich nur für vorgegebenes Ein-Ereignis-Modell; keine Multiplikation ordinaler BSI-Klassen. Zeitraum, Einheit, Unsicherheit und nichtmonetäre Folgen erläutert.
- ISMS-Anforderungen und Zertifizierung getrennt; vorhandenes Backup und Zertifikat ersetzen keinen erfolgreichen Wiederherstellungstest.

## Quellen und Grenzen

- Private IHK-Bonn-Quelle :00242, Zeilen 3944–3962, direkt als Themenanker gelesen; keine Buchaufgabe oder Grafik übernommen.
- BSI-Standard 200-2, Kap. 8.2.1–8.2.2: relevante Textpassagen der BSI-Primärpublikation über DHGE-Kopie direkt gelesen. Offizieller BSI-Abruf lieferte 403; PDF-Seitenrender fehlgeschlagen. Keine visuelle Prüfung der Quell-PDF behauptet.
- BSI-Standard 200-3: offizieller indexierter Auszug zu Kap. 5.2/Risikomatrix geprüft, Volltext nicht erreichbar. Keine vollständige Normlektüre behauptet.
- NIST-Risikoglossar und öffentliche ISO/IEC-27001-Übersicht direkt gelesen. Kostenpflichtiger ISO-Normvolltext nicht gelesen.
- Keine allgemeingültigen Geld- oder Zeitgrenzen erfunden; Beispielkriterien sind ausdrücklich Fallvorgaben. Menschliche Fachfreigabe steht aus.

## Tatsächlich geprüfte Ergebnisse

- Build, `npm test` und `git diff --check` bestanden.
- `AP2_BROWSER_ONLY=protection-needs npm run test:browser` bestanden: Diagnose ohne Gatewirkung, falsche/richtige Pflichtchecks, Rückmeldung, Fortschrittsfreigabe und Rücknahme, erneute Sperre bei Reset, Persistenz, numerische Falsch-/Richtigantwort, Recall-Sperre und Musterlösung, Tastaturkarten.
- 390px/1440px in Dark/Light: kein Seitenüberlauf, SVG-Beschriftungen im Canvas, mobile Grafiken per Tastatur horizontal scrollbar, semantische Formel vorhanden, keine pageerror-Ereignisse.
- Screenshots in `%TEMP%/ap2-risk-20261002`: Desktop-Dark-Bedarfskette, Mobile-Light-Entscheidungskette, Mobile-Dark-Formel und Desktop-Light-Einstieg direkt visuell geprüft.
- Historische vollständige Browser-Suite nicht erneut ausgeführt; gezielte neue Suite ausgeführt.

Coverage: 212/380, GA1 104/164. Ausschließlich lokal gesichert, keine Veröffentlichung und kein Push.

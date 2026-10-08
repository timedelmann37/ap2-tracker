# GA1 – DSGVO: Daten, Löschung und Meldung

## Abgeschlossener Abschnitt
- Kernthema ga1-8__11; Einheit `dsgvo-daten-loeschung-meldung`.
- CURATED_DRAFT; menschliche fachliche Freigabe ausstehend.
- Eigener Werkservice-Fall mit Diagnose, vier Pflichtziel-Checks, begründetem Antwortfeedback, Transferabruf und sieben Lernkarten.
- Zwei technische SVG-Abläufe: kontrollierte Löschung und Vorfallbearbeitung. Keine dekorativen Rasterbilder oder ASCII-Darstellungen. Keine Rechenformel erforderlich.

## Geprüfte Quellen
- EUR-Lex, DSGVO: Art. 4, 12, 15–22, 30, 33 und 34; relevante Begriffe, Rechte, Löschgrenzen und Meldebedingungen direkt geprüft.
- BMF, amtlicher DSGVO-Text: Art. 5 und 6, Grundsätze und Rechtsgrundlagen.
- TLfDI: Hinweise zum Verzeichnis von Verarbeitungstätigkeiten; Pflichtangaben und zusätzliche interne Felder unterschieden. Ältere Handreichung mit Art. 30 abgeglichen.
- LDA Brandenburg: Meldung von Datenschutzverletzungen; Kenntnis, Risikoprüfung, Wochenenden und schrittweise Meldung.
- Links und konkrete Passagen sind im Quellenregister und in der Einheit enthalten. Prüfung am 03.10.2026.
- Privater Buchanker: europa-integratoren-2026:00059, Wiederholungsfrage 7: Datenschutz, Zeilen 719–728. Direkt gelesener Begriffsanker, keine übernommenen Fragen, keine Grundlage für aktuelle Rechtsbehauptungen.

## Fachliche Grenzen
Allgemeines Prüfungstraining, keine individuelle Rechtsberatung. Keine pauschale gesetzliche Aufbewahrungsdauer. Konkrete Pflicht, notwendiger Umfang und Ausnahme sind gesondert zu prüfen. Backup- und Restore-Ablauf ist ein eigener Betriebsentwurf. Antwortfrist für Anträge, Behördenmeldung und Betroffenenbenachrichtigung sind getrennt. 72 Stunden werden nicht als Wartezeit oder nur als Arbeitsstunden dargestellt. Ein nicht gemeldeter Vorfall bleibt dokumentationspflichtig.

## Gestaltung
AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Refero-Design-Routine gelesen. Bestehende Referenzbindung wiederverwendet: Doppler-Leseflächen, Astro-Hintergrund, n8n-Verbindungen. Kein neues Seitensystem. Bestehende Diagramm-, Quiz-, Recall- und Kartenkomponenten verwendet.

## Tatsächlich ausgeführte Prüfung
- `npm run build`: bestanden.
- `npm test`: bestanden.
- `AP2_BROWSER_ONLY=gdpr npm run test:browser`: bestanden.
- Browserprüfung: Diagnose ohne Gate; falsche/richtige Antworten und Feedback; Reset; vier Pflichtziele; Recall-Freigabe; sieben Karten per Enter/Space; Persistenz nach Reload; Abschluss und erneute Sperre nach Reset.
- 390 und 1440 px, Dark/Light, Reduced Motion: kein Seitenüberlauf; SVG-Texte innerhalb der Zeichenfläche; mobile Diagramme per Tastatur seitlich scrollbar.
- Screenshots tatsächlich angesehen: Desktop Dark Löschdiagramm, Mobile Light Meldediagramm, Desktop Light Seitenbeginn, Mobile Dark Seitenbeginn. Seitlicher Diagramm-Scroll ist sichtbar beschriftet; mobile Ansicht zeigt einen Ausschnitt, keinen verkleinerten unlesbaren Gesamtplan.
- Screenshot-Evidenz lokal: `C:/Users/timed/AppData/Local/Temp/ap2-gdpr-20261003/`.
- Kein vollständiger Browser-Gesamtlauf behauptet; gezielter Test der betroffenen Einheit.
- Abdeckung nach Build: 222/380; GA1 114/164, noch 50 offen. Keine menschliche Freigabe daraus abgeleitet.

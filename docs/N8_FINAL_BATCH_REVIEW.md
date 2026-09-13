# N8: sechs abschließende Kernthemen

Stand: 2026-09-13. `ga2-8__8` bis `ga2-8__13` sind als `CURATED_DRAFT`
umgesetzt. N8 besitzt damit 14 von 14 Lernseiten; menschliche Fach- und
Verständlichkeitsprüfung bleibt erforderlich. Technische Tests erteilen keine
Publikationsfreigabe.

## Quellen und eigene Beiträge

- Trend: ITLF10–12, PDF-Seiten 109/111 als Monitoring- und Skalierungskontext.
  Lineares Wachstumsmodell, Grenzen und Vorlaufrechnung sind eigene Beispiele.
- Fehlersuche: Seiten 345/366 liefern geplante Tests, Sollbeobachtungen und
  Dokumentation. Sicherheitsquiz 00228 und Projektantrag S. 303 wurden aus
  der Zuordnung entfernt. Die Diagnoseschleife ist eigenständig formuliert.
- Werkzeuge: IT-Basiswissen, Chunk 00175. Nicht passende VoIP-Rechnung und
  Sicherheitsquiz entfernt. Microsoft-, Linux- und OpenBSD-Dokumentationen
  ergänzen konkrete Werkzeugdetails; es wurden keine fremden Ziele getestet.
- Wireshark: ITLF10–12, Seiten 185/240/257; offizielle Dokumentation ergänzt
  Filterwirkung, Ansichten und Grenzen von TCP-Analysehinweisen. Eigene
  Paketfolge statt originaler Buchaufgabe oder vertraulichem Mitschnitt.
- SPAN: Seite 257 nur als Kontext für Paketanalysatoren. STP-Portrollen auf
  S. 366 sind kein SPAN-Beleg und wurden samt Grafikkandidat entfernt.
  Cisco und Wireshark liefern den direkten fachlichen Ergänzungsbeleg.
- Netzdokumentation: Seiten 345/378. DHCP- und SIP-Stellen nicht als Belege
  für Dokumentationsstruktur verwendet. Eigener Druckerumzug; Geheimnisse
  bleiben außerhalb allgemein geteilter Netzpläne.

Verlinkte Primärdokumentationen am 13.09.2026 gelesen. Originaltexte und
Buchgrafiken verbleiben in der privaten Wissensbasis. Öffentlich erzeugte
Texte, Fallbeispiele und zwölf SVGs sind eigene didaktische Bearbeitungen.

## Didaktik

Jede Einheit: Diagnose ohne Abschlusswirkung, Erklärung, zwei Visualisierungen,
durchgearbeitetes Beispiel, Übungsfrage, tastaturbedienbare Sortierung, drei
Abrufkarten, Selbsterklärung und zwei verpflichtende Lernzielnachweise.
Antwortpositionen variieren. Fehler erklären eine konkrete Fehlvorstellung.
Trendplanung und SPAN verlangen selbst eingegebene Zahlen. MathML stellt
die Rechenmodelle mit Größen und Annahmen dar. Alle übrigen Pflichtnachweise
verlangen eine Entscheidung in einem neuen Szenario.

## Gestaltungs-Lock

Bestehende OSI-Lernseite vor Umsetzung im Browser als Vergleich angesehen.
Refero-Doppler erneut abgerufen; keine neue Designrichtung. `DESIGN.md` und
der vorhandene Doppler/Astro/n8n-Lock bleiben verbindlich.

| Entscheidung | Grundlage | Umsetzung |
|---|---|---|
| Lesefläche und Typografie | Bestehende Lernvorlage, Doppler | Gemeinsame Tokens und Inter unverändert |
| Hintergrund und Bewegungssteuerung | Astro/n8n-Lock | Keine zusätzlichen Effekte |
| Messpunkt und Aussagegrenze sichtbar machen | Lernfälle und Nutzerwunsch | Eigene beschriftete Modelle und SPAN-Topologie |
| Rechnen statt Ergebnisse erkennen | Lernziele | Numerische Felder und MathML |
| Begründung vor Lösung | Lernmodul-Vertrag | Abruf, explizite Prüfung und Neuversuch |

## Prüfungen

`npm test` prüft Compiler, Inhalte, Quellenpipeline, Publish-Allowlist und
Fortschrittszusammenführung. `verify-n8-browser.mjs` deckt jetzt alle 14
N8-Einheiten ab: Fehlantworten, Pflichtziel-Gates, Zahlen, Speicherung,
Rücknahme, Sortierung und Karten per Tastatur, 390/1440px und beide Themes.
Lokale Aufnahmen werden nicht veröffentlicht.

Ergebnis: `npm test` und die komplette Browsersuite erfolgreich. Nach der
SPAN-Topologieergänzung wurden Build, statische Tests und alle N8-Browsertests
erneut erfolgreich ausgeführt. Die sechs neuen Seiten wurden anhand lokaler
Aufnahmen visuell kontrolliert, mit 390/1440px und beiden Themes als
Prüfmatrix; Formeln und SPAN-Topologie zusätzlich gezielt auf Mobilgeräten.
Breite Diagramme nutzen den bestehenden beschrifteten Scrollbereich.

Als Nächstes stehen die sechs Kernthemen von GA2-9 an. Der Rest von GA1 und
WiSo ist durch diesen Batch nicht abgedeckt.

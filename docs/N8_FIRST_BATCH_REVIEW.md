# N8: Verfügbarkeit und Monitoring, erster Batch

Stand: 2026-09-13. Acht Einheiten für `ga2-8__0` bis `ga2-8__7`, KW 44.
Kanonische Inhalte: `content/learning-units/*.unit.json`.
Status bleibt `CURATED_DRAFT`; menschliche Fach- und Verständlichkeitsfreigabe
steht aus. N8 umfasst 14 Kernthemen, dieser Batch deckt die ersten acht ab.

## Inhalt und Quellenkorrekturen

- Redundanz: EUROPA 00356/00873/01079. Trassen, gemeinsame Versorgung,
  Schleifenfreiheit und Restkapazität getrennt; N+1 ist ein eigener Modellfall.
- VRRP/HSRP: EUROPA 00359/00877 plus RFC 9568 und Cisco Preempt/Track.
  Aktuelle Active-Terminologie erklärt; WAN-Tracking, Preemption und fehlende
  NAT-/Firewall-Zustandssynchronisation nicht miteinander verwechselt.
- Verfügbarkeit: ITLF6–9 00243 liefert den direkten Zeitrechenbezug, ITLF10–12
  S. 49 den HA-Kontext. Der Speicherangebotstreffer 00220 wurde entfernt.
  NIST-Reihen-/Parallelmodelle ergänzen die unabhängige UND-/ODER-Logik.
  Zuverlässigkeit und Verfügbarkeit werden ausdrücklich unterschieden.
- SPOF: ITLF10–12 S. 53/67/165. Dienstgrenze, Hilfsdienste, gemeinsame Hosts
  und zeitweise verdeckende Caches werden geprüft.
- USV: EUROPA 00218/00725 plus APC-Auswahlhilfe. S. 311 aus ITLF10–12 ist
  Schulungsplanung und wurde aus der Zuordnung entfernt. Keine pauschalen
  Hersteller-Umschaltzeiten, Laufzeit- oder Temperaturzusagen übernommen.
- SLA: ITLF6–9 00243 und EUROPA 00740; eigene Zeitbeispiele. Pönale nur
  begrifflich mit § 339 BGB eingeordnet; keine Klausel rechtlich freigegeben.
- Monitoring: ITLF10–12 S. 107–109 plus RFC 3416/3414/7011/5424. MIB/OID,
  Wert, Trap/Inform, Flowdaten und Ereignisse getrennt erläutert.
- Messwerte: ITLF10–12 S. 109/190 plus RFC 3393/2680. S. 51 (Skalierung)
  ist kein direkter Messbeleg. Richtung, Einheit, Messfenster und Zählerreset
  sind explizit Teil der Aufgaben.

Web-Primärquellen wurden am 13.09.2026 geprüft und sind in den Einheiten
verlinkt. Private Quellenausschnitte und Originalgrafiken bleiben privat.

## Didaktischer Nachweis

Jede Einheit enthält Diagnose, Erklärung, eigenes Modell, vollständiges
Beispiel, Übung, tastaturbedienbare Sortierfolge, drei Abrufkarten,
Selbsterklärung und verpflichtende Transfernachweise.

Verfügbarkeit besitzt vier Ziele: Modell, Ausfallzeit, Reihe, Parallelität.
Messwerte besitzen drei: Interpretation, Auslastung, Verlust. Die übrigen
Einheiten besitzen zwei Ziele. Jedes Ziel hat genau einen Pflichtnachweis.
Zahlen werden eingegeben, Fehlwerte erhalten erklärendes Feedback.
Formeln sind semantisches MathML mit Einheiten und Annahmen.

## Gestaltungsentscheidungen

Build-Target: bestehende Lernseite `/lernen/osi-model/`, vor Umsetzung bei
1440px im Browser angesehen. Kein Redesign von Navigation, Shell oder Tokens.
Refero-Doppler erneut recherchiert; bestehende Astro-/n8n-Rollen beibehalten.

| Entscheidung | Quelle / Rolle | Umsetzung |
|---|---|---|
| Dunkle lesbare Arbeitsflächen, Inter und feine Kanten | DESIGN.md, Doppler | Bestehende Vorlage und Tokens |
| Atmosphäre hinter den Inhalten | Astro-/n8n-Referenz-Lock | Keine neue dekorative Ebene |
| Echte Abhängigkeiten visualisieren | Nutzerwunsch und Lernmodul-Vertrag | Redundanz-, VIP- und SPOF-Topologien |
| Rechnung erklären statt Ergebnis anbieten | Lernziele und Formelvorgabe | MathML und numerische Transferfelder |
| Erst Versuch, dann Rückmeldung | Bestehender Lerncompiler | Explizite Neuversuche und Pflichtziele |

## Prüfroutine

`npm test`: Build, Site-Allowlist, Compiler, Quellenbatch, Lerninhalte und Merge.
`npm run test:browser`: bestehende Navigation/Theme/Lernen/Atmosphäre plus
`verify-n8-browser.mjs`. N8 prüft falsche und richtige Antworten, alle
Pflichtziele, Dezimalkomma, Persistenz, Abhaken/Rücknahme, Sortierung und Karten
per Tastatur sowie 390/1440px in beiden Themes. Screenshots können lokal mit
`AP2_N8_CAPTURE=1` erzeugt werden; sie werden nicht veröffentlicht.

Nächster Batch: Kapazitätstrends, systematische Fehlersuche, Diagnosewerkzeuge,
Wireshark, SPAN und Netzdokumentation.

Ergebnis: Beide Testsuiten erfolgreich. Die Diagramme aller acht Einheiten
wurden anhand lokaler Browseraufnahmen geprüft, einschließlich mobiler und
heller Ansichten. Formeldarstellung für Verfügbarkeit, USV, SLA und Messwerte
visuell kontrolliert. Zu lange Diagramm-Kurzlabels wurden gekürzt; die
vollständigen Fachbegriffe bleiben im Begleittext erhalten. Breite Diagramme
nutzen auf Mobilgeräten den bestehenden horizontalen Scrollbereich.

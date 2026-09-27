# Netzwerksicherheit: Kernthemen 6–12

Stand: 2026-09-12. Sieben zusätzliche Einheiten, Status `CURATED_DRAFT`.

## Umfang

NAC/802.1X, ACL versus Firewall, Reverse Proxy/WAF/Load Balancer,
Netzwerkangriffe, Gegenmaßnahmen, sichere Netzprotokolle und
Netzwerkprotokollierung/Datenschutz. Zusammen mit den ersten sechs Einheiten
ist `ga2-7` vollständig angelegt. Eine menschliche Fachfreigabe steht aus.

## Quellenentscheidungen

- Private Batch-Auszüge `ga2-7-006-012` wurden gezielt geprüft, keine Bücher
  oder Buchgrafiken in die öffentliche Ausgabe kopiert.
- NAC: ITLF10–12 S. 217; physischer Link und logische Freigabe getrennt.
  IHK-Bonn 00278 und der ESP-Grafikkandidat sind kein passender NAC-Beleg.
- ACL: EUROPA 01079. Allgemeine Verkabelungs-/Komponententreffer entfernt.
- Proxy: EUROPA 01038/00491; Backend-TLS bleibt ein eigener Abschnitt.
- Angriffe: ITLF6–9 00228 liefert Begriffe, nicht alle Detailmechanismen.
  ITLF10–12 S. 361 behandelt RSTP und wurde entfernt. Primärquellen ergänzen
  die Lücken; Geräteeigenschaften werden nicht als universell ausgegeben.
- Gegenmaßnahmen: ITLF10–12 S. 176 liefert den kombinierten Schutzansatz.
  Historische Ranglisten auf S. 275 sind kein aktueller Bedrohungsnachweis.
- Protokolle: ITLF10–12 S. 32/121/243 plus RFC 6797. SFTP ist nicht FTPS;
  TLS-Portnummern ersetzen keine Gegenstellenprüfung.
- Datenschutz: S. 78–79 und Proxy-Kontext S. 189 plus DSGVO und BetrVG.
  Keine pauschale Logfrist oder alleinige Freigabe durch Datenschutzbeauftragte.
  Beispiel-Fristen dienen nur separat angenommenen Kapazitätsrechnungen.

Primärquellen mit Links sind in jeder betroffenen Einheit dokumentiert.

## Bestehende Gestaltung fortführen

Zielgruppe: AP2-Lernende; Ziel: Entscheidungen selbst begründen können.
Build-Target: bestehende Lernseiten, visuell an `/lernen/osi-model/`
kontrolliert; keine Änderung an Shell, Tokens oder Bewegung.

| Entscheidung | Grundlage | Umsetzung |
|---|---|---|
| Dunkle Lesefläche, Inter, Glasrahmen | DESIGN.md und Doppler-Referenz, erneut über Refero geprüft | Gemeinsame Vorlage unverändert |
| Atmosphäre nur hinter Inhalt | Bestehender Astro-/n8n-Referenz-Lock | Keine neue Dekoration |
| Reale Rollen und Datenwege darstellen | Lernmodul-Vertrag und Nutzerwunsch | Eigene NAC-/Proxy-Topologien und Ablaufgrafiken |
| Erst antworten, dann Feedback | Bestehender Lerncompiler und H5P-/Moodle-Entscheidungen im Vertrag | Diagnose, Quiz, sortierbare Schritte, Abruf und Karten |
| Rohspeicher selbst berechnen | Lernziel und Nutzerwunsch zu Formeln | MathML und numerische Eingabe statt Ergebnis-Auswahl |
| Abschluss an Nachweise binden | Lernmodul-Vertrag | Genau ein Pflichtnachweis je Lernziel |

## Prüfumfang

Build, Schema-/Compilerprüfungen, Quellen-/Batchprüfungen und Fortschrittsmerge.
Browsertests prüfen alle neuen Routen auf Erreichbarkeit über kanonische
Kernthemen, falsche Antworten, expliziten Neuversuch, Abschlussfreigabe nach
beiden Pflichtzielen und Persistenz. Die Kapazitätsaufgabe weist 12 MB zurück
und akzeptiert 120 MB. Beide Themes werden mobil auf Seitenüberlauf,
Diagrammanzahl und scrollbare breite Tabellen geprüft.

Visuelle Vergleichsbasis: 1440px, vorhandene OSI-Lernseite. Sichtprüfung der
NAC-/Proxy-Topologien und Logging-Formel sowie der breiten Maßnahmentabelle
bei 390px in beiden Themes. Keine neue Grafik übernimmt private Buchgestaltung.

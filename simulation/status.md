# Status: Prüfungssimulation

## Aktueller Stand

### Prüfung Sommer 2023 (GA2) – Analyse und Entwicklung von Netzwerken
- **Status**: Vollständig integriert (Aufgaben 1 bis 4, 100 Punkte).
- **Musterlösungen**: Alle Lösungen exakt an die offiziellen IHK-Lösungshinweise (`2023_1_GA2_Lösung.pdf`) angepasst.
- **Grafiken & Visualisierungen in der Auswertung**:
  - Alle Aufgabengrafiken (Gebäude-Verkabelung, LWL-Redundanz, DHCP-Ablauf) werden auf der Lösungsseite wieder eingeblendet.
  - Visuelle Lösungsgrafik für Aufgabe 1cb (die 3 LWL-Stecker mit angekreuztem `[X]`-Kästchen beim LC-Stecker wie im IHK-Lösungsbogen).
  - Beschriftete Ablauf-Lösungsgrafik für Aufgabe 1ba (DHCP Discover, Offer, Request, Ack).
  - Interaktive Anlage 1 (Netzwerkplan der Fahrguth GmbH) kann sowohl in der Simulation als auch direkt in der Auswertung jederzeit per Modal geöffnet werden.
- **Tabellen-Vergleich**:
  - Aufgabe 2aa: Strukturierte IPv4-Routentabelle mit hervorgehobenen Lösungswerten im direkten Vergleich zur Prüflingsantwort.
  - Aufgabe 1cc: Strukturierte Vergleichstabelle für STP vs. Link-Aggregation.

### Prüfung Sommer 2023 (GA1) – Konzeption und Administration von IT-Systemen
- **Status**: Vollständig integriert (Aufgaben 1 bis 4, 100 Punkte).
- **Musterlösungen**: Alle Lösungen exakt an die offiziellen IHK-Lösungshinweise (`2023_1_GA1_Lösung.pdf`) angepasst.
- **Aufgabenstruktur**:
  - Aufgabe 1 (26 Pkt): Server bereitstellen und administrieren – Serverkonfiguration (Tabelleneingabe), asymmetrische Verschlüsselung, Zertifikate, E-Mail-Sicherheit, Kompromittierungs-Symptome.
  - Aufgabe 2 (24 Pkt): Systeme skalieren und aktualisieren – USV-Typen mit SVG-Schaltskizzen (Online/Offline), Abkürzungen VFI/VFD/VI, Vor-/Nachteile Line-Interactive, Horizontale/Vertikale Skalierung, Blue-Green-Deployment mit SVG-Diagramm.
  - Aufgabe 3 (26 Pkt): Programmierung MONCPU – Programmentwurf vervollständigen (for-Schleife, if-Bedingung, MessageBox), UML-Beziehungstypen (Aggregation/Komposition), Task-Scheduler SCHTASKS-Befehl.
  - Aufgabe 4 (24 Pkt): Datensicherung – Inkrementell vs. differenziell mit SVG-Säulendiagrammen, SAN-Kapazitätsberechnung, RAID-6, Hot-Spare, RTO/RPO mit englischem Quelltext.

### Layout & Design-System
- Vollständige Angleichung an das AP2-Tracker Design-System („Das Kontrollpult", `DESIGN.md`).
- Schlichtes, ordentliches und organisiertes Interface mit Haarlinien, dezentem Dot-Grid-Hintergrund und Parität zwischen Light & Dark Mode.
- Fixierte Prüfungs-HUD-Leiste mit Echtzeit-Timer (Ampelfarben bei <15 min und <5 min), Schnellwahltasten für die Handlungsschritte und Sofort-Zugriff auf Anlage 1.
- Strukturierter 2-Spalten-Vergleich (Deine Antwort vs. offizielle IHK-Musterlösung) mit Badges und farblichen Hervorhebungen.
- Globale Top-Navigation (`.topnav`) und responsive Mobile-Navigation (`.bottomnav`) für nahtlose Integration in das Gesamtsystem.


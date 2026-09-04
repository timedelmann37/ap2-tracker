# Status: Prüfungssimulation

## Aktueller Stand
- **Prüfung Sommer 2023 (GA2)**: Vollständig integriert (Aufgaben 1 bis 4, 100 Punkte).
- **Musterlösungen**: Alle Lösungen exakt an die offiziellen IHK-Lösungshinweise (`2023_1_GA2_Lösung.pdf`) angepasst.
- **Grafiken & Visualisierungen in der Auswertung**:
  - Alle Aufgabengrafiken (Gebäude-Verkabelung, LWL-Redundanz, DHCP-Ablauf) werden auf der Lösungsseite wieder eingeblendet.
  - Visuelle Lösungsgrafik für Aufgabe 1cb (die 3 LWL-Stecker mit angekreuztem `[X]`-Kästchen beim LC-Stecker wie im IHK-Lösungsbogen).
  - Beschriftete Ablauf-Lösungsgrafik für Aufgabe 1ba (DHCP Discover, Offer, Request, Ack).
  - Interaktive Anlage 1 (Netzwerkplan der Fahrguth GmbH) kann sowohl in der Simulation als auch direkt in der Auswertung jederzeit per Modal geöffnet werden.
- **Tabellen-Vergleich**:
  - Aufgabe 2aa: Strukturierte IPv4-Routentabelle mit hervorgehobenen Lösungswerten im direkten Vergleich zur Prüflingsantwort.
  - Aufgabe 1cc: Strukturierte Vergleichstabelle für STP vs. Link-Aggregation.
- **Layout & Design-System**:
  - Vollständige Angleichung an das AP2-Tracker Design-System („Das Kontrollpult“, `DESIGN.md`).
  - Schlichtes, ordentliches und organisiertes Interface mit Haarlinien, dezentem Dot-Grid-Hintergrund und Parität zwischen Light & Dark Mode.
  - Fixierte Prüfungs-HUD-Leiste mit Echtzeit-Timer (Ampelfarben bei <15 min und <5 min), Schnellwahltasten für die Handlungsschritte und Sofort-Zugriff auf Anlage 1.
  - Strukturierter 2-Spalten-Vergleich (Deine Antwort vs. offizielle IHK-Musterlösung) mit Badges und farblichen Hervorhebungen.
  - Globale Top-Navigation (`.topnav`) und responsive Mobile-Navigation (`.bottomnav`) für nahtlose Integration in das Gesamtsystem.


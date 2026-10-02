# GA1: Netzwerkabsicherung im Systemkontext

Abgeschlossen am 03.10.2026: ga1-8__4, netzwerkabsicherung-systemkontext.
Status CURATED_DRAFT; menschliche Freigabe ausstehend. Keine Veröffentlichung.

## Umsetzung

Eigener Hafenwerk-Fall: VLAN/Segmentierung, DMZ, Paketfilter, Stateful Inspection, Anwendungsproxy, Host-/Netzwerkfirewall, IDS/IPS und NAC.
Eine Diagnose, vier verpflichtende Lernziel-Checks mit erklärendem Feedback, eine Transferaufgabe, sieben Tastatur-Abrufkarten.
Zwei technische SVG-Diagramme: logische Dienstarchitektur mit drei beschränkten Verbindungen und NAC-Zulassungsablauf.
Schema zeigt keine vollständige Verkabelung; Firewallkontrolle an Zonenübergängen ist in Beschreibung und Caption ausdrücklich erklärt. Antwortverkehr, Infrastrukturabhängigkeiten und administrative Wege sind abgegrenzt.
Keine Formel erforderlich.

## Belege und Grenzen

Direkt gelesen am 02.10.2026: NIST SP 800-41 Rev. 1, PDF-Text zu Stateful Inspection und DMZ; OWASP Network Segmentation; Cisco NAC; Suricata IPS Concept.
NIST ist eine Grundlagenpublikation von 2009, keine neue Produktvorgabe. Suricata latest ist Entwicklungsdokumentation 9.0.0-dev; keine Installationsanleitung oder Versionsfreigabe.
Private Buchquelle europa-integratoren-2026:00350, Zeilen 3335–3340, als Themenanker Firewall/DMZ geprüft; keine Aufgaben oder Grafiken übernommen.
Eigene Beispiele und sichere Testplanung, keine Exploit-Anleitung oder unautorisierte Netzprüfung.

## Gestaltung und tatsächliche Prüfung

Refero-Direct-Build mit bestehendem Deep-Space-Lock: Doppler Lesefläche und Inter, Astro Atmosphäre, n8n dünne Verbindungen. Vergleich mit vorhandener TOM-Lerneinheit; gemeinsame Styles unverändert.

- npm run build und npm test bestanden.
- AP2_BROWSER_ONLY=system-network npm run test:browser bestanden; kein vollständiger Browser-Gesamtlauf behauptet.
- Falsche/richtige Antworten, Feedback, Reset, vier Abschlussgates, Diagnose ohne Gatewirkung, Transferfreigabe, sieben Enter-/Space-Karten, Reload-Persistenz und Abschlussumschaltung geprüft.
- 390/1440 Pixel, Dark/Light, Reduced Motion: SVG-Textgrenzen, Seitenüberbreite und mobile Diagrammverschiebung per Tastatur geprüft.
- Screenshots 1440-dark-figure-0, 390-light-figure-1, 1440-light-start und 390-dark-start tatsächlich visuell angesehen. Mobile Diagramme absichtlich horizontal verschiebbar.

Abdeckung nach Build: 215/380 Kernthemen mit Entwürfen. Keine Aussage über menschliche Freigabe.

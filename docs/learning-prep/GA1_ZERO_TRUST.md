# GA1: Zero Trust und Mikrosegmentierung

Abgeschlossen am 03.10.2026: ga1-8__5, zero-trust-mikrosegmentierung.
CURATED_DRAFT; menschliche Freigabe ausstehend. Keine Veröffentlichung.

## Inhalt und Quellen

Eigener Nordbogen-Fall: VPN versus Exportrecht, Rollen- und Gerätebedingungen, PE/PA/PEP, begrenzte API-Abhängigkeiten, alternative Endpunkte, Kontextänderung und definiertes Ausfallverhalten.
Eine Diagnose, vier verpflichtende Lernziel-Checks mit individuellem Feedback, Transferaufgabe mit eigener Antwort vor Musterlösung, sieben Tastatur-Abrufkarten.
Zwei native technische SVGs: Steuerablauf und gezielte Dienstwege. Kein ASCII, keine dekorativen Rasterbilder, keine künstliche Trust-Score-Formel.
Der Ablauf ist ausdrücklich keine Nutzdatenroute; Rückmeldung ist ausgeblendet. Dienstlinien zeigen nur Initiierungen, keine pauschalen gegenseitigen Rechte. Infrastruktur, Wartung und Antwortverkehr sind separat zu planen.

Direkt gelesen am 03.10.2026: NIST SP 800-207, relevante Passagen 2.1, 2.2 und 3; Microsoft Learn Zero Trust principles, outcomes und structured adoption journey (Seitenstand 31.05.2026).
NIST ist eine Grundlagenpublikation von 2020, kein aktueller Produktausrollplan.
CISA-Bekanntmachung 29.07.2025 nur über den offiziellen Suchindextext geprüft: Mikrosegmentierung begrenzt laterale Bewegung. Direkter Abruf 403 und PDF nicht abrufbar; kein vollständiger Leitfadenreview behauptet.
Privater Buchanker europa-integratoren-2026:00350, Markdown-Zeilen 3335–3340, direkt geprüft: angrenzende Firewall-/DMZ-Thematik. Kein Zero-Trust-Beleg aus dieser Passage behauptet; keine Aufgabe oder Grafik übernommen.

## Gestaltungsentscheidungen

Refero-Direct-Build im vorhandenen Deep-Space-System. Doppler bestimmt Inter und Lesefläche, Astro die vorhandene Atmosphäre, n8n dünne Verbindungen. Vergleichsbasis: vorhandene Netzwerkabsicherungsseite (1440-light-start angesehen). Keine gemeinsamen Styles oder Tokens geändert.
Technische Illustrationen und bestehende Diagnose-/Quiz-/Transfer-/Karten-Komponenten folgen dem Nutzerauftrag und dem bestehenden Referenz-Lock.

## Tatsächlich bestandene Prüfungen

- npm run build und npm test.
- AP2_BROWSER_ONLY=zero-trust npm run test:browser; kein Browser-Gesamtlauf behauptet.
- Falsche/richtige Antworten, Feedback, Reset, Diagnose ohne Abschlussgate, vier Lernzielgates, Transferfreigabe, sieben Enter-/Space-Karten, Reload-Persistenz, Abschlussumschaltung und erneute Sperre nach Reset.
- 390/1440 Pixel, Dark/Light, Reduced Motion: SVG-Text innerhalb ViewBox, keine Seitenüberbreite, mobile Diagrammverschiebung per Tastatur.
- Screenshots 1440-dark-figure-0, 390-light-figure-1, 1440-light-start und 390-dark-start tatsächlich angesehen. Mobile Diagramme absichtlich horizontal verschiebbar; Titel und Caption bleiben lesbar.

Abdeckung nach Build: 216/380 Kernthemen mit Entwürfen, GA1 108/164. Keine Aussage über menschliche Freigabe.


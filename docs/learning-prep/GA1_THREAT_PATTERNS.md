# GA1: Bedrohungen und Angriffsmuster

Abgeschlossen am 02.10.2026: ga1-8__2, bedrohungen-angriffsmuster.
Status: CURATED_DRAFT; menschliche Freigabe steht aus. Keine Veröffentlichung.

## Umfang

Eigenständiger Nordlager-Fall mit acht Bedrohungsarten, einer Diagnose, vier verpflichtenden Lernziel-Checks mit Antwortfeedback, einer Transferaufgabe mit verzögertem Lösungsvorschlag und acht Abrufkarten. Zwei technische SVG-Abläufe: möglicher Phishing-/Ransomware-Pfad und Trennung von SQL-Struktur und gebundenen Werten. Keine mathematische Formel erforderlich.

Beobachtung, Hypothese und belegte Ursache werden getrennt. Grenzen von HTTPS, Backups, Lastbeobachtung und Kontonachweisen werden ausdrücklich benannt. Keine Exploit-Payloads.

## Quellen und Grenzen

NIST CSRC: Phishing, Social Engineering, MITM, DDoS, Insider Threat und Zero-Day; OWASP SQL Injection Prevention Cheat Sheet; MITRE ATT&CK T1486. Relevante offizielle Passagen direkt gelesen; Quellen im Quellenregister und Einheitenbeleg verknüpft.

Privater Buchanker europa-integratoren-2026:00062, Zeilen 759–765, nennt Phishing und Ransomware. Keine Buchfrage, Lösung oder Grafik übernommen. CISA-Abrufe nicht erreichbar; keine erfolgreiche Lektüre behauptet.

## Tatsächlich geprüft

- npm run build bestanden.
- npm test bestanden.
- AP2_BROWSER_ONLY=threat-patterns npm run test:browser bestanden.
- Falsche Antworten, Feedback, Reset, vier Abschlussgates, Diagnose ohne Gatewirkung, Transferfreigabe, Tastaturkarte, Speicherung nach Reload und Abschlussumschaltung geprüft.
- 390 und 1440 Pixel, Dark/Light, Reduced Motion; keine Seitenüberbreite, SVG-Text innerhalb der Zeichenfläche, seitlich verschiebbare mobile Diagramme per Tastatur.
- Screenshots 1440-dark-figure-0, 390-light-figure-1, 1440-light-start und 390-dark-start visuell angesehen. Mobile Diagramme verwenden bewusst die gemeinsame horizontale Scrollfläche.
- Kein vollständiger Browser-Gesamtlauf behauptet; gezielter neuer Test in den Gesamtlauf eingebunden.

Gesamtabdeckung nach Build: 213/380 Kernthemen als vorhandene Entwürfe; keine Aussage über menschliche Freigabe.

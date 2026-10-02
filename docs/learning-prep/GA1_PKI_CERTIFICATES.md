# PKI, Zertifikate und Erneuerung

## Abgeschlossener Abschnitt

- Kernthema ga1-8__7, Einheit pki-zertifikate-erneuerung, 40 Minuten.
- Eigenständiger Brückenfeld-Fall: SAN-Namensfehler und erneuertes, aber noch nicht ausgeliefertes Zertifikat.
- Diagnose, vier verbindliche Lernziel-Checks mit individuellem Feedback, Abruftraining ab 180 Zeichen und sieben Tastaturkarten.
- Zwei native technische SVGs: Ausstellerbeziehungen und Erneuerungsnachweis. Keine dekorativen Rasterbilder oder ASCII-Grafiken. Keine Formel erforderlich.
- CURATED_DRAFT; menschliche Freigabe und Veröffentlichung stehen aus.

## Geprüfte Themenanker und Primärquellen

Private Wissensbasis europa-integratoren-2026:00491, Markdown-Zeilen 5031–5078: Zertifikatsverwaltung am Reverse Proxy direkt als Themenanker geprüft. Buchfall, Aufgaben und Abbildungen nicht übernommen; beschädigtes OCR-Layout nicht als fachlicher Nachweis verwendet.

Am 03.10.2026 direkt geprüfte Passagen:

- RFC 5280, 3.2, 4.1.1.3, 4.1.2, 4.1.2.5 sowie Ausschnitte aus 6: Zertifikatsfelder, CA-Signatur, Zeitintervall, Zertifikatspfad und Widerrufsverarbeitung. Keine vollständige Validierungsimplementierung aus dem RFC abgeleitet.
- RFC 9525: DNS-ID, subjectAltName und erwarteter Dienstname.
- RFC 8446, Abschnitt 2: zertifikatsbasierter TLS-1.3-Vollhandshake, CertificateVerify und abgeleitete Verkehrsschlüssel.
- EFF Certbot User Guide, Renewing certificates und deploy-hook: Erneuerung, Bereitstellung und Grenzen des Exitstatus.

URLs und genaue Verwendungsnachweise stehen in content/sources.json und der Einheit. Keine feste Zertifikatslaufzeit, universelle Online-CA-Abfrage oder automatische Vertrauenswirkung einer Selbstsignatur behauptet. TLS-Wiederaufnahme, PSK und vollständiger Backend-Schutz sind nicht Gegenstand dieses Abschnitts.

## Gestaltung und tatsächliche Prüfung

Bestehende Referenzbindung aus DESIGN.md, DEEP_SPACE_REFERENCE_LOCK.md und REFERO_COMPONENT_NOTES.md beibehalten: Doppler-Leseflächen, Astro-Hintergrund und n8n-artige klare Verbindungen. Keine neuen Tokens oder Layoutkomponenten eingeführt.

- npm run build: bestanden.
- npm test: bestanden.
- AP2_BROWSER_ONLY=pki, npm run test:browser: bestanden; kein vollständiger Browser-Gesamtlauf behauptet.
- Fokussierter Test prüft falsche/richtige Antworten, Feedback, Reset, Lernziel-Sperre, Recall, Enter/Space-Karten, Reload-Persistenz und Markierung/Rücknahme.
- 390 und 1440 Pixel, Dark/Light und Reduced Motion: geprüft; keine Seitenüberläufe, SVG-Texte innerhalb des Viewports; mobile Diagramme bewusst seitlich verschiebbar und per Tastatur geprüft.
- Screenshots unter C:/Users/timed/AppData/Local/Temp/ap2-pki-20261003. Tatsächlich angesehen: 1440-dark-figure-0, 390-light-figure-1, 1440-light-start, 390-dark-start.

Abdeckung nach Build: 218/380 Kernthemen zugeordnet, davon GA1 110/164. Das ist Entwurfsabdeckung, keine menschliche Freigabe.

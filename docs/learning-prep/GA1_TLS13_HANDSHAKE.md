# TLS 1.3: Handshake und Schlüssel

## Abgeschlossener Abschnitt

- ga1-8__8, tls13-handshake-schluesselableitung, 40 Minuten, CURATED_DRAFT.
- Eigenständiger Lumen-Fall mit getrennten Befunden für Angebot, Auswahl, Zertifikat, CertificateVerify und öffentliche Shares.
- Diagnose, vier verpflichtende Lernziel-Checks mit Feedback, interaktive Reihenfolgeübung, Recall ab 180 Zeichen und sieben Tastaturkarten.
- Zwei native technische SVGs: Nachrichtengruppen mit benannter Senderichtung und abstrahierte Schlüsselableitung. Keine dekorativen Rasterbilder, kein ASCII-Ersatz. Keine mathematische Formel verwendet.
- Modellgrenze: zertifikatsbasierter TLS-1.3-Vollhandshake mit ECDHE; keine vollständige Behandlung von TLS 1.2, PSK, 0-RTT, HelloRetryRequest oder Clientzertifikaten.

## Fachlicher Nachweis

Private Wissensbasis europa-integratoren-2026:00491 (Chunk-Zeilenbereich 5031–5078): Einleitung und TLS-/Schlüsselrollen-Abschnitt direkt als Themenanker geprüft. Buchfall, Aufgaben und Abbildungen nicht übernommen.

Am 03.10.2026 direkt geprüfte offizielle Passagen:

- RFC 8446: Abschnitt 2, Certificate und CertificateVerify in 4.4.2–4.4.3 sowie Key Schedule und Traffic Key Calculation in 7.1–7.3. Vollhandshake und getrennte Handshake-/Anwendungs-Secrets; keine eigene Kryptografieimplementierung.
- RFC 9525, 1.1–1.3: Clientprüfung des erwarteten Dienstnamens und SAN.
- MDN TLS: Schutzziele, Handshake und Serverauthentisierung.
- OpenSSL s_client: verify_return_error, verify_hostname und Vertrauensankeroptionen. Diagnosewerkzeuge können trotz angezeigtem Zertifikatsfehler weiterlaufen.
- Cloudflare TLS handshake: allgemeine Ziele und historische RSA-Darstellung. Letztere ausdrücklich nicht als TLS-1.3-Ablauf verwendet.

Quellen-URLs und Verwendungsnachweise sind in content/sources.json und der Einheit registriert. Die Katalogformulierung „Zertifikatsprüfung durch die CA“ ist in dieser Einheit fachlich präzisiert: Prüfung durch den Client, CA-Signatur als Nachweis. Keine pauschale Online-CA-Anfrage je Verbindung behauptet.

## Betroffene Interaktion repariert

Die fokussierte Prüfung fand einen bestehenden Fehler: Der generierte Reihenfolge-Reset hatte keinen Handler. assets/ap2-learning.js setzt jetzt die ursprüngliche Reihenfolge, Korrektheitsstatus und Versuche zurück, entfernt Feedback und speichert den zurückgesetzten Stand. Die Ausgangsreihenfolge wird vor dem Laden einer gespeicherten Sortierung erfasst. Andere Interaktionsarten unverändert.

## Gestaltung und tatsächliche Prüfung

Refero-Routine mit bestehendem Build-Target: Doppler-Leseflächen, Astro-Hintergrund und klare n8n-artige Verbindungen aus DESIGN.md, DEEP_SPACE_REFERENCE_LOCK.md und REFERO_COMPONENT_NOTES.md. Keine neuen Design-Tokens oder Rahmenkomponenten. Vergleich anhand der vorhandenen PKI-Lernseite.

- npm run build und npm test bestanden, nach Reset-Reparatur erneut geprüft.
- AP2_BROWSER_ONLY=tls13 npm run test:browser bestanden; kein vollständiger Browser-Gesamtlauf behauptet.
- Falsche/richtige Quizantworten, Feedback, Lernziel-Sperren und Reset, Recall, Enter/Space-Karten, Persistenz sowie Markierung/Rücknahme geprüft.
- Reihenfolge: falsche Anordnung, Korrektur per Enter/Hoch, korrekter Nachweis, Reload-Persistenz, Reset, Feedbackentfernung und erneuter Reload geprüft.
- Mobile 390px und Desktop 1440px in Dark/Light mit Reduced Motion; Seitenüberläufe, SVG-Textgrenzen und Tastaturverschieben der mobilen Diagramme geprüft.
- Screenshots: C:/Users/timed/AppData/Local/Temp/ap2-tls13-20261003. Tatsächlich angesehen: 1440-dark-figure-0, 390-light-figure-1, 1440-light-start, 390-dark-start, 390-light-sequence, 1440-dark-sequence.

Abdeckung: 219/380 zugeordnete Kernthemen, GA1 111/164. Entwurfsabdeckung ist keine menschliche Freigabe. Kein Push oder Deployment.

# GA1: Technik mit dem Szenario verknüpfen

Stand 03.10.2026. Kernthema ga1-11__18, Website: /lernen/technik-mit-szenarioanforderungen-verknuepfen/. CURATED_DRAFT bis menschliche Fachfreigabe.

## Quellen und fachliche Grenzen

Private Buchquelle europa-integratoren-2026:00019, Zeilen 284–296 direkt gelesen: IST/SOLL, Alternativen und begründete Entscheidungen. Nur Themenanker, kein Buchfall übernommen.

Aktuelle Primärdokumentation direkt gelesen:
- Microsoft Remote Desktop Services – Access from anywhere: https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/rds-plan-access-from-anywhere . Gateway-Tunnel, Authentifizierung und Richtlinien.
- Microsoft RD Gateway mit Entra MFA/NPS: https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-nps-extension-rdg . Authentication Flow, RD CAP/RD RAP, Voraussetzungen und Grenzen unterstützter MFA-Verfahren.

Eigener Fall Planwerk Süd: CAD-Support darf von außen nur CAD-01 erreichen, mit zweitem Faktor; kein direkter externer RDP-Zugang auf die Zielsysteme. Verfügbarkeit einer unterstützten Integration ist ausdrücklich Falldatum, kein pauschales Installationsversprechen. Authentifizierung, Ressourcenautorisierung, Zielrechte und Transport werden getrennt. Keine pauschale Sicherheitsgarantie.

Die Einheit übt Zuordnung, konkreten Nutzen und Positiv-/Negativtests. Es handelt sich um eine didaktische Abnahmeplanung, nicht um tatsächlich ausgeführte Tests einer RD-Gateway-Infrastruktur.

## Gestaltung und Umsetzung

Refero-Skill und Deep-Space-Referenz-Lock fortgeführt: vorhandene Leseflächen, lokale Inter und neutrale Nebenaktionen. Keine neue gemeinsame UI. Technische SVG zeigt Anforderung, Eigenschaft, Nutzen und Prüfung; auf Mobile beschriftet horizontal scroll- und tastaturbedienbar. Für den qualitativen Auftrag keine Formel erforderlich.

Eine Diagnose ohne Pflichtzielwirkung, drei Pflicht-Quiz mit erklärendem Feedback, Reparaturübung, freie Transferantwort mit zunächst gesperrtem Muster sowie drei Lernkarten. Freitext wird nicht automatisch fachlich benotet.

## Tatsächlich geprüfter Abschluss

- npm run build: bestanden, 799 Dateien.
- npm test: vollständig bestanden.
- AP2_BROWSER_ONLY=scenario-link npm run test:browser: bestanden.
- Geprüft: falsche/richtige Antworten, Feedback, Reset, Abschluss-Sperre, Diagnose ohne Freigabe, Recall vor Muster, Enter/Space auf Karten, Reload-Persistenz, Abschluss und Rücknahme.
- 390/1440 Pixel jeweils Dark/Light: Screenshots für Einstieg, Quiz, Transfer und Grafik erzeugt; diese Ansichten visuell kontrolliert, Grafik in beiden Themes kontrolliert. Kein seitlicher Seitenüberlauf oder JavaScript-Seitenfehler; SVG-Texte innerhalb des Canvas. Evidenz: C:/Users/timed/AppData/Local/Temp/ap2-scenario-20261003/.
- Lokaler Signed-in-Testfixture, keine echten Kontoschreibvorgänge. Unveränderte gemeinsame Navigation/Bewegung nicht als erneut vollumfänglich geprüft ausgegeben.

Abdeckung: insgesamt 253/380, GA1 145/164. Nur beabsichtigte lokale Änderungen gesichert. Keine Veröffentlichung, kein Push, keine menschliche Fachfreigabe.

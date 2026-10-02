# ga1-8__10: Authentifizierung, MFA, Passkeys und Passwortmanager

Stand: 03.10.2026. CURATED_DRAFT; menschliche Freigabe ausstehend.

## Abgeschlossener Abschnitt

Eigenständiger Kantenwerk-Fall: Passwortregel, zwei Wissensabfragen, OTP-
Weiterleitung, Passkey-Schlüsselrollen und verlorenes Telefon. Eine Diagnose,
vier verpflichtende Lernziel-Checks mit spezifischem Feedback, Transferabruf
vor Musterlösung und sieben tastaturbedienbare Karten. Zwei technische SVGs
zeigen vereinfachte Passkey-Anmeldung und kontrollierte Verlustbehandlung.

## Quellen und Grenzen

Direkt gelesene Primärpassagen vom 03.10.2026:

- NIST SP 800-63B-4 Authenticators: 3.1.1 und 3.2.5.
- NIST Implementation FAQs: Passwortregeln und Passwortmanager.
- NIST Assurance Levels: AAL2 und verschiedene Faktoren.
- FIDO Passkeys FAQ: Schlüsselpaare, lokale Prüfung, synced/device-bound,
  User Verification.
- W3C WebAuthn Level 2: Abschnitt 1 und Assertion-Signatur 6.1/6.3.3.
- NIST Event Management: 4.2 und gespeicherte Recovery-Codes.

URLs und Locator stehen in Sources und Unit-Curation. NIST ist ein benannter
Referenzrahmen, keine pauschale deutsche Rechtsvorgabe. Kein AAL-Nachweis und
keine produktive WebAuthn-Implementierungsprüfung behauptet. Der Passkey-Fall
setzt Registrierung voraus und verlangt User Verification; Synchronisation
und Ersatzwege bleiben separate Sicherheitsaufgaben.

Private Buchquelle europa-integratoren-2026:00491, Zeilen 5031–5078: Absatz
über Zwei-Faktor-Authentisierung als Themenanker gelesen. Kein Buchfall,
keine Frage und keine Abbildung übernommen. CISA-Seiten waren beim direkten
Abruf nicht zugänglich und werden nicht als gelesene Evidenz geführt.

## Gestaltung

Bestehende Referenzbindung und Vergleichs-Lernseite beibehalten: Doppler-
Leseflächen, Astro-Hintergrund, n8n-artige präzise Linien. Gemeinsame SVG-Flow-
Komponenten ohne neue Palette oder Layoutänderung. Keine dekorativen Raster-
bilder oder ASCII-Darstellung. Keine Formel für das qualitative Modell nötig.

## Tatsächliche Prüfung

- npm run build und npm test bestanden.
- AP2_BROWSER_ONLY=authentication npm run test:browser bestanden.
- Diagnose ohne Gate, falsche Antworten, erklärendes Feedback, Quiz-Reset,
  vier Pflichtziele, Reload-Persistenz, Abschluss und erneute Sperre geprüft.
- Eigener Abruf vor Musterlösung, sieben Karten per Enter/Space geprüft.
- 390/1440 Pixel in Dark/Light bei Reduced Motion: kein Seitenoverflow,
  Texte innerhalb der SVG-Fläche, seitliches Tastaturscrollen geprüft.
- Screenshots tatsächlich angesehen: 1440-dark-figure-0,
  390-light-figure-1, 1440-light-start, 390-dark-start unter
  C:/Users/timed/AppData/Local/Temp/ap2-auth-20261003.

Keine vollständige Browser-Gesamtsuite oder Veröffentlichung behauptet.
Coverage nach Build: insgesamt 221/380; GA1 113/164, verbleibend 51.

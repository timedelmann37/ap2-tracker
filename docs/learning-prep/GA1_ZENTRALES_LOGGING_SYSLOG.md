# GA1: Zentrales Logging mit Syslog

Abgeschlossen am 03.10.2026; Kernthema `ga1-10__2`, `CURATED_DRAFT`.

## Inhalt und Belege

Eigener Talbogen-Fall: Logweg, eindeutiges Testereignis, Quell-/Empfangszeit,
begrenzt auswertbare Ereignisübersicht, Zweck, Datenfelder, Rollen,
vorgeschlagene Aufbewahrung und vollständige Löschprüfung.
Eine Diagnose, vier verpflichtende Lernziel-Checks mit Feedback,
Transfer mit eigener Eingabe vor Musterlösung, sieben Tastaturkarten,
zwei technische SVG-Entscheidungsketten. Keine produktive Konfiguration.

- [RFC 5424](https://www.rfc-editor.org/rfc/rfc5424.html): Sections 1, 3, 6
  direkt gelesen; Rollen, Nachrichtenformat und Abgrenzung zur Speicherplanung.
- [RFC 5425](https://www.rfc-editor.org/rfc/rfc5425.html): 4.1/4.2 und 6.3
  direkt gelesen; TLS-Transport, Port 6514 und Zustellungsgrenzen.
  Keine Übernahme historischer Cipher-Vorgaben als aktuelle Empfehlung.
- [EU-Kommission](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en):
  Overview, Data minimisation, Storage limitation und Integrity/confidentiality
  direkt gelesen. EUR-Lex-Abrufe lieferten hier keinen lesbaren Normtext;
  daher keine Behauptung direkter Normlektüre. Sieben/dreißig Tage bleiben
  eigene didaktische Vorschläge, keine allgemeine Rechtsfreigabe.
- Privater Themenanker `europa-integratoren-2026:00038`, Zeilen 443–468
  direkt gelesen: Systemverhalten bewerten, Tests dokumentieren.
  Keine Buchaufgaben oder Portalaufgaben übernommen.
- `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md`: eigene Fälle, Messdaten als Befunde
  statt automatisch bewiesene Diagnose.

## Design und tatsächlich abgeschlossene Prüfung

Bestehenden Refero-Lock fortgeführt: Doppler-Lesepanels/Inter,
Astro nur Hintergrundatmosphäre, n8n nur technische Verbindungen.
Vergleichsbasis: zuletzt geprüfte Kennzahlen-Lernseite und deren Screenshot.
Keine neue Shell, keine dekorativen Rasterbilder, keine ASCII-Grafiken.

- `npm run build`: bestanden.
- `npm test`: bestanden.
- `AP2_BROWSER_ONLY=central-logging npm run test:browser`: bestanden.
  Kein Browser-Gesamtsuitenlauf behauptet.
- Neuer separater `scripts/verify-central-logging-browser.mjs`:
  Diagnose ohne Zielgutschrift, falsche/richtige Antworten, Erklärfeedback,
  Ziel-Sperren/Reset, Recall-Eingabe vor Muster, Enter/Space auf sieben Karten,
  Persistenz, Abschluss/Rücknahme und erneute Sperre.
- 390/1440 Pixel, Dark/Light, Reduced Motion: keine Seitenüberbreite,
  SVG-Texte innerhalb der Zeichenfläche. Mobile Diagramme sind bewusst
  seitlich scrollbar, mit Hinweis und geprüfter Tastaturbedienung.
- Screenshots in allen vier Zuständen erzeugt. Visuell betrachtet:
  Desktop Dark-Logweg, Mobile Light-Lebenszyklus, Desktop Light-Einstieg,
  Mobile Dark-Einstieg. Hierarchie, Kontrast und Quellenrollen erhalten.

Prüfbilder: `C:/Users/timed/AppData/Local/Temp/ap2-zlog-20261003/`.
Coverage: insgesamt 229/380, GA1 121/164, 43 GA1-Kernthemen verbleiben.
Keine menschliche Fachfreigabe, kein Push und keine Veröffentlichung.

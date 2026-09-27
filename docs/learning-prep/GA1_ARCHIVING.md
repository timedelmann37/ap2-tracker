# Archivierung – Lernentwurf

Stand: 18.09.2026. `ga1-3__12`, `CURATED_DRAFT`; menschliche Freigabe offen.

## Quellenprüfung

- Buchbatch `ga1-3-012-012`: OCR-Ausschnitt ITLF10–12 PDF-Seite 79 thematisch genutzt; gekürzten Text nicht als vollständige Seitenlektüre gewertet. Prüfsummen nicht mit fachlicher Richtigkeit gleichgesetzt.
- Europa-Auszug mit pauschaler Lieferscheinfrist nicht übernommen: § 147 Abs. 3 AO enthält Sonderregeln. Offene Referenz `ihk-bonn:00389` bleibt offen. Keine Buchabbildung übernommen.
- [§ 147 AO](https://www.gesetze-im-internet.de/ao_1977/__147.html), Absätze 1–4 am 18.09.2026 gelesen. Dokumentarten, Jahresende und Ausnahmen berücksichtigt. Keine individuelle Löschfreigabe.
- [BMF-GoBD-Handbuch](https://ao.bundesfinanzministerium.de/ao/2025/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-33/inhalt.html), ausgewählte Rz. 58–60, 107–111, 150–151, 179–181 gelesen. Handbuch nennt Textstand März 2024. [Änderungsmitteilung Juli 2025](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.html) zusätzlich festgestellt. Keine vollständig konsolidierte Rechtsprüfung behauptet; juristische Fachprüfung bleibt vor Freigabe erforderlich.
- [IBM HSM 7.1.8](https://www.ibm.com/docs/en/tsmfsm/7.1.8?topic=overview-space-management-client): Volltext im Suchindex gelesen, nachdem direkte IBM-Seiten Fehler lieferten. Historisches Funktionsmodell, keine aktuelle Produktkonfiguration. Migration, Stub und Recall von Backup getrennt.

## Eigene Didaktik und Grenzen

Planungsbüro-Fälle: Korrekturstand erhalten, Vorgang auffinden, ausgelagerten Inhalt wirklich abrufen, Löschsperre prüfen. Zwei eigene Grafiken, Zahlenübung, Reihenfolge, eigene Erklärung, drei Abrufkarten und zwei Pflichtziele. HSM ausdrücklich als Hierarchical Storage Management erläutert, nicht Hardware Security Module.

Fristrechnung ausschließlich als Modell: Ende 2026 plus acht volle Jahre endet am 31.12.2034; früheste anschließende Freigabeprüfung ab 01.01.2035. Übung: Ende 2027 plus sechs volle Jahre endet 31.12.2033. Keine reale Löschanweisung. MathML stellt die Rechenbeziehung grafisch dar.

## Nachweise

- `npm test` erfolgreich, nach Korrektur erneut vollständig ausgeführt.
- Gezielter Playwright-Test `scripts/verify-archive-browser.mjs` erfolgreich: Fehlerfeedback, Wiederholung, Tastatur, Zahlenantworten, Reihenfolge, Erklärung/Persistenz, Karten, Pflichtziel-Sperre, Abschluss/Rücknahme.
- Erstlauf fand mobilen Überlauf im eigenen Textprotokoll. Zeilen gekürzt, neuer Build und Browserlauf bestanden.
- Screenshots bei 390/1440 px, Dark/Light: Formel, Protokoll und Grafiken gesichtet. Bestehende seitlich verschiebbare Grafiken beibehalten. Kein Seitenüberlauf.
- Gemeinsamer Renderer unverändert. Keine vollständige Browserregression aller Einheiten behauptet.

Abdeckung: 139/380, GA1 31/164. Speicherlösungen jetzt 13/13 Lernentwürfe, nicht 13 fachlich freigegebene Kapitel. Nur lokale Sicherung, kein Push oder Deployment.

Nächster sinnvoller Anschluss: Backup/Recovery, zunächst RTO/RPO `ga1-4__4` als Grundlage für Szenarioentscheidungen.

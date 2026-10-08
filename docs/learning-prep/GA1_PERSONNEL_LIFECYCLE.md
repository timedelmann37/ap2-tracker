# GA1-7__6: Berechtigungen bei Personalereignissen

Stand: 02.10.2026. Lokal im Branch `codex/ga1-linux-admin` umgesetzt.

## Fertiger Abschnitt

Kanonische Spezifikation:
`content/learning-units/berechtigungsprozesse-personalwechsel-vertretung.unit.json`.
Lernseite: `/lernen/berechtigungsprozesse-personalwechsel-vertretung/`.

- Eigenständiger Fall mit Eintritt, internem Wechsel, Austritt und Vertretung;
  genehmigter Zweck, Umfang und Zeitpunkt werden getrennt behandelt.
- Diagnose ohne Abschlusswirkung, drei geführte Auswahlübungen,
  ausfüllbare 2×2-Rechtematrix, sechs Abrufkarten und freie Selbsterklärung.
- Vier verpflichtende Nachweise: Eintritt, gezielter Entzug beim Wechsel,
  sortierbare Entzugs-/Nachweisphasen und exklusive Vertretungs-Endgrenze.
- Drei deklarativ erzeugte technische SVGs mit Textalternativen.
  Keine dekorativen Rasterbilder, keine ASCII-Grafik und keine kopierte
  Buchabbildung. Hier ist keine mathematische Formel erforderlich.
- `CURATED_DRAFT`: menschliche Fach- und Verständlichkeitsfreigabe steht aus.

Der Build verknüpft die Einheit mit `ga1-7__6` und aktualisiert Manifest,
Katalog und Abdeckung. GA1 hat jetzt 100/164 technische Lernentwürfe,
insgesamt sind 208/380 Kernthemen abgedeckt. Die nächste offene Einheit in
dieser Gruppe ist `ga1-7__7` (privilegierte Zugänge).

## Fachliche Grundlage und Grenzen

- [NIST SP 800-53 Rev. 5](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf):
  AC-2(c–f, h–l), PS-4 und PS-5 direkt im offiziellen PDF gelesen. NIST ist
  ein Kontrollkatalog, keine pauschale gesetzliche Frist. Die hier gezeigte
  Fallfolge behauptet keine Pflicht zur seriellen Ausführung aller Sperren.
- [Microsoft: Lifecycle Workflows](https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows):
  Joiner/Mover/Leaver im offiziellen Suchindex geprüft. Direkter Abruf
  scheiterte; keine Produkt-Task- oder Lizenzdetails übernommen.
- [Microsoft: Revoke user access](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access):
  Konto, Token und Anwendungssitzung direkt gegengeprüft. Keine universelle
  Sofortwirkung oder Token-Laufzeit aus dem Produktbeispiel abgeleitet.

Die ergänzende Free-Worker-Extraktion der privaten ITLF10–12-PDF-Seiten
204/205 scheiterte mit `provider_exhausted / catalog_unavailable`, ohne
Provider-Versuch und ohne validiertes Ergebnis. Keine erneute Extraktion
als OpenAI-Fallback und keine neuen Buchbelege aus diesem Auftrag verwendet.
Die Einheit stützt ihre fachlichen Aussagen unabhängig auf die genannten
Primärquellen. Namen, Zeitpunkte, Aufgaben, Rechteprofile und Diagramme sind
eigene Lehrfälle; Sperre, Übergabe und Datenbereinigung bleiben getrennt.

## Design- und Interaktionsentscheidungen

Build-Target ist das bestehende Lernsystem nach `DESIGN.md` und
`docs/DEEP_SPACE_REFERENCE_LOCK.md`: Doppler trägt Glasflächen und
Typografie, Astro nur die Atmosphäre, n8n die zurückhaltenden Verbindungen.
Gemeinsame Widgets und Farbsemantik bleiben unverändert. Die Diagramme
visualisieren Ereignisänderungen, Entzugsebenen und Zeitgrenzen; Tabellen
und breite SVGs bleiben auf Mobilgeräten innerhalb ihrer Fläche scrollbar.
Es gibt keine Änderungen an gemeinsamen Styles oder Lernruntime.

## Tatsächlich ausgeführte Prüfung

- `npm test`: bestanden, einschließlich Build, Site-Artefakte, Compiler,
  Quellenbatch, Lernkatalog/Abdeckung, Fortschrittsmerge und SQL-Prüfung.
- `AP2_BROWSER_ONLY=personnel-lifecycle node scripts/run-browser-tests.mjs`:
  bestanden. Prüft konkrete falsche/richtige Antworten, fehlende
  Abschlusswirkung von Diagnose und Übung, alle vier Pflichtnachweise,
  Rechtematrix samt fehlerhaftem Änderungsrecht und Reload, Tastatursortierung,
  freie Erinnerung vor Muster, Kartenbedienung, Persistenz,
  Abschluss/Rücknahme und erneute Sperre nach Reset eines Pflichtchecks.
- Browserprüfung bei 390/1440px in Dark/Light mit Reduced Motion:
  kein Seitenüberlauf, SVG-Texte innerhalb der Zeichenfläche, lesbare
  Beschriftungen und native seitliche Tastaturbedienung der Grafiken.
- Screenshots von Einstieg, drei Grafiken und Rechtematrix erzeugt;
  repräsentative Desktop-Dark-, Desktop-Light-, Mobile-Dark- und
  Mobile-Light-Aufnahmen tatsächlich visuell gesichtet.
- Der erste Browserlauf las den nativen Scrollzustand zu früh.
  Zustandsbasiertes Warten auf `scrollLeft > 0` behebt die Prüf-Race;
  die Produktoberfläche musste nicht geändert werden.

Die komplette ältere Browser-Suite wurde für diesen reinen Inhaltsabschnitt
nicht erneut ausgeführt; der neue Check ist für künftige Gesamtläufe
eingehängt. Kein Push und keine Veröffentlichung in diesem Abschnitt.

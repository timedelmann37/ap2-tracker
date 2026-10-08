# Arbeitnehmerüberlassung: Arbeitgeber, Gleichstellung und Tarifabweichung

Stand: 03.10.2026. Einheit: `wiso-2__3`.
Status: **CURATED_DRAFT**, menschliche Fachfreigabe ausstehend.

## Tatsächlich umgesetzt
- Eigener Fall Rima / Lunaro / Kedro, ausdrücklich rechtmäßige Überlassung.
- Verpflichteter Verleiher und Vergleichsmaßstab beim Entleiher getrennt.
- Equal Pay und weitere wesentliche Bedingungen einschließlich Urlaub; Urlaubstage,
  Urlaubsentgelt und zusätzliches Urlaubsgeld unterschieden.
- Tarifgrundlage nicht aus dem Branchenetikett abgeleitet; Grenzen nach § 8 Abs. 2–5.
- Neunmonatsfrist ausdrücklich für Entgeltabweichung; längere Abweichung nur unter
  besonderen gesetzlichen Voraussetzungen. Vorherige Einsätze beim selben Entleiher
  bei höchstens drei Monaten Unterbrechung berücksichtigt, auch bei anderem Verleiher.
- Diagnose, drei Pflicht-Lernzielprüfungen mit eigenem Feedback, Freitext-Selbstvergleich,
  drei Tastatur-Lernkarten, zwei native technische SVGs.
- Kein Rechenproblem, daher keine künstliche Formel; keine individuelle Urlaubsberechnung.

## Quellen und Grenzen
- [§ 8 AÜG](https://www.gesetze-im-internet.de/a_g/__8.html):
  Absätze 1–5 am 03.10.2026 direkt gelesen.
- [BMAS FAQ](https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Leiharbeit-Werkvertraege/FAQ-Leiharbeit/faq-leiharbeit.html):
  Artikelstand 09.10.2018. Rollen, Equal Pay/Gleichstellung und Arbeitgeberpflichten
  direkt gelesen und mit aktuellem § 8 abgeglichen. Historische Statistik,
  Sanktionspassagen und sonstige nicht geprüfte Aussagen nicht verwendet.
- Privater EUROPA-Rohtext im Hauptrepository, Zeile 9257: AÜG als Themenanker
  tatsächlich gelesen; veraltete Beispiele der Gesetzesliste nicht übernommen.
  Keine Buchfrage, Lösung oder Grafik kopiert.
- Ausbildung-in-der-IT-Quellenreview: Quellenrolle und Fallorientierung gelesen;
  Inventurzahlen sind kein Beleg fachlicher Vollständigkeit.
- Kein vollständiger Rechtscheck von Erlaubnis, Höchstdauer, illegaler Überlassung,
  konkreter Tarifgeltung oder individuellem Urlaubsanspruch. Keine aktuelle
  branchenspezifische Lohnuntergrenze behauptet.

## Korrektur des Themenankers
Der bisherige Titel behauptete pauschal, Entlohnung und Urlaub richteten sich nach
dem Einsatzbetrieb, „nicht nach dem Verleiher“. Das vermischte Vergleich und
Verpflichtung und ließ Tarifabweichungen unerwähnt.
Der neutrale neue Titel benennt Arbeitgeber, Gleichstellung, Entgelt und Urlaub.
Item-ID `wiso-2__3`, Reihenfolge und Fortschrittsschlüssel bleiben unverändert.
Die sechs bestehenden HTML-Katalogkopien einschließlich des eingebetteten
Suchkatalogs sowie die Coverage wurden ausschließlich per exakter Textersetzung
angepasst. Der historische Prüfungsmarker bleibt als bestehende Katalogannotation
erhalten; die Originalprüfung wurde nicht erneut verifiziert.

## Gestaltung und tatsächliche Prüfung
Bestehender Deep-Space-Referenz-Lock gemäß Refero-Direct-Build verwendet:
keine neuen Tokens, kein neues Layout, keine dekorativen Rasterbilder.
- `npm run build`: erfolgreich, 902 Runtime-Dateien.
- `npm test`: erfolgreich; Site, Compiler, Batch, Learning, Progress-Merge und SQL.
  Private Buchqueue-Prüfung wird ohne lokale Wissensbasis im Worktree übersprungen;
  das ist kein bestandener Buchqueue-Test.
- `AP2_BROWSER_ONLY=leiharbeit node scripts/run-browser-tests.mjs`: erfolgreich.
  Richtige/falsche Antworten, Feedback, Diagnose ohne Freischaltung, Pflichtziele,
  Rücksetzen, Mindestlänge und Musterantwort, Tastatur-Karten, gespeicherte Checks,
  Erledigt/Zurücknehmen, 390/1440 px jeweils Dark/Light, SVG-Textgrenzen und
  horizontales Diagramm-Scrolling geprüft. Keine Behauptung einer vollständigen
  Browser-Suite oder automatischen juristischen Freitextbewertung.
- Tatsächlich sichtgeprüfte PNGs in `%TEMP%/ap2-leih-20261003/`:
  `1440-dark-figure-0.png`, `1440-light-figure-1.png`,
  `390-light-start.png`, `390-dark-card-reverse.png`.
  Keine Überlappung oder abgeschnittene Kartenbeschriftung festgestellt.
- Coverage nach Build: **290/380**, WiSo **19/109**, W2 **4/14**.
- Nur beabsichtigte Änderungen lokal sichern. Kein Push, keine Veröffentlichung.
- Nächstes offenes Thema: `wiso-2__4` Arbeitszeitgesetz.

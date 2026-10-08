# GA1: Testarten, Testfälle, Testdaten und Abnahmeprotokolle

Stand: 03.10.2026. Kernthema `ga1-13__6`, **CURATED_DRAFT** bis menschliche Fachfreigabe.

## Abgeschlossener Abschnitt

Eigener fiktiver Riva-Freigabefall: Berechtigtes Testkonto vergibt Lesefreigaben für synthetischen Projektraum mit Gültigkeit 1–12 ganze Tage; unberechtigtes Konto darf keine Freigabe anlegen, Lesen erlaubt kein Schreiben. Teststufe, Qualitätsziel, Sicht und Änderungszweck als kombinierbare Blickrichtungen erklärt, nicht als exklusive Methodenliste. Komponenten-/Komponentenintegrations-/System-/Systemintegrations-/Abnahmetest anhand eigener Prüfumfänge zugeordnet; funktional/nichtfunktional und Black-/White-Box abgegrenzt.

Vollständiger Fall T4 verbindet Kriterium, Version/Umgebung, Voraussetzungen, Daten, Aktion, erwartete Ablehnung, Ablagenachweis und Nachbereitung. Positive, negative und Grenzfälle mit 0/1/12/13 Tagen sowie separate Rollen- und Schreibschutzprüfung; ungültige Eingabe allein führt nicht automatisch zur Kontosperre. T1–T6 und vorab vereinbarte Abnahmebedingung bilden einen eigenen Soll-/Ist-Nachweis: vier bestanden, T4 fehlgeschlagen (F1), T6 mangels Test-Dateidienst blockiert (B1). Keine Abnahme; Nachtest, Regression und Durchführung des offenen Falls auf neuer Version unter neuem Lauf, alte Historie bleibt erhalten.

Diagnose ohne Pflichtgate, drei Pflichtchecks mit individuellem Feedback, freier Transfer mit Mindestlänge/Muster sowie drei Karten. Drei native technische SVGs (Blickrichtungen, Grenzklassen und Nachweiskette), semantische MathML-Eingaberegel. Keine dekorativen Rasterbilder oder ASCII-Grafiken, keine automatische fachliche Bewertung freier Antworten. Keine echten Konten, Rechte oder Daten verändert; keine rechtlichen Vertragsfolgen behauptet.

## Quellen und Designbindung

- [ISTQB CTFL v4.0.1](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf), 15.09.2024: Abschnitte 2.2.1–2.2.3, 4.2.2 und 5.3.2 direkt gelesen. ISTQB/Autoren sind die fachliche Begriffsquelle, keine IHK-Vorgabe oder behauptete Akkreditierung; eigene Beispiele statt Quellaufgaben/-grafiken.
- [Microsoft Learn: Test objects and terms](https://learn.microsoft.com/en-us/azure/devops/test/test-objects-overview?view=azure-devops): Schritte, Soll-Ergebnisse, Lauf, Ergebnis und Traceability direkt gelesen. Einheit setzt kein Azure-Werkzeug voraus.
- Private Anker `europa-integratoren-2026:00118`, Zeilen 1306–1307 (nur Überschrift), und `:00120`, Zeilen 1312–1339 (Aufgabenfragen), direkt im Hauptrepository gelesen. Keine Firma, Frage oder Musterantwort übernommen; Rollen der ergänzenden Quellen aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` beachtet.

Refero-Routine mit vorhandenem Doppler-dominantem Deep-Space-Lock und Sichtvergleich der QM-Vorgängerseite. Gemeinsame Tokens, Rahmen, Diagrammtypen und Interaktionen unverändert; präzise SVGs als passende native Medien, keine neue globale Gestaltung.

## Tatsächliche Prüfung

- Build: Exit 0, 843 Dateien.
- `npm test`: zweimal Exit 0, zuletzt nach mobilem Tabellenhinweis. Build, Site, Compiler, Batch, Lerninhalte, Fortschrittsmerge und Leaderboard-SQL bestanden. Private Buchimport-Prüfung im Worktree ohne Wissensbasis übersprungen; Anker separat im Hauptrepository gelesen.
- `AP2_BROWSER_ONLY=testing node scripts/run-browser-tests.mjs`: abschließend Exit 0 mit lokaler Anmeldefixture. Diagnose, falsche/richtige Antworten, Feedback, Reset, Pflichtgate, Abschluss/Rücknahme, Persistenz, Transfer-Mindestlänge/Muster und Enter-/Space-Karten geprüft.
- 390/1440 Pixel in Dark/Light: kein Seitenoverflow, Formel zugänglich benannt, Diagrammtexte im Canvas, Vergleichstexte innerhalb ihrer Spalten, seitliches Diagrammscrollen per Tastatur, Karten ohne Textkollision und keine Laufzeitfehler.
- Sechs Protokollfälle sowie je ein gesonderter Fehler- und Blockierstatus zusätzlich geprüft. Mobil zunächst nur linke Tabellenspalten sichtbar; erklärenden Scrollhinweis ergänzt. Fokus und ArrowRight bewegen den vorhandenen Tabellen-Scrollbereich im Testbrowser, rechte Statusspalten separat erfasst und visuell kontrolliert.
- Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-testing-20261003/`: Desktop-Dark-Blickrichtungen/Protokoll, Desktop-Light-Nachweiskette, Mobile-Light-Grenzen/Protokoll samt rechten Statusspalten und Mobile-Dark-Kartenrückseite angesehen.

Abdeckung: 271/380 insgesamt, GA1 163/164, `ga1-13` 7/8 Entwürfe. Als Nächstes letztes offenes GA1-Kernthema `ga1-13__7`: Industrie 4.0, CPS und KI-Grundlagen. Abdeckung ist keine menschliche Freigabe. Ausschließlich lokale Sicherung; kein Push oder Veröffentlichung.

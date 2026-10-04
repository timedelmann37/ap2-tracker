# Mahnung und Mahnverfahren: geprüfter Lernentwurf

Stand: 04.10.2026. Kernthema `wiso-7__10`, Einheit `mahnung-verzugszinsen-mahnverfahren-verjaehrung`. **CURATED_DRAFT**, menschliche fachliche Freigabe ausstehend. Kein Push, keine Veröffentlichung.

## Abgeschlossener Umfang

60-Minuten-Einheit mit sieben Abschnitten, Diagnose, vier erforderlichen Lernziel-Checks mit spezifischem Fehlfeedback, eigener numerischer Übung mit Dezimalkomma und Fehlvorstellungsfeedback, aktivem Abruf mit Mindesttext und Modellantwort sowie vier Tastatur-Lernkarten. Eigene Rechnungsfälle statt privater Buchaufgaben. Drei technische SVG-Diagramme und drei semantische MathML-Formeln mit Einheiten und zugänglichen Beschreibungen.

Die Einheit trennt kaufmännische Mahnung und Verzug von gerichtlichem Mahnbescheid und Vollstreckungsbescheid. Sie erklärt die Verbraucher-Bedingung der 30-Tage-Regel, fünf/neun Prozentpunkte, die gesonderte 40-Euro-Pauschale, Widerspruch versus Einspruch, fehlende materielle Prüfung des Anspruchs und die Notwendigkeit eines weiteren Antrags. Regelverjährung wird von Hemmung und Neubeginn getrennt; ein bloßer Mahnbrief verschiebt den Ablauf nicht automatisch. Gesetzliche Ausnahmen und der begrenzte inländische Grundfall bleiben ausdrücklich benannt.

Quellenprüfung: `MAHNVERFAHREN_QUELLEN.md`, amtliche BGB-/ZPO-Normen und Portalhinweise. Private EUROPA-Rohtextzeilen 10707–10712 wurden tatsächlich gelesen, aber nur als angrenzender Vertrags-/Gerätebestellungsanker verwendet; keine direkte Buchabdeckung des Mahnverfahrens behauptet. Zinsaufgaben nennen ausdrücklich einen hypothetischen Basiszinssatz von 1,00 %, vorgegebene Tage und den Aufgaben-Jahresnenner 365; Rundung erst am Ende. Keine universelle gesetzliche Tageskonvention und kein dauerhaft festgeschriebener aktueller Zinssatz.

Refero Direct Build führte zur Übernahme der vorhandenen Gewährleistungs-Lernseiten-Gestaltung: Deep-Space-Lock, gemeinsame Tokens, lokale Inter-Schriften, Shell und Lernruntime bleiben unverändert. Keine neue visuelle Richtung und keine dekorativen Rasterbilder.

## Tatsächlich abgeschlossene Prüfung

- `npm run build`: erfolgreich, 1109 Dateien gebaut.
- Vollständiges `npm test`: erfolgreich, Prozessabschluss mit Exit 0 bestätigt.
- Zielgerichtete Browserprüfung `AP2_BROWSER_ONLY=mahnverfahren`: erfolgreich. Kein vollständiger Lauf der historischen Browser-Suite behauptet.
- Falsche/richtige Quizantworten, antwortbezogenes Feedback, Diagnose ohne Freigabe-Gate, vier erforderliche Checks, Reset und erneute Sperre geprüft.
- Numerische Eingabe: falscher Zinssatz mit spezifischem Feedback, `4,93` korrekt akzeptiert. Abruf-Mindestlänge und bewusstes Anzeigen der Modellantwort geprüft.
- Lernkarten per Enter/Space, Fortschritt nach Reload, Abschluss und Rücknahme tatsächlich geprüft. Keine JavaScript-Seitenfehler.
- 390 × 900 und 1440 × 900, jeweils Dark/Light und Reduced Motion: keine Seitenüberläufe; Karteninhalte und SVG-Texte innerhalb ihrer Grenzen. Mobile Diagramme lokal und per Tastatur scrollbar; semantische Formeln ohne Seitenüberlauf.
- 48 Aufnahmen unter `C:/Users/timed/AppData/Local/Temp/ap2-mahn-20261004`. Tatsächlich visuell angesehen: `390-dark-start.png`, `390-light-formula-1.png`, `1440-dark-figure-1.png`, `1440-light-case.png`. Nicht sämtliche 48 Aufnahmen manuell geprüft.
- `git diff --check`: ohne Befund.

Abdeckung nach Build: 354 von 380 Kernthemen implementiert, 26 offen. Implementierung ist keine menschliche Freigabe.

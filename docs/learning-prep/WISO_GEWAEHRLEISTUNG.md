# Gewährleistung: geprüfter Lernentwurf

Stand: 04.10.2026. Tracker-Thema `wiso-7__9`, Einheit `gewaehrleistung-nacherfuellung-fristen-garantie`. Status **CURATED_DRAFT**; menschliche fachliche Freigabe steht aus. Keine Veröffentlichung und kein Push.

## Abgeschlossener Umfang

55-Minuten-Einheit mit sieben Abschnitten, eigener Diagnose, eigenen Geräte-Kauffällen, vier Lernziel-Checks mit antwortbezogenem Feedback, aktivem Abruf mit Mindesttext und Modellantwort sowie vier Tastatur-Lernkarten. Drei technische SVG-Diagramme erklären den Rechteweg, die Abgrenzung von Verjährung und Beweisvermutung sowie gesetzliche Rechte gegenüber zusätzlichen Garantieansprüchen. Keine künstlichen Formeln für qualitative Zusammenhänge.

Die Erklärung unterscheidet Käuferwahl und gesetzliche Grenzen der Nacherfüllung, Voraussetzungen weiterer Mängelrechte, die Verbraucher-Sonderregeln statt einer pauschalen Zwei-Reparaturversuche-Regel, gewöhnliche Zwei-Jahres-Verjährung und einjährige Beweisvermutung sowie die besonderen Voraussetzungen einer Verkürzung bei gebrauchten Verbraucherwaren. Garantie bedeutet ein zusätzliches verbindliches Versprechen, keine Ablösung gesetzlicher Verkäuferrechte. Grundlagenumfang, keine vollständige Rechtsberatung oder Abdeckung aller Sonderfälle.

Die Quellenprüfung steht in `GEWAEHRLEISTUNG_QUELLEN.md`. Private EUROPA-Rohtextanker 4028 und 9029–9033 sind nur benachbarter AGB-/Gewährleistungskontext, keine vollständige Themenabdeckung und keine übernommenen Aufgaben. Aktuelle offizielle Einzelnormen wurden tatsächlich gelesen. Die bestehende Deep-Space-Gestaltung und gemeinsamen Lerninteraktionen bleiben erhalten.

## Tatsächlich abgeschlossene Prüfung

- `npm run build`: erfolgreich, 1105 Dateien gebaut.
- Vollständiges `npm test`: erfolgreich; nach der Diagrammkorrektur erneut erfolgreich.
- Zielgerichtete Browserprüfung über `AP2_BROWSER_ONLY=gewaehrleistung`: erfolgreich nach erneutem Lauf. Nicht als vollständiger historischer Browser-Suite-Lauf ausgeben.
- Tatsächliche Interaktionen: falsche/richtige Antworten und spezifisches Feedback, Diagnose ohne Freigabe-Gate, vier erforderliche Checks, Reset, Abruf-Mindesttext und Modellantwort, Lernkarten mit Enter/Space, Persistenz nach Reload, Abschluss und Rücknahme.
- Mobile 390 × 900 und Desktop 1440 × 900, jeweils Dark/Light mit Reduced Motion: keine Seitenüberläufe, Karteninhalte und SVG-Beschriftungen innerhalb ihrer Grenzen; mobile Diagramme lokal und per Tastatur horizontal scrollbar. Keine JavaScript-Seitenfehler.
- 32 Browseraufnahmen unter `C:/Users/timed/AppData/Local/Temp/ap2-gew-20261004`. Tatsächlich visuell angesehen: `390-dark-start.png`, `390-light-figure-1.png`, `1440-dark-figure-2.png`, `1440-light-case.png`. Nicht alle 32 Aufnahmen manuell geprüft.
- Ein erster Browserlauf fand eine zu breite Beschriftung im Garantie-Diagramm. Der Text wurde gekürzt; der erneute Browserlauf bestand die Box-Prüfung.
- `git diff --check`: ohne Befund.

Abdeckung nach Build: 353 von 380 Themen implementiert, 27 offen; WiSo 82 von 109. Implementiert bedeutet nicht menschlich freigegeben.

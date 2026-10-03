# Arbeitsplatzergonomie und Barrierefreiheit

Abgeschlossen 2026-10-03: ga1-10__9, `arbeitsplatzergonomie-barrierefreiheit`, CURATED_DRAFT bis zur menschlichen Fachfreigabe.

## Inhalt

Eigener fiktiver Fall Nordfeld: Arbeitsplatzanordnung und digitale Buchung werden getrennt geprüft. Diagnose, vier Pflicht-Lernzielchecks, Transferaufgabe, sechs Abrufkarten und zwei technische SVG-Prüfabläufe sind umgesetzt. Der Fehlfall umfasst Eingabe, Erkennen, Korrigieren und Bestätigen ohne Maus. Kontrastwerte sind ausdrücklich eigene Messannahmen. Einzelfallprüfung wird nicht als vollständige Konformität bezeichnet. Keine Übernahme von Quellenfällen oder Buchaufgaben.

## Quellen und Grenzen

- Private lokale Quelle `europa-integratoren-2026:00034`, Markdown-Zeilen 415–420 gelesen: Barrierefreiheit bei Systembewertung und Konzeption; nur Themenanker.
- OSHA Evaluation Checklist: https://www.osha.gov/etools/computer-workstations/checklists/evaluation — Work stations, Input device, Monitor und General concepts gelesen. US-Fachhilfe, keine deutsche Rechtsvorgabe.
- W3C Accessibility Principles: https://www.w3.org/WAI/fundamentals/accessibility-principles/ — relevante Wahrnehmungs-, Bedien-, Verständlichkeits- und Robustheitsabschnitte gelesen.
- W3C Keyboard: https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html — Success Criterion und Intent gelesen.
- W3C Focus Visible: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html — Success Criterion und Intent gelesen.
- W3C Contrast Minimum: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html — Success Criterion, Intent und Grenzwertnotiz gelesen.

Alle Abrufe am 03.10.2026. BAuA ASR A6 und die Bildschirmarbeitsseite lieferten HTTP 403; nicht als gelesene Evidenz verwendet. Rechtsanwendung und vollständige Arbeitsplatz-/WCAG-Konformitätsprüfung sind nicht Gegenstand dieser Einheit. Quellenregistry und Evidenzzuordnung im Unit-Schema ergänzt.

## Gestaltung und tatsächliche Prüfung

Refero-Skill mit bestehendem genehmigten Deep-Space-Target genutzt: Doppler-Leseflächen, Astro-Atmosphäre, gemeinsame Lerninteraktionen; editierbare technische Diagramme statt dekorativer Rasterbilder. Vorherige Lernansicht als Vergleich tatsächlich angesehen.

Build und npm test bestanden. Isolierter Browserlauf `AP2_BROWSER_ONLY=workplace-access` bestanden: falsche/richtige Antworten samt Feedback, Zurücksetzen, Pflichtziel-Sperre, eigene Transferantwort vor Modell, Tastaturkarten, Persistenz, Markieren und Rücknahme, Diagrammgrenzen und Tastatur-Scrolling. Keine Seitenfehler oder Seitenüberläufe. Dies ist Produkt-QA, kein vollständiger Accessibility-Audit.

390/1440px, Dark/Light erfasst. Unter `C:/Users/timed/AppData/Local/Temp/ap2-access-20261003` die Ansichten 1440-dark-figure-0, 1440-light-figure-1, 390-dark-start und 390-light-figure-1 tatsächlich visuell geprüft. Mobile Diagramme behalten den vorhandenen beschrifteten horizontalen Scrollbereich. Keine globale Navigation geändert.

Coverage nach Build: insgesamt 236/380, GA1 128/164; 36 GA1-Kernthemen offen. Coverage zählt Entwürfe, nicht menschliche Freigaben. Kein Push oder Veröffentlichung.

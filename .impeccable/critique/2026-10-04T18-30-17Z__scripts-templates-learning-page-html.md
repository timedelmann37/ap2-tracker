---
target: Lernseiten-Rahmen
total_score: 26
max_score: 40
na_heuristics:
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\timed\\.codex\\worktrees\\next-learning-ga1\\AP2-Tracker\\scripts\\templates\\learning-page.html"
target_fingerprint: "sha256:85f789ac5699509e62e8e29366c1ae835d4ffddae8ec4e100524dcf36e362c5f"
target_path: "C:\\Users\\timed\\.codex\\worktrees\\next-learning-ga1\\AP2-Tracker\\scripts\\templates\\learning-page.html"
timestamp: 2026-10-04T18-30-17Z
slug: scripts-templates-learning-page-html
---
Method: dual-agent (A: /root/impeccable_design_a · B: /root/impeccable_evidence_b)

# Critique: Lernseiten-Rahmen

Target: scripts/templates/learning-page.html. Stichproben: Rechtsformen, WiSo-Zeitbudget, Linux und OSI; nicht jede der 380 Einheiten.

| Heuristik | /4 | Wichtigster Befund |
|---|---:|---|
| Systemstatus | 2 | Mobil fehlen Lernziel- und Speicherinformationen |
| Verständliche Sprache | 3 | Gute Fachsprache, teilweise interne Statuscodes |
| Kontrolle und Rücknahme | 3 | Rückwege und Retry vorhanden |
| Konsistenz | 3 | Gemeinsamer Rahmen, doppelte Abschnittsnummern |
| Fehlervermeidung | 3 | Abschlussprüfung vorhanden, Voraussetzungen unklar |
| Erkennen statt Erinnern | 2 | Mobil kein Inhaltsverzeichnis |
| Effizienz | 2 | Lange Einheiten schwer wiederaufzunehmen |
| Visuelle Klarheit | 3 | Gute Lesefläche, zu dominante gesperrte Abschlussaktion |
| Fehlerbehebung | 2 | Retry verliert Tastaturfokus |
| Hilfestellung | 3 | Gute Erklärungen, schwache Wegweisung zum nächsten Check |
| Gesamt | 26/40 | Brauchbar, wesentliche Navigations- und Statuslücken |

## Design Specificity Verdict

Zusammenhängender festgelegter Deep-Space-Stil. Fachliche Diagramme, Diagnose und Lernzielprüfungen machen das Lernprodukt erkennbar. Glas, Aurora und Laser-Akzente sind ausdrücklich gewünscht, keine zu beseitigenden Fehler. Größte Verbesserung: Lernführung, nicht neues Erscheinungsbild. Moderat produktspezifischer Rahmen; Lernrunden und Checks stärken diese Spezifität.

Deterministic scan: 0 Treffer, Exit0 in Template und vier generierten Stichproben. Regex-Fallback, da htmlparser2/css-select/css-tree/domutils fehlen. Keine Regeln/Treffer oder False Positives vorhanden. Kein Nachweis für Fehlerfreiheit oder WCAG-Konformität. Browser-Overlay über schreibgeschützte App-Browser-API nicht möglich.

## Overall Impression / What's Working

Lesbare Textbreite, erklärende Fehlrückmeldungen und technische Illustrationen funktionieren. Dark/Light behalten dieselbe verständliche Struktur. Detailtiefe wertvoll; Navigation/Vergleich müssen sie besser erschließen.

## Priority Issues

1. **P1 – Lange Einheiten verlieren Navigation.** Rechtsformen-Rail 1067px hoch, beginnt bei y74 und reicht im 1000px-Viewport über Bildschirm; mobil verschwindet sie. Wirkung: lange Einheit schwer wiederaufzunehmen. Fix: begrenzte scrollbar Desktop-Leiste, mobile Inhaltsübersicht, sichtbare Lernrunden. Orte: Template .rail/#toc; learning.css .rail/mobile. Commands: adapt, layout.
2. **P1 – Gesperrte Fortschrittsaktionen erklären Voraussetzungen nicht.** Mobil verschwinden Anmeldung/Pflichtziel-Anzeige; Pflichtchecks nur dezente Kontur. Wirkung: Anmeldung, Checks, Ladezustand und Fehler verwechselt. Fix: Anmeldung/offene Checks/nächsten Pflichtcheck sichtbar, Pflichtchecks mit Ziel beschriften. Orte: Template .mastery-box/.actionbar/#learning-save; learning.js renderMastery/setProgressEnabled; learning.css .save-note. Commands: clarify, adapt.
3. **P2 – Tastatur-/Vorleseprobleme stören Lernablauf.** Ungeflippte Karten geben beide Seiten an AX weiter; Retry versteckt fokussierten Bereich, Fokus fällt auf BODY. Wirkung: Lösung vor Abruf verraten, Position verloren. Fix: aktive Kartenseite zugänglich, inaktive aria-hidden; Retry-Fokus zurück auf Antwort. Orte: compile-unit-spec renderFlashcards; learning.js Karten/Quiz reset. Command: harden.
4. **P2 – Detail braucht bessere Vergleichsstruktur.** Einfache Diagrammzeilen mobil660px verlangen Panning; Rechtsformen-Steckbriefe schwer vergleichbare Prosa. Fix: mobile Textdarstellung derselben Daten, strukturierte Vergleichspunkte ohne Kürzung rechtlicher Einschränkungen. Orte: renderFigure/Diagramm-CSS/Rechtsformen Vergleichshilfe. Commands: adapt, typeset.
5. **P2/P3 – Redaktionelle Doppelungen.** Build setzt Nummer vor nummerierte Titel; interne Statuscodes im Lesetext. Fix: eine Nummerierungsautorität; verständliche deutsche Statusanzeige, CURATED_DRAFT intern erhalten. Orte: build-learning renderMarkdown/sichtbarer Status. Commands: clarify, polish.

## Persona Red Flags / Cognitive Load

Casey: kein schneller mobiler Wiedereinstieg, Navigation/Mastery fehlen. Jordan: grüne gesperrte Aktion ohne sichtbaren Grund, Pflichtchecks unklar. Alex: letzte Rail-Links außerhalb Viewport, Vergleich erfordert Prosa-Scan. Moderate zusätzliche Bedienlast durch fehlende Navigation/Gruppierung/nächsten Schritt. Fachliche Komplexität notwendig. Emotionaler Tiefpunkt: Pause/Rückkehr und gesperrter Abschluss, nicht Fehlfeedback.

## Minor Observations / Questions to Consider

Keine generische Marketing-Hero, Rasterdekoration, Textgradienten oder SaaS-Featuregrids beobachtet. Approved glass/aurora/laser bewahren. Wie unterbrochene Lernrunde wiederaufnehmen? Wie nächsten Pflichtcheck erkennen?
Umsetzung aller Befunde und Beibehaltung von Deep Space vom Nutzer ausdrücklich vorgegeben; keine erneute Prioritäts-/Scope-Bestätigung erforderlich.

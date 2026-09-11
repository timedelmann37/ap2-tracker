# Lernmodul-Vertrag

Stand: 2026-09-11

Dieser Vertrag macht aus einem Kernthema eine prüfbare Lerneinheit. Er ergänzt
die Produkthierarchie `Bereich > Themengruppe > Kernthema`, ersetzt sie aber
nicht. Der kanonische Abschluss bleibt der bestehende Tracker-Schlüssel des
Kernthemas.

## Didaktische Schleife

Eine vollständige Lerneinheit folgt diesem Ablauf:

1. **Diagnose ohne Wertung:** Eine kurze Aufgabe aktiviert Vorwissen und zählt
   nicht zum Abschluss.
2. **Erklärung und Modell:** Regeln, Grenzen, eigene Grafik und mindestens ein
   vollständig durchgerechnetes Beispiel.
3. **Vorhersagen und ausprobieren:** Vor einem Rechner oder Simulator hält die
   lernende Person eine eigene Erwartung fest.
4. **Geführte Übung:** Erst selbst antworten, danach gestufte Hinweise und eine
   Musterlösung nutzen.
5. **Freier Abruf:** Eine Antwort aus dem Gedächtnis formulieren und erst danach
   mit einem Muster vergleichen.
6. **Transfer:** Jedes Lernziel besitzt genau einen verpflichtenden Nachweis in
   einem neuen Szenario. Reine Diagnosefragen dürfen kein Lernziel erfüllen.
7. **Wiederholung:** Karteikarten werden erst nach eigener Erinnerung
   aufgedeckt. „Sicher“ terminiert vier Tage, „unsicher“ einen Tag; fällige
   Karten setzen die Wiederholungsmarkierung des Kernthemas.

## Visueller Rhythmus

- Längere Einheiten werden spätestens nach zwei bis drei erklärenden Abschnitten
  durch eine fachlich notwendige Visualisierung aufgelockert: eigenes Diagramm,
  Ablaufgrafik, visuelle Formel, Simulation oder beschrifteter Vergleich.
- Jede Grafik beantwortet eine konkrete Verständnisfrage. Reine Stockbilder,
  dekorative Illustrationen oder Buchabbildungen ohne eigene didaktische
  Bearbeitung sind ausgeschlossen.
- Mathematische Formeln werden als gesetzte mathematische Struktur mit
  beschrifteten Größen dargestellt, nicht nur als Inline-Code. MathML liefert
  die grafische Notation und eine präzise zugängliche Beschreibung.
- Buchgrafiken bleiben private Belege. Öffentlich erscheinen neu gezeichnete,
  fachlich geprüfte SVGs oder interaktive HTML-Grafiken mit Alternativtext.

## Interaktionsregeln

- Falsche Antworten erklären den konkreten Denkfehler. Bei adaptiven
  Auswahlfragen wird die richtige Antwort nach dem ersten Fehler noch nicht
  sichtbar gemacht.
- Zahlen werden eingegeben statt aus vier Ergebnissen erkannt. Häufige
  Fehlwerte erhalten eine eigene Rückmeldung.
- Sortieraufgaben müssen mit beschrifteten Schaltflächen und Tastatur bedienbar
  sein; Drag-and-drop darf höchstens eine zusätzliche Bedienform sein.
- Feedback wird über eine `aria-live`-Region ausgegeben und erhält nach einer
  bewussten Prüfung den Fokus.
- Es gibt keine Punkte, Serien, Abzeichen oder künstlichen Belohnungen.
- Lokales Lernen darf bei einem Ausfall des optionalen Cloud-Clients nicht
  blockiert werden.
- Eine neue `contentRevision` verwirft veraltete Detailversuche, erhält aber
  den kanonischen Abschluss und setzt das Kernthema zur Wiederholung.

## Quellen der Interaktionsentscheidung

- Die bestehende AP2-Gestaltung bleibt die visuelle Leitplanke: weiße und warme
  neutrale Arbeitsflächen, Inter, dünne Rahmen, Grün ausschließlich für Erfolg
  und Gelb für die nächste Aktion.
- [H5P Interactive Book](https://h5p.org/content-types/interactive-book) dient
  als Produktreferenz für die Mischung aus Erklärung und unterschiedlichen
  Aufgabentypen in einem zusammenhängenden Kapitel.
- [Moodle Question Behaviours](https://docs.moodle.org/24/en/Question_behaviours)
  dient als Produktreferenz für unmittelbares Feedback und wiederholbare,
  adaptive Versuche.
- Roediger und Karpicke,
  [Test-Enhanced Learning](https://doi.org/10.1111/j.1467-9280.2006.01693.x),
  begründen die aktive Abrufpraxis anstelle bloßen Wiederlesens.

## Entscheidungsprotokoll

| Entscheidung | Grundlage | Rolle |
| --- | --- | --- |
| Bestehende visuelle Sprache erhalten | `DESIGN.md` | Fläche, Typografie, Zustandsfarben und Dichte |
| Erklärung und Aufgaben mischen | H5P Interactive Book | Kapitelstruktur, nicht visuelle Gestaltung |
| Sofortiges, versuchsspezifisches Feedback | Moodle Question Behaviours | Interaktionslogik |
| Freie Erinnerung vor Musterlösung | Test-Enhanced Learning | Lernhandlung |
| Pflichtziele statt Punktestand | Produktprinzipien und Nutzervorgabe | Abschlusslogik ohne Gamification |
| Eigene SVGs und Simulationen | private Buchquellen plus Kurations-Sidecars | fachliche Visualisierung ohne Buchgrafiken |

## Veröffentlichungs-Gate

Eine Einheit darf erst `PUBLICATION_READY` werden, wenn Fachinhalt, Quellen-
Sidecar, eigene Grafiken, Lernziele, Fehlfeedback, Tastaturbedienung, Mobilansicht
und Revisionsverhalten geprüft sind. Agentisch erstellte Einheiten bleiben bis
zur menschlichen Fach- und Verständlichkeitsprüfung `CURATED_DRAFT`.

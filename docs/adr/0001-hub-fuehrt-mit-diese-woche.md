# 0001 – Der Hub führt mit „Diese Woche"; das Dashboard wandert auf die Übersicht

- **Status:** akzeptiert
- **Datum:** 2026-09-03
- **Betrifft:** Hub (`/`), Übersicht (`/uebersicht/`)
- **Version:** v3.6.0 (UI-Hierarchie-Kur)

## Kontext

Seit v3.0.0 war der Hub bewusst ein **Dashboard**: Gesamtfortschritt, ein
Balken je Bereich, Aktivitäts-Heatmap, Lern-Streaks, „zuletzt bearbeitet"
und „überfällig"-Chips — dazu eine Wand aus Modul-Kacheln. Nach dem
Redesign (v3.5.x) sah das stimmig aus, fühlte sich aber „unaufgeräumt,
alles auf einmal" an: viele gleichrangige Module ohne klaren Fokus.

Beim tatsächlichen Lernen ist die wichtigste Frage: **„Was ist laut Plan
jetzt dran?"** Diese Frage ging auf dem Dashboard-Hub unter — sie war
nirgends die erste Antwort, die die Seite gibt.

## Entscheidung

Der Hub wird auf **eine Aufgabe** fokussiert: „Was ist laut Plan jetzt
dran → loslegen."

- Der Hub führt sichtbar mit **„Diese Woche"** — den *aktuell geplanten*
  Themengruppen (eine je Bereich), jeweils mit Fortschrittsbalken und
  einem Link, der direkt beim ersten noch offenen Kernthema weiterlernen
  lässt. Der *Rückstand* steht getrennt in einer eigenen, kompakten Zeile.
- Alles Dashboard-artige — das komplette **Fortschrittsbild**
  (Gesamtfortschritt + Balken je Bereich), die Aktivitäts-Heatmap, die
  Lern-Streaks und „zuletzt bearbeitet" — verlässt den Hub und lebt auf
  der **Übersicht**, die damit zur „Zoom-out"-Seite wird (Fortschrittsbild
  oben, der gesamte Zeitverlauf des Plans darunter).
- Die Bento-Kachel-Wand entfällt; jeder Bereich bleibt über die
  Navigation (Top-Nav am Desktop, Bottom-Tab-Bar auf dem Handy) erreichbar.

„Aktuell geplant" und „Rückstand" sind die in dieser Kur eingeführten
abgeleiteten Plan-Begriffe (siehe `CONTEXT.md`).

## Trade-off

**Dagegen:** Der Hub gibt den Überblick auf einen Blick auf. Wer bisher
morgens den Gesamtfortschritt und die Heatmap auf der Startseite sehen
wollte, braucht jetzt einen Klick mehr (auf die Übersicht). Der Hub war
seit v3.0.0 bewusst als Dashboard angelegt — diese Entscheidung dreht das
um und ist ohne Kontext überraschend.

**Dafür:** Die primäre Aufgabe der Oberfläche — „jetzt dran → loslegen" —
bekommt die Startseite für sich allein, ohne mit fünf gleichrangigen
Modulen um Aufmerksamkeit zu konkurrieren. Der Überblick ist an einem
Ort gebündelt (Übersicht) statt über zwei Seiten verteilt.

Die Umkehr ist technisch aufwändig (zwei Seiten neu komponiert) und
inhaltlich schwer rückgängig zu machen, ohne den Fokus wieder zu
verwässern — deshalb dieser ADR.

## Konsequenzen

- Hub und Übersicht tragen weiterhin ihre eigene Kopie der Shell, der
  `DATA`-Konstante und der Plan-/Status-Herleitung (kein Build, kein
  geteiltes Asset — bewusst).
- Kein Schema-Change: `localStorage`-Schlüssel `ap2-tracker-state-v1`,
  `state.__activity`, `mark__`-Präfixe und Cloud-Sync bleiben unverändert.
- Das vollständige Nachschlagewerk (Begriffe unabhängig vom Wochenplan)
  bleibt ein späterer, separater Build; der deaktivierte Nav-Platzhalter
  bleibt stehen.

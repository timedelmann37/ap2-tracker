---
id: raid-level
slug: raid
title: RAID-Level sicher auswählen und berechnen
description: RAID-Level vergleichen, Nutzkapazität berechnen und eine begründete Auswahl für AP2-Aufgaben treffen.
domain: GA1
domain_label: Konzeption & Administration
group_id: ga1-3
group_label: Block 3 · Speicherlösungen
item_id: ga1-3__3
week: KW 37
estimated_minutes: 16
relevance: hoch
sources: ["europa-integratoren-2026", "ihk-bonn", "itlf6-9-2022", "it-basiswissen-2012"]
---
In der Prüfung reicht es selten, nur ein RAID-Level zu nennen. Du musst aus einer Anforderung **eine Entscheidung ableiten**, die **nutzbare Kapazität berechnen** und die verbleibenden Risiken benennen können.

<aside class="callout merk"><span class="lbl">Merksatz</span><p><strong>RAID ersetzt kein Backup.</strong> Es kann den Ausfall einzelner Datenträger abfangen, schützt aber nicht vor Löschen, Schadsoftware, Fehlkonfiguration oder einem Standortschaden.</p></aside>

## Das Entscheidungsmodell

Gehe in Aufgaben immer in derselben Reihenfolge vor:

1. **Anforderung lesen:** Geht es primär um Leistung, Kapazität oder Verfügbarkeit?
2. **Ausfalltoleranz festlegen:** Wie viele gleichzeitige Laufwerksausfälle müssen verkraftet werden?
3. **Nutzkapazität rechnen:** Maßgeblich ist die Kapazität des kleinsten Laufwerks.
4. **Betriebsrisiko nennen:** Rebuild-Dauer, zweiter Ausfall, Controller und Backup gehören in die Begründung.

Ein guter Prüfungssatz verbindet alles: „Ich wähle RAID 6, weil zwei Laufwerke gleichzeitig ausfallen dürfen; gegenüber RAID 5 sinkt die Nutzkapazität, dafür ist das Risiko während eines langen Rebuilds geringer.“

## Die RAID-Level im Vergleich

| Level | Mindestzahl | Nutzkapazität bei gleich großen Platten | Ausfalltoleranz | Typische Einordnung |
| --- | ---: | --- | --- | --- |
| RAID 0 | 2 | `n × Cmin` | keine | schnell und vollständig nutzbar, aber ohne Redundanz |
| RAID 1 | 2 | bei einem Spiegelpaar `1 × Cmin` | eine Platte des Paars | einfach und lesestark, aber nur 50 % nutzbar |
| RAID 5 | 3 | `(n − 1) × Cmin` | eine Platte | guter Kapazitätsanteil, erhöhtes Risiko beim Rebuild großer Arrays |
| RAID 6 | 4 | `(n − 2) × Cmin` | zwei Platten | mehr Sicherheitsreserve, dafür geringere Schreibperformance und Kapazität |
| RAID 10 | 4 | `(n ÷ 2) × Cmin` | eine Platte je Spiegelpaar | hohe I/O-Leistung; mehrere Ausfälle sind nur in unterschiedlichen Paaren tolerierbar |
| RAID 50 | 6 | `(n − g) × Cmin` | eine Platte je RAID-5-Gruppe | Striping über mehrere RAID-5-Gruppen; `g` ist die Gruppenzahl |
| RAID 60 | 8 | `(n − 2g) × Cmin` | zwei Platten je RAID-6-Gruppe | größere Reserve für umfangreiche Arrays, aber hoher Kapazitätsbedarf |

<figure class="learning-figure">
  <img src="/assets/learning/raid-parity.svg" alt="Vier Laufwerke mit verteilten Daten- und Paritätsblöcken bei RAID 5; daneben wird gezeigt, dass ein ausgefallenes Laufwerk aus den übrigen Blöcken rekonstruiert wird.">
  <figcaption>Eigene Lernskizze: Bei RAID 5 wandert die Parität zwischen den Laufwerken. Ein Laufwerk darf ausfallen; während des Rebuilds fehlt diese Reserve.</figcaption>
</figure>

## Nutzkapazität berechnen

Setze zuerst die Anzahl der Laufwerke `n` und die Kapazität des kleinsten Laufwerks `Cmin` ein. Unterschiedlich große Laufwerke werden im klassischen RAID nur bis zur Größe des kleinsten Laufwerks genutzt.

<div class="formula"><span class="cap">RAID 5</span><strong>Cnetto = (n − 1) × Cmin</strong></div>

<div class="formula"><span class="cap">RAID 6</span><strong>Cnetto = (n − 2) × Cmin</strong></div>

<div class="formula"><span class="cap">RAID 10</span><strong>Cnetto = (n ÷ 2) × Cmin</strong></div>

<section class="aufgabe">
  <div class="h"><span class="b">Rechenaufgabe 1</span> Kapazität und Ausfalltoleranz</div>
  <div class="body">
    <p>Ein Speichersystem besitzt sechs Laufwerke mit jeweils 4 TB. Berechne die Nutzkapazität bei RAID 6 und nenne die Ausfalltoleranz.</p>
    <details><summary>Lösung anzeigen</summary><div class="loesung"><p><strong>(6 − 2) × 4 TB = 16 TB.</strong> Zwei Laufwerke dürfen gleichzeitig ausfallen. Brutto stehen 24 TB bereit; 8 TB entsprechen der doppelten Paritätsreserve.</p></div></details>
  </div>
</section>

<section class="aufgabe">
  <div class="h"><span class="b">Rechenaufgabe 2</span> Auswahl begründen</div>
  <div class="body">
    <p>Eine Datenbank benötigt hohe zufällige Schreib- und Leseleistung. Vier gleich große SSDs stehen bereit. Welches der hier behandelten Level ist eine plausible Wahl?</p>
    <details><summary>Lösung anzeigen</summary><div class="loesung"><p><strong>RAID 10</strong> ist plausibel: Striping liefert Leistung, Spiegelung Redundanz und es gibt keine Paritätsberechnung wie bei RAID 5 oder 6. Die Hälfte der Bruttokapazität bleibt nutzbar. Ein Backup wird zusätzlich benötigt.</p></div></details>
  </div>
</section>

## Rebuild-Risiko richtig erklären

Nach einem Laufwerksausfall arbeitet ein redundantes Array zunächst im degradierten Zustand. Beim Rebuild werden viele Daten gelesen und auf ein Ersatzlaufwerk geschrieben. Dadurch steigt die Last; ein weiterer nicht tolerierter Ausfall oder ein nicht lesbarer Sektor kann zum Datenverlust führen.

- **Hot Spare:** Ein eingebautes Reservelaufwerk kann den Rebuild automatisch starten, erhöht aber nicht die grundsätzliche Toleranz des RAID-Levels.
- **Hot Swap:** Ein Laufwerk kann im laufenden Betrieb getauscht werden, sofern System und Einschub das unterstützen.
- **Hardware-RAID:** Ein Controller übernimmt Verwaltung und oft Cache-Funktionen; er selbst und sein Cache müssen in das Ausfallkonzept einbezogen werden.
- **Software-RAID:** Das Betriebssystem verwaltet das Array; das kann flexibel und kostengünstig sein, benötigt aber eine passende Boot- und Wiederherstellungsstrategie.

<aside class="callout"><span class="lbl">Prüfungstipp</span><p>Nenne nie nur „mehr Sicherheit“. Formuliere konkret, wie viele Laufwerke in welcher Konstellation ausfallen dürfen und welches Restrisiko während des Rebuilds bleibt.</p></aside>

## Karteikarten

<div class="flashcard-grid">
  <button class="flashcard" type="button" data-flashcard="raid-backup" aria-pressed="false">
    <span class="face front"><span class="k">Frage</span><strong>Warum ist RAID kein Backup?</strong><small>Zum Umdrehen antippen</small></span>
    <span class="face back"><span class="k">Antwort</span><span>Weil Spiegelung oder Parität logische Fehler, Schadsoftware, Löschen und Standortausfälle mit übernehmen oder nicht abdecken.</span></span>
  </button>
  <button class="flashcard" type="button" data-flashcard="raid10-failure" aria-pressed="false">
    <span class="face front"><span class="k">Frage</span><strong>Wann übersteht RAID 10 zwei Plattenausfälle?</strong><small>Zum Umdrehen antippen</small></span>
    <span class="face back"><span class="k">Antwort</span><span>Wenn die ausgefallenen Platten zu unterschiedlichen Spiegelpaaren gehören. Fallen beide Platten desselben Paars aus, ist das Array verloren.</span></span>
  </button>
</div>

## Selbsttest

<section class="quiz" data-quiz="raid-capacity" data-correct="2">
  <h3>Vier Festplatten à 3 TB arbeiten als RAID 5. Wie groß ist die Nutzkapazität?</h3>
  <button class="opt" type="button" data-answer="0"><span class="m">A</span> 3 TB</button>
  <button class="opt" type="button" data-answer="1"><span class="m">B</span> 6 TB</button>
  <button class="opt" type="button" data-answer="2"><span class="m">C</span> 9 TB</button>
  <button class="opt" type="button" data-answer="3"><span class="m">D</span> 12 TB</button>
  <div class="fb" data-feedback hidden><strong>9 TB sind richtig:</strong> (4 − 1) × 3 TB. Die Kapazität eines Laufwerks entspricht der Paritätsreserve. <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

<section class="quiz" data-quiz="raid-selection" data-correct="1">
  <h3>Welches Level toleriert unabhängig von der Position zwei gleichzeitige Laufwerksausfälle?</h3>
  <button class="opt" type="button" data-answer="0"><span class="m">A</span> RAID 5</button>
  <button class="opt" type="button" data-answer="1"><span class="m">B</span> RAID 6</button>
  <button class="opt" type="button" data-answer="2"><span class="m">C</span> RAID 10</button>
  <button class="opt" type="button" data-answer="3"><span class="m">D</span> RAID 0</button>
  <div class="fb" data-feedback hidden><strong>RAID 6 ist richtig.</strong> RAID 10 kann ebenfalls zwei Ausfälle überstehen, aber nur wenn sie verschiedene Spiegelpaare treffen. <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

## Quellen und Einordnung

<div class="src-block">
  <p><strong>EUROPA Prüfungsvorbereitung Teil 2 – Integratoren, 4. Auflage (2026):</strong> aktuelle Hauptquelle für RAID-Begriffe, Kapazitätsrechnungen und prüfungsnahe Anforderungen.</p>
  <p><strong>Prüfungsvorbereitung IHK Bonn:</strong> ergänzende Aufgaben zu RAID 5, RAID 6, RAID 10, Hot Spare und Hardware-/Software-RAID.</p>
  <p><strong>ITLF6–9 (2022):</strong> Anwendungsszenarien und Vergleich von RAID 5 und RAID 6.</p>
  <p><strong>IT-Basiswissen (2012):</strong> historische Grundlagenquelle; wegen des Alters nur ergänzend verwendet.</p>
  <p class="source-note">Die Darstellung ist eine neu formulierte Synthese. Buchseiten und Originalgrafiken bleiben in der privaten lokalen Wissensbasis.</p>
</div>

---
id: raid-operations
slug: raid-operations
title: Hardware- und Software-RAID betriebssicher planen
description: RAID-Implementierungen vergleichen, Hot Spare und Hot Swap trennen und einen sicheren Wiederherstellungsablauf begründen.
domain: GA1
domain_label: Konzeption & Administration
group_id: ga1-3
group_label: Block 3 · Speicherlösungen
item_id: ga1-3__5
week: KW 37
estimated_minutes: 20
relevance: hoch
sources: ["europa-integratoren-2026", "ihk-bonn", "itlf6-9-2022"]
content_revision: 2026-09-11.1
content_status: CURATED_DRAFT
learning_objectives: ["architecture", "recovery"]
curation: content/curation/raid-operations.json
---
Ein RAID-Level beschreibt die Datenverteilung. Für einen belastbaren Betrieb musst du zusätzlich entscheiden, **wo die RAID-Logik läuft** und **wie ein Ausfall erkannt, behoben und kontrolliert wird**.

<section class="learning-goals" aria-labelledby="learning-goals-title">
  <h2 id="learning-goals-title">Nach dieser Einheit kannst du …</h2>
  <ul>
    <li>Hardware- und Software-RAID anhand eines konkreten Betriebsfalls abwägen,</li>
    <li>Hot Spare, Hot Swap und Rebuild korrekt unterscheiden und daraus einen Wiederherstellungsablauf ableiten.</li>
  </ul>
</section>

## Einstieg: Begriffe unter Druck

<section class="quiz" data-quiz="raid-ops-diagnostic" data-correct="2">
  <h3>Ein Laufwerk fällt aus. Ein eingebautes Reservelaufwerk startet automatisch den Wiederaufbau. Was beschreibt das Reservelaufwerk?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Hot Swap bezeichnet den möglichen Austausch im laufenden Betrieb, nicht das Reservelaufwerk selbst."><span class="m">A</span> Hot Swap</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Ein Backup ist eine unabhängige Kopie und kein Mitglied des Arrays."><span class="m">B</span> Backup</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Richtig: Ein Hot Spare steht als Reserve bereit und kann nach einem Ausfall automatisch in den Verbund aufgenommen werden."><span class="m">C</span> Hot Spare</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Die Parität ist eine verteilte Recheninformation im Array, kein separates Reservelaufwerk."><span class="m">D</span> Paritätslaufwerk</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

## Zwei Implementierungen, keine Pauschalantwort

| Kriterium | Software-RAID | Hardware-RAID |
| --- | --- | --- |
| RAID-Logik | Betriebssystem oder Hypervisor | dedizierter Controller |
| Abhängigkeit | CPU, Treiber, Boot- und Metadatenformat | Controller, Firmware und kompatible Ersatzhardware |
| Transparenz | oft gut mit Systemwerkzeugen automatisierbar | dem Host häufig als einzelnes logisches Laufwerk präsentiert |
| Cache | nutzt System- und Laufwerks-Caches | kann eigenen Schreibcache besitzen; Absicherung gegen Stromausfall ist entscheidend |
| Geeignet, wenn … | Standardhardware, Automatisierung und Portabilität zum Betriebskonzept passen | definierte Controller-Funktionen, Cache und Herstellersupport den Zusatzaufwand rechtfertigen |

„Hardware ist immer schneller“ ist keine tragfähige Begründung. Moderne Software-Lösungen können sehr leistungsfähig sein. Entscheidend sind Workload, CPU-Reserve, Cache-Schutz, Treiber, Monitoring, Ersatzteilstrategie und die Fähigkeit des Teams, das System wiederherzustellen.

<figure class="learning-figure">
  <img src="/assets/learning/raid-operations.svg" alt="Vergleich der Datenpfade von Software- und Hardware-RAID sowie die Wiederherstellungskette von Ausfall über Ersatz und Rebuild bis zur wiederhergestellten Redundanz.">
  <figcaption>Eigene Lernskizze: Die Implementierung ändert Verantwortlichkeiten; der kontrollierte Rebuild bleibt in beiden Fällen ein Betriebsprozess.</figcaption>
</figure>

## Hot Spare, Hot Swap und Backup

- **Hot Spare** ist ein eingeschaltetes Reservelaufwerk. Es kann die Zeit bis zum Rebuild-Start verkürzen, erhöht aber nicht die grundlegende Ausfalltoleranz des RAID-Levels.
- **Hot Swap** ist die technische Fähigkeit, ein Laufwerk ohne Abschalten zu tauschen. Ob das erlaubt ist, hängt von Gehäuse, Controller, Betriebssystem und Betriebsanweisung ab.
- **Backup** ist eine getrennte, wiederherstellbare Kopie. Es schützt gegen andere Fehlerklassen als ein RAID und muss durch Restore-Tests geprüft werden.

<aside class="callout merk"><span class="lbl">Merksatz</span><p><strong>Spare startet, Swap tauscht, Backup stellt wieder her.</strong> Keiner der drei Begriffe ist ein RAID-Level.</p></aside>

## Durchgerechneter Betriebsfall

Ein Dateiserver nutzt acht HDDs à 4 TB in RAID 6 und besitzt eine zusätzliche 4-TB-HDD als globales Hot Spare.

1. **Nutzkapazität:** Nur die acht aktiven RAID-Laufwerke zählen: `(8 − 2) × 4 TB = 24 TB`.
2. **Erster Ausfall:** Das Array läuft degradiert weiter. Monitoring muss alarmieren.
3. **Automatischer Ersatz:** Das Hot Spare wird in das Array aufgenommen und der Rebuild startet. Die Nutzkapazität steigt dadurch nicht.
4. **Während des Rebuilds:** I/O-Last, Laufwerkszustand und Fortschritt beobachten; eine weitere Störung ist weiterhin kritisch.
5. **Nach dem Rebuild:** Redundanzstatus prüfen, defektes Laufwerk ersetzen, wieder ein Spare bereitstellen und Ursache sowie Verlauf dokumentieren.

<div class="formula"><span class="cap">Kapazität</span><strong>24 TB nutzbar · das Hot Spare zählt nicht dazu</strong></div>

## Geführte Übung

<section class="aufgabe">
  <div class="h"><span class="b">Schrittweise</span> Controller-Ausfall einplanen</div>
  <div class="body">
    <p>Ein Server verwendet Hardware-RAID. Die Laufwerke sind intakt, aber der Controller fällt aus. Welche Punkte gehören in einen Wiederanlaufplan?</p>
    <details data-hint="raid-ops-guided-1"><summary>Hinweis 1: Abhängigkeit</summary><div class="loesung"><p>Prüfe, welche Controllerfamilie, Firmware und Metadatenformate den vorhandenen Verbund importieren können.</p></div></details>
    <details data-hint="raid-ops-guided-2"><summary>Hinweis 2: Bevor du experimentierst</summary><div class="loesung"><p>Konfiguration und Laufwerksreihenfolge dokumentieren. Keine Initialisierung oder Neuerstellung des Arrays auslösen.</p></div></details>
    <details><summary>Musterlösung</summary><div class="loesung"><p>Passenden Ersatzcontroller und gesicherte Konfiguration bereithalten, Kompatibilität prüfen, vorhandene Metadaten kontrolliert importieren, Array zunächst lesend beziehungsweise ohne Initialisierung erkennen lassen, Status prüfen und danach einen Restore-Test aus der unabhängigen Sicherung durchführen.</p></div></details>
  </div>
</section>

## Karteikarten und Wiederholung

<div class="flashcard-grid">
  <button class="flashcard" type="button" data-flashcard="ops-spare-swap" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Hot Spare oder Hot Swap?</strong><small>Zum Umdrehen antippen</small></span><span class="face back"><span class="k">Antwort</span><span>Hot Spare ist das Reservelaufwerk; Hot Swap ist der Austausch im laufenden Betrieb.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="ops-controller-cache" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Was braucht ein Schreibcache?</strong><small>Zum Umdrehen antippen</small></span><span class="face back"><span class="k">Antwort</span><span>Einen zum System passenden Schutz gegen Stromausfall, etwa Batterie oder nichtflüchtigen Flash-Backed Cache.</span></span></button>
</div>
<div class="card-rating"><span>Karte „Spare/Swap“:</span><button type="button" data-card-id="ops-spare-swap" data-card-rate="known">gewusst</button><button type="button" data-card-id="ops-spare-swap" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="ops-spare-swap"></span></div>
<div class="card-rating"><span>Karte „Controller-Cache“:</span><button type="button" data-card-id="ops-controller-cache" data-card-rate="known">gewusst</button><button type="button" data-card-id="ops-controller-cache" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="ops-controller-cache"></span></div>

## Lernziel-Check: Transfer

Ein Virtualisierungshost soll auf Standardservern automatisiert ausgerollt werden. Das Team beherrscht die Software-RAID-Werkzeuge, überwacht Laufwerke zentral und hält Boot- sowie Metadaten-Dokumentation vor.

<section class="quiz" data-quiz="raid-ops-architecture" data-correct="1" data-required-objective="architecture">
  <h3>Welche Entscheidung ist auf Basis dieser Angaben am besten begründet?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Ein Hardware-Controller kann funktionieren, ist aus den genannten Anforderungen aber nicht automatisch überlegen."><span class="m">A</span> Hardware-RAID, weil es grundsätzlich schneller und sicherer ist</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Richtig: Kompetenz, Automatisierung und dokumentierte Metadaten sprechen hier für Software-RAID; die konkrete Leistung muss trotzdem gemessen werden."><span class="m">B</span> Software-RAID, weil es zum Betriebs- und Automatisierungskonzept passt</button>
  <button class="opt" type="button" data-answer="2" data-rationale="RAID 0 erfüllt keine Verfügbarkeitsanforderung und beantwortet außerdem nicht die Frage nach der Implementierung."><span class="m">C</span> RAID 0 ohne Monitoring</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Ein NAS wäre eine andere Speicherarchitektur und ist ohne weitere Anforderungen keine begründete Antwort."><span class="m">D</span> Immer ein NAS verwenden</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

<section class="quiz" data-quiz="raid-ops-recovery" data-correct="3" data-required-objective="recovery">
  <h3>Welche Reihenfolge beschreibt den sicheren Umgang mit einem Laufwerksausfall am besten?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Eine Neuinitialisierung kann vorhandene Metadaten überschreiben und gehört nicht an den Anfang."><span class="m">A</span> Array neu initialisieren → Alarm prüfen → Backup suchen</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Nur das defekte Laufwerk zu ziehen überspringt Alarmierung, Zustandsprüfung und Nachkontrolle."><span class="m">B</span> Laufwerk ziehen → Vorgang beenden</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Ein Hot Spare ersetzt weder die Zustandskontrolle noch die Wiederherstellung der Reserve nach dem Rebuild."><span class="m">C</span> Hot Spare vorhanden → keine weiteren Schritte nötig</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Richtig: Erst Zustand und Alarm prüfen, dann kontrolliert ersetzen oder Spare nutzen, Rebuild überwachen und anschließend Redundanz sowie Backup-Wiederherstellbarkeit kontrollieren."><span class="m">D</span> Alarm und Zustand prüfen → Ersatz/Rebuild → Redundanz prüfen → dokumentieren und Restore kontrollieren</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

## Quellen und Einordnung

<div class="src-block">
  <p><strong>EUROPA Prüfungsvorbereitung Teil 2 – Integratoren (2026):</strong> Hauptquelle für Hardware-/Software-RAID, Hot Spare und betriebliche Auswahlfragen.</p>
  <p><strong>ITLF6–9 (2022):</strong> Aufgabenbasis für Implementierungsvergleich und RAID-5/6-Betrieb.</p>
  <p><strong>Prüfungsvorbereitung IHK Bonn:</strong> Szenarien zu RAID 6, Hot Spare und Kapazitätsplanung.</p>
  <p class="source-note">Die Formulierungen, Aufgaben und Grafik sind eigenständig erstellt. Pauschalaussagen aus älteren Quellen wurden nicht übernommen; Fundstellen und Prüfentscheidungen stehen im Kurations-Sidecar.</p>
</div>

---
id: backup-methods
slug: backup-methods
title: Sicherungsarten auswählen und Restore-Ketten beherrschen
description: Voll-, differenzielle und inkrementelle Sicherungen vergleichen, Speicherbedarf berechnen und die passende Restore-Kette bestimmen.
domain: GA1
domain_label: Konzeption & Administration
group_id: ga1-4
group_label: Block 4 · Backup, Recovery und Notfallvorsorge
item_id: ga1-4__0
week: KW 38
estimated_minutes: 24
relevance: hoch
sources: ["europa-integratoren-2026", "ihk-bonn", "itlf10-12-2023"]
content_revision: 2026-09-11.1
content_status: CURATED_DRAFT
learning_objectives: ["backup-selection", "restore-chain"]
curation: content/curation/backup-methods.json
---
Bei einer Sicherungsstrategie zählt nicht nur, wie schnell ein Backup geschrieben wird. In der AP2 musst du den **Speicherbedarf**, die **Dauer der täglichen Sicherung** und vor allem den **Aufwand einer Wiederherstellung** gegeneinander abwägen.

<section class="learning-goals" aria-labelledby="backup-goals-title">
  <h2 id="backup-goals-title">Nach dieser Einheit kannst du …</h2>
  <ul>
    <li>Voll-, differenzielle und inkrementelle Sicherungen anhand ihrer Bezugsbasis unterscheiden und passend auswählen,</li>
    <li>für einen Wiederherstellungspunkt die benötigte Sicherungskette bestimmen und den Speicherbedarf berechnen.</li>
  </ul>
</section>

## Einstieg: Welche Kette würdest du laden?

<section class="quiz" data-quiz="backup-diagnostic" data-correct="2">
  <h3>Montag entsteht eine Vollsicherung, Dienstag bis Donnerstag je eine inkrementelle Sicherung. Was brauchst du für den Stand von Donnerstagabend?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Nur die letzte inkrementelle Sicherung enthält ausschließlich die Änderungen seit Mittwoch, nicht den vollständigen Stand."><span class="m">A</span> nur die Sicherung von Donnerstag</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Voll plus Donnerstag lässt die Änderungen von Dienstag und Mittwoch aus."><span class="m">B</span> Montag und Donnerstag</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Richtig: Bei der inkrementellen Methode baut jeder Änderungssatz auf seinem direkten Vorgänger auf."><span class="m">C</span> Montag, Dienstag, Mittwoch und Donnerstag</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Die Sicherungen allein genügen nur, wenn sie lesbar und vollständig sind; ein RAID ist für die Restore-Kette nicht erforderlich."><span class="m">D</span> alle Sicherungen und zusätzlich das RAID</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

Die Diagnose zählt noch nicht für den Abschluss. Sie zeigt, ob du beim Lernen besonders auf die Bezugsbasis einer Sicherung achten solltest.

<aside class="callout merk"><span class="lbl">Merksatz</span><p><strong>Voll sichert alles. Differenziell schaut zur letzten Vollsicherung zurück. Inkrementell schaut zur unmittelbar vorherigen Sicherung zurück.</strong></p></aside>

## Drei Sicherungsarten, drei Abwägungen

| Sicherungsart | Inhalt eines Laufs | Sicherungsdauer und Speicher | Wiederherstellung |
| --- | --- | --- | --- |
| **Vollsicherung** | gesamter definierter Datenbestand | pro Lauf am höchsten | nur die gewünschte Vollsicherung |
| **Differenziell** | Änderungen seit der letzten Vollsicherung | wächst bis zur nächsten Vollsicherung | letzte Vollsicherung plus letztes Differenzial |
| **Inkrementell** | Änderungen seit der letzten Sicherung, unabhängig von deren Art | meist kleine, gleichmäßigere Änderungssätze | letzte Vollsicherung plus alle folgenden Inkremente bis zum Zielzeitpunkt |

<figure class="learning-figure">
  <img src="/assets/learning/backup-chains.svg" alt="Zeitstrahl von Montag bis Freitag: Die Vollsicherung enthält alle Daten. Differenzielle Sicherungen enthalten zunehmend alle Änderungen seit Montag. Inkrementelle Sicherungen enthalten jeweils nur die Änderung seit dem Vortag. Für den Freitag-Restore braucht differenziell zwei und inkrementell fünf Sicherungssätze.">
  <figcaption>Eigene Lernskizze: Der Pfeil zeigt die Bezugsbasis; die Klammer darunter zeigt die Sicherungssätze, die für den Freitag-Restore gebraucht werden.</figcaption>
</figure>

Die Methode allein garantiert noch kein gutes Backup. Aufbewahrung, getrennte Fehlerdomänen, Zugriffsschutz, Überwachung und regelmäßig getestete Restores gehören zum vollständigen Konzept.

<aside class="callout"><span class="lbl">Prüfungsfalle</span><p>„Inkrementell ist besser, weil es weniger Speicher braucht“ ist unvollständig. Kleinere Sicherungsläufe werden mit einer längeren, störanfälligeren Restore-Kette erkauft. Die richtige Wahl hängt vom geforderten Wiederanlauf und vom verfügbaren Sicherungsfenster ab.</p></aside>

## Speicherbedarf grafisch rechnen

Eine Vollsicherung umfasst 500 GB. Von Dienstag bis Freitag ändern sich täglich 25 GB. Vereinfachend wird jedes geänderte Datenvolumen nur einmal gezählt und es gibt keine Kompression oder Deduplizierung.

### Differenzielle Woche

Jedes Differenzial enthält alle Änderungen seit Montag: Dienstag 25 GB, Mittwoch 50 GB, Donnerstag 75 GB und Freitag 100 GB.

<div class="math-display" role="group" aria-label="Speicherbedarf einer differenziellen Sicherungswoche"><math display="block" aria-label="fünfhundert Gigabyte plus zweihundertfünfzig Gigabyte ergibt siebenhundertfünfzig Gigabyte"><mrow><mn>500</mn><mtext> GB</mtext><mo>+</mo><mn>250</mn><mtext> GB</mtext><mo>=</mo><mn>750</mn><mtext> GB</mtext></mrow></math><div class="math-legend"><span><b>500 GB</b> Vollsicherung</span><span><b>250 GB</b> 25 + 50 + 75 + 100</span><span><b>750 GB</b> Wochenbedarf</span></div></div>

### Inkrementelle Woche

Jedes Inkrement enthält nur die täglichen 25 GB.

<div class="math-display" role="group" aria-label="Speicherbedarf einer inkrementellen Sicherungswoche"><math display="block" aria-label="fünfhundert Gigabyte plus vier mal fünfundzwanzig Gigabyte ergibt sechshundert Gigabyte"><mrow><mn>500</mn><mtext> GB</mtext><mo>+</mo><mn>4</mn><mo>×</mo><mn>25</mn><mtext> GB</mtext><mo>=</mo><mn>600</mn><mtext> GB</mtext></mrow></math><div class="math-legend"><span><b>500 GB</b> Vollsicherung</span><span><b>4 × 25 GB</b> Tagesinkremente</span><span><b>600 GB</b> Wochenbedarf</span></div></div>

<section class="aufgabe">
  <div class="h"><span class="b">Geführt</span> Differenziellen Speicherbedarf bestimmen</div>
  <div class="body">
    <p>Montag werden 800 GB vollständig gesichert. Dienstag ändern sich 20 GB, Mittwoch weitere 30 GB und Donnerstag weitere 10 GB. Wie viel Speicher belegen Vollsicherung und drei differenzielle Sicherungen zusammen?</p>
    <details><summary>Hinweis: Änderungssätze aufbauen</summary><div class="loesung"><p>Die Differenziale enthalten 20 GB, dann 20 + 30 = 50 GB und zuletzt 20 + 30 + 10 = 60 GB.</p></div></details>
    <div class="numeric-practice" data-numeric-practice="backup-guided-storage" data-expected="930" data-correct-feedback="Richtig: 930 GB für Vollsicherung und drei Differenziale." data-wrong-feedback="Noch nicht. Addiere 800 GB sowie die wachsenden Differenziale 20 GB, 50 GB und 60 GB.">
      <label for="backup-guided-answer">Gesamtbedarf in GB</label>
      <div class="answer-row"><input id="backup-guided-answer" data-numeric-input type="text" inputmode="decimal" autocomplete="off" placeholder="Ergebnis"><button type="button" class="lbtn" data-numeric-check>Antwort prüfen</button></div>
      <template data-numeric-correct><span>Richtig.</span><div class="math-display compact"><math display="block" aria-label="achthundert plus zwanzig plus fünfzig plus sechzig Gigabyte ergibt neunhundertdreißig Gigabyte"><mrow><mn>800</mn><mo>+</mo><mn>20</mn><mo>+</mo><mn>50</mn><mo>+</mo><mn>60</mn><mo>=</mo><mn>930</mn><mtext> GB</mtext></mrow></math><div class="math-legend"><span>Voll</span><span>Dienstag</span><span>Mittwoch</span><span>Donnerstag</span></div></div></template>
      <p class="practice-feedback" data-numeric-feedback aria-live="polite" hidden></p>
    </div>
  </div>
</section>

## Wiederherstellung als Ablauf

Vor dem Restore bestimmst du zuerst den gewünschten Zeitpunkt. Dann suchst du rückwärts die zugehörige Kette, prüfst ihre Lesbarkeit in einer getrennten Umgebung und stellst in der richtigen Reihenfolge wieder her.

<section class="sequence-practice" data-sequence="incremental-restore" data-expected="verify,full,increments,validate" data-correct-feedback="Richtig. Erst prüfst du Material und Ziel, dann spielst du die Vollsicherung und sämtliche Inkremente chronologisch ein; zum Schluss validierst du den wiederhergestellten Dienst." data-wrong-feedback="Prüfung und Vollsicherung stehen vor den chronologischen Inkrementen; die fachliche Validierung schließt den Restore ab." aria-labelledby="restore-sequence-title">
  <div class="lab-heading"><div><h3 id="restore-sequence-title">Bringe den inkrementellen Restore in Reihenfolge</h3><p>Montag Vollsicherung, Dienstag bis Donnerstag Inkremente. Stelle Donnerstagabend wieder her.</p></div><span class="lab-tag">Ablauf</span></div>
  <ol class="sequence-list" data-sequence-list>
    <li data-step="increments" tabindex="-1"><span class="step-position" data-step-position>1</span><span>Inkremente Dienstag, Mittwoch, Donnerstag chronologisch einspielen.</span></li>
    <li data-step="verify" tabindex="-1"><span class="step-position" data-step-position>2</span><span>Sicherungssätze und Zielsystem prüfen.</span></li>
    <li data-step="validate" tabindex="-1"><span class="step-position" data-step-position>3</span><span>Daten und Anwendung fachlich validieren, Ergebnis dokumentieren.</span></li>
    <li data-step="full" tabindex="-1"><span class="step-position" data-step-position>4</span><span>Vollsicherung von Montag einspielen.</span></li>
  </ol>
  <button class="lbtn" type="button" data-sequence-check>Reihenfolge prüfen</button>
  <p class="practice-feedback" data-sequence-feedback aria-live="polite" hidden></p>
</section>

## Moderne Varianten einordnen

- **Inkrementell-forever:** Nach einer initialen Vollsicherung werden fortlaufend Inkremente erfasst. Die Backupsoftware erzeugt für Restores logisch vollständige Stände oder führt die Kette intern zusammen. Ohne getestete Metadaten und Kataloge ist der Restore trotzdem riskant.
- **Synthetische Vollsicherung:** Der Backupserver kombiniert eine ältere Vollsicherung mit nachfolgenden Inkrementen zu einer neuen Vollsicherung. Das Quellsystem muss dafür nicht erneut alle Daten senden; auf dem Backupziel entsteht jedoch Lese- und Schreiblast.
- **Reverse Incremental:** Der jüngste Stand wird als direkt wiederherstellbares Vollbackup fortgeschrieben; ältere Zustände werden über Rückwärtsdifferenzen abgebildet. Die genaue Funktionsweise ist produktabhängig.

<aside class="callout"><span class="lbl">Saubere Formulierung</span><p>Eine synthetische Vollsicherung ist nicht „aus dem Nichts vollständig“. Sie wird auf dem Backupziel aus bereits vorhandener Vollsicherung und Änderungssätzen zusammengesetzt.</p></aside>

## Karteikarten und Wiederholung

<div class="flashcard-grid">
  <button class="flashcard" type="button" data-flashcard="backup-differential" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Welche zwei Sätze braucht ein differenzieller Restore?</strong><small>Zum Umdrehen antippen</small></span><span class="face back"><span class="k">Antwort</span><span>Die letzte Vollsicherung und das letzte Differenzial vor dem gewünschten Wiederherstellungspunkt.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="backup-synthetic" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Was entlastet eine synthetische Vollsicherung?</strong><small>Zum Umdrehen antippen</small></span><span class="face back"><span class="k">Antwort</span><span>Das Quellsystem und dessen Netzwerkpfad, weil die neue Vollsicherung auf dem Backupziel aus vorhandenen Sätzen erzeugt wird.</span></span></button>
</div>
<div class="card-rating"><span>Karte „Differenzieller Restore“:</span><button type="button" data-card-id="backup-differential" data-card-rate="known">gewusst</button><button type="button" data-card-id="backup-differential" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="backup-differential"></span></div>
<div class="card-rating"><span>Karte „Synthetisch voll“:</span><button type="button" data-card-id="backup-synthetic" data-card-rate="known">gewusst</button><button type="button" data-card-id="backup-synthetic" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="backup-synthetic"></span></div>

## Lernziel-Check: Transfer

<section class="recall-practice" data-recall="backup-core" data-min-length="45" aria-labelledby="backup-recall-title">
  <div class="recall-prompt"><h3 id="backup-recall-title">Abruf aus dem Kopf</h3><p>Erkläre ohne Zurückzuscrollen die Bezugsbasis von differenzieller und inkrementeller Sicherung sowie die jeweilige Restore-Kette.</p></div>
  <label class="sr-only" for="backup-recall-answer">Deine freie Antwort</label>
  <textarea id="backup-recall-answer" data-recall-input rows="4" placeholder="Bezugsbasis und Restore-Ketten …"></textarea>
  <div class="recall-actions"><span data-recall-count>0 Zeichen notiert</span><button class="lbtn" type="button" data-recall-reveal>Muster vergleichen</button></div>
  <div class="recall-model" data-recall-model hidden><strong>Muster:</strong> Differenziell sichert alle Änderungen seit der letzten Vollsicherung; für den Restore genügen Vollsicherung plus jüngstes Differenzial. Inkrementell sichert Änderungen seit der jeweils letzten Sicherung; der Restore braucht die Vollsicherung und alle folgenden Inkremente bis zum Zielpunkt.</div>
</section>

<section class="quiz" data-quiz="backup-transfer-selection" data-correct="1" data-required-objective="backup-selection">
  <h3>Ein System darf werktags nur kurz belastet werden. Am Wochenende ist ein längeres Sicherungsfenster verfügbar. Der Restore darf mehrere Sätze benötigen. Welche Grundstrategie passt am besten?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Tägliche Vollsicherungen vereinfachen den Restore, belasten das Quellsystem aber jeden Werktag am stärksten."><span class="m">A</span> täglich vollständig sichern</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Richtig: Eine wöchentliche Vollsicherung nutzt das lange Wochenendfenster; kleine werktägliche Inkremente halten die tägliche Belastung gering."><span class="m">B</span> am Wochenende voll, werktags inkrementell</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Differenziale wachsen im Wochenverlauf und belasten das kurze Werktagsfenster zunehmend."><span class="m">C</span> am Wochenende voll, werktags differenziell</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Eine Spiegelung ist keine unabhängige, versionierte Sicherungsstrategie und schützt nicht vor allen logischen Fehlern."><span class="m">D</span> nur eine synchrone Spiegelung</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

<section class="numeric-practice transfer-number" data-numeric-practice="backup-transfer-storage" data-required-objective="restore-chain" data-expected="640" data-correct-feedback="Richtig: 640 GB. Für den Donnerstag-Restore werden Vollsicherung sowie alle drei Inkremente benötigt." data-wrong-feedback="Noch nicht. Addiere zur Vollsicherung jedes Tagesinkrement von Dienstag bis Donnerstag.">
  <h3>Berechne Bedarf und erkenne die Restore-Kette</h3>
  <p>Montag: 400 GB vollständig. Dienstag: 60 GB inkrementell. Mittwoch: 80 GB inkrementell. Donnerstag: 100 GB inkrementell. Wie viel Speicher belegen diese vier Sätze zusammen?</p>
  <label for="backup-transfer-answer">Gesamtbedarf in GB</label>
  <div class="answer-row"><input id="backup-transfer-answer" data-numeric-input type="text" inputmode="decimal" autocomplete="off" placeholder="Ergebnis"><button type="button" class="lbtn primary" data-numeric-check>Ergebnis prüfen</button></div>
  <template data-numeric-correct><span>Richtig.</span><div class="math-display compact"><math display="block" aria-label="vierhundert plus sechzig plus achtzig plus einhundert Gigabyte ergibt sechshundertvierzig Gigabyte"><mrow><mn>400</mn><mo>+</mo><mn>60</mn><mo>+</mo><mn>80</mn><mo>+</mo><mn>100</mn><mo>=</mo><mn>640</mn><mtext> GB</mtext></mrow></math><div class="math-legend"><span>Voll</span><span>Inkrement 1</span><span>Inkrement 2</span><span>Inkrement 3</span></div></div><span>Für Donnerstag wird dieselbe vollständige Kette benötigt.</span></template>
  <template data-numeric-feedback-for="500">500 GB wären Vollsicherung plus Donnerstag-Inkrement. Die Änderungen von Dienstag und Mittwoch fehlen.</template>
  <template data-numeric-feedback-for="580">580 GB lässt einen der drei inkrementellen Sätze aus.</template>
  <p class="practice-feedback" data-numeric-feedback aria-live="polite" hidden></p>
</section>

## Quellen und Einordnung

<div class="src-block">
  <p><strong>EUROPA Prüfungsvorbereitung Teil 2 – Integratoren (2026):</strong> Hauptquelle für Sicherungsstrategien, Wiederherstellungsbezug und die Einordnung eines vollständigen Datensicherungskonzepts.</p>
  <p><strong>Prüfungsvorbereitung IHK Bonn:</strong> prüfungsnahe Rechenmuster für Voll-, differenzielle und inkrementelle Wochenpläne sowie das Generationenprinzip. Zahlen und Aufgaben dieser Einheit wurden neu erstellt.</p>
  <p><strong>IT-Berufe Fachstufe II – Lernfelder 10–12 (2023):</strong> Kontrollquelle zur Abgrenzung von Backup, Wiederherstellung und Archiv sowie zu Anforderungen an ein datenschutzgerechtes Konzept.</p>
  <p class="source-note">Text, Zahlen, Aufgaben und Grafik sind eigenständig erstellt. Buchseiten und Originalabbildungen bleiben in der privaten lokalen Wissensbasis.</p>
</div>

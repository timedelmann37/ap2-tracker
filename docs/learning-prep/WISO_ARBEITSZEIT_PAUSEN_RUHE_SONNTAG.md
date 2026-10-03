# Arbeitszeitgesetz: Pausen, Ruhezeit und Sonntagsarbeit

Stand: 03.10.2026. Kernthema: `wiso-2__4`.
Status: **CURATED_DRAFT**, menschliche Fachfreigabe ausstehend.

## Tatsächlich umgesetzt
- Eigener Erwachsenenfall Taren / Olvian; keine besondere Abweichungsregel,
  keine individuelle Nachtarbeits-, Bereitschafts- oder Jugendarbeitsschutzprüfung.
- Hauptfall 07:30–18:00, echte vorab feststehende Pausen 12:00–12:30 und
  15:00–15:15: 630 − 45 = 585 Minuten = 9 h 45 min = 9,75 Dezimalstunden.
  Arbeitsabschnitte 4 h 30 min, 2 h 30 min, 2 h 45 min geprüft.
- § 4: genau sechs, genau neun und mehr als neun sauber getrennt;
  Mindestteilpause 15 Minuten und höchstens sechs Stunden ohne Pause.
- § 3: acht Stunden werktäglich, bis zehn nur mit belegtem Durchschnittsausgleich
  innerhalb sechs Kalendermonaten oder 24 Wochen. Keine pauschale Wochen- oder
  Vertragsarbeitszeit aus dem Gesetz abgeleitet.
- Getrennter Ruhezeitfall 20:00–06:30 = 10 h 30 min; 07:00 erfüllt nur die
  Elf-Stunden-Vorgabe, nicht automatisch sämtliche Regeln des Folgedienstes.
- Sonn-/Feiertagsgrundregel; IT-Ausnahme nicht allein wegen Branche:
  § 10 Abs. 1 Eingangsvoraussetzung plus Nr. 14. Ersatzruhe nach § 11:
  Sonntag zwei Wochen, auf Werktag fallender Feiertag acht Wochen,
  jeweils einschließlich Beschäftigungstag. Weitere Grenzen bleiben bestehen.
- Diagnose, drei Pflichtchecks mit richtigem/falschem Feedback, eigene
  Zahlenübung, Freitext-Selbstvergleich, drei tastaturbedienbare Lernkarten.
- Zwei native technische SVGs und semantisches MathML mit Einheitenabstand.

## Geprüfte Quellen und Grenzen
- Amtliche Einzelnormen des [ArbZG](https://www.gesetze-im-internet.de/arbzg/):
  §§ 3, 4, 5 Abs. 1–3, 9 Abs. 1–3, 10 Abs. 1 Eingangssatz und Nr. 14,
  11 Abs. 1–4 direkt gelesen am 03.10.2026.
- § 2 Abs. 1 im amtlichen Suchtext tatsächlich gelesen; Einzelabruf Timeout.
  Nicht als erfolgreicher Direktabruf dokumentiert.
- Privater EUROPA-Rohtext im Hauptrepository, Zeile 9257:
  Arbeitszeitgesetz als Themenanker gelesen. Veraltete andere Gesetzesbeispiele
  nicht übernommen; keine Buchfrage, Lösung oder Grafik kopiert.
- Ausbildung-in-der-IT-Review: Quellenrolle und fallorientierte Didaktik gelesen;
  keine fremden Aufgaben übernommen, Inventur ist kein Faktencheck.
- Kein vollständiger Tarif-, Behörden-, Notfall- oder branchenspezifischer
  Sonderregelcheck; keine individuelle Dienstplanfreigabe. Keine automatische
  juristische Bewertung der freien Transferantwort.

## Gestaltung und tatsächliche QA
Bestehender Deep-Space-Referenz-Lock als Refero-Direct-Build-Ziel; keine
neuen Tokens oder Seitenrahmen. Vorhandene Leiharbeit-Seite als visuelle
Vergleichsbasis angesehen. Kein ASCII oder dekoratives Rasterbild.
- `npm test` auf der endgültigen Version erfolgreich: Build, Site,
  Learning-Compiler, Batch, Learning, Progress-Merge und Leaderboard-SQL.
  Site-Build: 905 Dateien.
- Lokale Buchqueue-/Buchdatenprüfungen ohne importierte Wissensbasis im Worktree
  explizit **SKIP**, nicht bestanden. Themenanker manuell im Hauptrepo gelesen.
- `AP2_BROWSER_ONLY=working-time node scripts/run-browser-tests.mjs` erfolgreich:
  falsche/richtige Antworten, Feedback, Diagnose ohne Freischaltung, Pflichtziele,
  Zurücksetzen, Zahlenübung falsch 630/richtig 585,0, Freitext-Mindestlänge,
  Musterantwort, Tastatur-Karten, gespeicherte Checks, Erledigt/Rücknahme.
  390 und 1440 px jeweils Dark/Light; Seitenüberlauf, Diagrammtextgrenzen,
  Karten-Vorder-/Rückseiten, MathML-Beschriftung und horizontales
  Diagramm-Scrolling geprüft. Keine vollständige Browser-Suite behauptet.
- Tatsächlich sichtgeprüft in `%TEMP%/ap2-zeit-20261003/`:
  `1440-dark-figure-0.png`, `1440-light-figure-1.png`,
  `390-light-formula-0.png`, `390-dark-card-reverse.png`.
  Formel nach ergänzt gesetztem Einheitenabstand erneut gebaut, getestet und angesehen.
- Keine Überlappung oder abgeschnittene Karten-/Diagrammbeschriftung festgestellt.
- Coverage nach Build: **291/380**, WiSo **20/109**, W2 **5/14**.
- Nur beabsichtigte Änderungen lokal sichern; kein Push, keine Veröffentlichung.
- Als Nächstes: `wiso-2__5`, Bundesurlaubsgesetz.

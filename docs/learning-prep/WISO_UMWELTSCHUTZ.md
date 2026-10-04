# Umweltschutz im Betrieb — abgeschlossener Abschnitt

Stand: 2026-10-04. Branch: `codex/ga1-linux-admin`.
Kernthema: `wiso-8__7`; Einheit: `umweltschutz-betrieb-abfall-elektroaltgeraete-gefahrstoffe`.
Status bleibt **CURATED_DRAFT**. Keine menschliche Fach-/Rechtefreigabe, kein Push, keine Veröffentlichung.

## Umfang und Didaktik

- Acht Abschnitte, 60 Minuten, vier beobachtbare Lernziele.
- Diagnose ohne Abschlussfreigabe, vier verpflichtende Lernzielfragen mit spezifischem Fehlfeedback.
- Eigene Fälle Mira und Sam, geführte Begründungsübung, Abruf mit mindestens 200 Zeichen vor Musteranzeige und vier Tastatur-Karten.
- Drei eigenständige technische SVG-Modelle: Abfallhierarchie, Elektrogeräteeinordnung, Gefahrstoff-Organisationskette. Keine Rasterbilder, keine übernommenen Buchgrafiken, keine Rechenformel benötigt.
- Ausgewählte Primärnormen und tatsächliche Abrufwege: [Quellenprüfung](WISO_UMWELTSCHUTZ_QUELLEN.md).
- Private EUROPA-Zeilen 489–493 im Hauptcheckout unmittelbar gelesen, nur Themenanker Umweltbelastungen, Energie/Material und Entsorgung. Kein behauptetes konkretes Buchkapitel zu Gefahrstoffen, keine Buchaufgabe übernommen.
- Grenzen: keine pauschale kostenlose kommunale Annahme, keine chemische Selbstversuchsanleitung, keine lokale Entsorgungsfreigabe und keine pauschale Akku-Ausbauanweisung.

## Gestaltung und Prüfung

Refero-Skill: direkter Build gegen bestehenden Deep-Space-Lock (Doppler/Inter/Glas, Astro-Atmosphäre und n8n-Verbindungen mit getrennten Rollen). Gemeinsame Lernkomponenten und native Compiler-SVGs wiederverwendet; keine globalen Tokens, Styles oder Shell geändert.

- `npm run build`: erfolgreich, 1149 Dateien.
- `npm test`: erfolgreich; abschließend nach Diagrammkorrektur wiederholt. Site-Allowlist, Compiler/Batch, Lerninhalte, Fachtools, Fortschrittsmerge und SQL-Prüfungen ausgeführt.
- Zwei bestehende SKIPs für nicht importierte lokale Wissensbasis/Buchdaten im Worktree bleiben sichtbar. Das ist keine vollständige lokale Buchdaten-Prüfung.
- `AP2_BROWSER_ONLY=umweltschutz node scripts/run-browser-tests.mjs`: erfolgreich nach Korrektur. Kein behaupteter Lauf der gesamten Browser-Suite.
- Lokale angemeldete Browser-Fixture; keine echte Cloud-Anmeldung oder produktive Synchronisation geprüft.
- 390×900 und 1440×900, jeweils Dark/Light und Reduced Motion.
- Geprüft: falsche/richtige Antworten, konkrete Rückmeldung, Diagnose ohne Gate-Freigabe, vier Pflichtziele, Abruf-Mindestlänge, Karten per Enter/Space, Zustand nach Reload, Abschluss und Rücknahme, erneute Sperre nach Quiz-Reset.
- Dokumentbreite und Titel ohne Overflow; Karteninhalte und SVG-Text innerhalb ihrer Grenzen. Mobile Diagramme absichtlich seitlich scrollbar, mit Hinweis und geprüftem Tastatur-Scroll.
- 36 Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-umweltschutz-20261004/`.
- Tatsächlich visuell angesehen: 390-dark-figure-0, 390-light-recall, 1440-dark-figure-2, 1440-light-case, 1440-light-figure-0, 390-dark-quiz, 1440-dark-figure-1. Kein Layout-/Kontrastproblem in diesen Ansichten gefunden.
- Browserlauf ohne JavaScript-Seitenfehler.

## Behobene Prüfprobleme

Der erste Asset-Test scheiterte, weil neue SVGs wegen einer bestehenden leeren Git-Sperrdatei nicht vorgemerkt werden konnten. Nach Prüfung auf laufende Git-Prozesse und Dateigröße wurde nur die exakt benannte Sperrdatei recoverbar umbenannt; kein Löschen von Git-Daten. Danach Asset-Test erfolgreich.

Der erste Browserlauf meldete zu breite Beschriftungen im Hierarchie-SVG. Die Rangstufen tragen nun kurze Stufenlabels und vollständige Begriffe in der Inhaltszeile. Browserlauf danach erfolgreich, ohne Änderung am globalen Compiler.

## Ergebnis

Abdeckung nach Build: **364/380**, **16 verbleibend**; WiSo **93/109**.
Nächstes offenes Kernthema: `wiso-8__8` — Verursacherprinzip und Gemeinlastprinzip.

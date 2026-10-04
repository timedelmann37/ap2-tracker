# WiSo 9.6: Integration der beiden Übungsbögen

Stand: 04.10.2026. Branch: `codex/ga1-linux-admin`. Status: **CURATED_DRAFT**, menschliche fachliche und didaktische Freigabe ausstehend.

## Abgeschlossener Inhaltsabschnitt

Die neue Einheit [Zwei WiSo-Übungsbögen unter Zeit](../../content/learning-units/wiso-zwei-uebungsboegen-unter-zeit.unit.json) bildet `wiso-9__6` ab. Zwei vollständig eigenständig formulierte Bögen enthalten je 24 Single-Choice-Fälle mit vier Optionen und unter den ausdrücklich gesetzten Voraussetzungen genau einer passenden Antwort. Der Richtwert ist 150 Minuten: je 60 Minuten mit externer Uhr und 30 Minuten gemeinsamer Auswertung nach beiden Durchläufen.

Diagnose ohne Pflichtgate, vier Methodenchecks mit spezifischem Feedback und Wiederholen, freier Transfer und vier Tastatur-Lernkarten sind integriert. Die vollständigen 48 Schlüssel und Einzelbegründungen stehen nur im zunächst verborgenen Recall-Muster. Mindestens 500 eingegebene Zeichen erlauben dessen Öffnung; die Länge bewertet weder Antwortqualität noch tatsächlich verstrichene Zeit. Die Lösungen sind technisch im ausgelieferten Quelltext enthalten, nicht gegen absichtliches Nachsehen gesichert.

Eine präzise technische SVG-Ablaufgrafik zeigt die getrennten Durchläufe und Protokolle. Acht Rechenausdrücke der Musterlösung werden als natives MathML mit zugänglichen Namen und semantischen Brüchen gerendert. Keine dekorativen KI-Rasterbilder und kein ASCII-Ersatz.

## Herkunft und Nachweisgrenzen

Die [fragegenaue Quellenmatrix](WISO_SIMULATIONEN_QUELLEN.md) dokumentiert 40 Register-IDs/Evidence-Einträge, aktuelle gelesene Primärtexte und Abrufgrenzen. Der private Buchauszug ist ausschließlich der überprüfte allgemeine Themenanker; die im Tracker genannten Buchsimulationen, Seiten, Aufgaben und Lösungen wurden nicht nachgebildet. Der zusätzliche amtliche BMF-DSGVO-Auszug 2026 ist im Quellenregister integriert. Die fachlich-didaktische Gegenprüfung las alle 48 eigenen Aufgaben, kontrollierte die passenden Optionstexte und überprüfte kritische Rechtsgrundlagen ohne Korrekturbedarf. Das ist keine wissenschaftliche Validierung des Schwierigkeitsgrads.

Keine Original-IHK-Fragen, keine behauptete aktuelle Prüfungsfragenzahl, keine automatische Zeit-/Punkte-/Notenprüfung und keine Gleichwertigkeit beider Bögen. Ein App-Abschluss weist die vier Methodenchecks nach, nicht zwei tatsächlich durchgeführte Zeitversuche. Wiederholung bekannter Bögen misst auch Erinnerung.

## Tatsächliche Prüfungen

- `npm test`: bestanden nach Integration und letzter Runtime-Korrektur. Build: 1211 Dateien. Compiler-, Site-, Lernbatch-, Inhalts-, Rechen-/Diagramm-, Fortschrittsmerge- und SQL-Tests bestanden. Zwei bekannte SKIP: private Wissensbasis/Lernqueue und private Buchdaten sind in diesem Worktree nicht importiert.
- `scripts/verify-simulationen-browser.mjs` über den lokalen Browserrunner: bestanden. Alle 48 Fragen sichtbar, keine Schlüssel vor der Öffnung, Diagnose ohne Pflichtwirkung, falsches/spezifisches Feedback und Retry-Fokus, vier Pflichtgates, 499/500-Zeichen-Grenze, 48 Musterbegründungen, acht native MathML-Ausdrücke, Reload/Persistenz, Abschluss/Rücknahme und erneute Sperre nach Reset geprüft.
- Responsive Browserprüfung: 320, 390 und 1440 px, Dark/Light und Reduced Motion. SVG-Labelcontainment, Diagramm-/Seitenbreite und Tastatur-/AX-Zustand der Karten geprüft. Keine JavaScript-Seitenfehler in dieser Prüfung.
- Batched Sichtprüfung unter anderem: 390 px Light-Bogen A, 320 px Light-Schlüssel, 1440 px Dark-Ablaufgrafik und Dark-Schlüssel. Die gemeinsame Lernrahmen-Sichtprüfung und ein verbleibender Tablet-Restpunkt sind [gesondert dokumentiert](LERNRAHMEN_IMPECCABLE_20261004.md).
- `npm run test:learning-runtime`: bestanden mit ausschließlich lokalen Cloud-Fixtures; kein Produktionskonto oder echter Supabase-Schreibzugriff getestet.

Coverage nach Build: **380 von 380 Kernthemen zugeordnet**, WiSo **109 von 109**. Im Manifest bleiben alle 380 Lernseiten `CURATED_DRAFT`. Coverage ist eine technische Zuordnung, keine menschliche Inhaltsfreigabe und keine Aussage, dass jede Seite in diesem Lauf visuell geprüft wurde.

## Gemeinsame Änderungen und Lieferung

Der neue Inhalt wurde gemeinsam mit der beauftragten Impeccable-Verfeinerung integriert. Der Compiler erzeugt Recall-Absätze und streng erlaubtes MathML; Template, Navigation, Check-Beschriftung, mobile Textalternativen und Runtime sind gemeinsam wiederverwendet. Die ausführliche Rechtsformen-Einheit behält ihre inhaltlichen Einschränkungen und wurde in sichtbare Lernrunden sowie acht gleich strukturierte Vergleiche gegliedert.

Nur beabsichtigte Quelldateien und deren reproduzierbare Build-Ergebnisse gehören zur lokalen Lieferung. Keine Veröffentlichung, kein Push, keine Branch-Löschung. Der noch offene Tablet-Restpunkt verhindert ausdrücklich die Behauptung eines vollständig abgeschlossenen UI-Audits.

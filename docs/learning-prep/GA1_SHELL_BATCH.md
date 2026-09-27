# Redaktions- und Prüfnotiz: Bash und PowerShell

Stand: 17.09.2026. Zwei Einheiten, `ga1-9__6` und `ga1-9__7`,
jeweils `CURATED_DRAFT`. Menschliche Fachfreigabe bleibt offen.

## Quellenentscheidungen

- Privater Buch-Batch `ga1-9-006-007`, begrenzte Ausschnitte ausgewertet.
- Bash: ITLF10–12 PDF-Seite 115 als Kontext. Die Gleichsetzung von
  Standardströmen mit `$0`, `$1`, `$2` ausdrücklich korrigiert:
  Dateideskriptoren 0/1/2 sind nicht Positionsparameter.
- GNU-Handbuch: indexierte offizielle Abschnitte zu Parametern, Skripten,
  Umleitungen und Pipelines abgeglichen. Direkte Seitenabrufe scheiterten;
  deshalb keine vollständige Lektüre behauptet. Beispiele zusätzlich in
  echtem Bash 5.3.15 geprüft.
- PowerShell: unpassende Buchtreffer zu Chocolatey, Index und Authentisierung
  ausgeschlossen. Microsoft Learn zu Pipelines, Import-Csv, foreach,
  Cmdlet-Verben und New-ADUser in ausgewählten Abschnitten gelesen.
- Neun Webquellen separat registriert. Buchdateien unverändert.

## Didaktik und Sicherheitsgrenzen

Vier eigene Ablaufgrafiken, Ausgabevorhersagen, Fehlersuche, Zahlenübungen,
Sortieraufgaben, freie Erklärungen, sechs Karten und vier Pflichtnachweise.
Bash behandelt leere und mehrteilige Argumente, Standardströme, Exit-Status
und pipefail. PowerShell trennt Objektpipeline, CSV-Struktur und Änderungen.
Freie Antworten werden mit einer Musterlösung verglichen, nicht benotet.

Ausführbare Beispiele verändern keine Systeme. PowerShell verarbeitet nur
eingebetteten CSV-Text. Der AD-Ausschnitt ist ein Lesebeispiel; keine AD-Aufrufe,
Kontenanlage oder Passwortverarbeitung wurden ausgeführt. WhatIf wird nicht
als Nachweis einer erfolgreichen späteren Anlage dargestellt.

## Prüfung

`npm test` erfolgreich. `scripts/verify-shell-examples.mjs` liest die Beispiele
direkt aus den Einheiten und prüft sie in echten Bash-/PowerShell-Prozessen:
keine/leere/mehrteilige Argumente, wörtlicher Stern, Ausgabeströme,
Pipeline-Status sowie null/ein/mehrere CSV-Treffer. PowerShell kann über
`AP2_PWSH` angegeben werden, Bash über `AP2_BASH`.

Gezielter Browserlauf für beide Einheiten: Fehlfeedback, Reset, Tastatur,
Zahlen, Reihenfolge, freie Antwort, Speicherung, Pflichtziel-Gates,
Abschluss/Rücknahme und Karten. 390/1440px, Dark/Light, repräsentative
Screenshots visuell geprüft; lange Codezeilen für Mobilansicht umgebrochen.
Der gemeinsame Browserrunner enthält den neuen Test. Vollständige
Browserregression zuletzt im Vorgängerbatch, nicht erneut in diesem Batch.

Abdeckung nach Build: 126/380, GA1 18/164, Automatisierungsgruppe 12/16.
Kein Push und keine Veröffentlichung.

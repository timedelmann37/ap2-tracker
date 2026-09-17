# Redaktions- und Prüfnotiz: Git, CI/CD und Ansible

Stand: 17.09.2026. Drei gebaute Einheiten, jeweils `CURATED_DRAFT`.
Kanonische Schlüssel: `ga1-9__13`, `ga1-9__14`, `ga1-9__11`.
Die vorhandene YAML-/JSON-Einheit wurde nicht dupliziert.

## Quellenentscheidungen

- Privater Batch `ga1-9-011-014`: nur begrenzte Ausschnitte ausgewertet.
- Git: ITLF10–12 PDF-Seite 124 als Buchkontext. OCR-/Begriffsunschärfen
  korrigiert: Index hält einen vorgemerkten Stand, spätere Arbeitsänderungen
  sind nicht automatisch im Commit; untracked heißt nicht außerhalb des Ordners.
  Pro Git Grundmodell und Merge-Kapitel als Primärabgleich.
- Ansible: ITLF10–12 PDF-Seiten 127, 128, 134 als Kontext. Keine alten
  Modulzahlen, keine Gleichsetzung von Modulen/Plugins und keine universelle
  SSH-Behauptung übernommen. Offizielle Ansible-Begriffe und Check-Mode-Regeln
  geprüft. Task `check_mode: false` als wichtige Ausnahme ausdrücklich erklärt.
- Werkzeugabgrenzung: aktuelle Grundlagen von Terraform, Puppet und Chef;
  Schwerpunkte statt starrer Ausschlussmatrix. Quellenlinks in Einheit/Registry.
- CI/CD: RACI, Java und Stellenanzeige aus dem Buch-Batch nicht als technische
  Belege verwendet. GitLab-Pipeline-Grundmodell und Deployment-Strategien
  herangezogen. Keine Behauptung, sämtliche Buchkapitel oder Websites gelesen
  zu haben.

## Eigene Aufgabenmodelle

- Git: Editorstand 12, Index 8, letzter Commit 5; gesichert wird 8.
  Transferrechnung: Index 6, Arbeitsdatei 9; gesichert wird 6.
- CI/CD: 2 + max(1, 5) + 1 = 8 Minuten; Transfer 3 + max(2, 6) + 1 = 10.
  Auf der Seite als MathML gesetzt. Annahmen: genug parallele Kapazität,
  keine Warte-/Transferzeiten, alle Jobs Pflicht, keine Abhängigkeitsausnahmen.
- Ansible: ausgewählte Testgruppe bestimmt Ziele, nicht alle Inventory-Hosts.
  Drei Testhosts bleiben drei Ziele trotz zwei weiteren Produktionshosts.
- Sechs eigene Diagramme; keine übernommenen Buchabbildungen.
- Jede Einheit: Diagnose, Erklärung, Vorhersagefall, Zahleneingabe,
  Sortierung, freie Erklärung, drei Karten und zwei Pflichtnachweise.
  Freitexte werden per Mustervergleich geprüft, nicht automatisch benotet.

## Prüfung

`npm test` erfolgreich. Gezielter Dreier-Browsertest erfolgreich:
Fehlfeedback, Reset, Tastatur, Zahlenwerte, Reihenfolge, freie Antwort,
Speicherung, Pflichtziel-Gates, Abschluss/Rücknahme und Karten.
390/1440px in Dark/Light geprüft, repräsentative Screenshots visuell kontrolliert.
Vollständiger gemeinsamer Browserlauf ebenfalls erfolgreich: Navigation,
Theme-Persistenz, bisherige Lernmodule, Bewegung, Pause und Reduced Motion.
Abdeckung nach Build: 124/380, GA1 16/164.
Menschliche Fachfreigabe und Veröffentlichung bleiben offen.

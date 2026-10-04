# WiSo W5: Träger, Leistungen und Beitragsverteilung

Stand: 04.10.2026. Kernthema wiso-5__1, CURATED_DRAFT bis menschliche Freigabe.

## Fertiger Abschnitt

Eigene Velaro/Sen-Fälle: Zweig, Träger, Leistung und wirtschaftliche Beitragslast trennen; fünf Träger zuordnen; Leistungsbeispiele ohne Bewilligung; allgemeine RV/ALV/KV-Regelteilung einschließlich KV-Zusatzbeitrag; Pflege-Kinderlosenzuschlag, Kinderabschläge und Sachsen; Arbeitgeberfinanzierung gewerblicher UV. Fehlender Arbeitnehmerabzug widerlegt Versicherungsschutz nicht. Keine Prozentberechnung oder pauschale Übertragung auf Sonderbeschäftigung.

Diagnose, vier Pflichtchecks, Anwendung mit Feedback, Recall vor Musterlösung, vier Tastaturkarten. Zwei native technische SVG: fünf parallele Trägerzeilen und drei Beitragsgruppen. Keine dekorativen Rasterbilder/ASCII; keine Formel erforderlich.

## Quellen und Design

Private EUROPA-Rohquelle Zeile 5598 direkt als Themenanker für Träger und Beitragslast gelesen; keine Buchfälle/Grafiken oder Beitragswerte übernommen. SGB V § 4, XI § 46, VI § 125, III § 367 direkt per Web gelesen. DRV Beitragstragung, BMG KV-Beiträge/PV-Finanzierung einschließlich Kinderabschnitt, BMAS UV-Leistungen/Träger/Finanzierung, BMG Krankenleistungen und DRV Rentenarten direkt gelesen. SGB III §§ 1/137 nach Webfehler per HTTPS geprüft; Sandbox-Socketbeschränkung mit freigegebenem lesendem Aufruf überwunden. Quellenbelege im bestehenden Schema.

Refero-Skill und Visual-Workflow vollständig gelesen, vorhandenen Leseweg betrachtet, Deep-Space-Referenzbindung und aktuelle Repositoryvorgaben abgeglichen. Bestehende Rahmenkomponenten, gemeinsame Tokens und Diagrammrenderer unverändert wiederverwendet.

## Tatsächliche Prüfung

- Build bestanden: 989 Dist-Dateien.
- npm test bestanden. Zwei SKIPs für nicht importierte private Wissensbasis/Lernqueue und Buchdaten im Worktree; Themenanker separat im Hauptcheckout gelesen.
- Gezielter Chromium-Lauf AP2_BROWSER_ONLY=sozialtraeger bestanden.
- 390/1440 px, Dark/Light, Reduced Motion: Diagnose ohne Gatewirkung, vier Pflichtchecks falsch/richtig/Reset und erklärendes Feedback.
- Recall-Längensperre, Musterlösung, Karten Enter/Space, Textcontainment Vorder-/Rückseite.
- Fortschrittspersistenz nach Reload; Abschluss/Rücknahme; erneute Abschlusssperre nach Check-Reset.
- SVG-Texte innerhalb Canvas/eigener Zeile/Spalte; Kürzel innerhalb Schlüsselbereich ohne Detailüberlappung.
- Mobile Diagramme per Tastatur horizontal scrollbar; kein horizontaler Seitenüberlauf, keine pageerrors.
- Vier Screens selbst angesehen: Desktop-Dark Trägerzeilen, Desktop-Light Beitragsvergleich, Mobile-Dark Kartenrückseite, Mobile-Light Leistungsquiz.
- Screens: C:/Users/timed/AppData/Local/Temp/ap2-traeger-20261004, nicht versioniert.
- Kein vollständiger Browser-Gesamtlauf oder WCAG-/Screenreader-Audit behauptet.

Coverage 319/380, WiSo 48/109, W5 2/14. Nächstes offenes Kernthema wiso-5__2: Ablauf nach Arbeitsunfall.

Vorprüfung 02:22:50 UTC, nach Abschnitt 02:29:54 UTC. Wochenlimit vor/nach 63 Prozent verbraucht; gewöhnliche Nutzung erlaubt, kein Reset.
Nur beabsichtigte Änderungen lokal sichern, kein Push, keine Veröffentlichung/Branch-Löschung.

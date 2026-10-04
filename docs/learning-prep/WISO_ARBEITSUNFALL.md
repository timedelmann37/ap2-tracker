# WiSo W5: Ablauf nach einem Arbeitsunfall

Stand: 04.10.2026. Kernthema wiso-5__2, CURATED_DRAFT bis menschliche Freigabe.

## Fertiger Abschnitt

Eigene Neravo/Eda/Len-Fälle: Erste Hilfe vor Bürokratie, D-Arzt-Kriterien, Unternehmeranzeige mit eigener Schwelle und Frist, Arztbericht als separater Informationsweg, bedarfsabhängige Reha und abgestimmte Rückkehr. Keine Versicherungsschutzbewilligung, medizinischen Behandlungsanweisungen oder automatische Vollbelastungsfreigabe.

Diagnose, vier Pflichtchecks, Sortier-Anwendung mit Feedback, Recall vor Musterlösung, vier Karten. Zwei native technische SVG: vereinfachte Fünf-Stationen-Lernfolge und Schwellenvergleich. Text und Caption stellen klar, dass Anzeige parallel laufen kann und keine starre Wartekette gilt. Keine dekorativen Rasterbilder/ASCII; keine Formel erforderlich.

## Quellen und Design

EUROPA-Rohquelle Zeile 5601 direkt als Arbeitsunfall-Themenanker gelesen. Suche nach Durchgangsarzt/Unfallmeldung/Erste Hilfe lieferte in diesem Rohpaket keinen Ablaufbeleg; Reihenfolge und Kriterien aus aktuellen Primärquellen aufgebaut. Keine Buchfälle oder Abbildungen kopiert.
DGUV Erstversorgung, Arbeitsunfall-Verhalten, Verfahren und berufliche Teilhabe ausgewählte Abschnitte direkt gelesen. SGB VII § 193 nach Web-Timeout per genehmigtem lesendem HTTPS-Aufruf direkt geprüft. Anzeige binnen drei Tagen nach Kenntnis und mehr als drei Tage AU nicht verwechseln; Sofortmeldungen schwerer Ereignisse ausdrücklich benannt.

Refero-Skill und Visual-Workflow gelesen, bestehende Lernseite betrachtet, Deep-Space-Lock und aktuelle Repo-Anweisungen abgeglichen. Der Skill begründet Referenzbindung und tatsächliche Sichtprüfung; bestehende Rahmenkomponenten, Tokens und Diagrammrenderer unverändert.

## Tatsächliche Prüfung

- Endfassung Build erfolgreich: 992 Dist-Dateien.
- npm test erfolgreich; zwei SKIPs für im Worktree nicht importierte private Wissensbasis/Lernqueue und Buchdaten. Themenanker separat im Hauptcheckout gelesen.
- Gezielter Chromium-Lauf AP2_BROWSER_ONLY=arbeitsunfall erfolgreich.
- Erster Browserlauf fand Textüberlauf im Schwellenvergleich. Detail gekürzt; Build, Tests und Browserlauf danach erneut bestanden.
- 390/1440 px, Dark/Light, Reduced Motion: Diagnose ohne Gatewirkung; Pflichtchecks falsch/richtig/Reset mit erklärendem Feedback.
- Recall-Längensperre/Musterlösung, Karten Enter/Space und Textcontainment Vorder-/Rückseite.
- Fortschrittspersistenz nach Reload, Abschluss/Rücknahme, erneute Abschlusssperre.
- SVG-Text innerhalb Canvas und eigener Station/Spalte, mobile Tastatur-Scrollbarkeit, kein horizontaler Seitenüberlauf, keine pageerrors.
- Vier Screens selbst angesehen: Desktop-Dark Ablauf, Desktop-Light Schwellen, Mobile-Dark Kartenrückseite, Mobile-Light D-Arzt-Quiz.
- Screens C:/Users/timed/AppData/Local/Temp/ap2-unfall-20261004, nicht versioniert.
- Kein vollständiger Browser-Gesamtlauf oder WCAG-/Screenreader-Audit behauptet.

Coverage 320/380, WiSo 49/109, W5 3/14. Nächstes offenes Kernthema wiso-5__3: zuständiges Gericht je Streitfall.
Vorprüfung 02:38:07 UTC; Endfassung geprüft bis 02:43:04 UTC. Wochenlimit vorher 63, danach 64 Prozent verbraucht; gewöhnliche Nutzung erlaubt, kein Reset.
Nur beabsichtigte Änderungen lokal sichern, kein Push, keine Veröffentlichung oder Branch-Löschung.

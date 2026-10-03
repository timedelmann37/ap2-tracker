# Betriebsdokumentation – ga1-10__6

Stand: 03.10.2026. CURATED_DRAFT, menschliche Freigabe ausstehend.

## Tatsächlich umgesetzt

Eigener Mohnfeld-Fall einer Hostmigration: Betriebshandbuch mit Gültigkeit,
Voraussetzungen, kontrolliertem Erfolgstest und Abbruchweg; physischer/logischer
Netzplan und Soll-/Ist-Abgleich; stabile Asset-ID, Lebenszyklus und CI-Beziehung;
Wissensartikel mit Versionsgrenze, Review und geschütztem Notfallzugriff.
Diagnose, vier Pflichtchecks mit individuellen Fehlerrückmeldungen, eigene
Transferantwort und sieben per Tastatur bedienbare Abrufkarten. Zwei editierbare
SVG-Diagramme; keine dekorativen Rasterbilder, keine künstliche Formel.

## Quellen und Aussagegrenzen

- Microsoft: https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/formalize-operations-tasks
  Actionable checklists und Documentation as a living asset direkt gelesen.
  Eigene Vorlagen, keine Cloudinstallation oder verbindliche Norm behauptet.
- NetBox: https://netboxlabs.com/docs/netbox/introduction/
  Key Features, What NetBox Is Not, Interface-Bezug und Source of Truth direkt gelesen.
  Sollmodell ist ausdrücklich kein Live-Monitoring und kein Erreichbarkeitsnachweis.
- Privater Themenanker europa-integratoren-2026:00038, Zeilen 443–468 direkt geprüft:
  Tests dokumentieren/Systemübergabe. Keine Buchaufgaben übernommen.
- AUSBILDUNG_IT_SOURCE_REVIEW berücksichtigt: eigene Fälle und Nachweise statt
  kopierter Portalaufgaben. Asset-/CI-Abgrenzung und Wissensartikelvorlage sind
  eigene didaktische Struktur, keine Übernahme einer Anbieter-Norm.

## Gestaltung und Prüfung

Bestehendes Deep-Space-Lernsystem als direkter Build-Target, Refero-Lock und
Komponentennotizen gelesen: Doppler-Flächen/Inter, Astro nur Hintergrund,
n8n-Verbindungen nur für technische Beziehungen. Keine globale Stiländerung.
Die erste schmale Vergleichsgrafik wurde nach Sichtprüfung durch breitere
getrennte Zeilen ersetzt; das Diagramm behauptet keine Reihenfolge der Rollen.

- npm run build bestanden.
- npm test bestanden.
- AP2_BROWSER_ONLY=operations-docs npm run test:browser bestanden, nach
  Diagrammkorrektur erneut bestanden. Isolierter Abschnitt, nicht gesamte Browsersuite.
- Falsche/richtige Antworten, erklärendes Feedback, Reset-Sperre, eigener Abruf
  vor Musterlösung, Enter/Space-Karten, Persistenz, Markieren und Rücknahme geprüft.
- 390/1440 px, Dark/Light, Reduced Motion, kein Seitenüberlauf und seitlich per
  Tastatur erreichbare Diagramme geprüft.
- Screenshots tatsächlich betrachtet: 1440-dark-figure-0 (auch nach Korrektur),
  390-light-figure-0 (nach Korrektur), 390-light-figure-1, 1440-light-start,
  390-dark-start. Keine verbleibenden relevanten Layoutprobleme festgestellt.

Coverage nach Build: 233/380 Entwürfe, GA1 125/164, dort 39 offen.
Nur beabsichtigte lokale Änderungen; kein Push und keine Veröffentlichung.

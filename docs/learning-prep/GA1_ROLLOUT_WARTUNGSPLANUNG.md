# Rollout und Wartungsplanung – ga1-10__7

Stand: 03.10.2026. CURATED_DRAFT, menschliche Freigabe ausstehend.

## Abgeschlossene Arbeit

Eigener Tannried-Fall: 72 Druckclients, zwei Druckertypen und VPN-Außenstelle.
Produktionsnahe Tests mit dokumentierten Lücken; sechs repräsentative Pilotgeräte;
Nutzungsnachweise und organisationsbezogene Freigabegates; Wartungsfenster mit
spätester Rückfallentscheidung und reservierter Wiederherstellungsprüfung.
Eigene Vorab-, Zwischen- und Abschlusskommunikation. Pilotbeobachtung über
Arbeitstage ausdrücklich vom Installationsfenster getrennt.

Diagnose, vier Pflichtchecks mit individuellen Fehlerrückmeldungen, Transfer
vor Musterlösung und sieben Tastatur-Abrufkarten. Zwei präzise SVG-Abläufe im
vorhandenen Renderer; keine dekorativen Bilder oder unnötigen Formeln.

## Quellen und Grenzen

- Microsoft Safe deployment practices: Progressive exposure, health models,
  failure detection und safety guardrails direkt gelesen am 03.10.2026.
  https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments
- Microsoft Create a deployment plan: Limited ring und repräsentative Geräte/
  Anwendungen direkt gelesen. Historische Desktop-Analytics-/Insider-Einstellungen
  ausdrücklich nicht übernommen; keine Empfehlung solcher Produkte.
  https://learn.microsoft.com/en-us/windows/deployment/update/create-deployment-plan
- AWS Communicate status through dashboards: Implementation steps 1, 3, 5, 6
  direkt gelesen; nur Zielgruppen, verständlicher aktueller Status und Zugang.
  https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/ops_event_response_dashboards.html
- Privater Themenanker europa-integratoren-2026:00038, Zeilen 443–468 direkt geprüft:
  Tests dokumentieren, Aktualisierungen evaluieren, Systemübergabe planen.
  Keine Buchaufgaben übernommen. AUSBILDUNG_IT_SOURCE_REVIEW berücksichtigt:
  unabhängige Fälle und begrenzte Aussagen statt Portalaufgaben kopieren.

Geräteanzahl, Pilotumfang, zwei Beobachtungstage, Zeitbudget und Abbruchregeln
sind eigene Fallannahmen, keine universellen Werte oder verbindliche Norm.

## Gestaltung und belegte Prüfung

Refero-Skill, DESIGN und bestehender Referenz-Lock gelesen. Bestehende Lernseite
als Build-Target visuell gesichtet: Doppler-Flächen/Inter, Astro nur Hintergrund,
n8n-Verbindungen nur im Ablauf; gemeinsame Tokens und Komponenten unverändert.

- npm run build und npm test bestanden.
- AP2_BROWSER_ONLY=rollout-planning npm run test:browser bestanden; gezielter
  Abschnitt, nicht vollständige Browsersuite.
- Falsche/richtige Antworten und Feedback, Abschluss-Sperre/Reset, eigener Abruf,
  Enter/Space-Karten, Persistenz, Markieren und Rücknahme geprüft.
- 390/1440 px, Dark/Light und Reduced Motion: keine Seitenüberläufe, SVG-Texte
  im Canvas; Diagramme mobil per Tastatur seitlich erreichbar.
- Tatsächlich gesichtet: 1440-dark-figure-0, 1440-light-figure-1,
  390-dark-start, 390-light-figure-1 in ap2-rollout-20261003.
  Keine relevanten Beschriftungs-/Layoutprobleme festgestellt.

Coverage: 234/380 Entwürfe; GA1 126/164, dort 38 offen.
Nur lokale Sicherung beabsichtigter Änderungen; kein Push, keine Veröffentlichung.

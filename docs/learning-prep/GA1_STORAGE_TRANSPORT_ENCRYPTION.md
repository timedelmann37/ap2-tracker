# ga1-8__9: Verschlüsselung ruhender und übertragener Daten

Stand: 03.10.2026. Status: CURATED_DRAFT; menschliche Freigabe steht aus.

## Abgeschlossener Abschnitt

Eigenständiger Feldmaß-Außendienstfall mit verlorener SSD, entsperrter Sitzung,
TLS-Terminierung und Wiederherstellungsplanung. Eine Diagnose, vier verpflichtende
Lernziel-Checks mit falschspezifischem Feedback, eigener Transferabruf vor
Musterlösung und sieben tastaturbedienbare Karten. Zwei native technische SVGs
markieren Schutzstellen und Recovery-Betrieb. Kein ASCII-Ersatz, keine dekorativen
Rasterbilder; keine Formel für das qualitative Schutzmodell erforderlich.

## Quellenprüfung

- Microsoft BitLocker overview: Volumenschutz und Offline-Verlustfall.
- Microsoft BitLocker recovery overview: Recovery options und Considerations;
  geschützte, getrennte Ablage und beschränkter Zugang.
- Red Hat RHEL 8, Kapitel 21.1: LUKS-Blockgeräte und Grenzen nach Entsperren.
- MDN TLS: Vertraulichkeit, Integrität und Serverauthentisierung pro Verbindung.

URLs und Passagen sind in content/sources.json und der Unit-Curation verzeichnet.
Genannte Primärpassagen wurden direkt gelesen; keine vollständige Produktprüfung
oder produktive Konfigurationsanleitung behauptet. Private Buchquelle
europa-integratoren-2026:00491, Zeilen 5031–5078, wurde nur als Reverse-Proxy/TLS-
Themenanker gelesen. Sie liefert keinen Datenträgerverschlüsselungsnachweis.
Keine Buchfragen, Abbildungen oder Buchfälle übernommen.

## Gestaltung

Bestehende Referenzbindung gemäß DESIGN.md, DEEP_SPACE_REFERENCE_LOCK.md und
REFERO_COMPONENT_NOTES.md: Doppler-dominante Leseflächen, Astro-Hintergrund,
zurückhaltende n8n-artige Linien; gemeinsame Flow-Komponenten unverändert.
Kein neues Layout oder Farbkonzept. Auf Mobile sind SVGs bewusst seitlich
verschiebbar; Hinweis und Tastaturzugang bestehen.

## Tatsächlich geprüft

- npm run build: bestanden.
- npm test: bestanden.
- AP2_BROWSER_ONLY=storage-encryption npm run test:browser: bestanden.
- Diagnose ohne Abschlussfreigabe; falsche Antworten, Feedback, Reset,
  vier Pflichtziele, Reload-Persistenz, Abschluss und erneute Sperre geprüft.
- Eigener Abruf vor Musterlösung und sieben Karten per Enter/Space geprüft.
- 390 und 1440 Pixel, Dark/Light, Reduced Motion; kein Seitenoverflow,
  SVG-Texte innerhalb der Zeichenfläche und seitliches Tastaturscrollen geprüft.
- Screenshots tatsächlich angesehen: 1440-dark-figure-0,
  390-light-figure-1, 1440-light-start, 390-dark-start in
  C:/Users/timed/AppData/Local/Temp/ap2-storage-20261003.

Keine vollständige Browser-Gesamtsuite oder Live-Veröffentlichung behauptet.
Coverage nach Build: 220/380 insgesamt; GA1 112/164, verbleibend 52.

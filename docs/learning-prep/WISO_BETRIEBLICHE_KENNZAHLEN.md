# Betriebliche Kennzahlen: abgeschlossener Entwurfsabschnitt

Stand 04.10.2026, Branch `codex/ga1-linux-admin`.

## Inhalt und Status

- `wiso-6__12`, `betriebliche-kennzahlen-berechnen-einordnen`: acht Abschnitte, etwa 45 Minuten.
- Unbewertete Diagnose, vier verpflichtende Lernziel-Checks mit spezifischem Fehlfeedback, eigene Rechenfälle, Transfer-Abruf und vier Tastatur-Karteikarten.
- Arbeitsproduktivität mit Mengeneinheit; Wirtschaftlichkeit mit ausdrücklich gewähltem Ertrag/Aufwand-Ansatz; Umsatzrentabilität mit definierter Gewinnbasis; Eigenkapitalquote mit gleichem Stichtag.
- Gewinn, Umsatz, Forderung und sofort verfügbare Mittel getrennt. Keine pauschalen Branchenwerte, Renditeversprechen oder Insolvenzdiagnosen.
- Vier semantisch beschriftete MathML-Formeln und drei technische SVGs im bestehenden Deep-Space-Lernseitenmuster. Keine dekorativen Rasterbilder oder ASCII-Diagramme.
- `CURATED_DRAFT`: menschliche Freigabe ausstehend. Kein Push, keine Veröffentlichung.

## Belege und Grenzen

Private EUROPA-Rohquelle im Hauptcheckout, Markdown-Zeilen 10413–10428, besonders 10422, direkt gelesen: nur Themenanker Ertrag/Aufwand. Keine privaten Aufgaben, Zahlen oder Lösungen übernommen; kein PDF-Seitenbezug behauptet.

ZPA Nord-West, kaufmännische Formelsammlung Seite 2/3: Umsatzrentabilität und Eigenkapitalquote; Text und PDF-Formeltabelle direkt geprüft. Seite 1 betrifft Buchhändler, nicht AP2-FISI oder dessen zugelassene Hilfsmittel. IHK Regensburg B Nr. 5/C Nr. 8: EBT-Variante und bereinigte Eigenmittel. IHK Rostock Finanzplanung: Zahlung gegenüber Erfolg. bpb/Duden-Begriffsanker 2016 für Produktivität und Wirtschaftlichkeit erneut direkt gelesen und als sekundär gekennzeichnet.

Recherchegrenzen und weitere Primäranker stehen in `KENNZAHLEN_QUELLEN.md`. Ein fehlgeschlagener Destatis-Direktabruf ist kein vollständig geprüfter PDF-Beleg. Im Lerninhalt keine aktuellen Destatis-Messwerte oder universellen Kennzahlen-Grenzwerte.

Refero Direct Build: bestehender Doppler/Astro/n8n-Reference-Lock und reale vorherige Führungs-Lernseite als Build-Target; Tokens, Renderer und Interaktionslogik unverändert.

## Tatsächlich ausgeführte Prüfung

- Build und vollständiges `npm test` bestanden; lokale Wissensbasis-/Buchdatenprüfungen mangels Import übersprungen. Themenanker separat im Hauptcheckout gelesen.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=kennzahlen npm run test:browser` bestanden, nicht die gesamte Browser-Suite.
- 390/1440 Pixel in Dark/Light, Reduced Motion: Diagnose und alle falschen/richtigen Pflichtantworten, Feedback, Reset, Abruf-Mindestlänge/Lösung, Karten Enter/Leertaste, Reload-Speicherung und Abschluss/Rücknahme.
- Formel-ARIA, Seitenüberlauf, Karteninhalt, SVG-Canvas und eigene Label-Boxen geprüft; mobile Diagramme mit Pfeiltaste verschoben.
- Erstlauf fand überstehenden Vergleichstext; Beschriftungen gekürzt und vollständigen gezielten Browserlauf erneut bestanden. Keine Testgrenze abgeschwächt.
- Tatsächliche Screenshots visuell geprüft: mobile Umsatzformel Dark, Desktop-Vergleich Light, mobile Kartenrückseite Light, Desktop-Kapitalquote Dark. Formeln und Texte lesbar; Diagramme mobil seitlich verschiebbar.
- Lokale Screenshots: `%TEMP%/ap2-kennzahlen-20261004`; Logs `%TEMP%/ap2-kennzahlen-test.log` und `ap2-kennzahlen-browser.log`, nicht eingecheckt.

Abdeckung nach diesem Entwurf: 343/380 Kernthemen implementiert, 37 offen; WiSo 72/109. Implementiert bedeutet nicht menschlich freigegeben.

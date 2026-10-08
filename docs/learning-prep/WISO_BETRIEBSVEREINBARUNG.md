# WiSo W4: Betriebsvereinbarung

Stand: 04.10.2026. Kernthema `wiso-4__3`; **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Fertiger Abschnitt

Eigene Taviro-/Leni-Fälle zu Gremienbeschluss, Vertretung, Abschlussform, unmittelbarer Wirkung im Geltungsbereich, Tarifsperre und ausdrücklicher Öffnung. Zwingende Mitbestimmung nach § 87 gesondert abgegrenzt: Tarifüblichkeit nicht mit vorhandener tariflicher Regelung gleichgesetzt. Kündigungsfrist und begrenzte Nachwirkung getrennt; keine automatische Beendigung von Arbeitsverhältnissen.

Diagnose, vier Pflichtziele, Anwendung mit Feedback, Transfer vor Musterlösung und vier Karteikarten. Zwei native technische SVG für Abschlussprüfweg und Geltung/Kündigung/Nachwirkung. Keine dekorativen Rasterbilder oder ASCII; keine Rechenformel erforderlich.

## Quellen und Gestaltung

Private EUROPA-Rohquelle Zeilen 5598–5599 unmittelbar als Themenanker Tarifvertrag/Öffnung gelesen; keine übernommenen Fälle. Amtliche §§ 77 und 26 BetrVG vollständig per HTTPS-Terminal gelesen, §§ 33 und 87 per Web. BAG 15.05.2018 – 1 ABR 75/16 Rn. 17 sowie 21–22 direkt geprüft. Historische Grundsatzquelle, kein vollständiges Gutachten oder Rechtsberatung.

Refero-Skill und Visual-Workflow angewendet; vorhandene technische Bestandsillustration angesehen. Doppler-dominanter Deep-Space-Lock mit bestehenden Astro-/n8n-Rollen fortgeführt, gemeinsame Rahmenkomponenten unverändert.

## Tatsächlich verifiziert

- `npm run build`: erfolgreich, 968 Dist-Dateien.
- `npm test`: erfolgreich. Zwei SKIPs für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten im Ziel-Worktree; Themenanker separat im Hauptcheckout geprüft.
- `AP2_BROWSER_ONLY=betriebsvereinbarung node scripts/run-browser-tests.mjs`: erfolgreich.
- Chromium 390/1440 px, Dark/Light, Reduced Motion: Diagnose ohne Abschlusswirkung, vier Pflichtchecks mit falsch/richtig/Reset, Persistenz, Abschluss/Rücknahme und erneute Sperre geprüft.
- Kurzer Transfer bleibt gesperrt, ausreichende Antwort ermöglicht Musterlösung; vier Karteikarten mit Enter/Space und Textcontainment geprüft.
- SVG-Labels innerhalb Canvas und eigener Spalten; mobile Diagrammbereiche tastatur-scrollbar. Kein horizontaler Seitenüberlauf oder pageerror.
- Vier Screenshots selbst betrachtet: Desktop-Dark Prüfweg, Desktop-Light Wirkungsvergleich, Mobile-Dark Kartenrückseite, Mobile-Light Wirkungsquiz.
- Screenshots lokal unter `C:/Users/timed/AppData/Local/Temp/ap2-bv-20261004`, nicht versioniert.
- Kein vollständiger Screenreader-/WCAG-Audit oder vollständiger Browser-Gesamtlauf behauptet.

Coverage **312/380**, WiSo **41/109**, W4 **4/9**. Nächstes offenes Kernthema: `wiso-4__4` Jugend- und Auszubildendenvertretung.

Vorprüfung 04.10.2026 00:37:46 UTC, nach Prüfungen 00:44:23 UTC. Codex-Wochenfenster 61 % vor / 62 % nach, gewöhnliche Nutzung erlaubt; kein Reset verwendet.

Nur beabsichtigte Einheit, Quellen, generierte Artefakte, Tests und diese Notiz lokal gesichert. Kein Push, keine Veröffentlichung, keine Branch-Löschung.

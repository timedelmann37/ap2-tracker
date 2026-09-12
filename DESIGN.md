# AP2-Tracker — Deep Space

Stand: 2026-09-12. Umsetzung auf `codex/deep-space-ui`.

Dieses Dokument ist die verbindliche Designvorgabe für neue Inhalte, Seiten und
Komponenten. Das bestehende Deep-Space-Design wird fortgeführt. Frühere Vorgaben
zu Programa, dem flachen Kontrollpult oder frei wählbarer Optik sind historisch.
Die folgenden Regeln beschreiben die Absicht; die verlinkten gemeinsamen Assets
enthalten die jeweils gültigen Implementierungswerte. `.impeccable/design.json`
ist eine abgeleitete Übersicht und keine zusätzliche Designautorität.

## Referenzen

Die vom Nutzer gelieferten Refero-Referenzen ersetzen die bisherige Gestaltung.
Doppler bestimmt dunkle violette Flächen, Glasnavigation und präzise Kanten.
Astro liefert das blau-violette Nebellicht und die zweigeteilte Wochenanzeige.
n8n liefert die feinen elektrischen Verbindungsbahnen. Entscheidungen und
Quellenrollen stehen im [Referenz-Lock](docs/DEEP_SPACE_REFERENCE_LOCK.md).

Die anschließend über Refero abgerufenen HTML/CSS-Komponenten ergänzen die
Gestaltung: Dopplers Glas-Zweitbuttons, Astros zweigeteiltes Info-Badge und
n8ns Statistikfelder mit inneren Lichtkanten. Herkunft, Codewerte und Anpassungen
stehen in [REFERO_COMPONENT_NOTES.md](docs/REFERO_COMPONENT_NOTES.md).

## Farbe und Material

| Rolle | Wert |
|---|---|
| Canvas | `#080b19` |
| Arbeitsfläche | `#1c1624` |
| Führende Karte | `#241e2e` |
| Tracks | `#342c40` |
| Text / Beschreibung / Metadaten | `#f1f0ec` / `#c8c1d2` / `#a69bb5` |
| Orientierung | Lavendel `#b997ff` |
| Führender Weiterlernen-Button | Signalgrün `#00f575`, fast schwarzer Text |
| Erledigt / Rückstand / Fehler | `#65d9a0` / `#edbd72` / `#ff958f` |
| Laser: Kern / Violett / Cyan | `#f7f0ff` / `#a447ff` / `#38dfff` |

Hairlines: helle Linien mit 12% Deckkraft, Glaskanten mit 23%. Große Verläufe
bleiben hinter dem Inhalt; Glas lässt sie durchscheinen. Lesetext bleibt
einfarbig, Karten erhalten nur die vorhandenen feinen Lichtreflexe. Nur die führende
Lernaktion erhält Signalgrün, weitere Aktionen bleiben neutral. Zustand wird
durch Text und Indikatoren ergänzt.

## Typografie und Struktur

Lokale Inter / Inter Display, Produkttexte 14–16px, Hub-Titel responsiv 32–60px,
Überschriften 500/600. Zahlen nutzen dieselben Familien, bei wechselnden Werten
tabellarische Ziffern. Seiteninhalte bis 1240px, Hub inklusive Außenabständen bis
1440px. Bis 940px kompakte Navigation. Radien und Abstände aus der jeweils
passenden bestehenden Komponente übernehmen; Grundtokens: 8/12/16/20px,
Statistikfelder 24px, kompakte Statistikzeilen 18px. Pillen gehören zur
Wochenanzeige und zu Badges, Kreise zum Countdown und zur Bewegungssteuerung.

Der Hub führt mit einer großen linken Textspalte und dem echten Countdown;
rechts stehen ein führender Lernbereich und zwei verbundene Nebenflächen.
Unter 760px stehen diese untereinander. Bereiche zeigen Titel und Fortschritt
nebeneinander und Themengruppen in zwei Spalten. Eine geöffnete Gruppe bleibt
in ihrer Spalte, damit Nachbarkarten horizontal stabil bleiben. Übersicht zeigt getrennte versetzte Glasflächen. Lernpfad und generierte Lernseiten
nutzen die gemeinsame CSS-Schicht. Simulation und älterer Einzeltracker
übernehmen die Tokens und Theme-Steuerung bei eigenen Bedienlayouts.

## Bewegung und Theme

Globaler Hintergrund besteht aus türkisen/violetten Polarlichtern und zwei
schwachen, offenen Lichtbögen an den äußeren Seiten. Die Lichtbänder bewegen sich
über 16 Sekunden. Die Bögen verschieben sich über 24 Sekunden um 8px seitlich
und 18px nach oben, sanft hin und zurück. Ein weicher violetter Schimmer verbindet
sie mit dem Hintergrund. Die Seitenmitte bleibt frei von dekorativen Konturen.
Der zuvor verwendete geschlossene Lichtring wurde auf Nutzerwunsch entfernt,
weil er wie ein unplatziertes Einzelobjekt wirkte. Neue Hintergrundakzente
bleiben randständig und deutlich schwächer als Fortschritt und Kartenkanten.
Der Hintergrund liegt viewport-fixiert hinter Glasflächen mit 30–48% Tönung
und 24px Backdrop-Blur. Im Hellmodus sind Polarlicht und Lichtbögen schmaler
und schwächer; deckendere weiße Flächen, klarere violettgraue Kanten und
dunklere Sekundärtexte halten die Hierarchie sichtbar.
Die gleichen zwei Ebenen gelten auf allen Seiten,
einschließlich Lernseiten, Simulation und Einzeltracker. Countdown-Kontur,
Glasspiegelung und kurze Hover-Bewegungen ergänzen den Hintergrund. Inhalte bleiben
sofort bedienbar. Kein Scroll-Lock. Der Pause-Knopf speichert die Wahl unter
`ap2-motion-paused`; unsichtbare Tabs pausieren ebenfalls.

Fortschrittsbalken tragen eine 2,8s Lichtspur innerhalb der wirklich erledigten
Breite. Eine helle Kante steht am tatsächlichen Prozentwert. Änderungen gleiten
in 850ms vor oder zurück; Zuwachs leuchtet kurz auf. 0% bleibt leer. Reduced
Motion entfernt Sweep, Atmosphäre, Impuls und Breitenübergang vollständig.
Themengruppen animieren beim Öffnen und Schließen ihre gemessene Höhe über
340ms. Nachbarkarten bewegen sich dadurch nur vertikal mit dem wachsenden Inhalt;
Reduced Motion schaltet diesen Übergang ab.

Akzente haben auf Nutzerwunsch Laser-Charakter: schmaler weißer Kern, gesättigte
violette/cyanfarbene Kante und Lichtschein außerhalb der Kontur. Das gilt für
Fortschrittsstrahlen, Verbindungslinien, Countdown-Kontur und Statuspunkte.
Der Schein des Balkens bleibt außerhalb der Schiene sichtbar; bei 0% entsteht
kein Licht. Lesetext bleibt ohne Leuchteffekt, der Hellmodus reduziert den Schein.

Ohne gespeicherte Wahl gilt Dark. `ap2-theme-v1` bleibt erhalten; explizites
Light/Dark hat Vorrang. Ein alter expliziter Systemwert folgt weiter dem OS.
Der Toggle invertiert unmittelbar, auch bei blockiertem Storage. Der Hellmodus
verwendet kühle Flächen `#e9edf5` / `#f2f4f8`, deckendes Weiß und dunkle
violette Tinte.

## Implementierung und Prüfung

### Bestehende Gestaltung erweitern

1. Die passende bestehende Seite im Browser ansehen: Hub für den Wocheneinstieg,
   Bereich für Themengruppen, `/lernen/osi-model/` für Lerneinheiten,
   Übersicht für Statistik und Plan. Diese Seiten sind die Vergleichsbasis.
2. Neue Lerninhalte in `content/learning/` pflegen. Änderungen am Seitenrahmen
   gehören in `scripts/templates/learning-page.html` und die gemeinsamen Assets;
   generierte `/lernen/*/index.html` über den Build aktualisieren.
3. Farben aus `ap2-space-tokens.css`, Material und Komponenten aus
   `ap2-space.css` verwenden. Die Ladefolge der vergleichbaren Seite übernehmen:
   gemeinsame Basis, gegebenenfalls Lernstil, zuletzt Space-Stil. Neue Varianten
   dort ergänzen, wo die gemeinsame Komponente definiert ist. Refero-HTML und
   Tailwind-Beispiele werden in diese Regeln übersetzt; bestehende Quellenrollen
   stehen in den beiden Referenzdokumenten oben.
4. Fortschrittsanzeigen an echte erledigte Kernthemen binden und das vorhandene
   Muster `.track > .fill` wiederverwenden. Prozenttext und Endkante zeigen
   denselben Wert. Atmosphäre, Pause und Zuwachsfeedback kommen aus
   `ap2-space.js`, Theme-Verhalten aus `ap2-theme.js`.
5. Neue Arbeitsflächen übernehmen sichtbare Transparenz, Hintergrundlicht,
   Glaskanten und gezielte Laserlinien. Lange Lerntexte liegen auf der stärker
   getönten Lesefläche. Die stärkste Aktion und die wichtigsten Inhalte erhalten
   Vorrang in Größe und Position; zusätzliche Informationen ordnen sich darunter.
6. Vor Abschluss die betroffenen Seiten bei 390px und 1440px ansehen; Änderungen
   an der Navigation zusätzlich bei 940px, 941px und 1024px prüfen. Dark und Light,
   lange Texte, leere und abgeschlossene Zustände sowie Tastaturfokus kontrollieren.
   Bei Fortschrittsänderungen Abhaken, Rücknahme, 0%, Teilstand und 100% prüfen;
   laufende Bewegung, Pause und Reduced Motion im Browser tatsächlich beobachten.
   Die passenden vorhandenen Prüfungen aus `package.json` ausführen. Statische
   Checks ersetzen die Sichtprüfung nicht.

Die Erweiterung ist fertig, wenn sie zur Vergleichsseite passt, Texte ohne
Überlauf lesbar sind und die betroffenen Interaktionen in beiden Themes
funktionieren. Neue gemeinsame Designentscheidungen zuerst hier nachführen und
die abgeleitete JSON-Übersicht bei Änderungen ihrer Angaben mitziehen.

### Sprache

UI-Texte sind kurz, konkret und deutsch. Handlungen direkt benennen:
„Weiterlernen“, „Anmelden, um Fortschritt zu speichern“, „3 von 12 Kernthemen erledigt“.
Erklärungen sagen, was zu tun ist oder was sich geändert hat. Neue Lerntexte
erklären Fachbegriffe mit passenden Beispielen; keine Werbesätze, künstlichen
Motivationssprüche oder Weltraum-Metaphern für normale Bedienhandlungen.
Begriffe und Hierarchie bleiben `Bereich > Themengruppe > Kernthema`.

### Gemeinsame Dateien und vorhandene Prüfungen

- Tokens: `assets/ap2-space-tokens.css`.
- Gemeinsame Grundstruktur: `assets/ap2-reference-ui.css`.
- Glas, neue Layouts und Lichtstrahlen: `assets/ap2-space.css`.
- Atmosphäre, Pause und Fortschrittsfeedback: `assets/ap2-space.js`.
- Theme: `assets/ap2-theme.js`; Navigation: `assets/ap2-navigation.js`.
- Build kopiert die neuen Tokens explizit in das Publish-Verzeichnis.
- Browserprüfungen: Navigation, Tastatur, 360–1440px, Theme-Persistenz und
  Lerninteraktionen. Schriftprüfung nutzt das tatsächliche Titelgewicht.
- `scripts/verify-space-browser.mjs`: echtes Abhaken, bewegte Lichtspur,
  Pause, Rückgängigmachen, Persistenz und Reduced Motion.
- Visuelle Kontrolle: Hub, Übersicht, Bereiche, Lernpfad, Lernseite,
  Simulation und Einzeltracker, ergänzend Hellmodus und Reduced Motion.

Inhalte, Fortschritt und Cloud-Sync werden durch die Gestaltung nicht migriert.

### Kontostatus

Der Kontobutton zeigt bei aktiver Sitzung einen grünen Statuspunkt, „Angemeldet“
und einen Öffnungspfeil. Der Text bleibt mobil sichtbar. Die vorhandene
Glasnavigation (Doppler-Referenz) und der semantische Success-Token bleiben
die Basis. Im Kontofenster stehen „Angemeldet als“ mit E-Mail und ein eigener,
live aktualisierter Speicherstatus. Anmeldung bedeutet nicht erfolgreiche
Synchronisierung; Fehler lassen den Anmeldestatus bestehen.
Ohne aktive Sitzung öffnen Fortschrittsaktionen das Anmeldefenster und ändern
keinen Stand. Datei-Import und -Export gehören nicht mehr zur Oberfläche.

### Logo und Favicon

Ausgewählt: Entwurf 03 „Checkpoint“. Ein grüner Haken verlässt einen offenen
quadratischen Rahmen. Die produktive Form ist eine klare SVG-Geometrie ohne
Lichteffekte. Navigation: `assets/ap2-checkpoint.svg`; Browser-Icon: derselbe
Umriss auf dunklem Grund in `assets/favicon.svg`, PNG-Fallback und Touch-Icon.

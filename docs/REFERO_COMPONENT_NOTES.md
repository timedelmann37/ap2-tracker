# Refero-Komponenten: geprüft und übernommen

Stand: 2026-09-11. Ergänzt die vom Nutzer gelieferten Markdown-Exporte.
Abgerufen über `refero_get_style`, JSON inklusive `components[].html`.
Die drei Styles enthalten je drei HTML/CSS-Beispiele (insgesamt neun).
Das sind Refero-Komponentenbeispiele; keine Behauptung über den originalen
Produktionsquellcode der Anbieter. Die beigefügten Exporte enthalten außerdem
Tailwind-v4-`@theme`-Blöcke.

| Quelle / Style-ID | Konkretes Beispiel | Im Tracker angewandt |
|---|---|---|
| Doppler / `38dc3537-23bd-4e23-862f-5d7841ee6566` | `Primary CTA Button Group`: Zweitbutton mit `rgba(242,241,237,.08)`, Rahmen `rgba(229,231,235,.15)`, Radius 12px, Pfeil als SVG | Sekundäre Weiterlernen-Buttons mit sichtbarer Glasfläche und SVG-Pfeil |
| Astro / `556dcca2-c4c8-4bc1-a3f4-bd8cda9476b1` | `Hero CTA Buttons + Version Badge`: zweigeteilte Pille, farbiges Label, neutraler Infoteil, 9999px Radius | Wochenanzeige: „Diese Woche“ + bestehende dynamische Woche/KW |
| n8n / `96274ca5-912c-4e66-a694-743f685e9f57` | `Social Proof Stat Cards`: transparente Fläche, Radius 24px, `inset 0 0 0 1px rgba(255,255,255,.1)` und `inset 0 1px 0 rgba(255,142,93,.3)` | Statistikfelder der Übersicht, gleiche Innenkanten und Trennung von Zahl/Beschriftung |

## Übertragung

- Tailwind-Tokenwerte werden in CSS-Variablen übernommen. Der bestehende
  Tracker braucht dafür keine neue CSS-Laufzeit oder einen Tailwind-Build.
- 12px Radius stammt aus Dopplers Buttons, 24px aus n8ns Statistikflächen,
  9999px aus Astros Info-Badge. Quellenrollen bleiben erhalten.
- Die Badge-Farbe verwendet Astros `83.21deg`-Verlauf mit einer dunklen
  Überlagerung für lesbaren weißen Text. Light bekommt eine eigene neutrale Basis.
- Ein SVG-Pfeil ersetzt das Textzeichen an Lernaktionen; keine Font-Abhängigkeit.
- Responsive Größen und Mindesthöhe der Buttons sind an Touch angepasst.
- Die bestehenden Laserbalken und Daueranimationen bleiben erhalten.

## Nicht übernommen

Keine Beispielinhalte wie Testimonials, GitHub-Sternzahlen oder Releasebehauptungen.
Keine externen Google-Font-Imports aus den Demos. Keine ungebundenen `:root`-
Definitionen und globalen `.btn-primary`-Klassen aus fremden Komponenten.
`transition: all` aus Astros Demo wird durch gezielte Übergänge ersetzt.
Widersprüchliche Hinweise wie weißer Text auf weißem Button werden nicht übernommen.

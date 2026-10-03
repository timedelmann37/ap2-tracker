# Mutterschutz, Elternzeit und Pflegezeit

Stand: 03.10.2026. Kernthema: `wiso-2__7`.
Status: **CURATED_DRAFT**, menschliche Fachfreigabe ausstehend.

## Tatsächlich umgesetzt

- Eigene Fälle Elin, Jorin und Lena im fiktiven IT-Betrieb Varelo.
- Mutterschutz-Rangfolge mit bereits festgestellter Gefährdung:
  sicher umgestalten, geeigneten verfügbaren zumutbaren Wechsel prüfen,
  erst bei Scheitern beider Schutzwege nicht weiter beschäftigen.
- Gefährdungsbeurteilung und erforderliche Schutzmaßnahmen abgegrenzt;
  keine allgemeine Gefährlichkeit von IT-Hardware behauptet.
- Elternzeit von Elterngeld getrennt; Haushalt und eigene Betreuung,
  Altersbereiche, 32-Stunden-Grenze im aktuellen Geburtsfall.
- Anmeldung mit sieben beziehungsweise 13 Wochen und Zweijahresfestlegung;
  Textform ausdrücklich für das 2026 geborene Kind, Übergangsregeln erwähnt.
- Akute Pflegeverhinderung bis zehn Arbeitstage ohne Beschäftigtenschwelle,
  unverzügliche Meldung und Bescheinigung auf Verlangen.
- Längere häusliche Pflegezeit: mehr als 15 Beschäftigte, Nachweis,
  regulär zehn Arbeitstage Vorlauf, Textform und bis sechs Monate je Angehörigem.
  Schriftliche Teilzeitvereinbarung vom Anmelden in Textform unterschieden.
- Zwölf-/18-Personenbetrieb verglichen; Finanzierung separat.
- Diagnose, drei Pflichtchecks mit Feedback, Freitext-Selbstvergleich,
  drei tastaturbedienbare Karten und zwei native technische SVGs.
- Keine künstliche Formel oder ASCII-Grafik eingeführt.

## Quellen und Grenzen

- MuSchG §§ 10 und 13 in amtlichen Suchtexten am 03.10.2026 gelesen.
  Einzel-/Gesamtabrufe von § 13 zuvor Timeout; nicht als erfolgreicher
  Direktabruf dokumentiert. Kein veralteter Gesetzentwurf verwendet.
- BEEG §§ 15, 16 und 28 direkt gelesen; amtliches Familienportal
  „Was ist Elternzeit?“ direkt gelesen.
- PflegeZG §§ 2, 3 und 4 direkt gelesen. Aktuelle Zulässigkeit der
  Bescheinigung einer Pflegefachperson im akuten Fall berücksichtigt.
- Sämtliche Links und Fundstellen in content/sources.json und
  der Curation der Einheit nachvollziehbar.
- Privates EUROPA-Paket im Hauptrepository: Zeile 9257 MuSchG-Nennung
  nur Themenanker. Veraltetes BErzGG nicht als aktuelle Grundlage genutzt.
  Keine Buchaufgabe, Lösung oder Grafik übernommen.
- Keine individuelle Rechtsberatung oder medizinische Freigabe.
  Leistungen nicht berechnet; besondere Anschlussfristen,
  Familienpflegezeit, Kündigungsschutz und Geburtsschutzfristen nicht
  abschließend behandelt. Freitextlänge ist kein fachlicher Leistungsnachweis.

## Gestaltung und tatsächlich ausgeführte QA

Refero-Direct-Build auf bestehendem Deep-Space-Referenz-Lock; vorherige
Entgeltfortzahlungsseite als sichtgeprüfte Basis. Gemeinsame Tokens,
Compiler und Interaktionen weiterverwendet, kein neues Seitenlayout.

- `npm run build` und `npm test` erfolgreich, Build 914 Dateien.
  Repositorytests für Site, Learning-Compiler, Batch, Learning,
  Progress-Merge und Leaderboard-SQL bestanden.
- Buchqueue-/Buchdatenchecks **SKIP** mangels importierter Wissensbasis
  im Worktree; privater Themenanker separat im Hauptrepository gelesen.
- `AP2_BROWSER_ONLY=family-protection` erfolgreich: falsche/richtige
  Antworten, Feedback, Diagnose ohne Freischaltung, drei Pflichtziele,
  Reset, Mindestlänge, Antwortmodell, Tastaturkarten, Persistenz,
  Erledigt-Markierung und Rücknahme.
- 390/1440 px in Dark/Light: Seitenüberlauf, Diagrammtextgrenzen,
  Vorder-/Rückseiten und horizontales Diagramm-Tastaturscrolling geprüft.
  Keine vollständige Browser-Suite oder vollständige WCAG-Prüfung behauptet.
- Sichtgeprüft in `%TEMP%/ap2-familie-20261003/`:
  `1440-dark-figure-0.png`, `1440-light-figure-1.png`,
  `390-light-quiz.png`, `390-dark-card-reverse.png`.
  Beschriftungen lesbar, keine abgeschnittenen Karteninhalte.
- Coverage: **294/380**, WiSo **23/109**, W2 **8/14**.
- Nur lokale Sicherung; kein Push und keine Veröffentlichung.
- Nächstes offenes Kernthema: `wiso-2__8`, konkrete Mutterschutzfristen.

# Entgeltfortzahlung, Krankmeldung und eAU

Stand: 03.10.2026. Kernthema: `wiso-2__6`.
Status: **CURATED_DRAFT**, menschliche Fachfreigabe ausstehend.

## Tatsächlich umgesetzt

- Eigene Fälle Sovin / Meralo: acht Monate Beschäftigung, unverschuldete AU,
  gesetzliche Versicherung und teilnehmende Vertragsarztpraxis im Hauptfall.
- Zahlungsanspruch getrennt von Anzeige und ärztlicher Feststellung;
  vierwöchige Wartezeit, bis zu sechs Wochen und Bemessungsgrundlage erklärt.
- Dauerrechnung sechs Wochen = 42 Kalendertage; keine individuelle Restdauer,
  Lohnabrechnung oder Krankengeldberechnung daraus abgeleitet.
- Freitag–Dienstag, Mo–Fr-Arbeit ohne Feiertage und frühere Anforderung:
  unverzüglich melden, spätestens Montag ärztlich feststellen lassen.
  Variante mit früherem Tag-eins-Verlangen gesondert erklärt.
- eAU-Rollen: eigene Anzeige bleibt; Praxis übermittelt an Krankenkasse,
  Kasse stellt Meldung bereit, Arbeitgeber ruft ab.
- Ausnahmen für Privatversicherung, Privathaushalts-Minijob und
  nicht teilnehmende Arztpraxis; technische Störungen als eigener Nachweisweg.
- Fortdauer und erneute gleiche Krankheit abgegrenzt; neue Bescheinigung
  bedeutet nicht automatisch neuen Sechswochenzeitraum.
- Diagnose, Zahlenübung, drei Pflichtchecks mit Antwortfeedback,
  Freitext-Selbstvergleich und drei tastaturbedienbare Lernkarten.
- Zwei native technische SVGs, semantische MathML-Rechnung.

## Tatsächlich geprüfte Quellen und Grenzen

- [EntgFG § 3](https://www.gesetze-im-internet.de/entgfg/__3.html), Abs. 1 und 3,
  und [§ 5](https://www.gesetze-im-internet.de/entgfg/__5.html), Abs. 1, 1a und 2,
  direkt gelesen am 03.10.2026.
- § 4 Abs. 1, 1a und 4 in der [amtlichen Gesamtausgabe](https://www.gesetze-im-internet.de/entgfg/BJNR106500994.html)
  gelesen. Zwei Einzelabrufe Timeout, nicht als erfolgreich dokumentiert.
- [KBV Arbeitsunfähigkeit](https://www.kbv.de/praxis/verordnungen/arbeitsunfaehigkeit):
  technische Probleme, Arbeitgeberabruf und eigene Informationspflicht gelesen.
  Andere FAQ-Abschnitte zu Sozialleistungen nicht verwendet.
- [SGB IV § 109](https://www.gesetze-im-internet.de/sgb_4/__109.html), Abs. 1,
  direkt gelesen. Künftige Teilarbeitsunfähigkeitsregel ab 2028 nicht übernommen.
- Privater EUROPA-Rohtext im Hauptrepository, Zeile 5751: Entgeltfortzahlung
  als Themenanker in Zuordnungsaufgabe gelesen; kein Aufgabentext, keine
  Lösung und keine Grafik übernommen. Ausbildung-in-der-IT-Review für
  Quellenrolle und eigene fallorientierte Didaktik gelesen.
- Keine individuelle medizinische oder Rechtsfreigabe; keine abschließende
  Prüfung überlappender Erkrankungen, Beweiswertstreit, Auslands-AU,
  Tarifbemessung oder Sozialleistungen. Freitext nur Selbstvergleich.

## Gestaltung und tatsächliche QA

Refero-Direct-Build auf bestehendem Deep-Space-Referenz-Lock; vorherige
Urlaubsseite als sichtgeprüfte Vergleichsbasis. Gemeinsame Tokens und
Lerninteraktionen unverändert weiterverwendet; kein ASCII oder Rasterdekor.

- `npm test` auf endgültiger Inhaltsfassung erfolgreich: Build, Site,
  Learning-Compiler, Batch, Learning, Progress-Merge, Leaderboard-SQL.
  Build: 911 Dateien.
- Lokale Buchqueue-/Buchdatenchecks ausdrücklich **SKIP** mangels importierter
  Wissensbasis im Worktree; Themenanker separat im Hauptrepo gelesen.
- Gezielter Browser-Test `AP2_BROWSER_ONLY=entgeltfortzahlung` erfolgreich:
  falsche/richtige Antworten, Feedback, Diagnose ohne Freischaltung,
  Pflichtziele, Reset, Zahlenübung 30 falsch / 42,0 richtig,
  Freitext-Mindestlänge, Modell, Tastatur-Karten, Persistenz und Erledigt/Rücknahme.
- 390/1440 px jeweils Dark/Light: Seitenüberlauf, Diagrammtextgrenzen,
  Karten-Vorder-/Rückseiten, MathML-Beschriftung und horizontales Tastatur-Scrolling.
  Keine vollständige Browser-Suite behauptet.
- Sichtgeprüft in `%TEMP%/ap2-krank-20261003/`:
  `1440-dark-figure-0.png`, `1440-light-figure-1.png`,
  `390-light-formula-0.png`, `390-dark-card-reverse.png`.
  eAU-Diagramm auf tatsächlichen Datenweg präzisiert, erneut gebaut,
  getestet und in Light/Desktop angesehen. Keine abgeschnittenen Beschriftungen.
- Coverage: **293/380**, WiSo **22/109**, W2 **7/14**.
- Nur beabsichtigte Änderungen lokal sichern; kein Push, keine Veröffentlichung.
- Als Nächstes: `wiso-2__7`, Mutterschutz, Elternzeit und Pflegezeit.
